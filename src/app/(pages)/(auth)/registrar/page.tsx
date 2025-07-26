import { SignUpForm } from "@/components/auth/sign-up-form";

const Page = () => {
	return (
		<div className="flex flex-col items-center justify-center col-span-1 p-4 size-full space-y-6">
			<div className="flex flex-col items-center space-y-10 max-w-[440px]">

				<div className="flex flex-col items-center justify-center space-y-1.5 text-center">
					<strong className="text-2xl">Crie sua conta na plataforma</strong>
					<span className="text-muted-foreground text-sm">
						Preencha os campos abaixo para criar sua conta
					</span>
				</div>
			</div>

			<SignUpForm />
		</div>
	);
};

export default Page;