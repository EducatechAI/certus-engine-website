import { ContentMatrixItem } from './types';

export const matrixSoberana: ContentMatrixItem[] = [
  {
    id: 'sov-001',
    assunto: 'soberana',
    slug: 'midnight-zk-proofs',
    niche: 'Criptografia Soberana',
    painPoint: 'Como provar conformidade sem expor dados?',
    title: 'ZK-Proofs e Midnight Network: A Soberania Criptográfica do Certus',
    description: 'Entenda como o Pacote Diamante utiliza Zero-Knowledge Proofs para garantir compliance LGPD e BACEN sem vazamento de PII.',
    contentBlocks: [
      'O Módulo Diamante opera em ambiente Bare-Metal com isolamento criptográfico. Diferente das soluções comerciais que prometem privacidade via termos de serviço, o Certus Engine garante o isolamento matemático.',
      'A integração com a Midnight Network garante que provas de conformidade (Zero-Knowledge Proofs) possam ser emitidas e verificadas na blockchain sem que os dados subjacentes sejam revelados em nenhum momento.'
    ],
    priority: '0.9'
  }
];
