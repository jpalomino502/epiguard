import React from 'react';
import { Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white text-white p-2 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Activity className="h-8 w-8 text-[#4A628A]" />
          <div className="text-[#4A628A]">
            <h1 className="text-3xl font-bold tracking-tight">Epiguard</h1>
            <p className="text-sm font-medium">Monitoreo y prevención de epidemias con IA</p>
          </div>
        </div>
      </div>
    </header>

  );
}