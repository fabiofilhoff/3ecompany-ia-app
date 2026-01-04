'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular login
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular cadastro
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#050505] via-[#1a0a2e] to-[#4C1D95]">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-[#7C3AED] via-[#9333EA] to-[#4C1D95] mb-4 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 group">
            {/* Efeito de brilho */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Ícone de raio */}
            <Zap className="absolute top-2 right-2 w-4 h-4 text-yellow-300 opacity-80" fill="currentColor" />
            
            {/* Texto 3E */}
            <span className="text-5xl font-black text-white tracking-tight relative z-10">
              3E
            </span>
            
            {/* Borda brilhante */}
            <div className="absolute inset-0 rounded-3xl border-2 border-white/20"></div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">3E Company</h1>
          <p className="text-gray-300">Acompanhe suas Campanhas de Tráfego Pago</p>
        </div>

        {/* Card de Login/Cadastro */}
        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Bem-vindo</CardTitle>
            <CardDescription className="text-center">
              Acesse sua conta ou crie uma nova
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Entrar</TabsTrigger>
                <TabsTrigger value="register">Cadastrar</TabsTrigger>
              </TabsList>

              {/* Tab de Login */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      className="border-gray-300 focus:border-[#7C3AED] focus:ring-[#7C3AED]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="border-gray-300 focus:border-[#7C3AED] focus:ring-[#7C3AED]"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-gray-600">Lembrar-me</span>
                    </label>
                    <a href="#" className="text-[#7C3AED] hover:text-[#4C1D95] font-medium">
                      Esqueci a senha
                    </a>
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#7C3AED] hover:bg-[#4C1D95] text-white font-semibold py-6 text-base transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </TabsContent>

              {/* Tab de Cadastro */}
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome"
                      required
                      className="border-gray-300 focus:border-[#7C3AED] focus:ring-[#7C3AED]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">E-mail</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      className="border-gray-300 focus:border-[#7C3AED] focus:ring-[#7C3AED]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Nome da empresa"
                      className="border-gray-300 focus:border-[#7C3AED] focus:ring-[#7C3AED]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ (opcional)</Label>
                    <Input
                      id="cnpj"
                      type="text"
                      placeholder="00.000.000/0000-00"
                      className="border-gray-300 focus:border-[#7C3AED] focus:ring-[#7C3AED]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="border-gray-300 focus:border-[#7C3AED] focus:ring-[#7C3AED]"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#7C3AED] hover:bg-[#4C1D95] text-white font-semibold py-6 text-base transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? 'Criando conta...' : 'Criar conta'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-gray-300 text-sm mt-6">
          © 2025 3E Company. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
