import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function Admin() {
  const [rsvps, setRsvps] = useState<{ id: number; name: string; created_at: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Simula carregamento do banco de dados local
    setTimeout(() => {
      let data = JSON.parse(localStorage.getItem('rsvps') || '[]');
      
      const removeName = searchParams.get('remove');
      if (removeName) {
        data = data.filter((r: { name: string }) => r.name.toLowerCase().trim() !== removeName.toLowerCase().trim());
        localStorage.setItem('rsvps', JSON.stringify(data));
        // Remove o parametro da URL para não rodar novamente ao recarregar a tela
        navigate('/admin', { replace: true });
      }

      setRsvps(data);
      setLoading(false);
    }, 500);
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-pink-500 text-white p-6">
          <h1 className="text-2xl font-bold">Lista de Presença</h1>
          <p className="opacity-80">Painel de administração - Nomes confirmados</p>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="text-center py-10 opacity-60">Carregando...</div>
          ) : rsvps.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Ninguém confirmou ainda.</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {rsvps.map((rsvp) => (
                <li key={rsvp.id} className="py-4 flex justify-between items-center">
                  <span className="font-medium text-lg uppercase text-gray-800">{rsvp.name}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(rsvp.created_at).toLocaleString('pt-BR')}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
