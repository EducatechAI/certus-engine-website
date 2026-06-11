# Arquitetura da Frota Apex Guardian (12 Agentes Soberanos)

A Frota Apex é o coração militar e estratégico do Certus Engine. Ela opera como um organismo de defesa autônomo, dividido em três frentes táticas: Fronteira, Governança e Inteligência Preditiva.

## 🛡️ 1. A Guarda de Fronteira e Ação Direta
**1. Kangal (Network Intercept / O Guardião do Perímetro)**
*   **Função:** Atua na camada de transporte (WFP/iptables). Monitora entrada e saída de dados.
*   **Especificação:** Corta conexões não autorizadas (exfiltração de dados, comunicação com servidores C2/Botnets) na raiz, garantindo o "Zero-Leakage" absoluto.

**2. Pitbull (Active Hardening / O Eliminador Implacável)**
*   **Função:** Defesa de recursos em tempo real e terminação de processos maliciosos.
*   **Especificação:** Age em `<50ms` executando o *Taskkill* de ransomwares, colocando arquivos em quarentena selada e expurgando persistências injetadas no registro do sistema.

**3. Presa Canário (Integrity Guardian / O Guardião do Território)**
*   **Função:** Detecção de desvios (Model Drift) e proteção da "Raiz de Confiança" (Root of Trust).
*   **Especificação:** Monitora os hashes criptográficos de código e dados a cada segundo. Se um byte for alterado por um ataque de Supply Chain, ele bloqueia o sistema de arquivos para proteger a integridade.

**4. Wolfdog (Behavior Tracker & ZK-Router / O Rastreador e Imortal)**
*   **Função:** Análise heurística, persistência de kernel e ponte PII-Zero.
*   **Especificação:** Heuristicamente avalia a intenção dos dados crus. Mascara as informações sensíveis (PII-Zero), gera as provas de Conhecimento Zero (ZK-Proofs) e ressuscita o Certus Engine em `<500ms` caso um hacker tente derrubá-lo (Protocolo Watchdog).

## 🏛️ 2. O Núcleo de Governança e Resiliência
**5. Lazarus (A Fênix de Código / O Vault de Auditoria)**
*   **Função:** Repositório forense imutável e motor de Self-Healing.
*   **Especificação:** Registra os hashes de auditoria das ações (ex: logs ZK-Midnight) de maneira matematicamente inviolável. Em cenários catastróficos, reconstrói o ambiente usando "Shadow Copies" e chaves efêmeras.

**6. Apex Guardian (O Orquestrador Mestre)**
*   **Função:** Motor de Políticas Dinâmicas (O "Cérebro" Administrativo).
*   **Especificação:** Permite a modulação ao vivo da severidade do sistema (ex: aumentar rigor PII-Zero para nível máximo durante ataques) pelos CISOs, sem a necessidade de um novo deploy ou interrupção de rede.

**7. Dogo Argentino (Autonomous Remediation / O Cirurgião Tático)**
*   **Função:** Resolução mecânica sem intervenção humana.
*   **Especificação:** Se o Kangal apitar, o Dogo não apenas registra o erro: ele rotaciona imediatamente chaves de API, isola nós infectados ou faz rollback de infraestrutura integrando-se ao Lazarus, eliminando a janela de pânico humano.

## 👁️ 3. A Inteligência Preditiva e Defesa Obscura
**8. Sentinel Prime (A Muralha / Estrategista)**
*   **Função:** Análise preditiva massiva.
*   **Especificação:** Processa trilhões de eventos de logs locais e externos para identificar padrões de comportamento antes que a brecha ocorra, levantando escudos de contenção profilaticamente.

**9. Forge (A Forja / Red-Team Autônomo)**
*   **Função:** Laboratório de Ataque Ético Constante.
*   **Especificação:** A fração do Certus que ataca o próprio Certus 24 horas por dia (Simulação de Ameaças), descobrindo brechas Zero-Day e forçando o Sentinel a criar patches evolutivos automáticos.

**10. Ghost (O Olho Invisível)**
*   **Função:** Mapeador furtivo de infraestrutura.
*   **Especificação:** Rastreia a memória RAM e as sombras do SO buscando rootkits adormecidos ou agentes invasores em modo furtivo que ainda não manifestaram ação maliciosa, denunciando-os ao Pitbull.

**11. Oráculo de Risco (Global Threat Anticipation)**
*   **Função:** Imunização de Rebanho da Frota.
*   **Especificação:** Quando uma instância do Certus sofre um ataque inédito, o Oráculo analisa o vetor e transmite a "Vacina Criptográfica" instantaneamente para todas as outras prefeituras e clientes conectados, imunizando o ecossistema.

**12. Enxame de Agentes (Swarm Drones)**
*   **Função:** Micro-patrulha e manutenção contínua.
*   **Especificação:** "Drones" em nível de software distribuídos pelos processos e servidores do cliente que fazem correções menores, limpam cache obsoleto e realizam verificação de Linting Dinâmico de borda, aliviando o motor principal.
