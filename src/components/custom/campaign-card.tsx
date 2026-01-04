'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, DollarSign, Layers } from 'lucide-react';
import { getStatusLabel, getStatusColor } from '@/lib/mock-data';
import type { Campaign } from '@/lib/types';
import Link from 'next/link';

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <Link href={`/campaign/${campaign.id}`}>
      <Card className="bg-white border-0 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
        <CardContent className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-gray-900 text-base leading-tight line-clamp-2 flex-1">
              {campaign.name}
            </h3>
            <Badge className={`${getStatusColor(campaign.status)} text-white text-xs flex-shrink-0`}>
              {getStatusLabel(campaign.status)}
            </Badge>
          </div>

          {/* Info Grid */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Layers className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />
              <span className="text-gray-700 font-medium">{campaign.channel}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span className="text-gray-700">
                R$ {campaign.dailyBudget}/dia • R$ {campaign.monthlyBudget}/mês
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-orange-600 flex-shrink-0" />
              <span className="text-gray-600 text-xs">
                Atualizado {new Date(campaign.lastUpdate).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2 pt-2 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">Progresso</span>
              <span className="font-bold text-[#7C3AED]">{campaign.progress}%</span>
            </div>
            <Progress value={campaign.progress} className="h-2" />
          </div>

          {/* Manager */}
          <div className="pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Gestor: <span className="font-semibold text-gray-700">{campaign.manager}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
