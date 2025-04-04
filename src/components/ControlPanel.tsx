// src/components/ControlPanel.tsx

import React from 'react'

export const ControlPanel: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Messaggio iniziale */}
      <h2 className="text-lg font-bold uppercase">Inserisci il punto di partenza</h2>

      {/* Pulsanti curva */}
      <div className="flex gap-2 flex-wrap">
        <button className="btn">Cicloide</button>
        <button className="btn">Parabola</button>
        <button className="btn">Spline Cubica</button>
        <button className="btn">Circonferenza</button>
      </div>

      {/* Selettore massa (placeholder) */}
      <h3 className="text-sm font-semibold uppercase mt-4">Scegli la massa</h3>
      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <img src="/images/Bernoulli.png" alt="Bernoulli" className="w-14 h-14" />
          <span className="text-xs">Bernoulli</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/images/Galileo.png" alt="Galileo" className="w-14 h-14" />
          <span className="text-xs">Galileo</span>
        </div>
        {/* altri... */}
      </div>

      {/* Slider raggio */}
      <h3 className="text-sm font-semibold uppercase mt-4">Raggio circonferenza</h3>
      <input type="range" min="10" max="200" className="w-full" />

      {/* Pulsanti azione */}
      <div className="flex flex-col gap-2 mt-4">
        <button className="btn bg-green-600 text-white">Avvia Simulazione</button>
        <button className="btn bg-red-500 text-white">Cancella Input</button>
      </div>
    </div>
  )
} 