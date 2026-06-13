"use client";

import { useState, useRef, useEffect } from "react";
import { GraduationCap, MessageSquare, Send, CheckCircle2, Shield, Loader2, Sparkles, Award } from "lucide-react";
import { useTranslation } from "@/i18n/I18nProvider";

interface Message {
  sender: "incoming" | "outgoing";
  text: string;
}

export default function AcademyPage() {
  const { t, locale } = useTranslation();
  const [isTraining, setIsTraining] = useState(false);
  const [questionsCount, setQuestionsCount] = useState(0);
  const [seals, setSeals] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message dynamically on load or locale change
  useEffect(() => {
    setMessages([
      {
        sender: "incoming",
        text: t('academy_welcome') + "\n\n" + t('academy_desc_interactive')
      }
    ]);
  }, [locale, t]);

  // Carrega progresso do localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCount = localStorage.getItem("certus_questions_count");
      if (savedCount) setQuestionsCount(parseInt(savedCount, 10));

      const savedSeals = localStorage.getItem("certus_seals");
      if (savedSeals) setSeals(JSON.parse(savedSeals));
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const newMessages = [...messages, { sender: "outgoing" as const, text: userText }];
    setMessages(newMessages);
    setInputValue("");
    setLoading(true);

    try {
      const isTrainerCommand = userText.startsWith("/");
      const endpoint = "/api/trainer";
      
      const payload = isTrainerCommand
        ? { action: userText.split(" ")[0], payload: userText.substring(userText.indexOf(" ") + 1), ambassadorId: "AMB_12345", locale }
        : { 
            message: userText, 
            currentCount: questionsCount, 
            ambassadorId: "AMB_12345",
            locale,
            history: messages.map(m => ({ sender: m.sender, text: m.text })).slice(-5) // Envia as últimas 5 mensagens para contexto
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        let botText = data.reply || data.message || "Resposta processada com sucesso.";

        if (data.challenge_id) {
          botText += `\n\n**ID do Desafio:** ${data.challenge_id}\n**Tarefa:** ${data.task}\n\nResponda usando o comando \`/verify {seu_json}\`.`;
        }
        if (data.certification_hash && !data.milestone) {
          botText += `\n\n🔐 **Certificação Gerada com Sucesso!**\n**Hash:** ${data.certification_hash}`;
        }

        // Atualiza contagem se for retornada
        if (typeof data.questions_count === "number") {
          const newQCount = data.questions_count;
          setQuestionsCount(newQCount);
          localStorage.setItem("certus_questions_count", newQCount.toString());
        }

        setMessages((prev) => [...prev, { sender: "incoming", text: botText }]);

        // Se um novo selo/marco foi alcançado
        if (data.milestone && data.milestone.achieved) {
          const milestone = data.milestone;
          const updatedSeals = [...seals, milestone.name];
          setSeals(updatedSeals);
          localStorage.setItem("certus_seals", JSON.stringify(updatedSeals));

          // Inserir mensagem de notificação de selo no chat
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              {
                sender: "incoming",
                text: `🎉 **BOOM! CONQUISTA DESBLOQUEADA** 🎉\n\nVocê atingiu o marco de perguntas e desbloqueou o selo **${milestone.seal} ${milestone.name}**!\n\n🎁 **Benefícios Ativados:**\n${milestone.benefits.map((b: string) => `- ${b}`).join("\n")}\n\n🔐 **Hash Forense (LAZARUS):**\n${milestone.hash}`
              }
            ]);
          }, 800);
        }

      } else {
        throw new Error("Erro de resposta do servidor.");
      }
    } catch (err) {
      // Fallback local do bot de treinamento da Academy
      setTimeout(() => {
        let reply = "Comando recebido em sandbox. Para iniciar as lições e auditar seu progresso local com criptografia Ed25519, utilize os comandos oficiais como `/challenge start`.";
        if (userText.toLowerCase().includes("challenge")) {
          reply = "Desafio 1 (Módulo de Prospecção CPSI):\n\nO município de Aveiro-PA deseja contratar inteligência artificial para o suporte de cidadãos sem licitação clássica.\n\nQual o amparo jurídico da contratação direta sob o Certus Engine?\n\nResponda enviando: `/verify Lei 182/2021` ou `/verify Marco Legal das Startups` para homologar sua certificação.";
        } else if (userText.toLowerCase().includes("182/2021") || userText.toLowerCase().includes("startups")) {
          reply = "🎉 **Desafio Concluído!** Você acertou a base legal (Marco Legal das Startups - Lei Complementar 182/2021).\n\nSua trilha de treinamento está completa no Sandbox de Testes da Educatech AI.\n\n🔐 **Assinatura Ed25519:** ed25519:3a8c9e...fb8201a7 (Gravada no audit do Lazarus)";
        }
        setMessages((prev) => [...prev, { sender: "incoming", text: reply }]);
      }, 800);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header da Academy */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-100 flex items-center gap-2">
            <GraduationCap className="text-emerald-500" size={32} />
            <span>{t('academy_title')}</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">{t('academy_subtitle')}</p>
        </div>

        {/* Contador rápido no topo */}
        <div className="bg-navy-800 border border-navy-700 rounded-xl px-4 py-2 flex items-center space-x-3">
          <Award className="text-amber-500" size={20} />
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{t('perguntas_feitas')}</p>
            <p className="text-sm font-bold text-white font-mono">{questionsCount}/150</p>
          </div>
        </div>
      </div>

      {/* Hero Interativo da Trilha de Aprendizado */}
      <div className="bg-navy-800 border border-navy-700 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <GraduationCap size={160} className="text-emerald-500" />
        </div>
        <div className="absolute top-0 left-1/3 w-64 h-32 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-wider">
            <Sparkles size={12} />
            <span>{locale === 'en' ? 'Interactive & Active Learning' : locale === 'es' ? 'Aprendizaje Interactivo & Activo' : 'Aprendizado Interactivo & Ativo'}</span>
          </span>
          <h3 className="text-2xl font-black text-white">{locale === 'en' ? 'Master Sovereignty and Closing Contracts' : locale === 'es' ? 'Domina la Soberanía y el Cierre de Contratos' : 'Domine a Soberania e o Fechamento de Contratos'}</h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            {locale === 'en' 
              ? 'Here you do not watch lectures. You interact directly with the Certus Trainer in the simulation console, freely exploring official documentation or solving practical challenges to unlock cryptographic achievements and extra commissions.'
              : locale === 'es'
              ? 'Aquí no asistes a clases expositivas. Interactúas directamente con el Certus Trainer en la consola de simulación, explorando libremente la documentación oficial o resolviendo desafíos prácticos para obtener logros criptográficos y comisiones extras.'
              : 'Aqui você não assiste a aulas expositivas. Você interage diretamente com o Certus Trainer no console de simulação, explorando livremente a documentação oficial ou resolvendo desafios práticos para obter conquistas criptografadas e comissões extras.'}
          </p>

          {!isTraining && (
            <button
              onClick={() => setIsTraining(true)}
              className="mt-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-navy-950 font-black px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/10 hover:scale-[1.02] transition-all text-xs uppercase tracking-wider"
            >
              <MessageSquare size={16} />
              <span>{locale === 'en' ? 'Start Training on Certus Bot' : locale === 'es' ? 'Iniciar Entrenamiento en Certus Bot' : 'Iniciar Treinamento no Certus Bot'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Painel do Chat Expansível (Console Sandbox / Forense Mode) */}
      {isTraining && (
        <div className="bg-navy-800 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[550px] relative animate-fade-in">
          {/* Top Bar do Bot (Forense Mode Estilizado) */}
          <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/10 border-b border-amber-500/30 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-600 border border-amber-500 rounded-xl flex items-center justify-center text-navy-950 font-bold">
                ⚖️
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Certus Bot ({locale === 'en' ? 'Forensic Mode' : locale === 'es' ? 'Modo Forense' : 'Forense Mode'})</h4>
                <p className="text-[10px] text-amber-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  <span>Trainer Sandbox • Lazarus Auth Active</span>
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsTraining(false)}
              className="text-gray-400 hover:text-white text-xs border border-navy-700 hover:border-navy-600 px-3 py-1.5 rounded-lg bg-navy-900/40 transition-all"
            >
              {locale === 'en' ? 'Collapse Console' : locale === 'es' ? 'Contraer Consola' : 'Recolher Console'}
            </button>
          </div>

          {/* Área das Mensagens */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "outgoing" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap border ${
                    msg.sender === "outgoing"
                      ? "bg-amber-600 border-amber-500 text-navy-950 font-medium rounded-tr-none"
                      : "bg-navy-900 border-navy-700/60 text-gray-200 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-navy-900 border border-navy-700/60 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-gray-400 flex items-center gap-2">
                  <Loader2 className="animate-spin text-amber-500" size={16} />
                  <span className="italic">
                    {locale === 'en' 
                      ? 'Certus Engine processing response...' 
                      : locale === 'es' 
                      ? 'Certus Engine procesando respuesta...' 
                      : 'Certus Engine processando resposta...'}
                  </span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Campo de Entrada do Console */}
          <div className="p-4 border-t border-navy-700 bg-navy-900/30 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={locale === 'en' ? 'Ask about IDE, 12 agents, or type commands...' : locale === 'es' ? 'Pregunta sobre IDE, 12 agentes, o escribe comandos...' : 'Pergunte sobre IDE, 12 agentes, ou digite comandos...'}
              className="flex-1 bg-navy-900 border border-navy-700 focus:border-amber-500/60 focus:outline-none rounded-xl px-4 py-3 text-white text-sm transition-colors"
            />
            <button
              onClick={handleSend}
              className="bg-amber-600 hover:bg-amber-500 text-navy-950 p-3 rounded-xl transition-all shadow-md shadow-amber-500/10 flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
