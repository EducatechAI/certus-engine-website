# 💎 FAQ SOBERANO: Módulo Diamante (Diamond Gateway)

> [!IMPORTANT]
> **CLASSIFICAÇÃO:** Enterprise / Técnico
> **CONTEÚDO:** 65 Perguntas e Respostas detalhando a infraestrutura, performance, segurança e casos de uso do Módulo Diamante (Diamond Gateway) do Certus Engine.

---

## Bloco 1: Visão Geral e Arquitetura (1-10)

**1. O que é o Módulo Diamante (Diamond Gateway)?**
R: É a camada de borda de altíssimo desempenho do Certus Engine, escrita inteiramente em Rust assíncrono. Ele funciona como um firewall e validador determinístico projetado para suportar transações volumétricas corporativas com latência mínima.

**2. Qual é a principal diferença entre a API padrão e o Módulo Diamante?**
R: A API padrão (Next.js) é excelente para aplicações web B2C e SaaS. O Módulo Diamante é uma infraestrutura bare-metal, capaz de processar milhares de requisições por segundo (TPS) com validação criptográfica completa, focado em Big Techs, Governos e Bancos. O throughput exato depende da configuração do Tribunal BFT (número de LLMs, timeout, etc).

**3. Por que o Módulo Diamante foi escrito em Rust?**
R: Porque Rust oferece segurança de memória absoluta (sem *garbage collector*) e concorrência multithreaded destemida (Fearless Concurrency), garantindo que vazamentos de memória ou *race conditions* nunca ocorram no ambiente de governança.

**4. O que é o "Pipeline Assíncrono Multi-Threaded"?**
R: É o motor do Módulo Diamante. Em vez de bloquear requisições enquanto a IA analisa os dados, o pipeline divide o processamento criptográfico, a censura de dados e o log de auditoria em diferentes threads, ocorrendo simultaneamente de forma não-bloqueante.

**5. Como o Módulo Diamante lida com picos de tráfego (Spikes)?**
R: Ele utiliza *Backpressure* e *Rate Limiting* algorítmico (Token Bucket). Se o volume de dados ultrapassar a capacidade da frota LLM, ele enfileira os logs no Edge e garante que nenhuma transação seja perdida, sem derrubar os servidores.

**6. O Módulo Diamante substitui o Tribunal BFT?**
R: Não. O Módulo Diamante é o "Castelo" que protege e orquestra o Tribunal BFT. Ele é responsável por interceptar a rede, limpar os dados (PII-Zero) e repassar a carga limpa para o Tribunal julgar.

**7. O Gateway pode rodar em infraestrutura On-Premise (Servidores locais)?**
R: Sim. Diferente das soluções de nuvem fechadas, o binário compilado do Módulo Diamante pode ser implantado em data centers fechados (Air-Gapped) de Bancos ou Ministérios da Defesa.

**8. O que significa "Fail-Closed" na arquitetura do Diamante?**
R: Significa que, se ocorrer qualquer pane de rede, timeout das LLMs, corrupção de banco de dados ou divergência matemática, o Gateway bloqueia a requisição por padrão. A segurança tem precedência matemática sobre a disponibilidade.

**9. Qual é o consumo de RAM do Diamond Gateway?**
R: Extremamente baixo. Devido à compilação AOT (Ahead-of-Time) do Rust, o binário base do Gateway consome menos de 50MB de RAM. Em configuração de produção (com Lazarus Vault ativo, cache e logs), o consumo típico fica entre 200-500MB, ainda significativamente menor que soluções equivalentes em Node.js ou Python.

**10. O Módulo Diamante possui integração nativa com Smart Contracts?**
R: Sim, ele atua como um Validador Multi-Chain, auditando payloads antes de serem assinados em redes como Ethereum (EVM), Cardano ou Midnight.

---

## Bloco 2: Segurança, PII-Zero e Compliance (11-20)

**11. Como o Módulo Diamante executa a limpeza PII-Zero?**
R: Antes do payload chegar à Inteligência Artificial, ele passa pelo parser Rust do Gateway, que utiliza análise de sintaxe não-linear e Regex otimizado para expurgar CPFs, Cartões de Crédito e IDs sensíveis em microssegundos.

