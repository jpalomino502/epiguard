import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function AlertsSection({ alerts }) {
  console.log("Alertas recibidas en AlertsSection:", alerts); 

  return (
    <div className="p-4 space-y-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Alertas de Epidemias</h2>
      <div className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map(alert => (
            <div key={alert.id} className="flex items-center space-x-3 bg-yellow-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
              <AlertTriangle className="text-yellow-500 w-6 h-6" />
              <span className="text-gray-700">{alert.message}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay alertas activas en este momento.</p>
        )}
      </div>
    </div>
  );
}
