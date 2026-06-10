'use client';

import { useState, useEffect } from 'react';
import { backendClient } from '@/lib/api/backend-client';

export default function PIIZeroDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [recentEvents, setRecentEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  async function loadData() {
    try {
      const [statsRes, eventsRes] = await Promise.all([
        backendClient.get('/admin/pii-zero/stats'),
        backendClient.get('/admin/pii-zero/recent-events?limit=50')
      ]);
      
      setStats(statsRes.data);
      setRecentEvents(eventsRes.data.events);
      setLoading(false);
    } catch (error) {
      console.error('Error loading PII-Zero data:', error);
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="p-8 bg-navy-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">🐺 WOLFDOG - PII-Zero Dashboard</h1>
      
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-6 bg-navy-800 rounded-lg border border-navy-700">
          <p className="text-sm text-gray-400">PII Detectada Hoje</p>
          <p className="text-3xl font-bold text-emerald-500">{stats?.today_count}</p>
        </div>
        <div className="p-6 bg-navy-800 rounded-lg border border-navy-700">
          <p className="text-sm text-gray-400">Total de Mascaramentos</p>
          <p className="text-3xl font-bold text-emerald-500">{stats?.total_count}</p>
        </div>
        <div className="p-6 bg-navy-800 rounded-lg border border-navy-700">
          <p className="text-sm text-gray-400">Tipos Mais Comuns</p>
          <p className="text-lg font-bold text-emerald-500">{stats?.top_type}</p>
        </div>
        <div className="p-6 bg-navy-800 rounded-lg border border-navy-700">
          <p className="text-sm text-gray-400">Latência Média</p>
          <p className="text-3xl font-bold text-emerald-500">{stats?.avg_latency_ms}ms</p>
        </div>
      </div>
      
      {/* Eventos Recentes */}
      <div>
        <h2 className="text-xl font-bold mb-4">Eventos Recentes de Mascaramento</h2>
        <div className="space-y-2">
          {recentEvents.map((event, index) => (
            <div key={index} className="p-4 bg-navy-800 rounded border border-navy-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-mono text-sm">{event.path}</p>
                  <p className="text-sm text-gray-400">{event.timestamp}</p>
                </div>
                <span className="px-2 py-1 bg-emerald-500/20 text-emerald-500 text-xs rounded">
                  {event.findings_count} PII(s)
                </span>
              </div>
              <p className="text-sm mt-2">
                <strong>Tipos:</strong> {event.findings_types.join(', ')}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Latência: {event.duration_ms}ms
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
