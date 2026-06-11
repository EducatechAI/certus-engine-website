"use client";

import { useState } from "react";
import { User, ShieldAlert, Award, FileText, Landmark } from "lucide-react";

export default function ProfilePage() {
  const [kycVerified, setKycVerified] = useState(false); // Simulando estado de verificação

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-100">👤 Meu Perfil de Embaixador</h2>
        <p className="text-gray-400 text-sm">Gerencie suas chaves de segurança, dados de cadastro e conformidade legal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card de Nível */}
        <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-navy-900 border border-navy-700 rounded-full flex items-center justify-center mb-4">
            <Award size={32} className="text-emerald-500" />
          </div>
          <h3 className="text-gray-100 font-bold">João Silva</h3>
          <p className="text-emerald-400 font-mono text-xs mt-1">ID: AMB_12345</p>
          <div className="mt-4 px-3 py-1 bg-navy-900 border border-navy-700 rounded-full text-xs font-semibold text-gray-300">
            Nível: Bronze (Parceiro Júnior)
          </div>
          <p className="text-[10px] text-gray-500 mt-2 font-mono">Cadastrado em: 01/06/2026</p>
        </div>

        {/* Informações Cadastrais */}
        <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 md:col-span-2 space-y-4">
          <h3 className="font-semibold text-gray-200 border-b border-navy-700 pb-2 flex items-center space-x-2">
            <FileText size={18} className="text-emerald-500" />
            <span>Dados de Cadastro (Pessoa Física)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 block text-xs">E-mail Institucional</span>
              <span className="text-gray-200 font-mono">joao.silva@certus.link</span>
            </div>
            <div>
              <span className="text-gray-500 block text-xs">Telefone</span>
              <span className="text-gray-200">(11) 99999-9999</span>
            </div>
            <div>
              <span className="text-gray-500 block text-xs">Documento (CPF)</span>
              <span className="text-gray-200 font-mono">***.***.***-00 (PII-Zero Ativo)</span>
            </div>
            <div>
              <span className="text-gray-500 block text-xs">Status do Onboarding</span>
              <span className="text-emerald-400 font-semibold">Desafios de Treino Concluídos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Dados Bancários & KYC */}
      <div className="bg-navy-800 rounded-xl p-6 border border-navy-700 space-y-6">
        <h3 className="font-semibold text-gray-200 border-b border-navy-700 pb-2 flex items-center space-x-2">
          <Landmark size={18} className="text-emerald-500" />
          <span>Faturamento & Dados Bancários para Saque (PIX)</span>
        </h3>

        {kycVerified ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 block text-xs">Chave PIX (CNPJ)</span>
                <span className="text-gray-200 font-mono">12.345.678/0001-90</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Banco Destinatário</span>
                <span className="text-gray-200">Banco Cooperativo do Brasil (Sicoob)</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start space-x-3">
              <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="text-amber-400 font-bold text-sm">Bloqueio de Dados de Faturamento por Pendência Fiscal (CNPJ/KYC)</h4>
                <p className="text-gray-400 text-xs mt-1">
                  Os dados de recebimento Pix estão trancados. Para liberar o cadastro de faturamento, você precisa enviar o cartão CNPJ ativo de sua empresa e assinar eletronicamente o termo de representação comercial.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm opacity-40 select-none pointer-events-none">
              <div>
                <label className="block text-gray-500 text-xs mb-1">Chave PIX (Chave Aleatória ou CNPJ)</label>
                <input 
                  type="text" 
                  disabled 
                  placeholder="Seu CNPJ ou chave PIX" 
                  className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2 text-gray-100 font-mono"
                />
              </div>
              <div>
                <label className="block text-gray-500 text-xs mb-1">Instituição Bancária</label>
                <input 
                  type="text" 
                  disabled 
                  placeholder="Nome do Banco" 
                  className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2 text-gray-100"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
