"use client";

import Link from "next/link";

import { Button } from "../ui/button";
import { HyperText } from "../ui/hyper-text";

export function ProtectedRouteComponent() {
	return (
		<div className="h-[calc(100vh-64px-48px)] w-full flex items-center justify-center">
			<div className="flex flex-col items-start">
				<HyperText className="text-4xl">Ops...</HyperText>
				<HyperText className="text-xl">
					Parece que você se perdeu no meio do caminho
				</HyperText>

				<div className="flex flex-col space-y-4 items-start mt-6">
					<span className="text-muted-foreground">
						Você não tem permissão para estar aqui.
					</span>

					<Button>
						<Link href="/">Voltar para a página inicial</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
