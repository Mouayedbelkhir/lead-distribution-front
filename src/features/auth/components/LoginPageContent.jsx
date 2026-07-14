"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layers } from "lucide-react";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useAppSelector } from "@/store/hooks";

export function LoginPageContent() {
  const router = useRouter();
  const isHydrated = useAppSelector((s) => s.auth.isHydrated);
  const user = useAppSelector((s) => s.auth.user);

  useEffect(() => {
    if (isHydrated && user) {
      router.replace("/dashboard");
    }
  }, [isHydrated, user, router]);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Layers size={28} />
          </div>
          <h1 className="auth-title">LeadFlow Admin</h1>
          <p className="auth-subtitle">Sign in to manage your lead distribution</p>
        </div>
        <LoginForm />
        <p className="auth-footer">
          Lead Distribution System &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
