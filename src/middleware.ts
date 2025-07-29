import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/entrar",
  "/registrar",
  "/recuperar-senha",
  "/redefinir-senha",
  "/pricing"
];

const PROTECTED_ROUTES = [
  "/dashboard",
  "/dashboard/" // Adicione outras rotas protegidas aqui
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // 1. Verificar se é uma rota protegida
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // 2. Verificar se é uma rota pública
  const isPublicRoute = PUBLIC_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // 3. Rota raiz - redireciona conforme autenticação
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // 4. Rota protegida sem token - redireciona para login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/entrar", request.url));
  }

  // 5. Rota de login/registro com token - redireciona para dashboard
  if ((pathname === "/entrar" || pathname === "/registrar") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 6. Validação do token JWT para rotas protegidas
  if (isProtectedRoute && token) {
    try {
      const { exp } = jwtDecode(token);
      const isTokenExpired = exp && exp * 1000 < Date.now();

      if (isTokenExpired) {
        const response = NextResponse.redirect(new URL("/entrar", request.url));
        response.cookies.delete("token");
        return response;
      }
    } catch (error) {
      const response = NextResponse.redirect(new URL("/entrar", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};