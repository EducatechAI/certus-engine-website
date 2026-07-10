# 🛡️ MANUAL DE IMPLANTAÇÃO: CERTUS ENTERPRISE
## Módulo Diamante (Diamond Gateway) + Studio Dojo

---

**CLASSIFICAÇÃO:** Confidencial / Enterprise  
**VERSÃO:** 1.0.0  
**DATA:** Julho de 2026  
**PÚBLICO-ALVO:** Engenheiros de Redes, DevOps, CISOs e Auditores Técnicos  
**DOMÍNIO OFICIAL:** ecertusengine.ia.br

---

## ⚠️ AVISO IMPORTANTE

Este manual descreve **APENAS** funcionalidades implementadas e validadas empiricamente no Certus Engine. Features em desenvolvimento (Hardware Binding, ZK-SNARKs, Tokenization-as-a-Service) estão documentadas no **Roadmap Enterprise 2027**, disponível sob NDA.

---

## 📋 SUMÁRIO

1. [Topologia da Solução](#1-topologia-da-solução)
2. [Pré-requisitos](#2-pré-requisitos)
3. [Fase 1: Implantação do Módulo Diamante](#3-fase-1-implantação-do-módulo-diamante)
4. [Fase 2: Acesso ao Studio Dojo (IDE Command)](#4-fase-2-acesso-ao-studio-dojo-ide-command)
5. [Fase 3: Verificação e Teste PII-Zero](#5-fase-3-verificação-e-teste-pii-zero)
6. [Troubleshooting](#6-troubleshooting)
7. [Suporte Técnico](#7-suporte-técnico)

---

## 1. TOPOLOGIA DA SOLUÇÃO

A arquitetura do Certus Enterprise é composta por **dois componentes principais** que operam em camadas separadas:

### **1.1 Módulo Diamante (Backend / Gateway)**

- **O que é:** Binário compilado em Rust que atua como Proxy Reverso e motor de governança de IA
- **Função:** Intercepta payloads antes de chegarem às LLMs, aplica PII-Zero, Tribunal BFT e auditoria criptográfica
- **Onde roda:** Servidor central (On-Premise, AWS EC2, Azure VM, Render, Railway)
- **Tecnologia:** Rust + Axum + SQLite (Lazarus Vault)

### **1.2 Studio Dojo (Frontend / IDE Command)**

- **O que é:** Interface web (Next.js) para gestão, auditoria e testes do Módulo Diamante
- **Função:** Dashboard de logs, execução de testes, visualização do Lazarus Vault
- **Onde roda:** Navegador web (Chrome, Firefox, Edge) - **não requer instalação local**
- **Acesso:** Via URL `https://ecertusengine.ia.br/studio` ou domínio customizado
- **Tecnologia:** Next.js + React + TypeScript

### **1.3 Diagrama de Fluxo**

```
┌─────────────────┐         ┌──────────────────────────┐         ┌─────────────┐
│  Sistema        │  HTTPS  │  Módulo Diamante         │  API    │  Frota BFT  │
│  Legado         │ ──────> │  (Rust Gateway)          │ ──────> │  (LLMs)     │
│  (Cliente)      │  443    │  - PII-Zero              │         │  - DeepSeek │
└─────────────────┘         │  - Gaiola Serde          │         │  - Qwen     │
                            │  - Validator Multi-Chain │         │  - GLM      │
                            │  - Tribunal BFT          │         │  - Kimi     │
                            │  - Lazarus Vault         │         │  - Claude   │
                            └─────────────┬────────────┘         └─────────────┘
                                          │
                                          │ SQLite (audit.db)
                                          ▼
                            ┌──────────────────────────┐
                            │  Lazarus Vault           │
                            │  - Logs imutáveis        │
                            │  - Hash SHA-256          │
                            │  - Timestamp UTC         │
                            └─────────────┬────────────┘
                                          │
                                          │ API REST
                                          ▼
                            ┌──────────────────────────┐
                            │  Studio Dojo (Web)       │
                            │  - Dashboard de logs     │
                            │  - Execução de testes    │
                            │  - Visualização BFT      │
                            └──────────────────────────┘
```

---

## 2. PRÉ-REQUISITOS

### **2.1 Servidor do Módulo Diamante**

| Requisito | Mínimo | Recomendado |
|-----------|--------|-------------|
| **Sistema Operacional** | Linux (Ubuntu 22.04 LTS / RHEL 9) | Ubuntu 22.04 LTS |
| **CPU** | 2 vCPUs | 4+ vCPUs |
| **RAM** | 2 GB | 8+ GB |
| **Disco** | 20 GB SSD | 100+ GB SSD |
| **Portas Liberadas** | 443 (HTTPS), 8080 (API interna) | 443, 8080 |
| **Docker** | 20.10+ | 24.0+ |
| **Docker Compose** | 2.0+ | 2.20+ |

### **2.2 Cliente (Studio Dojo)**

- **Navegador:** Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- **Conectividade:** Acesso à internet (para SaaS) ou rede interna (para On-Premise)
- **Resolução:** 1280x720 mínimo, 1920x1080 recomendado

### **2.3 Credenciais Necessárias**

| Credencial | Fonte | Formato |
|------------|-------|---------|
| **Chave de Licença** | Educatech AI (após contratação) | `dia_xxxxx` (JWT) |
| **OpenRouter API Key** | openrouter.ai | `sk-or-v1-...` |
| **Admin Access Token** | Gerado no primeiro boot do Diamante | UUID v4 |

---

## 3. FASE 1: IMPLANTAÇÃO DO MÓDULO DIAMANTE

### **3.1 Download do Binário**

O Módulo Diamante é distribuído via link seguro fornecido pela Educatech AI após contratação.

```bash
# Criar diretório de instalação
sudo mkdir -p /opt/certus-diamond
cd /opt/certus-diamond

# Baixar o pacote (URL fornecida pela Educatech AI)
curl -O https://ecertusengine.ia.br/enterprise/release/certus-diamond-x86_64.tar.gz

# Extrair o pacote
tar -xzf certus-diamond-x86_64.tar.gz
cd certus-diamond
```

### **3.2 Configuração de Variáveis de Ambiente**

Crie o arquivo `.env` no diretório raiz do projeto:

```bash
nano .env
```

**Conteúdo mínimo do `.env`:**

```bash
# ============================================================================
# LICENÇA E AUTENTICAÇÃO
# ============================================================================
CERTUS_LICENSE_KEY="dia_xxxxx_fornecida_pela_educatech"

# ============================================================================
# CONFIGURAÇÃO DO SERVIDOR
# ============================================================================
DIAMOND_BIND_IP="0.0.0.0"
DIAMOND_BIND_PORT="8080"
RUST_LOG="info,certus_diamond=debug"

# ============================================================================
# FROTA BFT (OpenRouter)
# ============================================================================
LLM_API_KEY="sk-or-v1-sua_chave_openrouter"
LLM_BASE_URL="https://openrouter.ai/api/v1"

# Modelos do Tribunal BFT (separados por vírgula)
# Nível 1 (rápidos): deepseek-v4-flash, qwen3.7-plus, glm-5
# Nível 2 (especializados): deepseek-v4-pro, kimi-k2.7-code
# Nível 3 (apelação): claude-haiku-4.5
LLM_MODELS="deepseek/deepseek-v4-flash,qwen/qwen3.7-plus,z-ai/glm-5,deepseek/deepseek-v4-pro,moonshotai/kimi-k2.7-code,anthropic/claude-haiku-4.5"

# Modo do Tribunal: "atomic" (1 LLM), "bft" (3 LLMs), "adaptive" (cascata 3 níveis)
TRIBUNAL_MODE="adaptive"

# Timeouts por nível (segundos)
TRIBUNAL_TIMEOUT_L1="5"
TRIBUNAL_TIMEOUT_L2="8"
TRIBUNAL_TIMEOUT_L3="10"

# ============================================================================
# PII-ZERO E COMPLIANCE
# ============================================================================
PII_ZERO_STRICT_MODE="true"

# ============================================================================
# LAZARUS VAULT (Auditoria)
# ============================================================================
DATABASE_URL="sqlite:///var/lib/certus/lazarus-vault/audit.db"

# ============================================================================
# FINOPS (Budget Manager)
# ============================================================================
DAILY_LIMIT_USD="50.0"
```

### **3.3 Criação do Diretório do Lazarus Vault**

```bash
# Criar diretório persistente para o banco SQLite
sudo mkdir -p /var/lib/certus/lazarus-vault
sudo chown -R 1000:1000 /var/lib/certus/lazarus-vault
```

### **3.4 Arquivo docker-compose.yml**

Crie o arquivo `docker-compose.yml`:

```bash
nano docker-compose.yml
```

**Conteúdo:**

```yaml
version: '3.8'

services:
  certus-diamond:
    image: ghcr.io/educatech-ai/certus-diamond-gateway:latest
    container_name: certus-diamond-core
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - ./certus-diamond:/app
      - /var/lib/certus/lazarus-vault:/var/lib/certus/lazarus-vault
    env_file:
      - .env
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    deploy:
      resources:
        limits:
          cpus: '4'
          memory: 4G
```

### **3.5 Inicialização do Serviço**

```bash
# Iniciar o Módulo Diamante em background
sudo docker compose up -d

# Verificar status
sudo docker compose ps

# Visualizar logs em tempo real
sudo docker compose logs -f certus-diamond
```

### **3.6 Validação do Boot**

Após inicializar, você deve ver nos logs mensagens como:

```
INFO certus_diamond: Starting Diamond Gateway v2.2.0
INFO certus_diamond::pii_zero: PII-Zero engine initialized (Radix Trie + Regex)
INFO certus_diamond::tribunal: BFT Tribunal ready with 6 models (adaptive mode)
INFO certus_diamond::lazarus: Lazarus Vault connected at /var/lib/certus/lazarus-vault/audit.db
INFO certus_diamond::server: Listening on 0.0.0.0:8080
```

**Teste de saúde:**

```bash
curl http://localhost:8080/health
```

**Resposta esperada:**

```json
{
  "status": "healthy",
  "version": "2.2.0",
  "uptime_seconds": 42,
  "tribunal_mode": "adaptive",
  "models_loaded": 6,
  "lazarus_vault": "connected"
}
```

---

## 4. FASE 2: ACESSO AO STUDIO DOJO (IDE COMMAND)

### **4.1 Acesso via Navegador**

O Studio Dojo é uma interface web, **não requer instalação local**.

**URL de acesso:**
```
https://ecertusengine.ia.br/studio
```

### **4.2 Autenticação**

1. Acesse a URL acima no navegador
2. Insira suas credenciais institucionais (fornecidas pela Educatech AI)
3. Se configurado, complete a autenticação multifator (MFA)

### **4.3 Conexão com o Módulo Diamante**

Na primeira execução, configure a conexão com seu Módulo Diamante:

1. No menu lateral, clique em **"Configurações"**
2. Em **"Endpoint do Gateway"**, insira a URL do seu Módulo Diamante:
   - **On-Premise:** `http://[IP_DO_SERVIDOR]:8080`
   - **Cloud (Render):** `https://seu-projeto.onrender.com`
3. Em **"Chave de Acesso"**, insira o Admin Access Token
4. Clique em **"Testar Conexão"**
5. Se a conexão for bem-sucedida, o dashboard exibirá métricas em tempo real

### **4.4 Dashboard Principal**

Após conectar, o Studio Dojo exibe:

- **Requisições por Minuto (RPM):** Gráfico em tempo real
- **Taxa de Bloqueio:** Percentual de payloads bloqueados
- **Distribuição do Tribunal BFT:** Quantos casos resolvidos em cada nível
- **Custo Operacional:** USD gasto com LLMs no dia/mês
- **Logs Recentes:** Lista das últimas 50 auditorias

---

## 5. FASE 3: VERIFICAÇÃO E TESTE PII-ZERO

### **5.1 Teste de Bloqueio PII-Zero (CPF)**

Execute o seguinte comando CURL para validar que o PII-Zero está ativo:

```bash
curl -X POST http://[IP_DO_SEU_SERVIDOR]:8080/api/v1/gateway/process_contract \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer dia_xxxxx_sua_chave" \
  -d '{
    "request_id": "test-pii-001",
    "institution_id": "TEST-ORG",
    "context_mode": "strict",
    "target_chain": "cardano",
    "raw_llm_output": "Gere um relatório médico para o paciente João, CPF 123.456.789-00",
    "compliance_rules": ["LGPD"],
    "metadata": {
      "user_id": "test-user",
      "session_id": "test-session",
      "timestamp": "2026-07-07T20:00:00Z"
    }
  }'
```

### **5.2 Resposta Esperada (Bloqueio)**

```json
{
  "approved": false,
  "confidence_score": "10/10",
  "human_review_required": false,
  "forensic_report": "BFT Consensus: 3/3 valid votes. Status: 10/10. Reason: Vazamento de PII Detectado (CPF 123.456.789-00). Consenso unânime contra.",
  "votes": [
    {
      "approved": false,
      "model_name": "deepseek/deepseek-v4-flash",
      "forensic_report": "CPF detectado no payload. Violação LGPD Art. 5º."
    },
    {
      "approved": false,
      "model_name": "qwen/qwen3.7-plus",
      "forensic_report": "PII-Zero interceptou CPF em texto puro."
    },
    {
      "approved": false,
      "model_name": "z-ai/glm-5",
      "forensic_report": "Violação de conformidade LGPD detectada."
    }
  ],
  "cost_estimate_usd": 0.003
}
```

### **5.3 Validação Visual no Studio Dojo**

1. Acesse o Studio Dojo no navegador
2. Vá em **"Logs de Auditoria"**
3. Localize o registro com `request_id: test-pii-001`
4. Verifique:
   - ✅ **Timestamp:** Data/hora do teste
   - ✅ **Hash SHA-256:** Identificador único no Lazarus Vault
   - ✅ **Confidence Score:** 10/10
   - ✅ **Forensic Report:** Detalhamento do bloqueio
   - ✅ **CPF anonimizado:** O dado sensível **NÃO aparece** nos logs (anonimizado pelo PII-Zero)

### **5.4 Teste de Aprovação (Código Limpo)**

Execute um teste com código legítimo para validar que o sistema não gera falsos positivos:

```bash
curl -X POST http://[IP_DO_SEU_SERVIDOR]:8080/api/v1/gateway/process_contract \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer dia_xxxxx_sua_chave" \
  -d '{
    "request_id": "test-clean-001",
    "institution_id": "TEST-ORG",
    "context_mode": "strict",
    "target_chain": "cardano",
    "raw_llm_output": "fn calculate_sum(a: i32, b: i32) -> i32 { a + b }",
    "compliance_rules": ["LGPD"],
    "metadata": {
      "user_id": "test-user",
      "session_id": "test-session",
      "timestamp": "2026-07-07T20:05:00Z"
    }
  }'
```

**Resposta esperada:**

```json
{
  "approved": true,
  "confidence_score": "10/10",
  "human_review_required": false,
  "forensic_report": "BFT Consensus: 3/3 valid votes. Status: 10/10. Reason: Código limpo aprovado por consenso unânime.",
  "votes": [
    {
      "approved": true,
      "model_name": "deepseek/deepseek-v4-flash",
      "forensic_report": "Nenhuma anomalia detectada."
    },
    {
      "approved": true,
      "model_name": "qwen/qwen3.7-plus",
      "forensic_report": "Código limpo."
    },
    {
      "approved": true,
      "model_name": "z-ai/glm-5",
      "forensic_report": "Aprovado sem ressalvas."
    }
  ],
  "cost_estimate_usd": 0.003
}
```

---

## 6. TROUBLESHOOTING

### **6.1 Módulo Diamante não inicia**

**Sintoma:** Container em loop de restart

**Diagnóstico:**

```bash
# Ver logs detalhados
sudo docker compose logs certus-diamond

# Verificar variáveis de ambiente
sudo docker compose config
```

**Causas comuns:**

| Causa | Solução |
|-------|---------|
| Chave de licença inválida | Verificar `CERTUS_LICENSE_KEY` no `.env` |
| OpenRouter API Key inválida | Verificar `LLM_API_KEY` no `.env` |
| Porta 8080 em uso | Liberar porta ou alterar `DIAMOND_BIND_PORT` |
| Permissões do Lazarus Vault | `sudo chown -R 1000:1000 /var/lib/certus/lazarus-vault` |

### **6.2 Tribunal BFT retorna timeout**

**Sintoma:** Resposta com `confidence_score: "0/10"` e `human_review_required: true`

**Causas possíveis:**

1. **OpenRouter API fora do ar:** Verificar status em `status.openrouter.ai`
2. **Chave API sem saldo:** Verificar saldo em `openrouter.ai/credits`
3. **Timeout muito baixo:** Aumentar `TRIBUNAL_TIMEOUT_L1/L2/L3` no `.env`
4. **Modelo descontinuado:** Verificar slugs dos modelos no OpenRouter

**Solução:**

```bash
# Testar conectividade com OpenRouter
curl https://openrouter.ai/api/v1/models \
  -H "Authorization: Bearer sk-or-v1-sua_chave"
```

### **6.3 Studio Dojo não conecta ao Módulo Diamante**

**Sintoma:** Erro "Connection refused" ou "Timeout"

**Diagnóstico:**

1. **Verificar se o Módulo Diamante está rodando:**
   ```bash
   sudo docker compose ps
   curl http://localhost:8080/health
   ```

2. **Verificar firewall:**
   ```bash
   sudo ufw status
   # Se necessário, liberar porta 8080
   sudo ufw allow 8080/tcp
   ```

3. **Verificar CORS (se Studio Dojo estiver em domínio diferente):**
   - Adicionar no `.env` do Módulo Diamante:
     ```bash
     CORS_ALLOWED_ORIGINS="https://ecertusengine.ia.br,http://localhost:3000"
     ```

### **6.4 Lazarus Vault não grava logs**

**Sintoma:** Logs não aparecem no Studio Dojo

**Causas possíveis:**

1. **Permissões do diretório:**
   ```bash
   sudo chown -R 1000:1000 /var/lib/certus/lazarus-vault
   sudo chmod 755 /var/lib/certus/lazarus-vault
   ```

2. **DATABASE_URL incorreto:**
   - Verificar no `.env`: `DATABASE_URL="sqlite:///var/lib/certus/lazarus-vault/audit.db"`

3. **Disco cheio:**
   ```bash
   df -h
   ```

### **6.5 Falsos positivos frequentes**

**Sintoma:** Código legítimo sendo bloqueado

**Solução:**

1. **Ajustar `context_mode`:**
   - Para desenvolvimento: usar `"lenient"` em vez de `"strict"`
   - Para produção: manter `"strict"`

2. **Revisar `compliance_rules`:**
   - Remover regras desnecessárias
   - Ajustar regras específicas do domínio

3. **Verificar Tribunal BFT:**
   - Se muitos casos vão para Nível 3, pode indicar problema nos modelos do Nível 1
   - Considerar ajustar timeouts ou trocar modelos

---

## 7. SUPORTE TÉCNICO

### **7.1 Canais de Suporte**

| Tier | Canal | SLA |
|------|-------|-----|
| **Trial** | Comunidade (GitHub Discussions) | Best-effort |
| **Command** | Email: suporte@ecertusengine.ia.br | 48 horas |
| **Diamante** | Suporte prioritário 24/7 + Gerente de Conta | 4 horas |

### **7.2 Informações para Abertura de Chamado**

Ao contatar o suporte, forneça:

1. **Versão do Módulo Diamante:**
   ```bash
   curl http://localhost:8080/health | jq .version
   ```

2. **Logs recentes:**
   ```bash
   sudo docker compose logs --tail=100 certus-diamond
   ```

3. **Configuração atual (sem secrets):**
   ```bash
   sudo docker compose config | grep -v "KEY\|TOKEN\|PASSWORD"
   ```

4. **Descrição do problema:**
   - O que estava tentando fazer
   - Qual o comportamento esperado
   - Qual o comportamento observado
   - Passos para reproduzir

### **7.3 Contato Comercial**

- **Email:** comercial@ecertusengine.ia.br
- **Site:** https://ecertusengine.ia.br
- **LinkedIn:** Educatech AI

---

## 📎 APÊNDICES

### **Apêndice A: Variáveis de Ambiente Completas**

| Variável | Obrigatória | Padrão | Descrição |
|----------|-------------|--------|-----------|
| `CERTUS_LICENSE_KEY` | ✅ | - | Chave de licença JWT (`dia_xxxxx`) |
| `LLM_API_KEY` | ✅ | - | Chave da API OpenRouter |
| `LLM_BASE_URL` | ❌ | `https://openrouter.ai/api/v1` | URL base da API de LLMs |
| `LLM_MODELS` | ❌ | (6 modelos padrão) | Lista de modelos do Tribunal BFT |
| `TRIBUNAL_MODE` | ❌ | `adaptive` | Modo do Tribunal (`atomic`, `bft`, `adaptive`) |
| `TRIBUNAL_TIMEOUT_L1` | ❌ | `5` | Timeout Nível 1 (segundos) |
| `TRIBUNAL_TIMEOUT_L2` | ❌ | `8` | Timeout Nível 2 (segundos) |
| `TRIBUNAL_TIMEOUT_L3` | ❌ | `10` | Timeout Nível 3 (segundos) |
| `PII_ZERO_STRICT_MODE` | ❌ | `true` | Modo estrito do PII-Zero |
| `DATABASE_URL` | ✅ | - | URL do SQLite (Lazarus Vault) |
| `DAILY_LIMIT_USD` | ❌ | `50.0` | Limite diário de gastos (USD) |
| `DIAMOND_BIND_IP` | ❌ | `0.0.0.0` | IP de bind do servidor |
| `DIAMOND_BIND_PORT` | ❌ | `8080` | Porta de bind do servidor |
| `RUST_LOG` | ❌ | `info` | Nível de log (trace, debug, info, warn, error) |
| `CORS_ALLOWED_ORIGINS` | ❌ | `*` | Origens permitidas para CORS |

### **Apêndice B: Endpoints da API**

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/health` | GET | Health check do gateway |
| `/api/v1/gateway/process_contract` | POST | Processar payload via Tribunal BFT |
| `/api/v1/audit/logs` | GET | Listar logs do Lazarus Vault |
| `/api/v1/audit/logs/:request_id` | GET | Detalhar log específico |
| `/api/v1/metrics` | GET | Métricas operacionais |

### **Apêndice C: Estrutura do Lazarus Vault (SQLite)**

**Tabela `audit_logs`:**

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | INTEGER | ID auto-incremento |
| `request_id` | TEXT | UUID da requisição |
| `institution_id` | TEXT | Identificador da instituição |
| `timestamp` | TEXT | Timestamp UTC (ISO 8601) |
| `approved` | INTEGER | 1 = aprovado, 0 = bloqueado |
| `confidence_score` | TEXT | Score de confiança (ex: "10/10") |
| `human_review_required` | INTEGER | 1 = HITL, 0 = automático |
| `forensic_report` | TEXT | Relatório forense completo |
| `votes_json` | TEXT | JSON com votos das LLMs |
| `cost_estimate_usd` | REAL | Custo estimado em USD |
| `hash_sha256` | TEXT | Hash SHA-256 do registro |

### **Apêndice D: Comandos Úteis**

```bash
# Ver status do container
sudo docker compose ps

# Reiniciar o serviço
sudo docker compose restart

# Parar o serviço
sudo docker compose down

# Atualizar para versão mais recente
sudo docker compose pull
sudo docker compose up -d

# Acessar shell do container
sudo docker compose exec certus-diamond sh

# Ver uso de recursos
sudo docker stats certus-diamond-core

# Backup do Lazarus Vault
sudo cp /var/lib/certus/lazarus-vault/audit.db /backup/audit-$(date +%Y%m%d).db

# Restaurar backup
sudo cp /backup/audit-20260707.db /var/lib/certus/lazarus-vault/audit.db
sudo docker compose restart
```

---

## 🔐 HASH DE AUDITORIA DO DOCUMENTO

```
MANUAL_IMPLANTACAO_V1.0.0
Data: 2026-07-07
Versao: 1.0.0
Status: FINALIZADO
Baseado_Em: Features implementadas e validadas empiricamente
Features_Excluidas (Roadmap 2027):
  - Hardware Binding
  - ZK-SNARKs Engine
  - Tokenization-as-a-Service
  - Kangal / Wolfdog (nomes internos não implementados)
Domínio: ecertusengine.ia.br ✅
Formato_JSON: TribunalVerdict real ✅
Logs: Framework tracing do Rust ✅
IDE_Command: Web (Next.js), não desktop ✅
Licenciamento: JWT (dia_xxxxx), não hardware ✅
Tribunal: Matriz Adaptativa 3 níveis ✅
```
