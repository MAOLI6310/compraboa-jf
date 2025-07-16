import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Logo } from '@/components/Logo';

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: "Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Helmet>
        <title>Contato - CompraBoa JF</title>
        <meta name="description" content="Entre em contato com o CompraBoa JF. Tire suas dúvidas, envie sugestões ou relate problemas." />
      </Helmet>

      <div className="min-h-screen bg-neutral-100">
        <header className="page-header">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="hover:bg-neutral-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-neutral-900">Contato</h1>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Fale Conosco</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Tem alguma dúvida, sugestão ou problema? Estamos aqui para ajudar. 
                Preencha o formulário ou use um dos nossos canais de atendimento.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
              <motion.div
                className="md:col-span-3 bg-background rounded-lg border border-border p-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6">Envie uma Mensagem</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full search-input" placeholder="Seu nome" required />
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full search-input" placeholder="seu@email.com" required />
                  <select name="subject" value={formData.subject} onChange={handleInputChange} className="w-full search-input" required>
                    <option value="">Selecione um assunto</option>
                    <option value="duvida">Dúvida</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="problema">Problema técnico</option>
                    <option value="parceria">Parceria</option>
                    <option value="outro">Outro</option>
                  </select>
                  <textarea name="message" value={formData.message} onChange={handleInputChange} rows={5} className="w-full search-input resize-none" placeholder="Descreva sua mensagem..." required />
                  <Button type="submit" className="w-full bg-brand-green hover:bg-green-600 text-white py-3">
                    <Send className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </motion.div>

              <motion.div
                className="md:col-span-2 space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="bg-background rounded-lg border border-border p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">Email</h4>
                      <p className="text-neutral-600">contato@compraboajf.com.br</p>
                    </div>
                  </div>
                </div>
                <div className="bg-background rounded-lg border border-border p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">Telefone</h4>
                      <p className="text-neutral-600">(32) 99999-9999</p>
                    </div>
                  </div>
                </div>
                <div className="bg-background rounded-lg border border-border p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-brand-yellow" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">Localização</h4>
                      <p className="text-neutral-600">Juiz de Fora, MG</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Contact;