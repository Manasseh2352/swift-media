"use client";

import { useActionState, useEffect, useRef } from "react";
import { uploadProject, type UploadState } from "@/app/admin/actions";
import { categoryLabels } from "@/data/projects";

const initialState: UploadState = {};

export default function UploadForm() {
  const [state, formAction, pending] = useActionState(uploadProject, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="admin-form">
      <div className="field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" required />
      </div>
      <div className="field">
        <label htmlFor="client">Client</label>
        <input id="client" name="client" type="text" required />
      </div>
      <div className="field">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" required defaultValue="">
          <option value="" disabled>
            Choose a category
          </option>
          {Object.entries(categoryLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="file">Image or video</label>
        <input id="file" name="file" type="file" accept="image/*,video/*" required />
      </div>
      {state.error && <p className="field-error">{state.error}</p>}
      {state.success && <p className="field-success">Added to the site.</p>}
      <button className="send-btn" type="submit" disabled={pending}>
        {pending ? "Uploading…" : "Add project"}
      </button>
    </form>
  );
}
