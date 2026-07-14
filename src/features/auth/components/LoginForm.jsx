"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { loginSchema } from "@/features/auth/schemas/loginSchema";
import { login as loginApi } from "@/features/auth/services/authService";
import { setAuth } from "@/lib/auth";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentUser } from "@/store/actions/authActions";

export function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    try {
      const result = await loginApi(values.email, values.password);
      setAuth(result.token, result.user);
      dispatch(setCurrentUser(result.user));
      toast.success("Welcome back!");
      router.replace("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      toast.error(message);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="auth-field">
        <label className="form-label" htmlFor="email">
          Email address
        </label>
        <div className="input-wrap">
          <Mail className="input-icon" size={18} />
          <input
            id="email"
            type="email"
            className={`form-control auth-input ${errors.email ? "is-invalid" : ""}`}
            placeholder="you@company.com"
            autoComplete="email"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <div className="invalid-feedback d-block">{errors.email.message}</div>
        )}
      </div>

      <div className="auth-field">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <div className="input-wrap">
          <Lock className="input-icon" size={18} />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            className={`form-control auth-input ${errors.password ? "is-invalid" : ""}`}
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register("password")}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((s) => !s)}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <div className="invalid-feedback d-block">{errors.password.message}</div>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary auth-submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" />
            Signing in...
          </>
        ) : (
          <>
            <LogIn size={18} className="me-2" />
            Sign in to dashboard
          </>
        )}
      </button>
    </form>
  );
}
