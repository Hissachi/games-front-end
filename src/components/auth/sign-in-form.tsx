"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

import { sighInWithEmailAndPassword } from "@/app/(pages)/(auth)/(entrar)/actions";
import { /* LoginEmailAndPasswordBody */ PostLoginBody } from "@/http/generated/api.schemas";
import { postLoginBody } from "@/http/generated/schemas/auth/auth.zod";

export function SignInForm() {
	const [rememberMe, setRememberMe] = React.useState(false);

	const [{ success, message, errors }, formAction, isPending] =
		React.useActionState(sighInWithEmailAndPassword, {
			success: false,
			message: null,
			errors: null,
		});

	React.useEffect(() => {
		if (message) {
			toast.error(message);
		}
	}, [message, success]);

	const form = useForm<PostLoginBody>({
		resolver: zodResolver(postLoginBody),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<Form {...form}>
			<form
				action={formAction}
				className="w-full max-w-[440px] space-y-6 border"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input placeholder="E-mail" autoFocus {...field} />
							</FormControl>
							{errors?.email && <FormMessage>{errors.email[0]}</FormMessage>}
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
									<Input {...field} placeholder="Senha" />
								</FormControl>
								{errors?.password && (
									<FormMessage>{errors.password[0]}</FormMessage>
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
							/>
							<label
								htmlFor="terms"
								className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Lembrar senha
							</label>
						</div>

						<Button size={"sm"} variant={"link"} className="px-0">
							<Link href={"/recuperar-senha"}>Esqueci minha senha</Link>
						</Button>
					</div>
				</div>

				<Button
					type="submit"
					disabled={isPending}
					className="w-full"
				>
					{isPending ? "Loading..." : "Entrar"}
				</Button>
			</form>

			<div>
				<span className="text-muted-foreground">Não tem uma conta?&nbsp;</span>
				<Link href={"/registrar"}>
					<Button variant={"link"} className="px-0 text-base">
						Cadastre-se
					</Button>
				</Link>
			</div>
		</Form>
	);
}
