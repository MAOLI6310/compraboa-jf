import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

export const Logo = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/')} className="flex items-center gap-3 focus:outline-none">
      <motion.div 
        className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-green rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20"
        whileHover={{ rotate: -10, scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      >
        <ShoppingBag className="w-6 h-6 text-white" />
      </motion.div>
      <div className="text-left">
        <span className="text-xl font-bold text-neutral-900 tracking-tight">CompraBoa</span>
        <span className="block text-xs text-brand-green font-semibold -mt-1 tracking-wider">JUIZ DE FORA</span>
      </div>
    </button>
  );
};