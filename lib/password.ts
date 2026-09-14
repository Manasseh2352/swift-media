import bcrypt from "bcryptjs";

/**
 * There's exactly one admin account, defined entirely by environment
 * variables — no user table, no signup flow. Generate a hash for your
 * password with:
 *
 *   node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
 *
 * and set ADMIN_USERNAME / ADMIN_PASSWORD_HASH accordingly.
 */
export async function verifyAdminPassword(
  username: string,
  password: string
): Promise<boolean> {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !expectedHash) {
    throw new Error(
      "ADMIN_USERNAME or ADMIN_PASSWORD_HASH is not set in your environment."
    );
  }

  if (username !== expectedUsername) return false;
  return bcrypt.compare(password, expectedHash);
}
