// src/components/ConvexityButtons.tsx

import React from 'react'

export const ConvexityButtons: React.FC = () => {
  return (
    <div className="flex gap-2">
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Verso l'alto</button>
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Verso il basso</button>
    </div>
  )
}