**12. E se o dado sensível estiver ofuscado em Base64?**
R: O motor semântico (Frota de LLMs) atuando sob a orquestração do Diamante é treinado para detectar ofuscações. O Gateway possui proteções contra Polyglots e fragmentação de strings.

**13. O Gateway Diamante garante conformidade com a LGPD?**
R: Sim. Ao bloquear que dados de identificação pessoal (PII) cheguem às LLMs ou a APIs não autorizadas, ele blinda juridicamente a empresa, atuando sob os princípios de "Privacy by Design" (Art. 46 da LGPD).

**14. Como ele protege contra vazamento via Side-Channels?**
R: O Gateway intercepta as "mensagens de erro" (Throw/Exceptions) do sistema. Atacantes não podem vazar dados escondendo informações em logs de erro da aplicação, pois o Gateway sanitiza até mesmo as falhas de sistema.

**15. O que impede um atacante de estourar a memória do Gateway (DoS)?**
R: O *Gateway Clamp*, uma trava mecânica no Rust que recusa payloads maiores que 50KB e bloqueia loops infinitos ou Strings gigantes antes mesmo de carregar o dado na memória volátil.

**16. O Módulo Diamante atende a ISO 27001?**
R: Sim, ele fornece rastreabilidade irrefutável, criptografia de dados em trânsito e repouso, e separação estrita de privilégios, cobrindo os principais controles do Anexo A da ISO 27001.

**17. O que acontece se uma vulnerabilidade for detectada na própria IA?**
R: O Módulo Diamante funciona como uma "Gaiola de Faraday" (Serde Cage). Mesmo que a IA "alucine" ou tente executar código malicioso, a resposta gerada por ela será validada pelo Rust antes de ser devolvida ao cliente. 

**18. Como as configurações (Secrets) do Gateway são protegidas?**
R: Usando injeção segura de variáveis de ambiente. As chaves de API não ficam em memória transacional, impedindo extração mesmo em casos de memory dump não autorizado.

**19. É possível burlar a censura fragmentando um CPF (ex: `123` + `456`)?**
R: O Diamante interceptou ataques Hard desse tipo em laboratório. A análise de Taint (Fluxo de Dados) rastreia a concatenação do dado ao longo da execução.

**20. O Módulo Diamante audita a si mesmo?**
R: Sim. Todas as decisões de aprovação ou bloqueio do Gateway são hasheadas com SHA-256 e salvas no Lazarus Vault. Ele gera um log imutável de suas próprias operações.

---

## Bloco 3: Lazarus Vault e Governança Forense (21-30)

**21. O que é o Lazarus Vault dentro do contexto do Diamante?**
R: É o banco de dados forense acoplado ao Gateway. Enquanto o Gateway julga a transação na borda, ele despacha os logs (em lote) para o Lazarus Vault no background de forma assíncrona.

**22. O log do Lazarus causa latência na transação do usuário?**
R: Zero latência. O Diamond Gateway adota um modelo "Fire and Forget" para os logs, usando canais (`mpsc` do Rust). A transação do usuário é finalizada rapidamente, e os logs são gravados silenciosamente no banco de dados.

**23. Por que usar Hashing (SHA-256) em cada log?**
R: Para provar em tribunal (jurídico) que o log de auditoria não foi alterado. Se um administrador tentar apagar um log de vazamento de dados, a quebra da cadeia de hash denunciará a fraude imediatamente.

**24. Um administrador de sistema pode apagar registros no Lazarus?**
R: Eles não podem apagar os dados criptográficos sem invalidar o bloco do banco de dados (WORM - Write Once, Read Many), impossibilitando ocultação de incidentes.

**25. O Módulo Diamante consegue exportar logs para o SIEM da empresa?**
R: Sim. A arquitetura corporativa permite integração via Webhooks e mensageria (Kafka/RabbitMQ) para alimentar Datadog, Splunk ou ElasticSearch em tempo real.

**26. Que tipo de metadados o Diamante coleta na requisição?**
R: Apenas IDs institucionais, timestamps, IDs de sessão criptografados e resultados do julgamento. PII nunca é armazenado, garantindo o "Privacy by Default".

