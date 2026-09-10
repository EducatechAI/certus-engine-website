'use client';
import { useState } from 'react';
import Link from 'next/link';

export function DocsPlayground() {
  const [endpoint, setEndpoint] = useState('POST /v1/pii/sanitize');
  const [payload, setPayload] = useState('{\n  "text": "O cliente Joao Silva, CPF 123.456.789-00 aprovou a proposta."\n}');
  const [copied, setCopied] = useState(false);

  const mockResponse = {
    "status": "success",
    "data": {
      "sanitized_text": "O cliente [NOME_1], CPF [CPF_1] aprovou a proposta.",
      "tokens_generated": 2,
      "latency_ms": 12.4,
      "sec_id": "SEC-PII-001"
    },
    "audit": {
      "lazarus_hash": "a2b4c6d8e0f1234567890abcdef12345",
      "timestamp": new Date().toISOString()
    }
  };

  const curlCommand = `curl -X POST https://api.certusengine.ia.br${endpoint.replace('POST ', '')} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '${payload.replace(/\n/g, '')}'`;

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-black/40 border border-emerald-900/50 rounded-2xl overflow-hidden my-8">
      {/* Banner */}
      <div className="bg-emerald-900/30 border-b border-emerald-900/50 px-4 py-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-mono">
          <span>🎭</span> SANDBOX SIMULADO — sem chamada real de API
        </div>
        <Link href="/documentacao/getting-started" className="text-emerald-500 hover:text-emerald-300 underline underline-offset-2">
          Executar de verdade →
        </Link>
      </div>

      <div className="grid md:grid-cols-2">
        {/* Request */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-slate-800">
          <div className="mb-4">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Endpoint</label>
            <select 
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="w-full bg-[#050b08] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono outline-none"
            >
              <option value="POST /v1/pii/sanitize">POST /v1/pii/sanitize</option>
              <option value="POST /v1/governance/check">POST /v1/governance/check</option>
              <option value="POST /v1/inference">POST /v1/inference</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Payload (JSON)</label>
            <textarea 
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className="w-full h-32 bg-[#050b08] border border-slate-700 rounded-lg p-3 text-xs text-slate-300 font-mono outline-none resize-none"
              spellCheck={false}
            />
          </div>
          <button 
            onClick={handleCopy}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {copied ? '✓ Copiado!' : '📄 Copiar comando cURL'}
          </button>
        </div>

        {/* Response */}
        <div className="p-4 bg-[#050b08]">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mock Response 🎭</label>
            <span className="text-[10px] font-mono text-emerald-500 border border-emerald-900/50 bg-emerald-900/10 px-2 py-0.5 rounded">200 OK</span>
          </div>
          <pre className="text-[11px] text-emerald-300/90 font-mono overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(mockResponse, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
