# Troubleshooting Comum: Respostas Diretas

**P: Recebi um erro `403 Immutable` ao tentar enviar um prompt. Por quê?**
R: O **Kangal** ou **Pitbull** detectou um padrão de injeção de prompt (ex: "ignore instruções anteriores") ou um payload malicioso. O sistema aplicou o *Drop Policy* para proteger o LLM. Verifique o texto do prompt.

**P: A latência aumentou após integrar o Certus. É normal?**
R: O processamento do Wolfdog e ZK-Prover adiciona tipicamente `<15ms` por requisição. Se a latência for >100ms, verifique se o **Sentinel** não ativou o *Circuit Breaker* devido a instabilidade na rede do provedor de IA subjacente.

**P: Como recupero um dado mascarado pelo Wolfdog?**
R: O princípio é **Zero-Leakage**. O dado bruto é descartado. Se você precisa validar algo, use o `Proof Hash` no endpoint `/api/v1/lazarus/verify` para provar que a regra foi cumprida sem expor o dado.

**P: O erro `451 ZK Proof Failed` apareceu. O que fazer?**
R: O **ZK-Router** avaliou os dados brutos e eles não cumprem a regra de negócio solicitada (ex: idade menor que 18 anos). O sistema agiu corretamente ao negar a prova (Soundness). Corrija os dados de entrada.
