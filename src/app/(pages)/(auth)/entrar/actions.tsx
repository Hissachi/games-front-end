"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { HTTPError } from "ky";

import { api } from "@/lib/api";
import { postLoginBody } from "@/http/generated/schemas/auth/auth.zod";

interface SignInResponse {
  token: string;
}

export const signInWithEmailAndPassword = async (
  _: unknown,
  formData: FormData
) => {
  // Validação dos dados do formulário
  const result = postLoginBody.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      success: false,
      message: null,
      errors: result.error.flatten().fieldErrors
    };
  }

  const { email, password } = result.data;

  try {
    // Chamada à API
    const { token } = await api
      .post("sessions/password", {
        json: { email, password },
      })
      .json<SignInResponse>();

    // Armazenar token nos cookies
    (await cookies()).set("token", token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      sameSite: "lax",
    });

    return { success: true };
  } catch (error) {
    if (error instanceof HTTPError) {
      try {
        const { message } = await error.response.json();
        return { success: false, message, errors: null };
      } catch {
        return { success: false, message: "Erro na comunicação com o servidor", errors: null };
      }
    }
    return { success: false, message: "Erro desconhecido", errors: null };
  }
};