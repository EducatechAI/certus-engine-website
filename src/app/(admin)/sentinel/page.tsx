'use client';

import { useState, useEffect } from 'react';
import { backendClient } from '@/lib/api/backend-client';

export default function SentinelDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000); // 1 minuto
    return () => clearInterval(interval);
  }, []);

  async function loadData() {
    try {
      const [metricsRes, alertsRes, healthRes] = await Promise.all([
        backendClient.get('/admin/sentinel/metrics/current'),
        backendClient.get('/admin/sentinel/alerts'),
        backendClient.get('/admin/sentinel/health').catch(e => e.response)
      ]);
      
      setMetrics(metricsRes.data);
      setAlerts(alertsRes.data.alerts || []);
      setHealth(healthRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading Sentinel data:', error);
      setLoading(false);
    }
  }

  async function acknowledgeAlert(id: number) {
    try {
      await backendClient.post(`/admin/sentinel/alerts/${id}/acknowledge`);
      loadData();
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <div className="p-8">Carregando Sentinel...</div>;

  return (
    <div className="p-8 bg-navy-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-500">🛡️ SENTINEL Monitor</h1>
        <div className={`px-4 py-2 rounded font-bold ${health?.status === 'HEALTHY' ? 'bg-emerald-600' : 'bg-red-600'}`}>
          STATUS: {health?.status || 'UNKNOWN'}
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-6 bg-navy-800 rounded border border-navy-700">
          <p className="text-sm text-gray-400">Error Rate</p>
          <p className="text-2xl font-bold text-emerald-400">{(metrics?.error_rate * 100).toFixed(2)}%</p>
        </div>
        <div className="p-6 bg-navy-800 rounded border border-navy-700">
          <p className="text-sm text-gray-400">CPU Usage</p>
          <p className="text-2xl font-bold text-emerald-400">{metrics?.cpu_usage?.toFixed(1)}%</p>
        </div>
        <div className="p-6 bg-navy-800 rounded border border-navy-700">
          <p className="text-sm text-gray-400">RAM Usage</p>
          <p className="text-2xl font-bold text-emerald-400">{metrics?.memory_usage?.toFixed(1)}%</p>
        </div>
        <div className="p-6 bg-navy-800 rounded border border-navy-700">
          <p className="text-sm text-gray-400">Threats Blocked Today</p>
          <p className="text-2xl font-bold text-emerald-400">{metrics?.threats_blocked_today}</p>
        </div>
      </div>

      {/* Alerts */}
      <div>
        <h2 className="text-2xl font-bold mb-4">🚨 Alertas Ativos ({alerts.length})</h2>
        {alerts.length === 0 ? (
          <p className="text-gray-400 italic">Nenhum alerta ativo. Sistema operando nominalmente.</p>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert: any) => (
              <div key={alert.id} className={`p-4 rounded border ${alert.severity === 'CRITICAL' ? 'bg-red-900/30 border-red-500' : 'bg-yellow-900/30 border-yellow-500'}`}>
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{alert.metric} ({alert.severity})</h3>
                    <p className="text-sm mt-1">{alert.message}</p>
                    <p className="text-xs text-gray-400 mt-2">Valor: {alert.value} | Limiar: {alert.threshold}</p>
                    <p className="text-xs text-gray-500 mt-1">{new Date(alert.created_at).toLocaleString()}</p>
                  </div>
                  <button 
                    onClick={() => acknowledgeAlert(alert.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded h-fit"
                  >
                    Acknowledge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
