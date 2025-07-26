import { SignInForm } from "@/components/auth/sign-in-form";
import { Separator } from "@/components/ui/separator";

const Page = () => {
	return (
		<div className="flex flex-col items-center justify-center col-span-1 p-6 size-full space-y-6">
			<div className="flex flex-col items-center space-y-10 max-w-[440px]">
				<div className="h-20">
					{/* <BrandLogo /> */}
				</div>

				<div className="flex flex-col items-center justify-center space-y-1.5 text-center">
					<strong className="text-2xl">
                        Bem-vindo ao
                        <strong className="text-2xl text-destructive p-2">
                            curso
                        </strong>
                    </strong>
					<span className="text-muted-foreground text-sm">
						Faça login para continuar ou crie uma conta.
					</span>
				</div>
			</div>
            <div className="flex items-center justify-center w-full max-w-[440px]">
                <Separator />
            </div>
            

			<SignInForm />
		</div>
	);
};

export default Page;
