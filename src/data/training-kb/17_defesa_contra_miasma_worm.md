# 🛡️ PLAYBOOK DE DEFESA: Proteção contra o Miasma Supply Chain Worm
**Análise de Ameaça e Resposta Autônoma da Frota Apex Guardian**  
**Classificação:** Público — Base de Conhecimento Certus Academy  
**Versão:** v1.0.0 | **Hash de Integridade:** `sha256:2d8f9e...cf1402a7`

---

## 🦠 1. O VETOR DE AMEAÇA: MIASMA WORM
O **Miasma** é um malware de cadeia de suprimentos (*supply chain worm*) altamente sofisticado e autorreplicável. Ele ataca ambientes de desenvolvimento (repositórios GitHub, pipelines CI/CD e IDEs de IA como Claude Code, VS Code, Cursor e Gemini CLI) e se propaga injetando códigos maliciosos em pacotes de dependência (como `preinstall` scripts no npm/PyPI) e sequestrando credenciais de nuvem (AWS, Azure, GCP) e tokens de API.

---

## 🏰 2. A DEFESA COORDENADA DO CERTUS ENGINE (APEX FLEET)
O Certus Engine neutraliza o Miasma Worm na raiz através de uma ação coordenada dos sub-agentes da **Frota Apex Guardian**:

### A. Interceptação de Rede na Origem (Kangal)
*   **Ação do Miasma:** O worm tenta exfiltrar as credenciais roubadas para servidores de Controle e Comando (C2).
*   **Defesa do Kangal:** Atuando na camada de transporte (WFP/iptables), o Kangal identifica a conexão sem autorização prévia e realiza o bloqueio imediato do tráfego de saída. O dado roubado nunca consegue sair do perímetro da máquina.

### B. Proteção e Auditoria de Dependências (Presa Canario)
*   **Ação do Miasma:** O worm tenta se propagar injetando payloads maliciosos em arquivos de dependência ou arquivos locais do repositório (ex: `package.json`).
*   **Defesa do Presa Canario:** Monitora a integridade física dos arquivos a cada segundo via árvores de Merkle. Qualquer tentativa de alteração não autorizada de código ou injeção de dependências suspeitas resulta no congelamento atômico do sistema de arquivos (*Fail-Closed*), impedindo a autorreplicação.

### C. Hardening Ativo em Tempo Real (Pitbull)
*   **Ação do Miasma:** Ativação de scripts de instalação maliciosos (`preinstall` ou `binding.gyp`) para comprometer a memória ou injetar threads no SO.
*   **Defesa do Pitbull:** Age em `<50ms` identificando comportamentos anômalos de escrita de arquivos ou execução de subprocessos suspeitos, eliminando a thread (*SIGKILL*) e movendo os arquivos infectados para quarentena isolada.

### D. Mascaramento e Obscuridade de Credenciais (Wolfdog)
*   **Ação do Miasma:** Tenta escanear o ambiente em busca de variáveis de ambiente (`.env`), chaves privadas (`.pem`) e credenciais de nuvem.
*   **Defesa do Wolfdog:** Aplica a tecnologia **PII-Zero** ativa na borda. As chaves de acesso reais expostas na memória são mascaradas e protegidas antes que o processo invasor possa lê-las ou enviá-las.

### E. Auto-Cura e Restauração (Lazarus)
*   **Ação do Miasma:** Modificação ou corrupção do repositório local.
*   **Defesa do Lazarus:** Se qualquer arquivo for alterado ou deletado durante o ataque, o Lazarus reconstrói e reestabelece a codebase original em menos de 2 minutos, puxando backups criptografados com Ed25519 armazenados no Shadow Vault (isolado em sandbox).

### F. Imunização de Rebanho (Oráculo de Risco)
*   **Ação do Miasma:** Ataca uma máquina ou servidor específico de uma prefeitura na rede.
*   **Defesa do Oráculo de Risco:** Assim que o ataque do Miasma é mitigado em um nó da rede (ex: em Aveiro), o Oráculo gera uma "Vacina Criptográfica" (assinatura do comportamento e domínios de C2 do vírus) e a propaga instantaneamente para todas as instâncias da rede global do Certus, imunizando todos os outros clientes antes que o worm se espalhe.
