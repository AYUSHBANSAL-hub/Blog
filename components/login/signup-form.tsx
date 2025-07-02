"use client";

import React, { useState } from "react";
import { EyeIcon, MailIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import Link from "next/link";

const SignUpFormSection = () => {
  const router = useRouter();

  /* ─── Form state ──────────────────────────────────────────────────────── */
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* ─── UX helpers ──────────────────────────────────────────────────────── */
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleChange = (key: keyof typeof form) => (e: any) =>
    setForm((p) => ({ ...p, [key]: e.target?.type === "checkbox" ? e.target.checked : e.target.value }));

  /* ─── Submit handler ──────────────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // very lightweight client‑side validation
    if (!form.fullName || !form.email || !form.phone || !form.password) {
      return setError("Please fill out every field.");
    }
    if (form.password.length < 8) return setError("Password must be at least 8 characters.");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");

      // success 🎉  → go to login (or dashboard)
      router.push("/login?signup=success");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[471px] flex flex-col gap-6 sm:gap-8 bg-white px-4 sm:px-6 md:px-0 mx-auto">
      <h1 className="text-3xl sm:text-4xl font-semibold text-[#09090B]">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-4 sm:gap-4">
          {/* Full Name */}
          <LabelledInput
            label="Full Name"
            id="name"
            type="text"
            placeholder="Enter your Full Name"
            value={form.fullName}
            onChange={handleChange("fullName")}
          />

          {/* Email */}
          <LabelledInput
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange("email")}
          />

          {/* Phone Number */}
          <LabelledInput
            label="Phone Number"
            id="phone"
            type="tel"
            placeholder="Enter your Phone Number"
            value={form.phone}
            onChange={handleChange("phone")}
          />

          {/* Password */}
          <LabelledInput
            label="Password"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange("password")}
            rightIcon={
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                <EyeIcon className="w-4 h-4" />
              </IconButton>
            }
          />

          {/* Confirm Password */}
          <LabelledInput
            label="Confirm Password"
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re‑enter your password"
            value={form.confirmPassword}
            onChange={handleChange("confirmPassword")}
            rightIcon={
              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                <EyeIcon className="w-4 h-4" />
              </IconButton>
            }
          />

          {/* Remember Me & Forgot */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between text-sm gap-2 mt-1">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                className="w-4 h-4"
                checked={form.remember}
                onCheckedChange={(checked) => setForm((p) => ({ ...p, remember: !!checked }))}
              />
              <label htmlFor="remember" className="text-[#52525c]">
                Remember me
              </label>
            </div>
            <Button type="button" variant="ghost" className="h-8 px-2 py-1 text-[#52525c]">
              Forgot password?
            </Button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm">{error}</p>}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full min-h-[40px] px-4 py-[10px] bg-[#09090B] text-neutral-50 rounded-md flex items-center justify-center gap-2 mt-1"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm font-medium">Signing up…</span>
              </>
            ) : (
              <>
                <MailIcon className="w-[20px] h-[20px]" />
                <span className="text-sm font-medium">Create account</span>
              </>
            )}
          </Button>
        </div>

        {/* Sign In Link */}
        <div className="flex flex-wrap items-center justify-center mt-[18px] text-sm gap-[12px] text-center">
          <span className="text-[#71717b]">Already have an account?</span>
          <Link href="/login">
            <div className="h-8 px-2 py-1 text-[#52525c] hover:text-black">Sign In</div>
          </Link>
        </div>

        {/* Terms */}
        <p className="text-xs text-center mt-[16px] text-[#71717b] leading-4 px-2">
          By clicking Continue, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
};

export default SignUpFormSection;

/* ──────────────────────────────────────────────────────────────────────────
   Small presentational helpers to keep JSX tidy
   ────────────────────────────────────────────────────────────────────────── */
type LabelledInputProps = React.ComponentProps<typeof Input> & {
  label: string;
  rightIcon?: React.ReactNode;
};
const LabelledInput = ({ label, rightIcon, className, ...rest }: LabelledInputProps) => (
  <div className="flex flex-col gap-[6px]">
    <label htmlFor={rest.id} className="text-sm font-[700] text-[#27272A]">
      {label}
    </label>
    <div className="relative">
      <Input {...rest} className={`min-h-[40px] px-[12px] py-[10px] text-sm rounded-md ${className || ""}`} />
      {rightIcon && <div className="absolute right-1 top-1/2 -translate-y-1/2">{rightIcon}</div>}
    </div>
  </div>
);

const IconButton = ({ children, ...rest }: React.ComponentProps<"button">) => (
  <button
    {...rest}
    type="button"
    className="p-1 rounded-md hover:bg-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
  >
    {children}
  </button>
);
