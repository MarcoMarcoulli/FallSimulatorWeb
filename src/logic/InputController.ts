// src/logic/InputController.ts

import { point } from '../types/point'

export class InputController {
  private static instance: InputController | null = null

  private startPoint: point | null = null
  private endPoint: point | null = null
  private intermediatePoints: point[] = []

  private constructor() {}

  static getInstance(): InputController {
    if (!InputController.instance) {
      InputController.instance = new InputController()
    }
    return InputController.instance
  }

  static resetInstance(): void {
    InputController.instance = null
  }

  getStartPoint(): point | null {
    return this.startPoint
  }

  getEndPoint(): point | null {
    return this.endPoint
  }

  getIntermediatePoints(): point[] {
    return this.intermediatePoints
  }

  setStartPoint(start: point): void {
    this.startPoint = start
    console.debug(`startPoint: X: ${start.x}, Y: ${start.y}`)
  }

  setEndPoint(end: point): void {
    if (!this.startPoint) throw new Error('Start point must be set before end point')

    if (end.y <= this.startPoint.y) {
      throw new Error('Il punto di arrivo deve essere più in basso di quello di partenza')
    } else if (end.x === this.startPoint.x) {
      this.endPoint = { x: end.x + 1, y: end.y }
    } else {
      this.endPoint = end
    }
    console.debug(`endPoint: X: ${end.x}, Y: ${end.y}`)
  }

  addIntermediatePoint(p: point): void {
    if (!this.startPoint || !this.endPoint) {
      throw new Error('Start and end points must be set first')
    }

    for (const ip of this.intermediatePoints) {
      if (ip.x === p.x) {
        p = { ...p, x: p.x + 1 }
      }
    }

    const isBetween =
      (p.x > this.startPoint.x && p.x < this.endPoint.x) ||
      (p.x < this.startPoint.x && p.x > this.endPoint.x)

    if (!isBetween) {
      throw new Error('I punti intermedi devono essere compresi tra il punto di partenza e il punto di arrivo')
    }

    this.intermediatePoints.push(p)
    console.debug(`intermediatePoint: X: ${p.x}, Y: ${p.y}`)
  }

  clearIntermediatePoints(): void {
    this.intermediatePoints = []
  }

  clearInput(): void {
    this.startPoint = null
    this.endPoint = null
    this.clearIntermediatePoints()
  }

  handleException(e: unknown): void {
    if (e instanceof Error) {
      alert(`Errore: ${e.message}`)
    } else {
      alert('Errore sconosciuto')
    }
  }
}
