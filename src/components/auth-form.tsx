"use client";

import { useActionState, useState } from "react";

import { signInAction, signUpAction, type AuthActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AuthMode = "signin" | "signup";

const initialState: AuthActionState = {
  error: null,
  success: null,
};

function MessageBanner({ state }: { state: AuthActionState }) {
  if (state.error) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
        {state.error}
      </div>
    );
  }

  if (state.success) {
    return (
      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-400">
        {state.success}
      </div>
    );
  }

  return null;
}

function EmailPasswordFields({ idPrefix }: { idPrefix: string }) {
  return (
    <>
      <Field>
        <FieldLabel htmlFor={`${idPrefix}-email`}>Email</FieldLabel>
        <Input id={`${idPrefix}-email`} name="email" type="email" autoComplete="email" required />
      </Field>

      <Field>
        <FieldLabel htmlFor={`${idPrefix}-password`}>Password</FieldLabel>
        <Input
          id={`${idPrefix}-password`}
          name="password"
          type="password"
          autoComplete={idPrefix === "signin" ? "current-password" : "new-password"}
          required
        />
      </Field>
    </>
  );
}

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [signInState, signInFormAction, signInPending] = useActionState(
    signInAction,
    initialState
  );
  const [signUpState, signUpFormAction, signUpPending] = useActionState(
    signUpAction,
    initialState
  );

  const currentState = mode === "signin" ? signInState : signUpState;
  const pending = mode === "signin" ? signInPending : signUpPending;

  return (
    <Card className="w-full max-w-md border-border/80 bg-card/90 shadow-2xl shadow-black/5 backdrop-blur">
      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
            Supabase Authentication
          </p>
          <CardTitle className="text-2xl tracking-tight">
            {mode === "signin" ? "Sign in to continue" : "Create your account"}
          </CardTitle>
          <CardDescription>
            Use email and password auth to access your protected projects.
          </CardDescription>
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-xl bg-muted p-1">
          <Button
            type="button"
            variant={mode === "signin" ? "default" : "ghost"}
            className={cn("rounded-lg", mode === "signin" && "shadow-sm")}
            onClick={() => setMode("signin")}
          >
            Sign In
          </Button>
          <Button
            type="button"
            variant={mode === "signup" ? "default" : "ghost"}
            className={cn("rounded-lg", mode === "signup" && "shadow-sm")}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {mode === "signin" ? (
          <form action={signInFormAction} className="space-y-5" noValidate>
            <MessageBanner state={currentState} />
            <EmailPasswordFields idPrefix="signin" />
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        ) : (
          <form action={signUpFormAction} className="space-y-5" noValidate>
            <MessageBanner state={currentState} />
            <EmailPasswordFields idPrefix="signup" />
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}