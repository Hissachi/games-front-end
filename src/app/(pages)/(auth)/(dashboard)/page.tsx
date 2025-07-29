// app/(pages)/(auth)/(dashboard)/page.tsx
'use client';

import { Dashboard } from '@/components/auth/dashboard';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Verifica se o token existe
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Você precisa estar logado para acessar esta página');
      router.push('/entrar');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      <Dashboard />
    </div>
  );
}