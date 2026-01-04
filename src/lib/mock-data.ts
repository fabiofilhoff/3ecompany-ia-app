// Dados mockados para demonstração do sistema 3E Company

import type { 
  User, 
  Campaign, 
  DashboardStats, 
  Notification,
  CampaignMetrics,
  ProcessStep,
  Message,
  MediaFile
} from './types';

// Usuário cliente de exemplo
export const mockClient: User = {
  id: 'client-1',
  name: 'João Silva',
  email: 'joao@empresa.com.br',
  role: 'client',
  company: 'Empresa Exemplo LTDA',
  cnpj: '12.345.678/0001-90',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joao'
};

// Usuário admin de exemplo
export const mockAdmin: User = {
  id: 'admin-1',
  name: 'Maria Santos',
  email: 'maria@3ecompany.com.br',
  role: 'admin',
  company: '3E Company',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria'
};

// Campanhas mockadas
export const mockCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'Campanha Black Friday 2024',
    clientId: 'client-1',
    status: 'active',
    channel: 'Meta Ads',
    objective: 'Vendas',
    dailyBudget: 500,
    monthlyBudget: 15000,
    targetAudience: 'Mulheres 25-45 anos, interesse em moda',
    startDate: '2024-11-01',
    progress: 85,
    currentStage: 'optimization',
    manager: 'Carlos Mendes',
    lastUpdate: '2024-01-15T14:30:00'
  },
  {
    id: 'camp-2',
    name: 'Geração de Leads - Curso Online',
    clientId: 'client-1',
    status: 'construction',
    channel: 'Google Ads',
    objective: 'Leads',
    dailyBudget: 300,
    monthlyBudget: 9000,
    targetAudience: 'Profissionais 30-50 anos, interesse em educação',
    startDate: '2024-01-20',
    progress: 45,
    currentStage: 'creatives',
    manager: 'Ana Paula',
    lastUpdate: '2024-01-15T10:15:00'
  },
  {
    id: 'camp-3',
    name: 'Tráfego para Blog - SEO',
    clientId: 'client-1',
    status: 'approval',
    channel: 'Google Ads',
    objective: 'Tráfego',
    dailyBudget: 200,
    monthlyBudget: 6000,
    targetAudience: 'Público geral interessado em tecnologia',
    startDate: '2024-01-25',
    progress: 70,
    currentStage: 'client_review',
    manager: 'Carlos Mendes',
    lastUpdate: '2024-01-14T16:45:00'
  },
  {
    id: 'camp-4',
    name: 'Engajamento TikTok - Produto Novo',
    clientId: 'client-1',
    status: 'optimization',
    channel: 'TikTok Ads',
    objective: 'Engajamento',
    dailyBudget: 400,
    monthlyBudget: 12000,
    targetAudience: 'Jovens 18-30 anos, interesse em inovação',
    startDate: '2024-01-05',
    progress: 90,
    currentStage: 'optimization',
    manager: 'Ana Paula',
    lastUpdate: '2024-01-15T09:20:00'
  },
  {
    id: 'camp-5',
    name: 'Remarketing - Carrinho Abandonado',
    clientId: 'client-1',
    status: 'paused',
    channel: 'Meta Ads',
    objective: 'Conversões',
    dailyBudget: 150,
    monthlyBudget: 4500,
    targetAudience: 'Visitantes do site que abandonaram carrinho',
    startDate: '2023-12-10',
    endDate: '2024-01-10',
    progress: 100,
    currentStage: 'active',
    manager: 'Carlos Mendes',
    lastUpdate: '2024-01-10T18:00:00'
  }
];

// Estatísticas do dashboard
export const mockDashboardStats: DashboardStats = {
  activeCampaigns: 2,
  constructionCampaigns: 1,
  monthlyInvestment: 46500,
  monthlyResults: 1247 // leads/vendas
};

// Notificações mockadas
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'client-1',
    title: 'Campanha aprovada',
    message: 'Sua campanha "Black Friday 2024" mudou de status para "Ativa".',
    read: false,
    timestamp: '2024-01-15T14:30:00',
    campaignId: 'camp-1'
  },
  {
    id: 'notif-2',
    userId: 'client-1',
    title: 'Novos resultados disponíveis',
    message: 'Foram adicionados novos resultados ao relatório da campanha "Geração de Leads".',
    read: false,
    timestamp: '2024-01-15T10:15:00',
    campaignId: 'camp-2'
  },
  {
    id: 'notif-3',
    userId: 'client-1',
    title: 'Resposta da 3E Company',
    message: 'A 3E Company respondeu sua sugestão na campanha "Tráfego para Blog".',
    read: true,
    timestamp: '2024-01-14T16:45:00',
    campaignId: 'camp-3'
  }
];

