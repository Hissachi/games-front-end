import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { GetUsersId200 } from "@/http/generated/api.schemas";
import { api } from "@/lib/api";

export const getToken = async () => {
	return (await cookies()).get("token")?.value;
};

export const isAuthenticated = async () => {
	return !!(await getToken());
};

export const auth = async () => {
	const token = await getToken();

	if (!token) {
		redirect("/");
	}

	try {
		const response = await api.get("api/auth/me").json<GetUsersId200>();

		const user = response;

		return user;
	} catch (error) {
		console.error(error);
	}

	redirect("/api/auth/sign-out");
};
