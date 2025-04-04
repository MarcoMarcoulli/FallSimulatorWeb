// src/components/MessageBoard.tsx

import React from 'react'

export const MessageBoard: React.FC = () => {
  const arrivalMessages: string[] = [] // array che conterrà i messaggi di arrivo
  const neverArriveMessages: string[] = [] // array per masse che non arrivano mai

  return (
    <div className="space-y-2 mt-4">
      {arrivalMessages.map((msg, index) => (
        <div key={index} className="text-green-700 font-semibold">
          ✅ {msg}
        </div>
      ))}
      {neverArriveMessages.map((msg, index) => (
        <div key={index} className="text-red-600 font-semibold">
          ⚠️ {msg}
        </div>
      ))}
    </div>
  )
}