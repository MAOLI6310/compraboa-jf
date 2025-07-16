import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Star, Users, Calendar, Trophy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Logo } from '@/components/Logo';

const Giveaway = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 42,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAction = () => {
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: "Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  const rules = [
    'Ser maior de 18 anos e residir em Juiz de Fora ou região.',
    'Seguir @compraboajf nas redes sociais (Instagram/Facebook).',
    'Preencher o formulário de participação corretamente.',
    'Compartilhar a publicação oficial do sorteio nos stories.'
  ];

  return (
    <>
      <Helmet>
        <title>Sorteio R$ 1.000 - CompraBoa JF</title>
        <meta name="description" content="Participe do sorteio de R$ 1.000 do CompraBoa JF! Concorra a prêmios incríveis e economize ainda mais." />
      </Helmet>

      <div className="min-h-screen bg-neutral-100">
        <header className="page-header">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="hover:bg-neutral-200">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-neutral-900">Sorteio Especial</h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-center mb-12">
              <motion.div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.8, type: "spring" }}>
                <Gift className="w-12 h-12 text-white" />
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-4">
                Concorra a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">R$ 1.000,00</span>
              </h2>
              <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                Para celebrar nosso lançamento, estamos sorteando R$ 1.000 em prêmios. Participe agora!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <motion.div className="bg-background rounded-lg border border-border p-8" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Como Participar</h3>
                <ul className="space-y-4">
                  {rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-bold">{index + 1}</div>
                      <span className="text-neutral-700">{rule}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-border pt-6">
                  <div className="flex items-center gap-3 text-neutral-600">
                    <Calendar className="w-5 h-5 text-brand-green" />
                    <span>Sorteio em: <strong>31 de Julho de 2025, às 20h</strong></span>
                  </div>
                </div>
              </motion.div>

              <motion.div className="bg-background rounded-lg border border-border p-8" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">Contagem Regressiva</h3>
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="text-center bg-neutral-100 p-3 rounded-md">
                      <span className="text-3xl font-bold text-brand-green">{value.toString().padStart(2, '0')}</span>
                      <span className="block text-xs text-neutral-500 uppercase">{unit}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={handleAction} size="lg" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold hover:opacity-90">
                  <Trophy className="w-5 h-5 mr-2" />
                  Quero Participar Agora
                </Button>
                <Button onClick={handleAction} variant="outline" className="w-full mt-3">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar Sorteio
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Giveaway;