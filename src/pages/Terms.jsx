import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, UserCheck, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';

const Terms = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Termos de Uso - CompraBoa JF</title>
        <meta name="description" content="Leia os termos de uso do CompraBoa JF. Conheça seus direitos e responsabilidades ao usar nossa plataforma." />
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
              <h1 className="text-xl font-bold text-neutral-900">Termos de Uso</h1>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-background rounded-lg border border-border p-8 md:p-12 space-y-8"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-brand-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-2">Nossos Termos de Uso</h2>
              <p className="text-neutral-500">Última atualização: 15 de julho de 2025</p>
            </div>

            <div className="prose prose-neutral max-w-none">
              <section>
                <h3>1. Aceitação dos Termos</h3>
                <p>
                  Ao acessar e usar o CompraBoa JF, você concorda em cumprir e estar vinculado a estes Termos de Uso. 
                  Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
                </p>
              </section>

              <section>
                <h3>2. Descrição do Serviço</h3>
                <p>
                  O CompraBoa JF é uma plataforma que permite aos usuários buscar e comparar preços de produtos em supermercados de Juiz de Fora, encontrar as melhores ofertas e participar de promoções.
                </p>
              </section>

              <section>
                <h3>3. Responsabilidades do Usuário</h3>
                <p>Ao usar nosso serviço, você se compromete a:</p>
                <ul>
                  <li>Fornecer informações precisas e atualizadas.</li>
                  <li>Não usar o serviço para fins ilegais ou não autorizados.</li>
                  <li>Respeitar os direitos de propriedade intelectual.</li>
                  <li>Não interferir no funcionamento do serviço.</li>
                </ul>
              </section>

              <section>
                <h3>4. Precisão das Informações</h3>
                <p>
                  Embora nos esforcemos para manter as informações de preços e disponibilidade atualizadas, 
                  não garantimos a precisão completa dos dados. Os preços podem variar e os produtos podem 
                  estar fora de estoque. Recomendamos confirmar as informações diretamente com o estabelecimento.
                </p>
              </section>

              <section>
                <h3>5. Limitação de Responsabilidade</h3>
                <p>
                  O CompraBoa JF não se responsabiliza por danos diretos, indiretos, incidentais ou 
                  consequenciais resultantes do uso ou incapacidade de usar nosso serviço. Nosso serviço 
                  é fornecido "como está" sem garantias de qualquer tipo.
                </p>
              </section>

              <section>
                <h3>6. Modificações dos Termos</h3>
                <p>
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações 
                  entrarão em vigor imediatamente após a publicação. O uso continuado do serviço após 
                  as modificações constitui aceitação dos novos termos.
                </p>
              </section>

              <section>
                <h3>7. Contato</h3>
                <p>
                  Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco através 
                  da nossa página de contato ou pelo email: contato@compraboajf.com.br
                </p>
              </section>
            </div>

            <div className="border-t border-border pt-6 text-center">
              <Button 
                onClick={() => navigate('/')}
                className="bg-brand-green hover:bg-green-600 text-white"
              >
                Voltar ao início
              </Button>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default Terms;