// src/logic/Circle.ts

import { Curve } from './Curve'
import { point } from '../types/point'

export class Circle extends Curve {
  private r: number // raggio della circonferenza
  private convexity: number // 1 = concavità verso l'alto, -1 = verso il basso

  constructor(startPoint: point, endPoint: point, convexity: number, r?: number) {
    super(startPoint, endPoint)
    this.convexity = convexity

    if (r !== undefined) {
      this.r = r
    } else {
      if (convexity === -1) {
        this.r = (Math.pow(this.intervalX, 2) + Math.pow(this.intervalY, 2)) / (2 * this.intervalY) + 1
      } else {
        this.r = (Math.pow(this.intervalX, 2) + Math.pow(this.intervalY, 2)) / (2 * this.intervalX)
      }
    }
  }

  getR(): number {
    return this.r
  }

  evaluateFunction(variable: number): number {
    return Math.sqrt(2 * variable * this.r - Math.pow(variable, 2))
  }

  calculatePoints(): point[] {
    const points: point[] = []
    const xCenter = this.xCenter() + this.startPoint.x
    const yCenter = this.yCenter() + this.startPoint.y

    let x: number, y: number, t: number, cubic: number

    if (this.convexity === 1) {
      const x0 = xCenter - this.r
      console.info("calcolo punti circonferenza con concavità verso l'alto")
      for (let i = 0; i < Curve.NUMPOINTS; i++) {
        t = i / (Curve.NUMPOINTS - 1)
        cubic = this.intervalX * Math.pow(t, 3)
        x = this.startPoint.x + cubic
        y = yCenter + this.evaluateFunction(x - x0)
        points.push({ x, y })
        // console.debug(`Punto[${i}]: x = ${x}, y = ${y}`)
      }
    } else if (this.convexity === -1) {
      const y0 = yCenter - this.r
      console.info("calcolo punti circonferenza con concavità verso il basso")
      for (let i = 0; i < Curve.NUMPOINTS; i++) {
        t = i / (Curve.NUMPOINTS - 1)
        cubic = this.intervalY * Math.pow(t, 3)
        y = this.startPoint.y + cubic
        x = xCenter + Math.sign(this.intervalX) * this.evaluateFunction(y - y0)
        points.push({ x, y })
        // console.debug(`Punto[${i}]: x = ${x}, y = ${y}`)
      }
    }

    return points
  }

  private aCoefficient(): number {
    return Math.pow(this.intervalX, 2) + Math.pow(this.intervalY, 2)
  }

  private bCoefficient(): number {
    return -this.intervalX * this.aCoefficient()
  }

  private cCoefficient(): number {
    return Math.pow(this.aCoefficient() / 2, 2) - Math.pow(this.intervalY * this.r, 2)
  }

  private xCenter(): number {
    const value =
      this.intervalX / 2 +
      this.convexity *
        Math.sign(this.intervalX) *
        Math.sqrt(Math.pow(this.intervalX / 2, 2) - this.cCoefficient() / this.aCoefficient())
    console.debug(`xCenter: ${value}`)
    return value
  }

  private yCenter(): number {
    const xc = this.xCenter()
    const value =
      (Math.pow(this.intervalX, 2) + Math.pow(this.intervalY, 2) - 2 * xc * this.intervalX) /
      (2 * this.intervalY)
    console.debug(`yCenter: ${value}`)
    return value
  }

  calculateSlopes(): number[] {
    const slopes: number[] = []
    const xCenter = this.xCenter() + this.startPoint.x
    const yCenter = this.yCenter() + this.startPoint.y

    let t: number, cubic: number, x: number, y: number

    if (this.convexity === 1) {
      const x0 = xCenter - this.r
      console.info("calcolo pendenze circonferenza con concavità verso l'alto")
      for (let i = 0; i < Curve.NUMPOINTS; i++) {
        t = i / (Curve.NUMPOINTS - 1)
        cubic = this.intervalX * Math.pow(t, 3)
        x = this.startPoint.x + cubic
        slopes[i] = Math.atan(
          (this.r - (x - x0)) / Math.sqrt(2 * this.r * (x - x0) - Math.pow(x - x0, 2))
        )
        // console.debug(`pendenza[${i}]: ${(slopes[i] / Math.PI) * 180}`)
      }
    } else if (this.convexity === -1) {
      const y0 = yCenter - this.r
      console.info("calcolo pendenze circonferenza con concavità verso il basso")
      for (let i = 0; i < Curve.NUMPOINTS; i++) {
        t = i / (Curve.NUMPOINTS - 1)
        cubic = this.intervalY * Math.pow(t, 3)
        y = this.startPoint.y + cubic
        slopes[i] =
          Math.PI / 2 -
          Math.atan((this.r - (y - y0)) / Math.sqrt(2 * this.r * (y - y0) - Math.pow(y - y0, 2)))
        // console.debug(`pendenza[${i}]: ${(slopes[i] / Math.PI) * 180}`)
      }
    }

    return slopes
  }

  curveName(): string {
    return 'circonferenza'
  }
}
