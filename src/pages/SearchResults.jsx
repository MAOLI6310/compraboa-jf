import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, List, Map, ChevronsRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Logo } from '@/components/Logo';
import { cn } from '@/lib/utils';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const searchTerm = searchParams.get('q') || '';
  const [sortBy, setSortBy] = useState('price');
  const [viewMode, setViewMode] = useState('list');
  const [hoveredMarket, setHoveredMarket] = useState(null);

  const mockResults = [
    { id: 1, name: 'Detergente Limpol Clear 500ml', brand: 'Limpol', price: 1.19, market: 'Supermercado Casa do Sabino', distance: '0.8 km', rating: 4.5, inStock: true, mapPos: { top: '35%', left: '40%' } },
    { id: 2, name: 'Detergente Ypê Clear 500ml', brand: 'Ypê', price: 1.29, market: 'Supermercado Portuguesa', distance: '1.2 km', rating: 4.3, inStock: true, mapPos: { top: '55%', left: '50%' } },
    { id: 3, name: 'Detergente Minuano Limão 500ml', brand: 'Minuano', price: 1.79, market: 'Supermercado União', distance: '0.5 km', rating: 4.7, inStock: false, mapPos: { top: '70%', left: '30%' } },
    { id: 4, name: 'Detergente Limpol Neutro 500ml', brand: 'Limpol', price: 1.99, market: 'Supercompras', distance: '2.1 km', rating: 4.1, inStock: true, mapPos: { top: '25%', left: '65%' } }
  ];
  
  const uniqueMarkets = [...new Map(mockResults.map(item => [item.market, item])).values()];

  const sortedResults = [...mockResults].sort((a, b) => {
    if (!a.inStock && b.inStock) return 1;
    if (a.inStock && !b.inStock) return -1;
    switch (sortBy) {
      case 'price': return a.price - b.price;
      case 'distance': return parseFloat(a.distance) - parseFloat(b.distance);
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

  const handleCartAction = () => {
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: "Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  const isMarketHovered = (marketName) => hoveredMarket === marketName;

  return (
    <>
      <Helmet>
        <title>{`Resultados para "${searchTerm}" - CompraBoa JF`}</title>
        <meta name="description" content={`Encontre os melhores preços para ${searchTerm} em supermercados de Juiz de Fora.`} />
      </Helmet>

      <div className="h-screen flex flex-col bg-slate-100">
        <header className="page-header flex-shrink-0">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/')} className="hover:bg-neutral-200 rounded-full">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="hidden sm:block"><Logo /></div>
                <div className="h-6 w-px bg-slate-300 hidden md:block"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-600 hidden md:block">Resultados para:</p>
                  <h1 className="font-bold text-neutral-900 truncate">{searchTerm}</h1>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2 bg-slate-200 p-1 rounded-full">
                  <Button onClick={() => setViewMode('list')} size="sm" className={cn('rounded-full', viewMode === 'list' ? 'bg-white text-neutral-800 shadow' : 'bg-transparent text-neutral-600')}> <List className="w-4 h-4 mr-2"/> Lista </Button>
                  <Button onClick={() => setViewMode('map')} size="sm" className={cn('rounded-full', viewMode === 'map' ? 'bg-white text-neutral-800 shadow' : 'bg-transparent text-neutral-600')}> <Map className="w-4 h-4 mr-2"/> Mapa </Button>
                </div>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 bg-white rounded-xl text-sm border border-border focus:outline-none focus:ring-2 focus:ring-brand-green">
                  <option value="price">Menor preço</option>
                  <option value="distance">Mais próximo</option>
                  <option value="rating">Melhor avaliado</option>
                </select>
                <Button onClick={handleCartAction} size="icon" className="bg-brand-blue hover:bg-blue-700 text-white rounded-full relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-brand-green text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden">
          <motion.div layout className="w-full lg:w-1/2 xl:w-2/5 flex flex-col overflow-y-auto p-4 gap-3">
            {sortedResults.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={cn('product-card hover-lift', {'ring-2 ring-brand-blue shadow-lg': isMarketHovered(product.market)}, { 'opacity-60': !product.inStock })}
                onMouseEnter={() => setHoveredMarket(product.market)}
                onMouseLeave={() => setHoveredMarket(null)}
              >
                <div className="flex gap-4">
                  <img  class="w-24 h-24 rounded-lg object-cover flex-shrink-0" alt={`Produto ${product.name}`} src="https://images.unsplash.com/photo-1627577741153-74b82d87607b" />
                  <div className="flex-1 min-w-0">
                    <div className="price-tag mb-2 w-fit">R$ {product.price.toFixed(2)}</div>
                    <h3 className="font-semibold text-neutral-800 truncate">{product.name}</h3>
                    <p className="text-sm text-neutral-500">{product.brand}</p>
                    <div className="flex items-center gap-1 mt-2 text-sm text-neutral-600">
                      <MapPin className="w-4 h-4 text-neutral-400" />
                      <span>{product.market} ({product.distance})</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end">
                     <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-current" />
                        <span className="font-bold">{product.rating}</span>
                      </div>
                    {!product.inStock && <p className="text-xs text-red-600 font-medium">Sem estoque</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="hidden lg:block lg:w-1/2 xl:w-3/5 p-4 pl-0">
             <div className="w-full h-full rounded-2xl map-placeholder relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1620252192087-43842168a265?q=80')]">
                
                {uniqueMarkets.map(market => (
                  <motion.div
                    key={market.id}
                    className="absolute map-pin"
                    style={{ top: market.mapPos.top, left: market.mapPos.left }}
                    animate={{ scale: isMarketHovered(market.market) ? 1.5 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  >
                    <div className="relative group">
                       <MapPin className={cn(
                        "w-10 h-10 drop-shadow-lg", 
                        isMarketHovered(market.market) ? "text-brand-blue" : "text-white/80",
                        !market.inStock && "text-neutral-500/80"
                      )} />
                      <div className="absolute bottom-full mb-2 w-max max-w-xs px-3 py-1.5 bg-neutral-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -translate-x-1/2 left-1/2">
                        {market.market}
                      </div>
                    </div>
                  </motion.div>
                ))}

                <AnimatePresence>
                  {hoveredMarket && (
                      <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-slate-200 pointer-events-none"
                      >
                         <h3 className="font-bold text-neutral-900">{hoveredMarket}</h3>
                         <p className="text-sm text-neutral-600">Preços a partir de R$ {sortedResults.find(p => p.market === hoveredMarket)?.price.toFixed(2)}</p>
                      </motion.div>
                  )}
                </AnimatePresence>

                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-200">
                  <h3 className="font-bold text-neutral-800 mb-2">Melhor Oferta</h3>
                  <div className="flex items-center gap-3">
                    <div className="text-left">
                       <p className="font-semibold text-neutral-800">{sortedResults[0]?.market}</p>
                       <p className="text-2xl font-bold text-brand-green">R$ {sortedResults[0]?.price.toFixed(2)}</p>
                    </div>
                    <Button size="icon" className="rounded-full bg-brand-green hover:bg-green-600 text-white flex-shrink-0">
                      <ChevronsRight />
                    </Button>
                  </div>
                </div>
             </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SearchResults;