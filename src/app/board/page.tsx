'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft,
  Bell,
  Layers,
  TrendingUp,
  DollarSign,
  Calendar
} from 'lucide-react';
import { mockCampaigns, getStatusLabel, getStatusColor } from '@/lib/mock-data';
import type { ProcessStage, Campaign } from '@/lib/types';
import Link from 'next/link';

// Definição das colunas do Kanban
const boardColumns: { stage: ProcessStage; title: string; color: string }[] = [
  { stage: 'briefing_received', title: 'Briefing Recebido', color: 'border-blue-500' },
  { stage: 'research', title: 'Pesquisa e Planejamento', color: 'border-cyan-500' },
  { stage: 'strategy', title: 'Estratégia Definida', color: 'border-indigo-500' },
  { stage: 'creatives', title: 'Criação de Criativos', color: 'border-purple-500' },
  { stage: 'configuration', title: 'Configuração de Campanha', color: 'border-pink-500' },
  { stage: 'client_review', title: 'Em Revisão com Cliente', color: 'border-orange-500' },
  { stage: 'active', title: 'Campanha Ativa', color: 'border-green-500' },
  { stage: 'optimization', title: 'Otimização em Andamento', color: 'border-emerald-500' }
];

export default function BoardPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Agrupar campanhas por estágio
  const campaignsByStage = boardColumns.reduce((acc, column) => {
    acc[column.stage] = mockCampaigns.filter(c => c.currentStage === column.stage);
    return acc;
  }, {} as Record<ProcessStage, Campaign[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-6">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#050505] to-[#4C1D95] text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-[#7C3AED]" />
              <h1 className="text-xl font-bold">Board de Processos</h1>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </header>

      {/* Kanban Board */}
      <main className="max-w-[1600px] mx-auto p-4">
        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Acompanhe o fluxo de trabalho de todas as suas campanhas em tempo real
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {boardColumns.map((column) => {
            const campaigns = campaignsByStage[column.stage] || [];
            
            return (
              <div 
                key={column.stage} 
                className="flex-shrink-0 w-80 snap-start"
              >
                <Card className={`bg-white border-t-4 ${column.color} shadow-lg h-full`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-bold text-gray-800">
                        {column.title}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        {campaigns.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {campaigns.length === 0 ? (
                      <div className="text-center py-8 text-gray-400 text-sm">
                        Nenhuma campanha nesta etapa
                      </div>
                    ) : (
                      campaigns.map((campaign) => (
                        <Link 
                          key={campaign.id} 
                          href={`/campaign/${campaign.id}`}
                        >
                          <Card className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
                            <CardContent className="p-4 space-y-3">
                              {/* Nome da campanha */}
                              <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">
                                {campaign.name}
                              </h3>

                              {/* Status Badge */}
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(campaign.status)}`}></div>
                                <span className="text-xs text-gray-600 font-medium">
                                  {getStatusLabel(campaign.status)}
                                </span>
                              </div>

                              {/* Canal */}
                              <div className="flex items-center gap-2">
                                <Layers className="w-4 h-4 text-[#7C3AED]" />
                                <span className="text-xs text-gray-700 font-medium">
                                  {campaign.channel}
                                </span>
                              </div>

                              {/* Orçamento */}
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <span className="text-xs text-gray-700">
                                  R$ {campaign.dailyBudget}/dia
                                </span>
                              </div>

                              {/* Progress Bar */}
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-gray-600">Progresso</span>
                                  <span className="font-bold text-[#7C3AED]">{campaign.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                  <div 
                                    className="bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] h-full rounded-full transition-all duration-500"
                                    style={{ width: `${campaign.progress}%` }}
                                  ></div>
                                </div>
                              </div>

                              {/* Data de atualização */}
                              <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t border-gray-200">
                                <Calendar className="w-3 h-3" />
                                <span>
                                  Atualizado {new Date(campaign.lastUpdate).toLocaleDateString('pt-BR')}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Legenda */}
        <Card className="mt-6 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-gray-800">Legenda de Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-700">Em briefing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs text-gray-700">Em construção</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-xs text-gray-700">Em aprovação</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-700">Ativa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span className="text-xs text-gray-700">Em otimização</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <span className="text-xs text-gray-700">Pausada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                <span className="text-xs text-gray-700">Finalizada</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
