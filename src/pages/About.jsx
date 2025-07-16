import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, DollarSign, Clock, Target, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const navigate = useNavigate();

  const steps = [
    { icon: Search, title: 'Busque com Facilidade', description: 'Digite o que você precisa e deixe nossa tecnologia fazer o resto. Simples e rápido.' },
    { icon: DollarSign, title: 'Compare e Conquiste', description: 'Visualize os preços lado a lado. A melhor oferta estará sempre ao seu alcance.' },
    { icon: Clock, title: 'Economize Tempo e Dinheiro', description: 'Menos tempo no trânsito, mais dinheiro no bolso. A decisão inteligente para suas compras.' }
  ];

  return (
    <>
      <Helmet>
        <title>Como Funciona - A Revolução nas Suas Compras | CompraBoa JF</title>
        <meta name="description" content="Descubra a forma mais inteligente de fazer compras. O CompraBoa JF transforma sua rotina, trazendo economia e praticidade." />
      </Helmet>

      <div className="min-h-screen bg-slate-50">
        <header className="page-header">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="hover:bg-neutral-200 rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-neutral-900">Como Funciona</h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-full mb-4">
                <div className="w-16 h-16 bg-white text-brand-green rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8" />
                </div>
              </div>
              <h2 className="text-4xl font-extrabold text-neutral-900 mb-4">A forma mais <span className="gradient-text">inteligente</span> de fazer compras.</h2>
              <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
                Bem-vindo ao futuro das compras de supermercado. O CompraBoa JF não é apenas um comparador de preços, é seu assistente pessoal para uma vida mais econômica e prática.
              </p>
            </div>

            <section className="mb-20">
              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <motion.div key={index} className="text-center bg-white/60 p-8 rounded-2xl border border-slate-200/80 hover-lift" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
                    <div className="w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-5">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">{step.title}</h3>
                    <p className="text-neutral-600">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="mb-20 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <img  class="w-full rounded-2xl shadow-lg" alt="Mulher sorrindo enquanto usa o celular para comparar preços" src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1" />
                </div>
                <div className="lg:w-1/2">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-brand-green px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span>Sua Vantagem</span>
                  </div>
                  <h3 className="text-3xl font-bold text-neutral-900 mb-4">Mais do que economia, é poder de escolha.</h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed">
                    Nossa missão é colocar o poder de volta nas suas mãos. Com dados transparentes e atualizados, você deixa de ser um mero consumidor para se tornar um comprador estratégico. O CompraBoa JF é a ferramenta que faltava para você tomar decisões com confiança, sabendo que está sempre fazendo o melhor negócio.
                  </p>
                  <Button onClick={() => navigate('/assinatura')} size="lg" className="bg-brand-green hover:bg-green-600 text-white rounded-xl">
                    <span>Conheça Nossos Planos</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </section>

            <section className="text-center bg-brand-blue text-white rounded-2xl p-8 md:p-12">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Junte-se à revolução das compras.</h3>
              <p className="text-lg text-blue-200 max-w-3xl mx-auto mb-8">
                Está pronto para transformar sua rotina e seu orçamento? Comece a usar o CompraBoa JF hoje mesmo.
              </p>
              <Button onClick={() => navigate('/')} size="lg" className="bg-white text-brand-blue hover:bg-neutral-200 font-bold rounded-xl">
                Começar a economizar agora
              </Button>
            </section>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default About;