**27. O que é a "Gaiola Serde"?**
R: É um mecanismo de desserialização ultraestrita em Rust. Se um atacante enviar um JSON com campos malformados para tentar um ataque de *Prototype Pollution*, a Gaiola Serde descarta o pacote imediatamente.

**28. Como o Gateway prova compliance em uma auditoria do Banco Central?**
R: Através da interface de extração de relatórios consolidados do Lazarus Vault. O auditor recebe as assinaturas criptográficas de todos os bloqueios ocorridos, comprovando defesa ativa e resiliência cibernética.

**29. Em caso de ataque brutal (DDoS), o Lazarus continua logando?**
R: Se sob estresse extremo, o Diamante entra em "Graceful Degradation". Ele prioriza bloquear as requisições, podendo usar amostragem agressiva (logs parciais) para não derrubar o disco do servidor host.

**30. Como a criptografia protege os logs do Diamond Gateway?**
R: O Módulo suporta criptografia avançada AES-256 em disco, assegurando que o arquivo do banco SQLite ou Postgres seja inútil caso roubado, e padrões de Format-Preserving Encryption (FPE/FF3-1) estão previstos no roadmap de segurança para tokenização contínua.

---

## Bloco 4: Casos de Uso Empresariais e Governamentais (31-40)

**31. O Módulo Diamante pode ser usado em Prefeituras (Smart Cities)?**
R: É o cenário ideal. Ele funciona como o firewall principal para processamento de dados do Cidadão (Saúde, IPTU, Trânsito), garantindo que APIs municipais não exponham dados sensíveis na internet aberta.

**32. Como ele se aplica em Hospitais e Healthtechs?**
R: Atendendo resoluções de sigilo médico (CFM) e a HIPAA. O Diamante impede vazamento de laudos, dados biométricos e registros de pacientes, analisando cada pacote antes que saia do servidor.

**33. É viável usar o Diamante para Core Bancário?**
R: Absolutamente. Devido ao "Zero Loss Data Pipeline", ele garante que transações financeiras (como validação de pagamentos ou transferências via IA) ocorram sem travamentos ou vulnerabilidades.

**34. Como o Certus beneficia Corretoras de Cripto (Exchanges)?**
R: Ele audita as chamadas para Smart Contracts, atuando contra ataques de manipulação de oráculos, *Reentrancy Attacks* e *Integer Overflows*, barrando ordens de compra anômalas submetidas por bots.

**35. Ele pode ser integrado em infraestruturas Legadas (Sistemas antigos)?**
R: Sim, ele atua como um "Reverse Proxy" (Proxy Reverso). A empresa não precisa reescrever seu código monolítico; basta colocar o Módulo Diamante na frente dele e deixar a magia BFT acontecer.

**36. É útil para e-commerce de alto tráfego (Black Friday)?**
R: Exatamente. A taxa de 500k TPS suporta picos massivos de requisições de compra, impedindo bots de *Scalping* (compra automatizada de ingressos/tênis) através da análise comportamental.

**37. Órgãos Governamentais podem adquirir via licitação?**
R: A Educatech AI, via CPSI (Marco Legal das Startups, Lei 182/2021), pode fechar contratos de inovação com o setor público para modernização e compliance cibernético com facilidade contratual.

**38. Empresas de IA Generativa podem usar o Certus?**
R: Sim. Plataformas de LLM usam o Módulo Diamante para higienizar Prompts enviados por usuários e filtrar as saídas do modelo para que a IA não gere respostas ofensivas ou revele dados de treinamento restritos.

**39. O Módulo Diamante suporta Redes IoT (Internet of Things)?**
R: Com a sua baixa carga de CPU no parser inicial, ele pode atuar em *Edge Computing*, rodando em gateways industriais para proteger sensores de manufatura contra injeções de malware.

**40. Qual a principal barreira solucionada pelo Diamante em Enterprise?**
R: Confiança. O mercado corporativo não confia em "caixas-pretas" ou IAs imprevisíveis. O Certus devolve o controle matemático à empresa. A IA só interage com o cliente se o Certus assinar embaixo.

---

