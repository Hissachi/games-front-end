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
    redirect("/entrar"); // Redireciona para a página de login
  }

  try {
    const response = await api.get("http://localhost:3333/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).json<GetUsersId200>();

    return response;
  } catch (error) {
    console.error("Falha na autenticação:", error);
    // Limpa o token inválido e redireciona
    (await cookies()).delete("token");
    redirect("/entrar");
  }
};

// Função adicional para logout
export const signOut = async () => {
  (await cookies()).delete("token");
  redirect("/entrar");
};