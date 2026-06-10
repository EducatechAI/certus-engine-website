"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { Shield, Lock, CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  email: z.string().email("E-mail inválido"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  type: z.enum(["PF", "PJ"]),
  document: z.string().min(11, "Documento inválido"), // validação cpf customizada idealmente
  linkedin: z.string().url("URL do LinkedIn inválida").optional().or(z.literal("")),
  pixKey: z.string().min(5, "Chave PIX é obrigatória"),
  pixName: z.string().min(3, "Nome do titular do PIX é obrigatório"),
  pixBank: z.string().min(2, "Banco é obrigatório"),
  termsPartner: z.boolean().refine(val => val === true, "Aceite o Termo de Parceria"),
  termsLgpd: z.boolean().refine(val => val === true, "Aceite os termos da LGPD"),
  termsAntiCorruption: z.boolean().refine(val => val === true, "Aceite a política Anticorrupção"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterWizard() {
  const [step, setStep] = useState(1);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      type: "PF",
      termsPartner: false,
      termsLgpd: false,
      termsAntiCorruption: false,
    }
  });

  const watchTerms = watch(["termsPartner", "termsLgpd", "termsAntiCorruption"]);
  const allTermsAccepted = watchTerms.every(Boolean);

  const nextStep = async (fieldsToValidate: (keyof RegisterFormValues)[]) => {
    const isValid = await trigger(fieldsToValidate);
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: RegisterFormValues) => {
    if (!turnstileToken) {
      setErrorMsg("Validação Anti-Bot obrigatória (Turnstile).");
      return;
    }
    
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/v1/public/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erro ao registrar");
      }

      // Sucesso
      router.push("/academy");
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-12 pb-24 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Onboarding Embaixador</h1>
          <p className="text-gray-400">Processo de KYC e Qualificação</p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-navy-700 -z-10"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 transition-all duration-300 -z-10" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
          
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${step >= num ? 'bg-emerald-500 border-emerald-500 text-navy-900' : 'bg-navy-900 border-navy-700 text-gray-500'}`}>
              {num}
            </div>
          ))}
        </div>

        <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {errorMsg && (
            <div className="bg-status-danger/10 border border-status-danger/20 text-status-danger p-4 rounded-lg mb-6">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* ETAPA 1 */}
            {step === 1 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-gray-100 flex items-center mb-6"><Shield className="text-emerald-500 mr-2" size={24} /> Identidade e Contato</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Nome Completo</label>
                  <input {...register("fullName")} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none" />
                  {errors.fullName && <p className="text-status-danger text-xs mt-1">{errors.fullName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">E-mail</label>
                  <input {...register("email")} type="email" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none" />
                  {errors.email && <p className="text-status-danger text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">WhatsApp</label>
                  <input {...register("whatsapp")} placeholder="(11) 99999-9999" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none" />
                  {errors.whatsapp && <p className="text-status-danger text-xs mt-1">{errors.whatsapp.message}</p>}
                </div>

                <div className="pt-4 text-right">
                  <button type="button" onClick={() => nextStep(["fullName", "email", "whatsapp"])} className="bg-emerald-500 text-navy-900 font-bold py-3 px-6 rounded-lg inline-flex items-center hover:bg-emerald-400 transition-colors">
                    Próxima Etapa <ChevronRight size={20} className="ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 2 */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-gray-100 flex items-center mb-6"><CheckCircle className="text-emerald-500 mr-2" size={24} /> Perfil Fiscal</h2>
                
                <div className="flex space-x-4 mb-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" value="PF" {...register("type")} className="text-emerald-500 bg-navy-900 border-navy-700 focus:ring-emerald-500" />
                    <span className="text-gray-300">Pessoa Física</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" value="PJ" {...register("type")} className="text-emerald-500 bg-navy-900 border-navy-700 focus:ring-emerald-500" />
                    <span className="text-gray-300">Pessoa Jurídica</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">CPF / CNPJ</label>
                  <input {...register("document")} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none font-mono" />
                  {errors.document && <p className="text-status-danger text-xs mt-1">{errors.document.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">URL LinkedIn (Opcional, mas recomendado)</label>
                  <input {...register("linkedin")} type="url" placeholder="https://linkedin.com/in/seu-perfil" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none" />
                  {errors.linkedin && <p className="text-status-danger text-xs mt-1">{errors.linkedin.message}</p>}
                </div>

                <div className="pt-4 flex justify-between">
                  <button type="button" onClick={prevStep} className="text-gray-400 hover:text-gray-100 py-3 px-6 rounded-lg inline-flex items-center transition-colors">
                    <ChevronLeft size={20} className="mr-1" /> Voltar
                  </button>
                  <button type="button" onClick={() => nextStep(["type", "document", "linkedin"])} className="bg-emerald-500 text-navy-900 font-bold py-3 px-6 rounded-lg inline-flex items-center hover:bg-emerald-400 transition-colors">
                    Próxima Etapa <ChevronRight size={20} className="ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 3 */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-100 flex items-center"><Lock className="text-emerald-500 mr-2" size={24} /> Remuneração</h2>
                  <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 font-mono flex items-center">AES-256</span>
                </div>
                
                <p className="text-sm text-gray-400 mb-4 bg-navy-900 p-3 rounded-lg border border-navy-700">
                  🔒 Estes dados serão criptografados em repouso no banco de dados. Eles serão usados para o payout das comissões via motor Asaas.
                </p>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Chave PIX</label>
                  <input {...register("pixKey")} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none" />
                  {errors.pixKey && <p className="text-status-danger text-xs mt-1">{errors.pixKey.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Nome do Titular do PIX</label>
                  <input {...register("pixName")} className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none" />
                  {errors.pixName && <p className="text-status-danger text-xs mt-1">{errors.pixName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Instituição Bancária</label>
                  <input {...register("pixBank")} placeholder="Nubank, Itaú..." className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-3 text-gray-100 focus:border-emerald-500 focus:outline-none" />
                  {errors.pixBank && <p className="text-status-danger text-xs mt-1">{errors.pixBank.message}</p>}
                </div>

                <div className="pt-4 flex justify-between">
                  <button type="button" onClick={prevStep} className="text-gray-400 hover:text-gray-100 py-3 px-6 rounded-lg inline-flex items-center transition-colors">
                    <ChevronLeft size={20} className="mr-1" /> Voltar
                  </button>
                  <button type="button" onClick={() => nextStep(["pixKey", "pixName", "pixBank"])} className="bg-emerald-500 text-navy-900 font-bold py-3 px-6 rounded-lg inline-flex items-center hover:bg-emerald-400 transition-colors">
                    Próxima Etapa <ChevronRight size={20} className="ml-1" />
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 4 */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-gray-100 flex items-center mb-2"><Shield className="text-emerald-500 mr-2" size={24} /> Compliance Jurídico</h2>
                <p className="text-sm text-gray-400 mb-6">Última etapa. Confirme os termos para habilitarmos seu perfil.</p>

                <div className="space-y-4">
                  <label className="flex items-start space-x-3 p-4 border border-navy-700 rounded-lg bg-navy-900/50 cursor-pointer hover:border-emerald-500/50 transition-colors">
                    <input type="checkbox" {...register("termsPartner")} className="mt-1 w-5 h-5 rounded border-navy-700 bg-navy-900 text-emerald-500 focus:ring-emerald-500/50" />
                    <div>
                      <span className="block text-gray-200 font-medium text-sm">Contrato de Parceria Comercial e Afiliação Tecnológica</span>
                      <span className="block text-gray-500 text-xs mt-1">Declaro ter lido e concordado com as regras de maturação de saques e tracking.</span>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 border border-navy-700 rounded-lg bg-navy-900/50 cursor-pointer hover:border-emerald-500/50 transition-colors">
                    <input type="checkbox" {...register("termsLgpd")} className="mt-1 w-5 h-5 rounded border-navy-700 bg-navy-900 text-emerald-500 focus:ring-emerald-500/50" />
                    <div>
                      <span className="block text-gray-200 font-medium text-sm">Termos de Privacidade e LGPD</span>
                      <span className="block text-gray-500 text-xs mt-1">Autorizo o armazenamento criptografado dos meus dados de acordo com a lei vigente.</span>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-4 border border-navy-700 rounded-lg bg-navy-900/50 cursor-pointer hover:border-emerald-500/50 transition-colors">
                    <input type="checkbox" {...register("termsAntiCorruption")} className="mt-1 w-5 h-5 rounded border-navy-700 bg-navy-900 text-emerald-500 focus:ring-emerald-500/50" />
                    <div>
                      <span className="block text-gray-200 font-medium text-sm">Política Anticorrupção (CPSI/GovTech)</span>
                      <span className="block text-gray-500 text-xs mt-1">Garantia sob as penas da lei de não haver oferta de propinas a servidores.</span>
                    </div>
                  </label>
                </div>

                <div className="flex justify-center py-4">
                   <Turnstile 
                     siteKey="1x00000000000000000000AA" // Test key
                     onSuccess={(token) => setTurnstileToken(token)}
                     options={{ theme: 'dark' }}
                   />
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-navy-700">
                  <button type="button" onClick={prevStep} className="text-gray-400 hover:text-gray-100 py-3 px-6 rounded-lg inline-flex items-center transition-colors">
                    <ChevronLeft size={20} className="mr-1" /> Voltar
                  </button>
                  <button 
                    type="submit" 
                    disabled={!allTermsAccepted || isSubmitting}
                    className="bg-emerald-500 text-navy-900 font-bold py-3 px-8 rounded-lg inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-400 transition-colors"
                  >
                    {isSubmitting ? "Processando..." : "Criar Minha Conta"}
                  </button>
                </div>
              </div>
            )}
            
          </form>
        </div>
      </div>
    </div>
  );
}
