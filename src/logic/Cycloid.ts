// src/logic/Cycloid.ts

import { Curve } from './Curve'
import { point } from '../types/point'

export class NonConvergenceException extends Error {
  constructor(public maxIterations: number) {
    super(`Il metodo non converge dopo ${maxIterations} iterazioni`)
    this.name = 'NonConvergenceException'
  }
}

export class Cycloid extends Curve {
  private alfa: number // parametro per il punto finale
  private r: number    // raggio della cicloide

  constructor(startPoint: point, endPoint: point) {
    super(startPoint, endPoint)
    this.alfa = this.calculateAlfa()
    this.r = this.calculateR(this.intervalY)
  }

  private f(a: number): number {
    return ((a - Math.sin(a)) / (1 - Math.cos(a))) - (this.intervalX / this.intervalY)
  }

  private df(a: number): number {
    const numerator = Math.pow(Math.sin(a), 2) - a * Math.sin(a)
    const denominator = Math.pow(1 - Math.cos(a), 2)
    return 1 + numerator / denominator
  }

  private calculateAlfa(): number {
    let alfaLocal = 4 * Math.atan(this.intervalX / (2 * this.intervalY))
    const maxIterations = 100

    for (let i = 0; i < maxIterations; i++) {
      const alfaNew = alfaLocal - this.f(alfaLocal) / this.df(alfaLocal)

      if (Math.abs(alfaNew - alfaLocal) < 1e-6) {
        console.info(`Convergenza raggiunta: alfa = ${alfaNew}`)
        return alfaNew
      }

      alfaLocal = alfaNew
    }

    console.error(`Il metodo di Newton-Raphson non converge dopo ${maxIterations} iterazioni`)
    throw new NonConvergenceException(maxIterations)
  }

  private calculateR(y: number): number {
    const rad = y / (1 - Math.cos(this.alfa))
    console.debug(`Raggio calcolato: ${rad}`)
    return rad
  }

  evaluateX(a: number): number {
    return this.r * (a - Math.sin(a))
  }

  evaluateY(a: number): number {
    return this.r * (1 - Math.cos(a))
  }

  calculatePoints(): point[] {
    const points: point[] = []
    let t: number, aCubic: number, x: number, y: number

    console.info('Calcolo punti cicloide')

    for (let i = 0; i < Curve.NUMPOINTS; i++) {
      t = i / (Curve.NUMPOINTS - 1)
      aCubic = this.alfa * Math.pow(t, 3)
      x = this.startPoint.x + this.evaluateX(aCubic)
      y = this.startPoint.y + this.evaluateY(aCubic)
      points.push({ x, y })
      // console.debug(`Punto[${i}]: x = ${x}, y = ${y}`)
    }

    return points
  }

  calculateSlopes(): number[] {
    const slopes: number[] = []
    let t: number, aCubic: number

    console.info('Calcolo pendenze cicloide')

    slopes[0] = Math.PI / 2
    // console.debug(`pendenza[0]: ${(slopes[0] / Math.PI) * 180}`)

    for (let i = 1; i < Curve.NUMPOINTS; i++) {
      t = i / (Curve.NUMPOINTS - 1)
      aCubic = this.alfa * Math.pow(t, 3)
      slopes[i] = Math.atan(Math.sin(aCubic) / (1 - Math.cos(aCubic)))
      // console.debug(`pendenza[${i}]: ${(slopes[i] / Math.PI) * 180}`)
    }

    return slopes
  }

  curveName(): string {
    return 'cicloide'
  }
}
