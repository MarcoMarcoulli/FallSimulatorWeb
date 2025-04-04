// src/components/CurveButtons.tsx

import React from 'react'

export const CurveButtons: React.FC = () => {
  return (
    <div className="flex gap-2 flex-wrap">
      <button className="px-4 py-2 bg-blue-500 text-white rounded">Cicloide</button>
      <button className="px-4 py-2 bg-green-500 text-white rounded">Parabola</button>
      <button className="px-4 py-2 bg-purple-500 text-white rounded">Circonferenza</button>
      <button className="px-4 py-2 bg-orange-500 text-white rounded">Spline Cubica</button>
    </div>
  )
}