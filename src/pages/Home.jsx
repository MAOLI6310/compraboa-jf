import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, MapPin, ShoppingCart, Menu, X, ArrowRight, Sparkles, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Logo } from '@/components/Logo';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchTerm)}`);
    } else {
      toast({
        title: "Digite um produto",
        description: "Por favor, digite o nome de um produto para buscar.",
        variant: "destructive"
      });
    }
  };

  const navLinks = [
    { name: 'Como funciona', path: '/sobre' },
    { name: 'Assinatura', path: '/assinatura', icon: <Star className="w-4 h-4 text-amber-500" /> },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <>
      <Helmet>
        <title>CompraBoa JF - Compare preços, economize tempo e dinheiro.</title>
        <meta name="description" content="Compare preços de produtos em supermercados de Juiz de Fora. Encontre as melhores ofertas e economize nas suas compras." />
      </Helmet>

      <div className="min-h-screen bg-slate-100 text-neutral-800">
        {/* Header */}
        <header className="page-header">
          <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Logo />
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <button 
                  key={link.name}
                  onClick={() => navigate(link.path)}
                  className="text-neutral-600 hover:text-brand-green font-medium transition-colors flex items-center gap-2"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-neutral-800" /> : <Menu className="w-6 h-6 text-neutral-800" />}
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border p-4 space-y-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map(link => (
                <button 
                  key={link.name}
                  onClick={() => {
                    navigate(link.path);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-neutral-800 hover:text-brand-green font-medium py-2 flex items-center gap-2"
                >
                  {link.icon}
                  <span>{link.name}</span>
                </button>
              ))}
            </motion.div>
          )}
        </header>

        {/* Hero Section */}
        <main className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-neutral-900 mb-6 leading-tight">
                Compare preços, economize <br />
                <span className="gradient-text">tempo e dinheiro.</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-neutral-600 mb-8">
                A ferramenta definitiva para encontrar as melhores ofertas nos supermercados de Juiz de Fora.
              </p>
              
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Qual produto você busca hoje?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input pl-12"
                  />
                </div>
                <Button type="submit" size="lg" className="bg-brand-green hover:bg-green-600 text-white font-bold rounded-xl">
                  Buscar
                </Button>
              </form>
            </motion.div>

            {/* Features Section */}
            <motion.div 
              className="grid md:grid-cols-3 gap-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, staggerChildren: 0.2 }}
            >
              <motion.div className="slide-up-fade-in bg-white/60 p-6 rounded-2xl border border-slate-200/80">
                <div className="w-12 h-12 bg-emerald-100 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Compare Produtos</h3>
                <p className="text-neutral-600">Veja os preços do mesmo item em diversos mercados.</p>
              </motion.div>
              <motion.div className="slide-up-fade-in bg-white/60 p-6 rounded-2xl border border-slate-200/80">
                <div className="w-12 h-12 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Mercados Próximos</h3>
                <p className="text-neutral-600">Filtre por localização e encontre ofertas perto de você.</p>
              </motion.div>
              <motion.div className="slide-up-fade-in bg-white/60 p-6 rounded-2xl border border-slate-200/80">
                <div className="w-12 h-12 bg-amber-100 text-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Planos Premium</h3>
                <p className="text-neutral-600">Desbloqueie recursos exclusivos com nossos planos.</p>
              </motion.div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              className="mt-24 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold text-neutral-900 mb-4">Pronto para começar a economizar?</h2>
                  <p className="text-neutral-600 mb-6">
                    Descubra como é fácil fazer compras inteligentes. Veja como nosso sistema funciona e comece a poupar hoje mesmo.
                  </p>
                  <Button onClick={() => navigate('/sobre')} size="lg" variant="outline" className="border-brand-green text-brand-green hover:bg-emerald-50 hover:text-brand-green rounded-xl">
                    <span>Como Funciona</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <img  class="w-full max-w-sm rounded-2xl shadow-lg" alt="Ilustração de uma pessoa fazendo compras com um carrinho" src="https://images.unsplash.com/photo-1542838132-92c53300491e" />
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="footer text-neutral-600 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <Logo />
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
                {navLinks.map(link => (
                  <button 
                    key={link.name}
                    onClick={() => navigate(link.path)}
                    className="text-neutral-600 hover:text-brand-green font-medium transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
                 <button 
                  onClick={() => navigate('/termos')}
                  className="text-neutral-600 hover:text-brand-green font-medium transition-colors"
                >
                  Termos de Uso
                </button>
              </div>
            </div>
            <div className="text-center mt-8 border-t border-border pt-8 text-neutral-500">
              <p>&copy; 2025 CompraBoa JF. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;