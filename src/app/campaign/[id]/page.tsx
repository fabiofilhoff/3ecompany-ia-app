'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft,
  Bell,
  Target,
  DollarSign,
  Users,
  Calendar,
  User,
  CheckCircle2,
  Circle,
  Clock,
  Upload,
  FileImage,
  FileVideo,
  FileText,
  Download,
  TrendingUp,
  BarChart3,
  MessageSquare,
  Send,
  Paperclip,
  AlertCircle
} from 'lucide-react';
import { mockCampaigns, mockCampaignMetrics, mockProcessSteps, mockMessages, mockMediaFiles, getStatusLabel, getStatusColor } from '@/lib/mock-data';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CampaignDetailPage() {
  const params = useParams();
  const campaignId = params?.id as string;
  
  const campaign = mockCampaigns.find(c => c.id === campaignId);
  const metrics = mockCampaignMetrics[campaignId];
  const messages = mockMessages.filter(m => m.campaignId === campaignId);
  const mediaFiles = mockMediaFiles.filter(m => m.campaignId === campaignId);

  const [activeTab, setActiveTab] = useState('summary');
  const [newMessage, setNewMessage] = useState('');
  const [suggestionType, setSuggestionType] = useState('');
  const [suggestionDescription, setSuggestionDescription] = useState('');
  const [suggestionUrgency, setSuggestionUrgency] = useState<'low' | 'medium' | 'high'>('medium');

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">Campanha não encontrada</h2>
            <p className="text-gray-600 mb-4">A campanha que você está procurando não existe.</p>
            <Link href="/dashboard">
              <Button className="bg-[#7C3AED] hover:bg-[#6D28D9]">
                Voltar ao Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Aqui você adicionaria a lógica para enviar a mensagem
      console.log('Enviando mensagem:', newMessage);
      setNewMessage('');
    }
  };

  const handleSubmitSuggestion = () => {
    if (suggestionType && suggestionDescription.trim()) {
      // Aqui você adicionaria a lógica para enviar a sugestão
      console.log('Enviando sugestão:', { suggestionType, suggestionDescription, suggestionUrgency });
      setSuggestionType('');
      setSuggestionDescription('');
      setSuggestionUrgency('medium');
    }
  };

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
            <div>
              <h1 className="text-lg font-bold line-clamp-1">{campaign.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`${getStatusColor(campaign.status)} text-white text-xs`}>
                  {getStatusLabel(campaign.status)}
                </Badge>
                <span className="text-xs text-gray-300">{campaign.channel}</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tabs Navigation */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-2">
              <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="summary" className="text-xs sm:text-sm data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white">
                  Resumo
                </TabsTrigger>
                <TabsTrigger value="process" className="text-xs sm:text-sm data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white">
                  Processo
                </TabsTrigger>
                <TabsTrigger value="media" className="text-xs sm:text-sm data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white">
                  Mídias
                </TabsTrigger>
                <TabsTrigger value="results" className="text-xs sm:text-sm data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white">
                  Resultados
                </TabsTrigger>
                <TabsTrigger value="messages" className="text-xs sm:text-sm data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white relative">
                  Mensagens
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>

          {/* Tab: Resumo */}
          <TabsContent value="summary" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Informações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Target className="w-5 h-5 text-[#7C3AED]" />
                      <span className="text-sm font-medium">Objetivo</span>
                    </div>
                    <p className="text-gray-900 font-semibold ml-7">{campaign.objective}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Orçamento</span>
                    </div>
                    <p className="text-gray-900 font-semibold ml-7">
                      R$ {campaign.dailyBudget}/dia • R$ {campaign.monthlyBudget}/mês
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">Público-alvo</span>
                    </div>
                    <p className="text-gray-900 ml-7">{campaign.targetAudience}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium">Período</span>
                    </div>
                    <p className="text-gray-900 ml-7">
                      Início: {new Date(campaign.startDate).toLocaleDateString('pt-BR')}
                      {campaign.endDate && ` • Fim: ${new Date(campaign.endDate).toLocaleDateString('pt-BR')}`}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium">Gestor Responsável</span>
                    </div>
                    <p className="text-gray-900 font-semibold ml-7">{campaign.manager}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progresso Geral</span>
                    <span className="text-lg font-bold text-[#7C3AED]">{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Processo */}
          <TabsContent value="process" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Timeline do Processo</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Acompanhe cada etapa da construção e execução da campanha</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockProcessSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-4">
                      {/* Status Icon */}
                      <div className="flex-shrink-0 mt-1">
                        {step.status === 'completed' && (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        )}
                        {step.status === 'in_progress' && (
                          <Clock className="w-6 h-6 text-[#7C3AED] animate-pulse" />
                        )}
                        {step.status === 'not_started' && (
                          <Circle className="w-6 h-6 text-gray-300" />
                        )}
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 pb-4 border-b border-gray-200 last:border-0">
                        <h4 className={`font-semibold ${
                          step.status === 'completed' ? 'text-gray-900' :
                          step.status === 'in_progress' ? 'text-[#7C3AED]' :
                          'text-gray-500'
                        }`}>
                          {step.name}
                        </h4>
                        {step.updatedAt && (
                          <p className="text-xs text-gray-500 mt-1">
                            Atualizado em {new Date(step.updatedAt).toLocaleString('pt-BR')}
                          </p>
                        )}
                        {step.status === 'not_started' && (
                          <Badge variant="outline" className="mt-2 text-xs">
                            Aguardando
                          </Badge>
                        )}
                        {step.status === 'in_progress' && (
                          <Badge className="mt-2 text-xs bg-[#7C3AED]">
                            Em andamento
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Mídias */}
          <TabsContent value="media" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Arquivos de Mídia</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Envie e gerencie imagens, vídeos e documentos da campanha</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#7C3AED] transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-700 mb-1">Clique para enviar arquivos</p>
                  <p className="text-xs text-gray-500">Imagens, vídeos, PDFs e documentos</p>
                  <Button className="mt-4 bg-[#7C3AED] hover:bg-[#6D28D9]">
                    <Upload className="w-4 h-4 mr-2" />
                    Selecionar Arquivos
                  </Button>
                </div>

                {/* Files List */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">Arquivos Enviados</h3>
                  {mediaFiles.map((file) => (
                    <Card key={file.id} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {/* File Icon */}
                          <div className="flex-shrink-0">
                            {file.type === 'image' && (
                              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
                                <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                              </div>
                            )}
                            {file.type === 'video' && (
                              <div className="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center">
                                <FileVideo className="w-8 h-8 text-purple-600" />
                              </div>
                            )}
                            {file.type === 'document' && (
                              <div className="w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
                                <FileText className="w-8 h-8 text-blue-600" />
                              </div>
                            )}
                          </div>

                          {/* File Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">{file.name}</h4>
                            <p className="text-xs text-gray-600 mt-1">
                              Enviado por {file.uploadedBy === 'client' ? 'você' : '3E Company'} em {new Date(file.uploadedAt).toLocaleDateString('pt-BR')}
                            </p>
                            {file.notes && (
                              <p className="text-sm text-gray-700 mt-2">{file.notes}</p>
                            )}
                          </div>

                          {/* Download Button */}
                          <Button variant="outline" size="icon" className="flex-shrink-0">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Resultados */}
          <TabsContent value="results" className="space-y-4">
            {metrics ? (
              <>
                {/* Period Filter */}
                <Card className="bg-white shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#7C3AED]" />
                        <span className="font-semibold text-gray-800">Período:</span>
                        <span className="text-gray-600">
                          {new Date(metrics.period.start).toLocaleDateString('pt-BR')} - {new Date(metrics.period.end).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <Select defaultValue="last30">
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Hoje</SelectItem>
                          <SelectItem value="last7">Últimos 7 dias</SelectItem>
                          <SelectItem value="last30">Últimos 30 dias</SelectItem>
                          <SelectItem value="custom">Personalizado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <DollarSign className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold text-green-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(metrics.investment)}
                      </p>
                      <p className="text-xs text-green-700 mt-1">Investimento Total</p>
                      <p className="text-xs text-green-600 mt-2">
                        Média: R$ {metrics.dailyAverage}/dia
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Target className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold text-blue-900">
                        {metrics.leads > 0 ? metrics.leads : metrics.sales}
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        {metrics.leads > 0 ? 'Leads Gerados' : 'Vendas Realizadas'}
                      </p>
                      <p className="text-xs text-blue-600 mt-2">
                        {metrics.leads > 0 ? `CPL: R$ ${metrics.cpl.toFixed(2)}` : `CPA: R$ ${metrics.cpa.toFixed(2)}`}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="w-8 h-8 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold text-purple-900">{metrics.ctr}%</p>
                      <p className="text-xs text-purple-700 mt-1">CTR (Taxa de Cliques)</p>
                      <p className="text-xs text-purple-600 mt-2">
                        CPM: R$ {metrics.cpm.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>

                  {metrics.roas && (
                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <BarChart3 className="w-8 h-8 text-orange-600" />
                        </div>
                        <p className="text-2xl font-bold text-orange-900">{metrics.roas}x</p>
                        <p className="text-xs text-orange-700 mt-1">ROAS</p>
                        <p className="text-xs text-orange-600 mt-2">
                          Retorno sobre investimento
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Summary */}
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-800">Resumo do Período</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      Neste período, você investiu <span className="font-bold text-[#7C3AED]">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(metrics.investment)}
                      </span> e gerou <span className="font-bold text-[#7C3AED]">
                        {metrics.leads > 0 ? `${metrics.leads} leads` : `${metrics.sales} vendas`}
                      </span>. Seu custo por {metrics.leads > 0 ? 'lead' : 'venda'} foi de <span className="font-bold text-[#7C3AED]">
                        R$ {(metrics.leads > 0 ? metrics.cpl : metrics.cpa).toFixed(2)}
                      </span>.
                      {metrics.roas && (
                        <> Com um ROAS de <span className="font-bold text-[#7C3AED]">{metrics.roas}x</span>, sua campanha está gerando excelentes resultados!</>
                      )}
                    </p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-white shadow-lg">
                <CardContent className="p-12 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Resultados em breve</h3>
                  <p className="text-gray-600">
                    Os resultados desta campanha estarão disponíveis assim que ela estiver ativa.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tab: Mensagens e Sugestões */}
          <TabsContent value="messages" className="space-y-4">
            {/* Chat Area */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Conversas</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Converse com a equipe da 3E Company</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl p-4 ${
                        message.sender === 'client' 
                          ? 'bg-[#7C3AED] text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-xs font-semibold mb-1 opacity-80">{message.senderName}</p>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-2 opacity-70">
                          {new Date(message.timestamp).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <Input 
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9]"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Suggestion Form */}
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Sugerir Alteração
                </CardTitle>
                <p className="text-sm text-gray-700 mt-1">
                  Tem alguma sugestão de melhoria para esta campanha? Compartilhe conosco!
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="suggestion-type">Tipo de mudança</Label>
                  <Select value={suggestionType} onValueChange={setSuggestionType}>
                    <SelectTrigger id="suggestion-type">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="creative">Criativo</SelectItem>
                      <SelectItem value="audience">Público</SelectItem>
                      <SelectItem value="budget">Orçamento</SelectItem>
                      <SelectItem value="objective">Objetivo</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="suggestion-description">Descrição da sugestão</Label>
                  <Textarea 
                    id="suggestion-description"
                    placeholder="Descreva sua sugestão em detalhes..."
                    value={suggestionDescription}
                    onChange={(e) => setSuggestionDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="suggestion-urgency">Urgência</Label>
                  <Select value={suggestionUrgency} onValueChange={(value) => setSuggestionUrgency(value as 'low' | 'medium' | 'high')}>
                    <SelectTrigger id="suggestion-urgency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" className="flex-1">
                    <Paperclip className="w-4 h-4 mr-2" />
                    Anexar Arquivo
                  </Button>
                  <Button 
                    onClick={handleSubmitSuggestion}
                    className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9]"
                  >
                    Enviar Sugestão
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
