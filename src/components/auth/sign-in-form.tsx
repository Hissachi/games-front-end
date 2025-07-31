"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordStrength } from "@/components/ui/password-strength";

import { signInWithEmailAndPassword } from "@/app/(pages)/(auth)/entrar/actions";
import { PostLoginBody } from "@/http/generated/api.schemas";
import { postLoginBody } from "@/http/generated/schemas/auth/auth.zod";

export function SignInForm() {
  const [rememberMe, setRememberMe] = React.useState(false);
  const [state, formAction] = useFormState(signInWithEmailAndPassword, {
    success: false,
    message: null,
    errors: null,
  });

  const form = useForm<PostLoginBody>({
    resolver: zodResolver(postLoginBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { pending } = useFormStatus();

  React.useEffect(() => {
    if (state.message) {
      toast.error(state.message);
    }
  }, [state.message]);

  const onSubmit = (data: PostLoginBody) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formAction(formData);
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="w-full max-w-[440px] space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input 
                  placeholder="E-mail" 
                  autoFocus 
                  {...field} 
                  disabled={pending}
                />
              </FormControl>
              {state.errors?.email && (
                <FormMessage>{state.errors.email[0]}</FormMessage>
              )}
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <PasswordStrength 
                    placeholder="Senha" 
                    {...field} 
                    disabled={pending}
                  />
                </FormControl>
                {state.errors?.password && (
                  <FormMessage>{state.errors.password[0]}</FormMessage>
                )}
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2.5">
              <Checkbox
                id="rememberPassword"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
                disabled={pending}
              />
              <label
                htmlFor="rememberPassword"
                className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lembrar senha
              </label>
            </div>

            <Button size={"sm"} variant={"link"} className="px-0" disabled={pending}>
              <Link href={"/recuperar-senha"}>Esqueci minha senha</Link>
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="w-full"
        >
          {pending ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <div>
        <span className="text-muted-foreground">Não tem uma conta?&nbsp;</span>
        <Link href={"/registrar"}>
          <Button variant={"link"} className="px-0 text-base" disabled={pending}>
            Cadastre-se
          </Button>
        </Link>
      </div>
    </Form>
  );
}