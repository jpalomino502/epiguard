import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function AlertsSection({ alerts }) {
  console.log("Alertas recibidas en AlertsSection:", alerts);  // Verificar alertas

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Alertas de Epidemias</h2>
      <div className="space-y-2">
        {alerts.length > 0 ? (
          alerts.map(alert => (
            <div key={alert.id} className="flex items-center space-x-2 bg-yellow-100 p-2 rounded">
              <AlertTriangle className="text-yellow-500" />
              <span>{alert.message}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay alertas activas en este momento.</p>
        )}
      </div>
    </div>
  );
}
