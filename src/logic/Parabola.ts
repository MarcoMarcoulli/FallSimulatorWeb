// src/logic/Parabola.ts

import { Curve } from './Curve'
import { point } from '../types/Point'

export class Parabola extends Curve {
  private a: number // coefficiente della parabola

  constructor(startPoint: point, endPoint: point) {
    super(startPoint, endPoint)
    this.a = this.intervalX / Math.pow(this.intervalY, 2)
    console.info(`Coefficiente a = ${this.a}`)
  }

  getA(): number {
    return this.a
  }

  evaluateX(y: number): number {
    return this.a * Math.pow(y, 2)
  }

  calculatePoints(): point[] {
    const points: point[] = []
    let x: number, y: number, t: number, yCubic: number

    for (let i = 0; i < Curve.NUMPOINTS; i++) {
      t = i / (Curve.NUMPOINTS - 1)
      yCubic = this.intervalY * Math.pow(t, 3)
      y = this.startPoint.y + yCubic
      x = this.startPoint.x + this.evaluateX(yCubic)
      points.push({ x, y })
    }

    return points
  }

  calculateSlopes(): number[] {
    const slopes: number[] = []
    let t: number, yCubic: number

    console.info('Calcolo pendenze parabola')

    for (let i = 0; i < Curve.NUMPOINTS; i++) {
      t = i / (Curve.NUMPOINTS - 1)
      yCubic = this.intervalY * Math.pow(t, 3)
      slopes[i] = Math.PI / 2 - Math.atan(2 * this.a * yCubic)
      // Per il debug:
      // console.debug(`pendenza[${i}]: ${(slopes[i] / Math.PI) * 180}`)
    }

    return slopes
  }

  curveName(): string {
    return 'parabola'
  }
}
