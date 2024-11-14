import React, { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MembershipCard = ({ title, price, features, isPopular, onSelectPlan }) => (
  <div 
    className="bg-white rounded-lg shadow-lg p-6 transition duration-300 ease-in-out transform hover:scale-105 hover:border-[#4A628A] hover:shadow-xl flex flex-col h-full" // Aquí se añadió `flex` y `h-full`
  >
    <h3 className="text-xl font-bold text-[#4A628A] mb-4">{title}</h3>
    <p className="text-3xl font-bold text-[#4A628A] mb-6">${price}<span className="text-sm font-normal">/mes</span></p>
    <ul className="space-y-2 mb-6 flex-grow"> {/* Se añadió `flex-grow` para que la lista ocupe el espacio restante */}
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-[#4A628A]">
          <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
          {feature}
        </li>
      ))}
    </ul>
    <button 
      onClick={onSelectPlan}
      className="w-full bg-[#4A628A] text-white font-bold py-2 px-4 rounded hover:bg-opacity-90 transition duration-300">
      Seleccionar Plan
    </button>
  </div>
)

export default function MembershipSection() {
  const [selectedPlan, setSelectedPlan] = useState(null)

  const memberships = [
    {
      title: 'Premium',
      price: 5.99,
      features: ['Consultas ilimitadas', 'Sin anuncios', 'Soporte prioritario', 'Acceso a contenido exclusivo'],
      isPopular: true,
    },
    {
      title: 'Familiar',
      price: 12.99,
      features: ['Todo lo del plan Premium', 'Hasta 5 miembros', 'Seguimiento familiar'],
      isPopular: false,
    },
  ]

  const handleSelectPlan = (planTitle) => {
    setSelectedPlan(planTitle)
    toast.success(`¡Has seleccionado el plan ${planTitle}!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-[#4A628A] mb-8">Membresías Epiguard</h2>
        <p className="text-xl text-center text-[#4A628A] mb-12">Elija el plan que mejor se adapte a sus necesidades de salud</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {memberships.map((membership, index) => (
            <MembershipCard 
              key={index} 
              {...membership} 
              onSelectPlan={() => handleSelectPlan(membership.title)}
            />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
