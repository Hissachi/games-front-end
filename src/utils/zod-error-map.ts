import { ZodErrorMap, ZodIssueCode, ZodIssue } from "zod";

const typeTranslations: { [key: string]: string } = {
	string: "texto",
	number: "número",
	bigint: "número grande",
	boolean: "booleano",
	symbol: "símbolo",
	undefined: "indefinido",
	object: "objeto",
	function: "função",
	map: "mapa",
	nan: "NaN",
	integer: "inteiro",
	float: "decimal",
	date: "data",
	null: "nulo",
	array: "array",
	unknown: "desconhecido",
	promise: "promessa",
	void: "vazio",
	never: "nunca",
	set: "conjunto",
};

export const customErrorMap: ZodErrorMap = (issue) => {
	switch (issue.code) {
		case ZodIssueCode.invalid_type:
			return {
				message: typeTranslations[issue.expected]
					? `O campo precisa ser do tipo ${typeTranslations[issue.expected]}.`
					: "O campo contém um valor inválido.",
			};
		case ZodIssueCode.too_small:
			return {
				message: `O campo precisa ter no mínimo ${issue.minimum} caracteres.`,
			};
		case ZodIssueCode.too_big:
			return {
				message: `O campo pode ter no máximo ${issue.maximum} caracteres.`,
			};
		case ZodIssueCode.invalid_format:
			return {
				message: `O campo contém um valor inválido.`,
			};
		case ZodIssueCode.invalid_element:
			return {
				message: `O valor inserido para não é permitido.`,
			};
		default:
			return { message: "Erro de validação desconhecido." };
	}
};
