
import { SignInForm } from "@/components/auth/sign-in-form";

const Page = () => {
	return (
		<div className="flex flex-col items-center justify-center col-span-1 p-6 size-full space-y-6">
			<div className="flex flex-col items-center space-y-10 max-w-[440px]">
				<div className="flex flex-col items-center justify-center space-y-1.5 text-center">
					<strong className="text-2xl">👋 Bem-vindo de volta</strong>
					<span className="text-muted-foreground text-sm">
						Entre com seu e-mail e senha para prosseguir
					</span>
				</div>
			</div>
			<SignInForm />
		</div>
	);
};

export default Page;
