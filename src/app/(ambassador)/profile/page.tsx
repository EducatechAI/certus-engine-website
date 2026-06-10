import { User, Shield, Key } from "lucide-react";

export default function ProfilePage() {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-100">Meu Perfil</h2>
          <p className="text-gray-400">Gerencie suas informações e preferências de pagamento.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-navy-800 rounded-xl p-6 border border-navy-700">
            <div className="flex items-center space-x-3 mb-6">
              <User className="text-emerald-500" size={24} />
              <h3 className="font-bold text-gray-100 text-lg">Dados Pessoais</h3>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Nome Completo</label>
                <input type="text" defaultValue="Embaixador Certus 01" disabled className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2 text-gray-300 opacity-70 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">E-mail Institucional</label>
                <input type="email" defaultValue="embaixador@certus.link" disabled className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2 text-gray-300 opacity-70 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">CPF/CNPJ</label>
                <input type="text" defaultValue="***.234.567-**" disabled className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2 text-gray-300 font-mono opacity-70 cursor-not-allowed" />
                <p className="text-xs text-gray-500 mt-1 flex items-center"><Shield size={12} className="mr-1"/> Criptografado e travado na Blockchain Certus</p>
              </div>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-navy-800 rounded-xl p-6 border border-navy-700">
            <div className="flex items-center space-x-3 mb-6">
              <Key className="text-emerald-500" size={24} />
              <h3 className="font-bold text-gray-100 text-lg">Chave PIX</h3>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Tipo de Chave</label>
                <select className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2 text-gray-100 focus:border-emerald-500 focus:outline-none">
                  <option>E-mail</option>
                  <option>CPF/CNPJ</option>
                  <option>Telefone</option>
                  <option>Chave Aleatória</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Chave</label>
                <input type="text" defaultValue="embaixador@certus.link" className="w-full bg-navy-900 border border-navy-700 rounded-lg px-4 py-2 text-gray-100 focus:border-emerald-500 focus:outline-none" />
              </div>
              <button className="bg-navy-700 hover:bg-navy-600 text-white font-medium py-2 px-6 rounded-lg transition-colors mt-2">
                Atualizar Chave PIX
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
