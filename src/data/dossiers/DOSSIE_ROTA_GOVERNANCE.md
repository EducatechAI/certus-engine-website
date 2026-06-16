# 📁 DOSSIÊ TÉCNICO: IMPLEMENTAÇÃO DA ROTA /GOVERNANCE

**Protocolo:** CERTUS-WEB-GOV-2026-001  
**Data de Atualização:** 2026-06-14  
**Status:** ✅ IMPLEMENTADO E VALIDADO EM PRODUÇÃO  
**Responsável:** Equipe de Engenharia Certus  

---

## 🎯 1. RESUMO EXECUTIVO
A rota pública `/governance` foi implementada no site do Certus Engine para materializar a mudança de paradigma no mercado de GRC TI: a transição de "frameworks de reivindicação" para "infraestrutura de prova criptográfica determinística". A página serve como principal ativo de conversão para decisores de GovTech (TCE/TCU, Prefeituras) e Enterprise, demonstrando visual e tecnicamente como o Certus supera as limitações de COBIT, ISOs e TPRM tradicionais.

---

## ⚙️ 2. ARQUITETURA E IMPLEMENTAÇÃO TÉCNICA

### 2.1. Internacionalização (i18n)
- **Arquivo:** `src/i18n/translations.ts`
- **Idiomas Suportados:** Português (pt-BR), Inglês (en), Espanhol (es).
- **Regra de Soberania:** Termos técnicos proprietários (ex: *Lazarus Vault, Wolfdog, PII-Zero, Tribunal de CPUs*) **NÃO** são traduzidos, mantendo a identidade da marca em todos os idiomas.

### 2.2. Design System & Frontend (Glassmorphism Premium)
- **Arquivo Principal:** `src/app/(public)/governance/page.tsx`
- **Framework:** Next.js App Router + Tailwind CSS (Zero CSS customizado, 100% utility classes).
- **Paleta de Cores:** 
  - Fundo: Dark Mode profundo (`#0A0E17` / `bg-slate-950`).
  - Destaque Primário: Emerald Green (`emerald-500` / `#00C9A7`).
  - Efeitos: Gradientes radiais sutis em Cyan/Emerald com `backdrop-blur-xl` e `bg-slate-900/40` para o efeito de vidro (glassmorphism).
- **Performance:** Otimizado para First Load JS mínimo e renderização estática.

---

## 📐 3. ESTRUTURA DE CONTEÚDO (WIREFRAME LÓGICO)

A página é dividida em 6 seções estratégicas de conversão:

1. **Hero Section:** Badge pulsante, headline de alto impacto ("GRC TI Deixou de Ser Sobre Frameworks. Agora É Sobre Prova Criptográfica") e CTAs dinâmicos para o Benchmark Report.
2. **O Problema:** Grid de cards em glassmorphism explicando por que frameworks abstratos falham sob auditorias estáticas e geram riscos de IA não mitigados.
3. **Solução Certus (5 Pilares):** Apresentação técnica de como o Certus materializa: COBIT, ISO 31000, ISO 42001, TPRM e Cyber Risk (citando agentes como Lazarus, Sentinel, Wolfdog).
4. **Tabela Comparativa Interativa:** Contraste direto entre "Framework Tradicional (Reivindicação)" e "Certus Engine (Prova Criptográfica)", com checks visuais de vantagens determinísticas.
5. **Caso de Uso (Timeline Interativa):** Visualização lado a lado da Auditoria Governamental (TCE/TCU) comparando o cenário "Sem Certus (Tradicional - semanas de retrabalho)" vs "Com Certus (0.4s com hash imutável)".
6. **Footer/CTA Final:** Seção de conversão destacada com link direto para contato com a Engenharia de Governança.

---

## 🧪 4. VALIDAÇÃO DE INTEGRIDADE E QA

- **Build de Produção:** `npm run build` executado com 100% de sucesso.
- **Métricas de Performance da Rota:**
  ```text
  Route (app)                              Size     First Load JS
  ├ ○ /governance                          3.56 kB         113 kB
  ```
- **Integração:** A rota respeita integralmente o `PublicLayout` global (cabeçalho, rodapé e provedor de idioma).
- **Testes Manuais:** Validado em Chrome/Edge (Desktop, Tablet, Mobile) com efeitos de blur e transparência renderizando corretamente. Troca de idioma (PT/EN/ES) funcionando sem perda de contexto.

---

## 🤖 5. INSTRUÇÕES PARA O CERTUS BOT (COMO USAR ESTE DADO)
Quando um usuário perguntar sobre:
- *"Como o Certus lida com COBIT, ISO ou TPRM?"*
- *"Onde posso ver a comparação do Certus com frameworks tradicionais?"*
- *"Vocês têm algo para mostrar a auditores do TCE/TCU?"*

O Bot **DEVE** responder citando esta implementação:
1. Afirmar que o Certus não substitui frameworks, mas os materializa em prova criptográfica.
2. Mencionar a Rota `/governance` do site oficial como fonte visual e interativa dessa comparação.
3. Citar o Caso de Uso da Timeline do TCE/TCU (redução de semanas para 0.4 segundos com hash imutável).
4. Reforçar que a arquitetura é 100% responsiva, multilíngue (PT/EN/ES) e otimizada para performance.
