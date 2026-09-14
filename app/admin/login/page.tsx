import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Sign in — SwiftMedia admin" };

export default function AdminLoginPage() {
  return (
    <div className="admin-auth">
      <div className="admin-auth-card">
        <div className="hero-eyebrow">SwiftMedia admin</div>
        <h1>Sign in</h1>
        <LoginForm />
      </div>
    </div>
  );
}
