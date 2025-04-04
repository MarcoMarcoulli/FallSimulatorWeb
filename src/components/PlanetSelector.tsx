// src/components/PlanetSelector.tsx

import React from 'react'

const planets = [
  { name: 'LUNA', g: 'g = 1,62', image: '/images/moon.png' },
  { name: 'MARTE', g: 'g = 3,73', image: '/images/mars.png' },
  { name: 'TERRA', g: 'g = 9,81', image: '/images/earth.png' },
  { name: 'GIOVE', g: 'g = 24,79', image: '/images/jupiter.png' },
  { name: 'SOLE', g: 'g = 274', image: '/images/sun.png' }
]

export const PlanetSelector: React.FC = () => {
  return (
    <div className="flex gap-4 flex-wrap justify-start">
      {planets.map((planet) => (
        <div key={planet.name} className="flex flex-col items-center">
          <img
            src={planet.image}
            alt={planet.name}
            className="w-16 h-16 object-contain"
          />
          <div className="text-sm font-semibold">{planet.name}</div>
          <div className="text-xs text-gray-600">{planet.g}</div>
        </div>
      ))}
    </div>
  )
}
