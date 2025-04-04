// src/components/RadiusSlider.tsx

import React, { useState } from 'react'

export const RadiusSlider: React.FC = () => {
  const [radius, setRadius] = useState(100)

  return (
    <div className="flex flex-col gap-2">
      <input
        type="range"
        min={10}
        max={500}
        step={1}
        value={radius}
        onChange={(e) => setRadius(parseInt(e.target.value))}
        className="w-full"
      />
      <div className="text-sm">Raggio selezionato: {radius}</div>
    </div>
  )
}