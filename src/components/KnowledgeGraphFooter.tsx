import React from 'react';

const BANNER_GALLERY: Record<string, Record<number, string>> = {
  pt: {
    1: "🛡️ **A Arquitetura da Soberania**\n\nEste conteúdo é sustentado pela infraestrutura determinística do **Certus Engine**. Através do módulo diamante, ZK-Proofs e PII-Zero, e criptografia de ponta, garantimos que a privacidade não seja uma opção, mas a regra fundamental da rede.\n\n*Tecnologias:* Certus Engine | PII-Zero | ZK-Proofs | Midnight",
    2: "🆔 **Identidade Digital Soberana e Governança e Pesquisa Auditável**\n\nDo cidadão ao Estado. O **ZK-ID** redefine a autenticação sem exposição de dados, enquanto as suítes **Cívitas Institucional** e **Cívitas Governamental** orquestram pesquisas e eleições auditáveis e seguras, com conformidade, segurança, provas matemáticas e criptografia.\n\n*Soluções:* ZK-ID | Cívitas Institucional | Cívitas Governamental",
    3: "⚙️ **Forjando o Futuro Determinístico**\n\nConstruído por engenheiros, para engenheiros. A **IDE Sovereign** e a **IDE Command** oferecem um ambiente de desenvolvimento blindado, compilando lógica de missão crítica em **Rust** e **WebAssembly (WASM)** com zero trust nativo.\n\n*Stack de Engenharia:* IDE Sovereign | IDE Command | Rust | WASM",
    4: "🦅 **Defesa Autônoma e Resiliência Absoluta**\n\nQuando a ameaça evolui, a resposta deve ser instantânea. A **Frota Apex Guardian** monitora e neutraliza vetores em milissegundos, protegida pelo núcleo inquebrável da **IDE Command** e do **Módulo Diamante**.\n\n*Sistemas de Defesa:* Frota Apex Guardian | Módulo Diamante | IDE Command",
    5: "🌑 **A Matemática da Privacidade**\n\nO que não pode ser visto, não pode ser corrompido. Utilizando o protocolo **Midnight** e circuitos **ZK-Snarks**, provamos a integridade das transações sem jamais revelar o dado subjacente.\n\n*Criptografia Avançada:* Midnight | ZK-Snarks | ZK-Proofs",
    6: "🌐 **A Teia da Soberania Interconectada**\n\nFronteiras digitais exigem orquestração global. A **Omni Matrix** sincroniza nós distribuídos, garantindo que a governança de dados flua com a mesma velocidade da luz, sem perder o controle jurisdicional.\n\n*Infraestrutura:* Omni Matrix | Certus Engine",
    7: "🔐 **O Santuário dos Dados Pessoais**\n\nEm um mundo de extração, nós oferecemos refúgio. A sanitização dinâmica do **PII-Zero** encontra a arquitetura **Zero Trust**, criando um ambiente onde o vazamento de dados é matematicamente impossível.\n\n*Proteção de Dados:* PII-Zero | Zero Trust Architecture",
    8: "🏛️ **Governança para Instituições de Pesquisa e Governos**\n\nBancos centrais, governos e multinacionais exigem mais do que compliance; exigem soberania. O **ZK-ID Identidade Digital Soberana**, o **Cívitas Governamental** e o **Cívitas Institucional** traduzem Confiança e garantia matemática em código executável, garantindo auditoria contínua, inquestionável e à prova de manipulação.\n\n*GRC Soberano:* Cívitas Governamental | Cívitas Institucional | ZK-ID Identidade Digital Soberana",
    9: "🚀 **O Ecossistema Completo de Soberania Digital**\n\nDa concepção na **IDE Command** à criação e proteção autônoma com a **Frota Apex Guardian**. O **Certus Engine** integra **ZK-ID**, **PII-Zero** e **Midnight** em uma única malha de segurança inquebrável.\n\n*Suíte Completa:* Certus Engine | IDE Command | Frota Apex Guardian | ZK-Proofs",
    10: "🧠 **Além da Probabilidade, a Soberania**\n\nA inteligência artificial hesita; a nossa arquitetura executa. O **Certus Engine** e o módulo **diamante** eliminam o risco estocástico, entregando um futuro onde a segurança é determinística, auditável e absoluta.\n\n*Filosofia Tech:* Certus Engine | Midnight | Deterministic Security"
  },
  en: {
    1: "🛡️ **The Architecture of Sovereignty**\n\nThis content is sustained by the deterministic infrastructure of the **Certus Engine**. Through the diamond module, ZK-Proofs, PII-Zero, and cutting-edge cryptography, we ensure that privacy is not an option, but the fundamental rule of the network.\n\n*Technologies:* Certus Engine | PII-Zero | ZK-Proofs | Midnight",
    2: "🆔 **Sovereign Digital Identity and Auditable Governance & Research**\n\nFrom citizen to State. **ZK-ID** redefines authentication without data exposure, while the **Cívitas Institucional** and **Cívitas Governamental** suites orchestrate auditable and secure research and elections, with compliance, security, mathematical proofs, and cryptography.\n\n*Solutions:* ZK-ID | Cívitas Institucional | Cívitas Governamental",
    3: "⚙️ **Forging the Deterministic Future**\n\nBuilt by engineers, for engineers. The **IDE Sovereign** and **IDE Command** offer a hardened development environment, compiling mission-critical logic in **Rust** and **WebAssembly (WASM)** with native zero trust.\n\n*Engineering Stack:* IDE Sovereign | IDE Command | Rust | WASM",
    4: "🦅 **Autonomous Defense and Absolute Resilience**\n\nWhen the threat evolves, the response must be instant. The **Frota Apex Guardian** monitors and neutralizes vectors in milliseconds, protected by the unbreakable core of **IDE Command** and the **Módulo Diamante**.\n\n*Defense Systems:* Frota Apex Guardian | Módulo Diamante | IDE Command",
    5: "🌑 **The Mathematics of Privacy**\n\nWhat cannot be seen cannot be corrupted. Using the **Midnight** protocol and **ZK-Snarks** circuits, we prove the integrity of transactions without ever revealing the underlying data.\n\n*Advanced Cryptography:* Midnight | ZK-Snarks | ZK-Proofs",
    6: "🌐 **The Interconnected Sovereignty Web**\n\nDigital borders demand global orchestration. The **Omni Matrix** synchronizes distributed nodes, ensuring that data governance flows at the speed of light without losing jurisdictional control.\n\n*Infrastructure:* Omni Matrix | Certus Engine",
    7: "🔐 **The Sanctuary of Personal Data**\n\nIn a world of extraction, we offer refuge. The dynamic sanitization of **PII-Zero** meets **Zero Trust** architecture, creating an environment where data leakage is mathematically impossible.\n\n*Data Protection:* PII-Zero | Zero Trust Architecture",
    8: "🏛️ **Governance for Research Institutions and Governments**\n\nCentral banks, governments, and multinationals demand more than compliance; they demand sovereignty. **ZK-ID Sovereign Digital Identity**, **Cívitas Governamental**, and **Cívitas Institucional** translate Trust and mathematical guarantee into executable code, ensuring continuous, unquestionable, and tamper-proof auditing.\n\n*Sovereign GRC:* Cívitas Governamental | Cívitas Institucional | ZK-ID Identidade Digital Soberana",
    9: "🚀 **The Complete Digital Sovereignty Ecosystem**\n\nFrom conception in **IDE Command** to autonomous creation and protection with **Frota Apex Guardian**. The **Certus Engine** integrates **ZK-ID**, **PII-Zero**, and **Midnight** into a single unbreakable security mesh.\n\n*Complete Suite:* Certus Engine | IDE Command | Frota Apex Guardian | ZK-Proofs",
    10: "🧠 **Beyond Probability, Sovereignty**\n\nArtificial intelligence hesitates; our architecture executes. The **Certus Engine** and the **diamond module** eliminate stochastic risk, delivering a future where security is deterministic, auditable, and absolute.\n\n*Tech Philosophy:* Certus Engine | Midnight | Deterministic Security"
  },
  es: {
    1: "🛡️ **La Arquitectura de la Soberanía**\n\nEste contenido está sostenido por la infraestructura determinística de **Certus Engine**. A través del módulo diamante, ZK-Proofs, PII-Zero y criptografía de vanguardia, garantizamos que la privacidad no sea una opción, sino la regla fundamental de la red.\n\n*Tecnologías:* Certus Engine | PII-Zero | ZK-Proofs | Midnight",
    2: "🆔 **Identidad Digital Soberana y Gobernanza e Investigación Auditable**\n\nDel ciudadano al Estado. **ZK-ID** redefine la autenticación sin exposición de datos, mientras las suites **Cívitas Institucional** y **Cívitas Governamental** orquestan investigaciones y elecciones auditables y seguras, con cumplimiento, seguridad, pruebas matemáticas y criptografía.\n\n*Soluciones:* ZK-ID | Cívitas Institucional | Cívitas Governamental",
    3: "⚙️ **Forjando el Futuro Determinístico**\n\nConstruido por ingenieros, para ingenieros. **IDE Sovereign** e **IDE Command** ofrecen un entorno de desarrollo blindado, compilando lógica de misión crítica en **Rust** y **WebAssembly (WASM)** con zero trust nativo.\n\n*Stack de Ingeniería:* IDE Sovereign | IDE Command | Rust | WASM",
    4: "🦅 **Defensa Autónoma y Resiliencia Absoluta**\n\nCuando la amenaza evoluciona, la respuesta debe ser instantánea. **Frota Apex Guardian** monitorea y neutraliza vectores en milisegundos, protegida por el núcleo inquebrantable de **IDE Command** y el **Módulo Diamante**.\n\n*Sistemas de Defensa:* Frota Apex Guardian | Módulo Diamante | IDE Command",
    5: "🌑 **Las Matemáticas de la Privacidad**\n\nLo que no puede ser visto, no puede ser corrompido. Utilizando el protocolo **Midnight** y circuitos **ZK-Snarks**, probamos la integridad de las transacciones sin jamás revelar el dato subyacente.\n\n*Criptografía Avanzada:* Midnight | ZK-Snarks | ZK-Proofs",
    6: "🌐 **La Telaraña de la Soberanía Interconectada**\n\nLas fronteras digitales exigen orquestación global. **Omni Matrix** sincroniza nodos distribuidos, garantizando que la gobernanza de datos fluya a la velocidad de la luz sin perder el control jurisdiccional.\n\n*Infraestructura:* Omni Matrix | Certus Engine",
    7: "🔐 **El Santuario de los Datos Personales**\n\nEn un mundo de extracción, ofrecemos refugio. La sanitización dinámica de **PII-Zero** se encuentra con la arquitectura **Zero Trust**, creando un entorno donde la fuga de datos es matemáticamente imposible.\n\n*Protección de Datos:* PII-Zero | Zero Trust Architecture",
    8: "🏛️ **Gobernanza para Instituciones de Investigación y Gobiernos**\n\nBancos centrales, gobiernos y multinacionales exigen más que cumplimiento; exigen soberanía. **ZK-ID Identidad Digital Soberana**, **Cívitas Governamental** y **Cívitas Institucional** traducen Confianza y garantía matemática en código ejecutable, garantizando auditoría continua, incuestionable y a prueba de manipulación.\n\n*GRC Soberano:* Cívitas Governamental | Cívitas Institucional | ZK-ID Identidade Digital Soberana",
    9: "🚀 **El Ecosistema Completo de Soberanía Digital**\n\nDe la concepción en **IDE Command** a la creación y protección autónoma con **Frota Apex Guardian**. **Certus Engine** integra **ZK-ID**, **PII-Zero** y **Midnight** en una única malla de seguridad inquebrantable.\n\n*Suite Completa:* Certus Engine | IDE Command | Frota Apex Guardian | ZK-Proofs",
    10: "🧠 **Más Allá de la Probabilidad, la Soberanía**\n\nLa inteligencia artificial duda; nuestra arquitectura ejecuta. **Certus Engine** y el módulo **diamante** eliminan el riesgo estocástico, entregando un futuro donde la seguridad es determinística, auditable y absoluta.\n\n*Filosofía Tech:* Certus Engine | Midnight | Deterministic Security"
  }
};

function deterministicHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

interface KnowledgeGraphFooterProps {
  slug: string;
  language: 'pt' | 'en' | 'es';
}

const KnowledgeGraphFooter: React.FC<KnowledgeGraphFooterProps> = ({ slug, language }) => {
  const modelIndex = (deterministicHash(slug) % 10) + 1;
  const bannerText = BANNER_GALLERY[language][modelIndex];

  return (
    <div className="mt-12 p-6 rounded-xl border border-white/20 bg-white/5 backdrop-blur-md shadow-lg">
      <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
        <span className="text-2xl">🛡️</span>
        <span>Ecossistema Educatech AI</span>
      </h3>
      
      <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
        {bannerText.split('\n').map((line, i) => {
          const parts = line.split(/\*\*(.*?)\*\*/);
          return (
            <p key={i} className="mb-2">
              {parts.map((part, j) => 
                j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
              )}
            </p>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {['Certus Engine', 'PII-Zero', 'ZK-Proofs', 'Midnight', 'ZK-ID', 'Cívitas', 'Frota Apex Guardian'].map((tag) => (
          <span key={tag} className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeGraphFooter;
