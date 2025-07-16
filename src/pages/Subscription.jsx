import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Star, Zap, Gem } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const Subscription = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = {
    monthly: [
      {
        name: 'Básico',
        price: 'Grátis',
        description: 'Para quem quer começar a economizar.',
        features: ['Buscas limitadas por dia', 'Comparação de até 5 itens', 'Publicidade'],
        icon: Star,
        buttonText: 'Comece Agora',
        variant: 'outline'
      },
      {
        name: 'Premium',
        price: 'R$ 9,90',
        priceSuffix: '/mês',
        description: 'Para o comprador inteligente e frequente.',
        features: ['Buscas ilimitadas', 'Comparação de carrinho completo', 'Sem publicidade', 'Alertas de preço'],
        icon: Zap,
        buttonText: 'Assinar Premium',
        variant: 'default',
        popular: true
      },
      {
        name: 'Família',
        price: 'R$ 15,90',
        priceSuffix: '/mês',
        description: 'Para gerenciar as compras de toda a casa.',
        features: ['Tudo do Premium', 'Até 4 perfis de usuário', 'Listas de compras compartilhadas', 'Relatórios de economia'],
        icon: Gem,
        buttonText: 'Assinar Família',
        variant: 'outline'
      }
    ],
    yearly: [
      {
        name: 'Básico',
        price: 'Grátis',
        description: 'Para quem quer começar a economizar.',
        features: ['Buscas limitadas por dia', 'Comparação de até 5 itens', 'Publicidade'],
        icon: Star,
        buttonText: 'Comece Agora',
        variant: 'outline'
      },
      {
        name: 'Premium',
        price: 'R$ 99',
        priceSuffix: '/ano',
        description: 'Economize 2 meses com o plano anual.',
        features: ['Buscas ilimitadas', 'Comparação de carrinho completo', 'Sem publicidade', 'Alertas de preço'],
        icon: Zap,
        buttonText: 'Assinar Premium',
        variant: 'default',
        popular: true
      },
      {
        name: 'Família',
        price: 'R$ 159',
        priceSuffix: '/ano',
        description: 'O melhor valor para toda a família.',
        features: ['Tudo do Premium', 'Até 4 perfis de usuário', 'Listas de compras compartilhadas', 'Relatórios de economia'],
        icon: Gem,
        buttonText: 'Assinar Família',
        variant: 'outline'
      }
    ]
  };

  const handleSubscription = (planName) => {
    toast({
      title: `Plano ${planName}`,
      description: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  return (
    <>
      <Helmet>
        <title>Planos de Assinatura - CompraBoa JF</title>
        <meta name="description" content="Desbloqueie recursos exclusivos com os planos Premium do CompraBoa JF. Compare carrinhos, receba alertas e mais." />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <header className="page-header">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="hover:bg-neutral-200 rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-neutral-900">Nossos Planos</h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-neutral-900 mb-4">Escolha o plano perfeito para você</h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Desbloqueie o poder máximo da economia com nossos planos. Mais recursos, mais economia, mais tempo para você.
              </p>
            </div>

            <div className="flex justify-center mb-10">
              <div className="bg-slate-200 p-1 rounded-full flex items-center">
                <Button onClick={() => setBillingCycle('monthly')} className={cn('rounded-full', billingCycle === 'monthly' ? 'bg-white text-neutral-800 shadow' : 'bg-transparent text-neutral-600')}>Mensal</Button>
                <Button onClick={() => setBillingCycle('yearly')} className={cn('rounded-full relative', billingCycle === 'yearly' ? 'bg-white text-neutral-800 shadow' : 'bg-transparent text-neutral-600')}>
                  Anual
                  <span className="absolute -top-2 -right-2 bg-brand-green text-white text-xs font-semibold px-2 py-0.5 rounded-full">2 meses grátis</span>
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-stretch">
              {plans[billingCycle].map((plan, index) => (
                <motion.div
                  key={plan.name}
                  className={cn(
                    'bg-white/60 backdrop-blur-md border rounded-2xl p-8 flex flex-col relative',
                    plan.popular ? 'border-brand-blue' : 'border-slate-200/80'
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Mais Popular
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="mb-6 text-center">
                      <plan.icon className={cn("w-10 h-10 mx-auto mb-4", plan.popular ? 'text-brand-blue' : 'text-brand-green')} />
                      <h3 className="text-2xl font-bold text-neutral-900">{plan.name}</h3>
                      <p className="text-neutral-600 mt-1">{plan.description}</p>
                    </div>
                    <div className="mb-8 text-center">
                      <span className="text-4xl font-extrabold text-neutral-900">{plan.price}</span>
                      {plan.priceSuffix && <span className="text-neutral-500">{plan.priceSuffix}</span>}
                    </div>
                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-brand-green" />
                          </div>
                          <span className="text-neutral-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    onClick={() => handleSubscription(plan.name)}
                    size="lg"
                    className={cn(
                      'w-full mt-8 rounded-xl',
                      plan.variant === 'default' ? 'bg-brand-blue hover:bg-blue-700 text-white' : 'bg-white border-slate-300 text-neutral-700 hover:bg-slate-100'
                    )}
                  >
                    {plan.buttonText}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Subscription;