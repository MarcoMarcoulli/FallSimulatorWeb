// src/components/CanvasStack.tsx

import React, { useRef, useEffect } from 'react'
import { InputController } from '../logic/InputController'
import { point } from '../types/point'

export const CanvasStack: React.FC = () => {
  const pointsCanvasRef = useRef<HTMLCanvasElement>(null)
  const curveCanvasRef = useRef<HTMLCanvasElement>(null)
  const animationLayerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const resize = () => {
      const width = window.innerWidth - 435
      const height = window.innerHeight

      if (pointsCanvasRef.current && curveCanvasRef.current) {
        pointsCanvasRef.current.width = width
        pointsCanvasRef.current.height = height
        curveCanvasRef.current.width = width
        curveCanvasRef.current.height = height
      }
      if (animationLayerRef.current) {
        animationLayerRef.current.style.width = `${width}px`
        animationLayerRef.current.style.height = `${height}px`
      }
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    const canvas = pointsCanvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const controller = InputController.getInstance()

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const point: point = { x, y }

      try {
        if (!controller.getStartPoint()) {
          controller.setStartPoint(point)
          ctx.fillStyle = 'red'
        } else if (!controller.getEndPoint()) {
          controller.setEndPoint(point)
          ctx.fillStyle = 'green'
        } else {
          controller.addIntermediatePoint(point)
          ctx.fillStyle = 'blue'
        }

        ctx.beginPath()
        ctx.arc(x, y, 4, 0, 2 * Math.PI)
        ctx.fill()
      } catch (error) {
        controller.handleException(error)
      }
    }

    canvas.addEventListener('click', handleClick)
    return () => canvas.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className="w-full h-full relative">
      <canvas ref={curveCanvasRef} className="absolute top-0 left-0 z-10" />
      <canvas ref={pointsCanvasRef} className="absolute top-0 left-0 z-20" />
      <div ref={animationLayerRef} className="absolute top-0 left-0 z-30 pointer-events-none" />
    </div>
  )
}
