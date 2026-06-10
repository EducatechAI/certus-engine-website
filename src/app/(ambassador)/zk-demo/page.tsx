"use client";

import { useState } from 'react';
import { executeZKProver } from '../../actions/zk-prover';

export default function ZKDemoPage() {
  const [jsonInput, setJsonInput] = useState('{\n  "name": "João Silva",\n  "cpf": "123.456.789-00",\n  "age": 25\n}');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleProve = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const rawPayload = JSON.parse(jsonInput);
      
      // A mágica acontece no servidor: O cliente NUNCA fica com o rawPayload armazenado 
      // após a submissão, e o servidor NÃO retorna o rawPayload de volta.
      const res = await executeZKProver(rawPayload, 'AGE_GTE_18_AND_VALID_CPF');
      
      setResult(res);
      
      // Sanitização Estrita do Estado: Reseta o input cru para não deixar rastros visuais ou de memória acidentais (Zero Leakage UI)
      setJsonInput('// Dados originais descartados por segurança. Apenas o Hash permanece.');
    } catch (e: any) {
      setError(e.message || "Erro ao processar JSON");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Teatro da Soberania (Demo ZK)</h1>
      <p className="text-gray-600">Simule uma inserção de dados sensíveis e demonstre a conformidade matemática sem vazamento de PII.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Lado Esquerdo: Input */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">1. Input de Dados (Cru)</h2>
          <textarea
            className="w-full h-64 p-4 font-mono text-sm bg-gray-50 border border-gray-300 rounded"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            disabled={loading}
          />
          <button
            onClick={handleProve}
            disabled={loading || jsonInput.startsWith('//')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition disabled:bg-gray-400"
          >
            {loading ? 'Processando Soberania...' : 'Acionar Certus Guardian'}
          </button>
          {error && <p className="text-red-500 font-bold">{error}</p>}
        </div>

        {/* Lado Direito: Output Seguro */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-green-700">2. Output Seguro (Zero Leakage)</h2>
          {result ? (
            <div className="bg-gray-900 text-green-400 p-4 rounded h-64 overflow-y-auto font-mono text-sm shadow-inner relative">
              <pre>{JSON.stringify(result.maskedData, null, 2)}</pre>
              
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-1 px-3 rounded-full flex items-center shadow-lg"
                >
                  <span className="mr-1">✅</span> ZK Verified
                </button>
              </div>
            </div>
          ) : (
            <div className="h-64 border border-dashed border-gray-300 rounded flex items-center justify-center text-gray-400">
              Aguardando submissão...
            </div>
          )}
        </div>
      </div>

      {/* Modal LAZARUS */}
      {showModal && result && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full border-t-8 border-blue-600">
            <h3 className="text-2xl font-bold mb-4">Auditoria LAZARUS</h3>
            <p className="text-gray-600 mb-4">
              O auditor pode verificar a conformidade dos dados matematicamente, sem visualizá-los.
            </p>
            <div className="space-y-4">
              <div>
                <label className="font-bold text-gray-700 block">Regra Aplicada:</label>
                <code className="bg-gray-100 px-2 py-1 rounded text-sm text-blue-800">{result.zkProofs[0].ruleApplied}</code>
              </div>
              <div>
                <label className="font-bold text-gray-700 block">Proof Hash (Commitment):</label>
                <code className="bg-gray-100 px-2 py-1 rounded text-xs text-green-700 break-all">{result.zkProofs[0].proofHash}</code>
              </div>
              <div>
                <label className="font-bold text-gray-700 block">LAZARUS Audit Block:</label>
                <code className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-800 break-all">{result.auditHashes[0]}</code>
              </div>
              <div className="pt-2 text-xs text-gray-400 uppercase tracking-widest">
                Modo: {result.zkProofs[0].simulatorMode ? 'SIMULATOR_DETERMINISTIC' : 'MIDNIGHT_WASM'}
              </div>
            </div>
            <button 
              onClick={() => setShowModal(false)}
              className="mt-6 bg-gray-900 text-white px-4 py-2 rounded font-bold w-full hover:bg-gray-800"
            >
              Fechar Auditoria
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
