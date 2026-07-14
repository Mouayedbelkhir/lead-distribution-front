"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentUser, clearCurrentUser, setAuthHydrated } from "@/store/actions/authActions";
import { hydrateAuth, clearAuth } from "@/lib/auth";

export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((s) => s.auth.user);
  const isHydrated = useAppSelector((s) => s.auth.isHydrated);

  useEffect(() => {
    const result = hydrateAuth();
    if (result) {
      dispatch(setCurrentUser(result.user));
    } else {
      dispatch(clearCurrentUser());
    }
    dispatch(setAuthHydrated(true));
  }, [dispatch]);

  const logout = () => {
    clearAuth();
    dispatch(clearCurrentUser());
    router.replace("/login");
  };

  return { user, isHydrated, isAuthenticated: !!user, logout };
}
