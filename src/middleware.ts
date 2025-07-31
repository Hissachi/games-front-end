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
  "/dashboard/"
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Verificação de rotas
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  const isPublicRoute = PUBLIC_ROUTES.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // Redirecionamentos
  if (pathname === "/") {
    return token 
      ? NextResponse.redirect(new URL("/dashboard", request.url))
      : NextResponse.next();
  }

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/entrar", request.url));
  }

  if ((pathname === "/entrar" || pathname === "/registrar") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Validação do token
  if (isProtectedRoute && token) {
    try {
      const { exp } = jwtDecode(token);
      if (exp && exp * 1000 < Date.now()) {
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