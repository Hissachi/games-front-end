import type { CookiesFn } from "cookies-next";
import ky from "ky";

import { getToken } from "@/auth/auth";

export const api = ky.create({
	prefixUrl: process.env.API_URL,
	hooks: {
		beforeRequest: [
			async (request) => {
				let cookieStore: CookiesFn | undefined;

				if (typeof window === "undefined") {
					const { cookies: serverCookies } = await import("next/headers");
					cookieStore = serverCookies;
				}

				const token = await getToken();

				if (token) {
					request.headers.set("Authorization", `Bearer ${token}`);
				}
			},
		],
	},
});
