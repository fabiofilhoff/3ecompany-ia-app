// Tipos do sistema de campanhas 3E Company

export type UserRole = 'admin' | 'client';

export type CampaignStatus = 
  | 'briefing'
  | 'construction'
  | 'approval'
  | 'active'
  | 'optimization'
  | 'paused'
  | 'finished';

export type CampaignChannel = 
  | 'Meta Ads'
  | 'Google Ads'
  | 'TikTok Ads'
  | 'LinkedIn Ads'
  | 'YouTube Ads';

export type CampaignObjective = 
  | 'Leads'
  | 'Vendas'
  | 'Tráfego'
  | 'Engajamento'
  | 'Conversões';

export type ProcessStage = 
  | 'briefing_received'
  | 'research'
  | 'strategy'
  | 'creatives'
  | 'configuration'
  | 'client_review'
  | 'active'
  | 'optimization';

export type ProcessStepStatus = 'not_started' | 'in_progress' | 'completed';

export type MessageSender = 'client' | 'admin';

export type SuggestionUrgency = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  cnpj?: string;
  avatar?: string;
}

export interface Campaign {
  id: string;
  name: string;
  clientId: string;
  status: CampaignStatus;
  channel: CampaignChannel;
  objective: CampaignObjective;
  dailyBudget: number;
  monthlyBudget: number;
  targetAudience: string;
  startDate: string;
  endDate?: string;
  progress: number; // 0-100
  currentStage: ProcessStage;
  manager: string;
  lastUpdate: string;
}

export interface ProcessStep {
  id: string;
  name: string;
  status: ProcessStepStatus;
  updatedAt?: string;
  description?: string;
}

export interface CampaignMetrics {
  campaignId: string;
  period: {
    start: string;
    end: string;
  };
  investment: number;
  dailyAverage: number;
  leads: number;
  sales: number;
  cpl: number;
  cpa: number;
  ctr: number;
  cpm: number;
  roas?: number;
}

export interface MediaFile {
  id: string;
  campaignId: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  uploadedBy: MessageSender;
  uploadedAt: string;
  notes?: string;
}

export interface Message {
  id: string;
  campaignId: string;
  sender: MessageSender;
  senderName: string;
  content: string;
  timestamp: string;
  attachments?: string[];
}

export interface Suggestion {
  id: string;
  campaignId: string;
  type: string;
  description: string;
  urgency: SuggestionUrgency;
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  createdAt: string;
  attachments?: string[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  campaignId?: string;
}

export interface Plan {
  id: string;
  clientId: string;
  type: 'monthly' | 'quarterly' | 'biannual' | 'annual';
  monthlyValue: number;
  startDate: string;
  status: 'active' | 'renewal' | 'ended';
}

export interface DashboardStats {
  activeCampaigns: number;
  constructionCampaigns: number;
  monthlyInvestment: number;
  monthlyResults: number;
}
