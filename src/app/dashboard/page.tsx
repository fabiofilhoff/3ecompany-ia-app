'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  DollarSign,
  Filter,
  Bell,
  User,
  Home,
  MessageSquare,
  Layers
} from 'lucide-react';
import { mockClient, mockCampaigns, mockDashboardStats } from '@/lib/mock-data';
import { CampaignCard } from '@/components/custom/campaign-card';
import type { CampaignStatus, CampaignChannel } from '@/lib/types';
import Link from 'next/link';

export default function DashboardPage() {
  const [statusFilter, setStatusFilter] = useState<CampaignStatus | 'all'>('all');
  const [channelFilter, setChannelFilter] = useState<CampaignChannel | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'home' | 'campaigns' | 'results' | 'messages' | 'profile'>('home');

  // Filtrar campanhas
  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    const matchesChannel = channelFilter === 'all' || campaign.channel === channelFilter;
    return matchesStatus && matchesChannel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#050505] to-[#4C1D95] text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#7C3AED] flex items-center justify-center font-bold text-lg">
              3E
            </div>
            <div>
              <h1 className="text-xl font-bold">Olá, {mockClient.name}!</h1>
              <p className="text-sm text-gray-300">{mockClient.company}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Campanhas Ativas</CardTitle>
                <Target className="w-5 h-5 text-[#7C3AED]" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#050505]">{mockDashboardStats.activeCampaigns}</p>
              <p className="text-xs text-gray-500 mt-1">Em execução agora</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Em Construção</CardTitle>
                <Layers className="w-5 h-5 text-[#7C3AED]" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#050505]">{mockDashboardStats.constructionCampaigns}</p>
              <p className="text-xs text-gray-500 mt-1">Sendo preparadas</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Investimento</CardTitle>
                <DollarSign className="w-5 h-5 text-[#7C3AED]" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#050505]">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(mockDashboardStats.monthlyInvestment)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Total do mês</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Resultados</CardTitle>
                <TrendingUp className="w-5 h-5 text-[#7C3AED]" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-[#050505]">{mockDashboardStats.monthlyResults}</p>
              <p className="text-xs text-gray-500 mt-1">Leads/vendas no mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/board">
            <Card className="bg-gradient-to-br from-[#7C3AED] to-[#4C1D95] text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Board de Processos</h3>
                  <p className="text-sm text-white/80">Visualize o fluxo de trabalho</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Resultados Gerais</h3>
                <p className="text-sm text-white/80">Visão macro de performance</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#7C3AED]" />
                <CardTitle className="text-lg">Minhas Campanhas</CardTitle>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as CampaignStatus | 'all')}>
                  <SelectTrigger className="w-full sm:w-[180px] border-gray-300 focus:border-[#7C3AED] focus:ring-[#7C3AED]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="briefing">Em briefing</SelectItem>
                    <SelectItem value="construction">Em construção</SelectItem>
                    <SelectItem value="approval">Em aprovação</SelectItem>
                    <SelectItem value="active">Ativa</SelectItem>
                    <SelectItem value="optimization">Em otimização</SelectItem>
                    <SelectItem value="paused">Pausada</SelectItem>
                    <SelectItem value="finished">Finalizada</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={channelFilter} onValueChange={(value) => setChannelFilter(value as CampaignChannel | 'all')}>
                  <SelectTrigger className="w-full sm:w-[180px] border-gray-300 focus:border-[#7C3AED] focus:ring-[#7C3AED]">
                    <SelectValue placeholder="Canal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os canais</SelectItem>
                    <SelectItem value="Meta Ads">Meta Ads</SelectItem>
                    <SelectItem value="Google Ads">Google Ads</SelectItem>
                    <SelectItem value="TikTok Ads">TikTok Ads</SelectItem>
                    <SelectItem value="LinkedIn Ads">LinkedIn Ads</SelectItem>
                    <SelectItem value="YouTube Ads">YouTube Ads</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredCampaigns.length === 0 ? (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">Nenhuma campanha encontrada</p>
                <p className="text-gray-400 text-sm mt-2">Tente ajustar os filtros</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden">
        <div className="grid grid-cols-5 h-16">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'home' ? 'text-[#7C3AED]' : 'text-gray-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Início</span>
          </button>
          <Link href="/board" className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-[#7C3AED] transition-colors">
            <Layers className="w-5 h-5" />
            <span className="text-xs font-medium">Campanhas</span>
          </Link>
          <button
            onClick={() => setActiveTab('results')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'results' ? 'text-[#7C3AED]' : 'text-gray-500'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-medium">Resultados</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
              activeTab === 'messages' ? 'text-[#7C3AED]' : 'text-gray-500'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs font-medium">Mensagens</span>
            <span className="absolute top-2 right-6 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'profile' ? 'text-[#7C3AED]' : 'text-gray-500'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
