import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <div className="relative min-h-svh overflow-hidden px-4 py-10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.12),_transparent_35%),linear-gradient(180deg,_hsl(var(--background)),_hsl(var(--muted)/0.35))]" />
      <div className="mx-auto flex min-h-svh w-full max-w-5xl items-center justify-center">
        <AuthForm />
      </div>
    </div>
  );
}