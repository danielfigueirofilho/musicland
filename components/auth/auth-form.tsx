"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { BrandLogo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  validateLoginInput,
  validateRegisterInput,
  type AuthValidationError,
} from "@/lib/auth/validators";
import { usePlayerStore } from "@/stores/player-store";
import type { SessionUser } from "@/types";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
};

function fieldError(errors: AuthValidationError[], field: AuthValidationError["field"]) {
  return errors.find((error) => error.field === field)?.message;
}

/**
 * Formulário de login ou cadastro (CA-07).
 */
export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const loginAsUser = usePlayerStore((state) => state.loginAsUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<AuthValidationError[]>([]);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isRegister = mode === "register";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const validation = isRegister
      ? validateRegisterInput({ name, email, password })
      : validateLoginInput({ email, password });
    setErrors(validation);
    if (validation.length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(isRegister ? "/api/auth/register" : "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isRegister ? { name, email, password } : { email, password },
        ),
      });
      const body = (await response.json()) as {
        user?: SessionUser;
        error?: string;
        errors?: AuthValidationError[];
      };

      if (!response.ok) {
        if (body.errors) {
          setErrors(body.errors);
        }
        setFormError(body.error ?? "Não foi possível entrar.");
        return;
      }

      if (body.user) {
        await loginAsUser(body.user);
      }
      router.push("/home");
      router.refresh();
    } catch {
      setFormError("Falha de rede. Tente de novo.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-background flex min-h-full flex-1 flex-col">
      <header className="border-border border-b">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
          <Link href="/">
            <BrandLogo />
          </Link>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12 sm:px-6">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          {isRegister ? "Criar conta" : "Entrar"}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          {isRegister
            ? "Nome, e-mail e senha com no mínimo 6 caracteres. Você também pode jogar como visitante."
            : "Use o e-mail cadastrado. Visitantes seguem sem conta."}
        </p>
        <form className="mt-8 flex flex-col gap-4" onSubmit={(event) => void handleSubmit(event)} noValidate>
          {isRegister ? (
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={Boolean(fieldError(errors, "name"))}
                className="h-11 text-base"
              />
              {fieldError(errors, "name") ? (
                <p className="text-destructive text-sm">{fieldError(errors, "name")}</p>
              ) : null}
            </div>
          ) : null}
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(fieldError(errors, "email"))}
              className="h-11 text-base"
            />
            {fieldError(errors, "email") ? (
              <p className="text-destructive text-sm">{fieldError(errors, "email")}</p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={Boolean(fieldError(errors, "password"))}
              className="h-11 text-base"
            />
            {fieldError(errors, "password") ? (
              <p className="text-destructive text-sm">{fieldError(errors, "password")}</p>
            ) : null}
          </div>
          {formError ? (
            <p className="text-destructive text-sm" role="alert">
              {formError}
            </p>
          ) : null}
          <Button type="submit" className="h-12" disabled={isSubmitting}>
            {isSubmitting ? "Enviando…" : isRegister ? "Cadastrar" : "Entrar"}
          </Button>
        </form>
        <p className="text-muted-foreground mt-6 text-sm">
          {isRegister ? (
            <>
              Já tem conta?{" "}
              <Link className="text-primary font-medium underline-offset-4 hover:underline" href="/login">
                Entrar
              </Link>
            </>
          ) : (
            <>
              Novo por aqui?{" "}
              <Link className="text-primary font-medium underline-offset-4 hover:underline" href="/register">
                Criar conta
              </Link>
            </>
          )}
          {" · "}
          <Link className="text-primary font-medium underline-offset-4 hover:underline" href="/home">
            Jogar como visitante
          </Link>
        </p>
      </main>
    </div>
  );
}
