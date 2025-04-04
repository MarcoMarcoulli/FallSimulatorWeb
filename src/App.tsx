// src/App.tsx

import React from 'react'
import { ControlPanel } from './components/ControlPanel'
import { CanvasStack } from './components/CanvasStack'

const App: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-[435px] min-w-[435px] bg-gray-100 p-4 overflow-y-auto">
        <ControlPanel />
      </div>
      <div className="flex-1 relative">
        <CanvasStack />
      </div>
    </div>
  )
}

export default App
