import React from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <header className="bg-white text-white p-2 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Activity className="h-8 w-8 text-[#4A628A]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#4A628A]"
          >
            <h1 className="text-3xl font-bold tracking-tight">Epiguard</h1>
            <p className="text-sm font-medium">Monitoreo y prevención de epidemias con IA</p>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
