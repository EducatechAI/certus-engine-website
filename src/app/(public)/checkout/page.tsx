'use client'

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Shield, Fingerprint, Lock, Copy, CheckCircle } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const plan = searchParams?.get('plan') || 'command';
  const duration = parseInt(searchParams?.get('duration') || '30', 10);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState<'PENDING' | 'PAID'>('PENDING');
  const [license, setLicense] = useState<{key: string, expires: string} | null>(null);

  const getPrice = (planType: string, durationDays: number) => {
    if (planType === 'sovereign') {
      if (durationDays === 30) return 79.90;
      if (durationDays === 90) return 239.70;
      if (durationDays === 180) return 479.40;
      if (durationDays === 365) return 799.90;
    } else {
      if (durationDays === 30) return 499.90;
      if (durationDays === 90) return 1499.70;
      if (durationDays === 180) return 2999.40;
      if (durationDays === 365) return 4999.90;
    }
    return 0;
  };

  const amount = getPrice(plan, duration);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const res = await fetch(`${API_URL}/order/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: { name, email, cpfCnpj },
          amount,
          plan,
          durationDays: duration,
          method: 'PIX'
        })
      });

      const data = await res.json();
      if (res.ok) {
        setOrder(data);
      } else {
        alert('Erro ao processar: ' + data.error);
      }
    } catch (err) {
      alert('Erro de comunicação com o gateway.');
    } finally {
      setLoading(false);
    }
  };

  // Polling
  useEffect(() => {
    if (!order || status === 'PAID') return;

    const interval = setInterval(async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const res = await fetch(`${API_URL}/order/status/${order.orderId}`);
        const data = await res.json();
        
        if (data.status === 'PAID') {
          setStatus('PAID');
          setLicense({ key: data.licenseKey, expires: data.expiresAt });
          clearInterval(interval);
        }
      } catch (e) {
        console.error('Polling error', e);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [order, status]);

  const copyPix = () => {
    if (order?.payment?.qrCode) {
      navigator.clipboard.writeText(order.payment.qrCode);
      alert('Chave copia-e-cola copiada!');
    }
  };

  if (status === 'PAID') {
    return (
      <div className="min-h-screen bg-[#000804] flex items-center justify-center p-4 pt-32">
        <div className="ultra-glass rounded-3xl p-8 max-w-lg w-full text-center border border-emerald-500/30 shadow-2xl shadow-emerald-500/10">
          <CheckCircle className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-2">Pagamento Confirmado!</h2>
          <p className="text-slate-400 mb-8">Sua licença Soberana foi destrancada.</p>
          
          <div className="bg-black/50 p-6 rounded-xl border border-white/5 mb-8">
            <p className="text-sm text-slate-400 mb-2">Sua Chave de Ativação (RSA):</p>
            <p className="font-mono text-emerald-400 break-all">{license?.key}</p>
          </div>

          <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40" onClick={() => alert('Download do Certus Studio iniciado...')}>
            Baixar Certus Studio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000804] text-white py-12 px-4 pt-32">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">
        
        {/* Resumo e Soberania */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-slate-400 mb-8">Plano selecionado: <span className="uppercase text-emerald-400 font-bold">{plan}</span></p>
          
          <div className="ultra-glass rounded-2xl p-6 mb-8 border border-emerald-500/20">
            <h3 className="font-bold text-lg mb-4 text-white">Resumo da Ordem</h3>
            <div className="flex justify-between border-b border-white/10 pb-4 mb-4">
              <span className="text-slate-400">Licença Certus {plan.toUpperCase()} ({duration} dias)</span>
              <span className="font-bold text-white">R$ {amount.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-bold">Total</span>
              <span className="font-bold text-xl text-emerald-400">R$ {amount.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
            </div>
          </div>

          <div className="space-y-4 opacity-70">
            <div className="flex items-center text-sm text-slate-300"><Shield className="w-5 h-5 mr-3 text-emerald-400"/> LAZARUS Vault (Auditoria Criptográfica)</div>
            <div className="flex items-center text-sm text-slate-300"><Fingerprint className="w-5 h-5 mr-3 text-emerald-400"/> PII-Zero (Tokenização de Dados)</div>
            <div className="flex items-center text-sm text-slate-300"><Lock className="w-5 h-5 mr-3 text-emerald-400"/> Conexão MTLS Direta</div>
          </div>
        </div>

        {/* Formulário ou QR Code */}
        <div>
          {!order ? (
            <form onSubmit={handleCheckout} className="ultra-glass rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-6 text-white">Seus Dados</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Nome Completo</label>
                  <input required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">E-mail Corporativo</label>
                  <input required value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">CPF ou CNPJ</label>
                  <input required value={cpfCnpj} onChange={e => setCpfCnpj(e.target.value)} type="text" className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none" />
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 mt-8">
                {loading ? 'Criptografando...' : 'Gerar PIX Seguro'}
              </button>
            </form>
          ) : (
            <div className="ultra-glass rounded-2xl p-8 text-center border-emerald-500/50 shadow-2xl shadow-emerald-500/10 glow-emerald">
              <h3 className="text-xl font-bold mb-2 text-white">Escaneie o QR Code</h3>
              <p className="text-sm text-slate-400 mb-6">O pagamento via PIX é instantâneo. A tela atualizará sozinha.</p>
              
              <div className="bg-white p-4 rounded-xl inline-block mb-6">
                <QRCodeSVG value={order.payment.qrCode} size={200} />
              </div>

              <button onClick={copyPix} className="w-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center mb-4">
                <Copy className="w-5 h-5 mr-2" /> Copiar PIX Copia e Cola
              </button>

              <div className="animate-pulse text-xs text-emerald-400 mt-6 font-bold tracking-widest uppercase">
                Aguardando blockchain...
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#000804] pt-32 text-center text-white">Carregando Checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
