import { defineConfig } from "orval";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const schemasPath = path.join(process.cwd(), "src/http/generated/schemas");

const applyZodErrorImport = `import { applyZodErrorMap } from "@/utils/apply-zod-error-map";\n\napplyZodErrorMap();\n\n`;

const processFiles = (dir: string) => {
	fs.readdirSync(dir).forEach((file) => {
		const fullPath = path.join(dir, file);

		if (fs.lstatSync(fullPath).isDirectory()) {
			processFiles(fullPath);
		} else if (file.endsWith(".zod.ts")) {
			const content = fs.readFileSync(fullPath, "utf8");

			if (!content.includes("applyZodErrorMap")) {
				fs.writeFileSync(fullPath, applyZodErrorImport + content, "utf8");
				console.log(`✅ Atualizado: ${fullPath}`);
			}
		}
	});
};

export default defineConfig({
	client: {
		input: {
			target: 'http://localhost:3333/docs/json',
		},
		output: {
			mode: "split",
			target: "./src/http/generated/api.ts",
			client: "react-query",
			httpClient: "axios",
			clean: true,
			override: {
				header: () =>
					`/* eslint-disable */\n/* tslint:disable */\n// @ts-nocheck\n\n`,
				fetch: {
					includeHttpResponseReturnType: false,
				},
				mutator: {
					path: "./src/http/client.ts",
					name: "http",
				},
			},
		},
		hooks: {
			afterAllFilesWrite: () => {
				console.log("🔄 Aplicando ajustes nos arquivos Zod...");
				processFiles(schemasPath);
			},
		},
	},
	clientZod: {
		input: {
			target: 'http://localhost:3333/docs/json',
		},
		output: {
			mode: "tags-split",
			client: "zod",
			target: "./src/http/generated/schemas",
			fileExtension: ".zod.ts",
			override: {
				zod: {
					generate: {
						param: true,
						query: true,
						header: true,
						body: true,
						response: false,
					},
					generateEachHttpStatus: true,
				},
			},
		},
		hooks: {
			afterAllFilesWrite: () => {
				console.log("🔄 Aplicando ajustes nos arquivos Zod...");
				processFiles(schemasPath);
			},
		},
	},
});
