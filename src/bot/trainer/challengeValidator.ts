export interface ChallengeConfig {
  id: string;
  title: string;
  validation_logic: Record<string, any>;
}

export class ChallengeValidator {
  
  /**
   * Valida a submissão do embaixador contra as regras matemáticas e lógicas
   * do JSON de desafios. 
   */
  public static validate(submission: string, config: ChallengeConfig): boolean {
    console.log(`[VALIDATOR] Iniciando validação para o desafio: ${config.id}`);
    
    try {
      const parsed = JSON.parse(submission);
      const logic = config.validation_logic;
      
      let isValid = true;
      
      // Validação de Regex de CPF Mascarado
      if (logic.cpf_must_match) {
        const cpfRegex = new RegExp(logic.cpf_must_match);
        if (!cpfRegex.test(parsed.cpf)) {
          console.error(`[VALIDATOR] CPF falhou na checagem de PII-Zero. Encontrado: ${parsed.cpf}`);
          isValid = false;
        }
      }
      
      // Validação de Mascaramento Nominal
      if (logic.paciente_must_be_masked) {
        if (!parsed.paciente || parsed.paciente.indexOf('***') === -1) {
          console.error(`[VALIDATOR] Nome do paciente exposto.`);
          isValid = false;
        }
      }
      
      // Validação de Preservação de Dados (CID-10)
      if (logic.cid10_must_remain) {
        if (parsed.cid10 !== logic.cid10_must_remain) {
          console.error(`[VALIDATOR] CID-10 modificado ou perdido.`);
          isValid = false;
        }
      }
      
      // Simulação da emissão de Proof Hash pelo Wolfdog/ZK-Router na simulação
      if (logic.zk_proof_hash_generated) {
        if (!parsed.zk_proof_hash || !parsed.zk_proof_hash.startsWith('sha256:')) {
          console.error(`[VALIDATOR] Proof hash ausente ou incorreto.`);
          isValid = false;
        }
      }
      
      return isValid;
    } catch (e) {
      console.error(`[VALIDATOR] Submissão não é um JSON válido ou quebrou a estrutura. Erro: ${e}`);
      return false; // Fail-Closed
    }
  }
}
