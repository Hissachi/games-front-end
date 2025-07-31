"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { Check, Eye, EyeOff, X } from "lucide-react";
import * as React from "react";
import { FieldValues, Path } from "react-hook-form";

const passwordInputVariants = cva(
	"flex h-10 w-full rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10",
	{
		variants: {
			variant: {
				default: "",
				outline: "border-2",
				filled: "bg-muted",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-8 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

interface PasswordStrengthProps<TFieldValues extends FieldValues>
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
		VariantProps<typeof passwordInputVariants> {
	name: Path<TFieldValues>;
	label?: string;
	isLoading?: boolean;
	isStrengthVisible?: boolean;
}

const PasswordStrength = React.forwardRef<
	HTMLInputElement,
	PasswordStrengthProps<FieldValues>
>(
	(
		{
			name,
			label = "Password",
			className,
			variant,
			size,
			isLoading = false,
			value,
			onChange,
			isStrengthVisible = false,
			...props
		},
		ref,
	) => {
		const id = React.useId();
		const [password, setPassword] = React.useState<string>(
			value ? String(value) : "",
		);
		const [isVisible, setIsVisible] = React.useState<boolean>(false);

		const toggleVisibility = () => setIsVisible((prevState) => !prevState);

		const checkStrength = (pass: string) => {
			const requirements = [
				{ regex: /.{6,}/, text: "Pelo menos 6 caracteres" },
				{ regex: /[0-9]/, text: "Contém números" },
				{ regex: /[a-z]/, text: "Contém letras minúsculas" },
				{ regex: /[A-Z]/, text: "Contém letras maiúsculas" },
				{
					regex: /[!@#$%^&*(),.?":{}|<>]/,
					text: "Contém caracteres especiais",
				},
			];

			return requirements.map((req) => ({
				met: req.regex.test(pass),
				text: req.text,
			}));
		};

		const strength = checkStrength(password);

		const strengthScore = React.useMemo(() => {
			return strength.filter((req) => req.met).length;
		}, [strength]);

		const getStrengthColor = (score: number) => {
			if (score === 0) return "bg-border";
			if (score <= 1) return "bg-red-500";
			if (score <= 2) return "bg-orange-500";
			if (score === 3) return "bg-amber-500";
			return "bg-emerald-500";
		};

		const getStrengthText = (score: number) => {
			if (score === 0) return "Insira a senha";
			if (score <= 2) return "Senha fraca";
			if (score === 3) return "Senha média";
			return "Senha forte";
		};

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const pass = e.target.value;
			setPassword(pass);
			if (onChange) onChange(e);
		};

		return (
			<div className="space-y-2">
				<div className="relative">
					<input
						id={id}
						type={isVisible ? "text" : "password"}
						value={password}
						onChange={handleChange}
						className={passwordInputVariants({ variant, size })}
						aria-invalid={strengthScore < 4}
						aria-describedby={`${id}-description`}
						ref={ref}
						name={name}
						{...props}
					/>
					<button
						className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
						type="button"
						onClick={toggleVisibility}
						aria-label={isVisible ? "Hide password" : "Show password"}
						aria-pressed={isVisible}
						aria-controls="password"
					>
						{isVisible ? (
							<EyeOff size={16} strokeWidth={2} aria-hidden="true" />
						) : (
							<Eye size={16} strokeWidth={2} aria-hidden="true" />
						)}
					</button>
				</div>
				{/* Password strength indicator */}
				{isStrengthVisible && (
					<>
						<div
							className="mb-4 mt-3 h-1 w-full overflow-hidden rounded-full bg-border"
							role="progressbar"
							aria-valuenow={strengthScore}
							aria-valuemin={0}
							aria-valuemax={4}
							aria-label="Password strength"
						>
							<div
								className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
								style={{ width: `${(strengthScore / 5) * 100}%` }}
							></div>
						</div>

						{/* Password strength description */}
						{/* <p
					id={`${id}-description`}
					className="mb-2 text-sm font-medium text-foreground"
				>
					{getStrengthText(strengthScore)}.{" "}
					{strengthScore < 4 &&
						"Adicione mais caracteres para aumentar a segurança."}
				</p> */}

						{/* Password requirements list */}
						{/* <ul className="space-y-1.5" aria-label="Password requirements">
							{strength.map((req, index) => (
								<li key={index} className="flex items-center gap-2">
									{req.met ? (
										<Check
											size={16}
											className="text-emerald-500"
											aria-hidden="true"
										/>
									) : (
										<X
											size={16}
											className="text-muted-foreground/80"
											aria-hidden="true"
										/>
									)}
									<span
										className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
									>
										{req.text}
										<span className="sr-only">
											{req.met
												? " - Requirement met"
												: " - Requirement not met"}
										</span>
									</span>
								</li>
							))}
						</ul> */}
					</>
				)}
			</div>
		);
	},
);

PasswordStrength.displayName = "PasswordStrength";

export { PasswordStrength, passwordInputVariants };
