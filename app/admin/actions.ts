"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { createSessionToken, verifySessionToken, SESSION_COOKIE } from "@/lib/auth";
import { verifyAdminPassword } from "@/lib/password";
import {
  addProject as addProjectToStore,
  deleteProject as deleteProjectFromStore,
} from "@/lib/projects-store";
import type { Category } from "@/data/projects";

async function requireAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const valid = token ? await verifySessionToken(token) : false;
  if (!valid) {
    redirect("/admin/login");
  }
}

export type LoginState = { error?: string };

export async function login(
  _prevState: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  let ok: boolean;
  try {
    ok = await verifyAdminPassword(username, password);
  } catch (err) {
    console.error(err);
    return { error: "Admin login isn't configured yet — check your environment variables." };
  }

  if (!ok) {
    return { error: "Incorrect username or password." };
  }

  const token = await createSessionToken();
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export type UploadState = { error?: string; success?: boolean };

export async function uploadProject(
  _prevState: UploadState | undefined,
  formData: FormData
): Promise<UploadState> {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const client = String(formData.get("client") ?? "").trim();
  const category = String(formData.get("category") ?? "") as Category;
  const file = formData.get("file") as File | null;

  if (!title || !client || !category || !file || file.size === 0) {
    return { error: "Please fill in every field and choose a file." };
  }

  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");
  if (!isImage && !isVideo) {
    return { error: "Please upload an image or video file." };
  }

  const MAX_BYTES = 90 * 1024 * 1024; // stay under the serverless function body limit
  if (file.size > MAX_BYTES) {
    return { error: "That file is too large for a direct upload (90MB limit)." };
  }

  try {
    const blob = await put(`media/${crypto.randomUUID()}-${file.name}`, file, {
      access: "public",
    });

    await addProjectToStore({
      title,
      client,
      category,
      mediaUrl: blob.url,
      mediaType: isVideo ? "video" : "image",
    });
  } catch (err) {
    console.error(err);
    return {
      error:
        "Couldn't reach storage — make sure BLOB_READ_WRITE_TOKEN is set for this project.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await deleteProjectFromStore(id);
  revalidatePath("/");
  revalidatePath("/admin");
}
