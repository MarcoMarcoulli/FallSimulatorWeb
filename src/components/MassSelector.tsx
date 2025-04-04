// src/components/MassSelector.tsx

import React from 'react'

const masses = [
  { name: 'BERNOULLI', image: '/images/Bernoulli.png' },
  { name: 'GALILEO', image: '/images/Galileo.png' },
  { name: 'JAKOB', image: '/images/Jakob.png' },
  { name: 'LEIBNITZ', image: '/images/Leibnitz.png' },
  { name: 'NEWTON', image: '/images/Newton.png' }
]

export const MassSelector: React.FC = () => {
  return (
    <div className="flex gap-4 flex-wrap justify-start">
      {masses.map((mass) => (
        <div key={mass.name} className="flex flex-col items-center">
          <img
            src={mass.image}
            alt={mass.name}
            className="w-16 h-16 object-contain"
          />
          <div className="text-sm font-semibold">{mass.name}</div>
        </div>
      ))}
    </div>
  )
}