// Métricas de campanha mockadas
export const mockCampaignMetrics: Record<string, CampaignMetrics> = {
  'camp-1': {
    campaignId: 'camp-1',
    period: {
      start: '2024-01-01',
      end: '2024-01-15'
    },
    investment: 7500,
    dailyAverage: 500,
    leads: 0,
    sales: 342,
    cpl: 0,
    cpa: 21.93,
    ctr: 3.2,
    cpm: 45.50,
    roas: 4.8
  },
  'camp-2': {
    campaignId: 'camp-2',
    period: {
      start: '2024-01-01',
      end: '2024-01-15'
    },
    investment: 4500,
    dailyAverage: 300,
    leads: 287,
    sales: 0,
    cpl: 15.68,
    cpa: 0,
    ctr: 2.8,
    cpm: 38.20,
    roas: undefined
  }
};

// Etapas do processo mockadas
export const mockProcessSteps: ProcessStep[] = [
  { id: 'step-1', name: 'Briefing enviado pelo cliente', status: 'completed', updatedAt: '2024-01-01T10:00:00' },
  { id: 'step-2', name: 'Briefing aprovado', status: 'completed', updatedAt: '2024-01-02T14:30:00' },
  { id: 'step-3', name: 'Pesquisa de mercado e concorrência', status: 'completed', updatedAt: '2024-01-03T16:00:00' },
  { id: 'step-4', name: 'Definição de estratégia', status: 'completed', updatedAt: '2024-01-05T11:20:00' },
  { id: 'step-5', name: 'Criação de criativos', status: 'in_progress', updatedAt: '2024-01-10T09:00:00' },
  { id: 'step-6', name: 'Revisão interna', status: 'not_started' },
  { id: 'step-7', name: 'Envio para aprovação do cliente', status: 'not_started' },
  { id: 'step-8', name: 'Ajustes solicitados', status: 'not_started' },
  { id: 'step-9', name: 'Configuração no gerenciador de anúncios', status: 'not_started' },
  { id: 'step-10', name: 'Testes finais', status: 'not_started' },
  { id: 'step-11', name: 'Campanha no ar', status: 'not_started' },
  { id: 'step-12', name: 'Primeira análise de resultados', status: 'not_started' },
  { id: 'step-13', name: 'Ciclos de otimização', status: 'not_started' }
];

// Mensagens mockadas
export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    campaignId: 'camp-1',
    sender: 'admin',
    senderName: 'Carlos Mendes',
    content: 'Olá! Sua campanha está performando muito bem. Vamos aumentar o orçamento?',
    timestamp: '2024-01-15T14:30:00'
  },
  {
    id: 'msg-2',
    campaignId: 'camp-1',
    sender: 'client',
    senderName: 'João Silva',
    content: 'Ótimo! Pode aumentar sim. Quanto você recomenda?',
    timestamp: '2024-01-15T15:00:00'
  },
  {
    id: 'msg-3',
    campaignId: 'camp-1',
    sender: 'admin',
    senderName: 'Carlos Mendes',
    content: 'Recomendo aumentar de R$ 500 para R$ 700 diários. Com o ROAS atual, vale muito a pena!',
    timestamp: '2024-01-15T15:15:00'
  }
];

// Arquivos de mídia mockados
export const mockMediaFiles: MediaFile[] = [
  {
    id: 'media-1',
    campaignId: 'camp-1',
    name: 'banner-black-friday.jpg',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=600&fit=crop',
    uploadedBy: 'client',
    uploadedAt: '2024-01-05T10:00:00',
    notes: 'Banner principal da campanha'
  },
  {
    id: 'media-2',
    campaignId: 'camp-1',
    name: 'video-produto.mp4',
    type: 'video',
    url: '#',
    uploadedBy: 'admin',
    uploadedAt: '2024-01-08T14:30:00',
    notes: 'Vídeo demonstrativo do produto'
  },
  {
    id: 'media-3',
    campaignId: 'camp-1',
    name: 'briefing-campanha.pdf',
    type: 'document',
    url: '#',
    uploadedBy: 'client',
    uploadedAt: '2024-01-01T09:00:00',
    notes: 'Briefing inicial da campanha'
  }
];

// Função helper para obter status em português
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    'briefing': 'Em briefing',
    'construction': 'Em construção',
    'approval': 'Em aprovação',
    'active': 'Ativa',
    'optimization': 'Em otimização',
    'paused': 'Pausada',
    'finished': 'Finalizada'
  };
  return labels[status] || status;
}

// Função helper para obter cor do status
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'briefing': 'bg-blue-500',
    'construction': 'bg-yellow-500',
    'approval': 'bg-orange-500',
    'active': 'bg-green-500',
    'optimization': 'bg-purple-500',
    'paused': 'bg-gray-500',
    'finished': 'bg-slate-500'
  };
  return colors[status] || 'bg-gray-500';
}
