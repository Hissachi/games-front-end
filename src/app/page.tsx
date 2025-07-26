import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Navbar */}
      <nav className="flex justify-end gap-4 p-4">
        <Button asChild>
          <a href="entrar">Entrar</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="registrar">Registrar</a>
        </Button>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto flex flex-col items-center justify-center gap-8 py-12 md:py-24">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Curso de <span className="text-primary">Next.js</span>
          </h1>
          
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Aprenda a construir aplicações web modernas com Next.js, React e TypeScript.
          </p>
          
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <a href="#features">Começar Agora</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#about">Saiba Mais</a>
            </Button>
          </div>
        </div>

        <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg border shadow-xl">
          {/* <Image
            src="/nextjs-logo.svg"
            alt="Next.js Logo"
            fill
            className="object-cover"
          /> */}
        </div>
      </main>

      {/* Features Section */}
      <section className="container mx-auto py-12" id="features">
        <h2 className="mb-12 text-3xl font-bold text-center">O que você vai aprender</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Fundamentos do Next.js</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Domine roteamento, SSR, SSG e API Routes.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Autenticação</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Implemente sistemas de login seguros com NextAuth.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Deploy</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Aprenda a publicar sua aplicação na Vercel e outros provedores.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto py-8 text-center text-sm text-muted-foreground">
        <p>Desenvolvido com ❤️ por <a href="#" className="font-medium text-primary hover:underline">Seu Nome</a></p>
        <p className="mt-2">© {new Date().getFullYear()} Curso Next.js. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}