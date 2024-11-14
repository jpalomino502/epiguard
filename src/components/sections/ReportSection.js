import React, { useState } from 'react';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import ReactMarkdown from 'react-markdown';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { motion } from 'framer-motion';

const apiKey = process.env.REACT_APP_API_KEY_IA;
const genAI = new GoogleGenerativeAI(apiKey);

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 150,
  temperature: 0.5,
  topP: 0.1,
  topK: 16,
};

const basicSymptoms = [
  "Dolor de cabeza",
  "Fiebre",
  "Tos",
  "Dolor de garganta",
  "Fatiga",
  "Dolor muscular",
  "Náuseas",
  "Diarrea",
  "Pérdida del gusto o del olfato",
  "Dificultad para respirar"
];

export default function Component() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customSymptoms, setCustomSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
    safetySettings,
  });

  const handleSymptomChange = (e) => {
    const symptom = e.target.value;
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSymptomReport = async (event) => {
    event.preventDefault();
    setLoading(true);

    const allSymptoms = [...selectedSymptoms, customSymptoms].filter(Boolean).join(", ");

    try {
      const getUserLocation = () => {
        return new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error("Geolocalización no soportada"));
          } else {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
              },
              (error) => reject(error)
            );
          }
        });
      };

      const location = await getUserLocation();

      const chat = model.startChat({ history: [] });
      const result = await chat.sendMessage(`Basado en los siguientes síntomas, por favor proporciona una recomendación médica general breve: ${allSymptoms}`);
      const response = await result.response;
      const text = await response.text();

      setResponseMessage(text || "Reporte enviado exitosamente");

      await addDoc(collection(db, 'reports'), {
        symptoms: allSymptoms,
        location: { lt: location.latitude, lg: location.longitude },
        timestamp: new Date()
      });

    } catch (error) {
      console.error('Error al enviar el reporte:', error);
      setResponseMessage('Hubo un error al enviar el reporte');
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        className="bg-white rounded-lg shadow-xl p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">Reporte y Asistente Médico Virtual</h1>
        <form onSubmit={handleSymptomReport} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selecciona tus síntomas
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {basicSymptoms.map((symptom) => (
                <label key={symptom} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={symptom}
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={handleSymptomChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{symptom}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="customSymptoms" className="block text-sm font-medium text-gray-700 mb-2">
              Otros síntomas (opcional)
            </label>
            <textarea
              id="customSymptoms"
              value={customSymptoms}
              onChange={(e) => setCustomSymptoms(e.target.value)}
              placeholder="Describe otros síntomas aquí..."
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
            disabled={loading || (selectedSymptoms.length === 0 && !customSymptoms.trim())}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analizando...
              </span>
            ) : (
              'Obtener Recomendación'
            )}
          </button>
        </form>

        {responseMessage && (
          <motion.div
            className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Recomendación:</h2>
            <div className="text-gray-600">
              <ReactMarkdown>{responseMessage}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