## Bloco 5: Operação, Desempenho e Extensibilidade (41-50)

**41. Como as empresas instalam o Módulo Diamante?**
R: Ele é distribuído em duas formas: via Imagens Docker certificadas (para ambientes Kubernetes/ECS) ou binários nativos pré-compilados e assinados digitalmente.

**42. Posso conectar minha própria IA no Gateway?**
R: Sim. A arquitetura é LLM-Agnóstica. Você pode rotear para a OpenAI, Anthropic, Gemini, DeepSeek ou até um modelo LLaMa rodando em servidor local (On-Premise).

**43. Qual é a latência adicionada pelo Gateway na requisição?**
R: A sobrecarga da camada em Rust é inferior a 3 milissegundos (~1-3ms). O gargalo é sempre a própria LLM. O Certus não atrasa a rede.

**44. Posso adicionar regras ad-hoc (Customizadas) ao Tribunal?**
R: Sim. Via envio de metadados (`compliance_rules`), uma empresa pode forçar políticas sazonais (ex: "Proibido transferir tokens para esta carteira sancionada hoje") de forma dinâmica, sem precisar reiniciar o servidor.

**45. O que ocorre se a internet do Gateway cair?**
R: Ele aplica a diretriz soberana (Regra #001). Sem consenso de IA ou sem rede, o modo Fail-Closed intercepta e devolve o bloqueio, gravando em buffer local para futura sincronização no Lazarus.

**46. Como o Gateway atualiza seus modelos de ameaça?**
R: O Motor Semântico do Certus (as frotas de LLMs) são agnósticas. À medida que modelos mais rápidos e potentes são lançados no mercado, a infraestrutura pode migrar de IA em 5 segundos mudando apenas uma variável de ambiente, atualizando instantaneamente a inteligência da defesa.

**47. Posso definir qual nível de segurança usar por requisição?**
R: Sim. Pelo parâmetro `context_mode`, uma requisição pode ser `strict` (tolerância zero, Tribunal ativo) ou `lenient` (modo alerta, ideal para sandboxes de desenvolvedor interno).

**48. Existe Dashboard visual para o Módulo Diamante?**
R: O Certus Studio (Interface Next.js) atua como Command Center e Dashboard em tempo real, lendo o Lazarus Vault e plotando gráficos de bloqueios, TPS e auditoria técnica.

**49. O que significa afirmar que o Certus é uma infraestrutura Soberana?**
R: Significa que a plataforma não negocia sua segurança. Se houver falha sistêmica, ele se fecha. Não existem "backdoors". Ele prioriza a custódia, resiliência matemática e inviolabilidade dos dados acima de qualquer métrica corporativa.

**50. Quem deve comprar a licença do Módulo Diamante?**
R: CTOs, CISOs, e Diretores de Inovação de médias e grandes empresas que pretendem usar Inteligência Artificial e Blockchain em produção, mas que têm medo do risco legal, de multas (ANPD) e do comprometimento da marca.

---

## Bloco 6: Tribunal BFT e Inteligência Adaptativa (51-55)

**51. Como funciona a Matriz de Confiança Adaptativa do Tribunal BFT?**
R: O Tribunal opera em cascata de 3 níveis. Nível 1 (3 modelos rápidos) resolve 64% dos casos. Se houver empate, escala para Nível 2 (2 modelos especializados). Se ainda houver dúvida, aciona Nível 3 (Claude Haiku). Se persistir empate, aciona Revisão Humana (HITL).

**52. O que é Early Stopping e como economiza custos?**
R: Early Stopping é a capacidade de cancelar chamadas LLM pendentes quando o consenso já foi atingido. Se 3 modelos aprovam no Nível 1, o sistema não chama os modelos dos Níveis 2 e 3, economizando ~50% de custos e reduzindo latência.

**53. Como o sistema detecta ataques de latência seletiva?**
R: Se 3 ou mais modelos falham simultaneamente (timeout), o sistema ativa o alerta "LATENCY_ATTACK_DETECTED" e força Revisão Humana com Score 5/10. Isso previne que atacantes derrubem modelos específicos para manipular o consenso.

**54. O que acontece quando há empate no Tribunal (ex: 2 aprovações, 2 bloqueios)?**
R: O sistema aciona Revisão Humana Obrigatória (HITL) com Score 7/10. O código é bloqueado temporariamente e um ticket é gerado para análise manual. Isso garante que a dúvida nunca beneficie o réu (Fail-Closed).

**55. Qual a diferença entre os modos "strict" e "lenient"?**
R: No modo "strict", o Tribunal BFT é obrigatório e qualquer dúvida resulta em bloqueio. No modo "lenient", o sistema opera em modo alerta, ideal para sandboxes de desenvolvimento, onde bloqueios são registrados mas não impedem a execução.

---

## Bloco 7: FinOps e Custos Operacionais (56-59)

**56. Qual o custo operacional médio por requisição?**
R: O custo real varia drasticamente dependendo da LLM local (Pessoal da Empresa) ou da "Frota BFT" selecionada pelo usuário no OpenRouter, pois cada modelo cobra um valor diferente por 1M de tokens. Contudo, em uma frota otimizada de referência (ex: DeepSeek, Qwen, GLM), o custo médio é ~$0.003 por requisição BFT completa (sendo ~$0.002 no Nível 1 e ~$0.005 quando escala para o Nível 3).

**57. Como funciona o Budget Manager?**
R: O Budget Manager monitora em tempo real o consumo de tokens da OpenRouter e calcula a margem bruta (Receita Asaas - Custo LLM). É possível definir limites diários/mensais e receber alertas quando o consumo atinge 80% do budget.

**58. Existe limite de gastos configurável?**
R: Sim. Via variável de ambiente DAILY_LIMIT_USD, é possível definir um teto de gastos diários. Se o limite for atingido, o sistema entra em modo degradado (apenas validações determinísticas, sem LLMs).

**59. Como o Certus compara com soluções concorrentes em termos de custo?**
R: Soluções concorrentes (como Guardrails AI ou LangChain) usam uma única LLM, custando ~$0.01-0.03 por requisição. O Certus, com BFT de 3-6 LLMs e Early Stopping, custa ~$0.003, oferecendo segurança superior com custo 70-90% menor.

---

## Bloco 8: Licenciamento e Suporte (60-63)

**60. Quais são os tiers de licença do Módulo Diamante?**
R: Três tiers: Trial (gratuito, 30 dias, 1000 requisições), Command (R$ 499,90/mês, 50k requisições), e Diamante (R$ 3.000+/mês, 500k requisições + suporte prioritário). Todos com PII-Zero, Tribunal BFT e Lazarus Vault.

**61. Como funciona a integração com Asaas/CertusPay?**
R: O CertusPay integra nativamente com Asaas para cobrança via PIX e cartão. O webhook do Asaas ativa automaticamente a licença no Lazarus Vault, com idempotência criptográfica para prevenir replay attacks.

**62. Existe suporte técnico e SLA?**
R: Tier Trial: suporte via comunidade. Tier Command: suporte por email (SLA 48h). Tier Diamante: suporte prioritário 24/7 (SLA 4h) + Gerente de Conta dedicado + onboarding personalizado.

**63. É possível contratar consultoria para implementação?**
R: Sim. A Educatech AI oferece serviços de consultoria para implementação on-premise, integração com sistemas legados e auditoria de segurança. Entre em contato para proposta customizada.

---

## Bloco 9: Benchmarks e Roadmap (64-65)

**64. Existem benchmarks públicos de performance?**
R: Sim. O Dossiê de Validação Empírica documenta 11 testes de intrusão com latência média de 1800ms, custo médio de $0.003/teste e taxa de bloqueio de 100% (9/9 ataques). O documento completo está disponível sob NDA para clientes enterprise.

**65. Quais features estão no roadmap para os próximos 6 meses?**
R: Q3 2026: Assinatura digital Ed25519 no Lazarus Vault, autenticação nativa (JWT/API Keys), rate limiting avançado. Q4 2026: ZK-SNARKs Engine (privacidade total para Midnight), suporte expandido para XRPL e Stellar, métricas Prometheus nativas. Q1 2027: Tokenization-as-a-Service para ativos de terceiros.
