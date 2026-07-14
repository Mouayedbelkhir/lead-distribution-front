"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { hydrateAuth } from "@/lib/auth";

export function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    const result = hydrateAuth();
    if (result) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="auth-hydrating">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
