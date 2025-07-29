"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postRegisterBody } from "@/http/generated/schemas/auth/auth.zod";
import { PostRegisterBody } from "@/http/generated/api.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePostRegister } from "@/http/generated/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export function SignUpForm() {
	const router = useRouter();
	const form = useForm<PostRegisterBody>({
		resolver: zodResolver(postRegisterBody),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const {
		mutateAsync: createAccount,
		isPending: isPendingCreateAccount,
		isSuccess: isSuccessCreateAccount,
	} = usePostRegister();

	// const {
	// 	mutateAsync: login,
	// 	isPending: isPendingLogin,
	// 	isSuccess: isSuccessLogin,
	// } = usePostSessionsPassword();

	const onSubmit = async (data: PostRegisterBody) => {
		try {
			const response = await createAccount({ data });

			toast.success("Sucesso!", {
				description: response?.id || "Conta criada com sucesso!",
			});
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error(error);
				toast.error("Erro ao criar conta", {
					description: (error.response?.data as { message: string })?.message,
				});
			} else {
				console.error("Unexpected error:", error);
				toast.error("Erro inesperado ao criar conta");
			}
		}
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full max-w-[440px] space-y-6"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input placeholder="Nome completo" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input placeholder="E-mail" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Senha</FormLabel>
								<FormControl>
									<Input
										// isStrengthVisible={true}
                    type="password"
										{...field}
										placeholder="Senha"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* <FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Senha</FormLabel>
										<FormControl>
											<Input placeholder="Senha" type="password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/> */}

					<Button
						type="submit"
						disabled={isPendingCreateAccount}
						// isLoading={isPendingCreateAccount}
						className="w-full"
					>
						Registrar-se
					</Button>

					<div className="flex items-center space-x-2.5 w-full text-muted-foreground">
						<Separator className="flex-1" />
						<span className="text-xs">ou entrar com</span>
						<Separator className="flex-1" />
					</div>
				</form>

				{/* <GoogleProvider /> */}
			</Form>

			<span className="text-muted-foreground text-sm">
				Possui uma conta?&nbsp;
				<Button size={"sm"} variant={"link"} className="px-0">
					<Link href="/entrar">Entrar</Link>
				</Button>
			</span>
		</>
	);
}
