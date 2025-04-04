import { Curve } from './Curve'
import { point } from '../types/point'
import Spline from 'cubic-spline'

export class CubicSpline extends Curve {
  private splineFunction: Spline | null = null
  private interpolationPoints: point[]

  constructor(startPoint: point, endPoint: point, intermediatePoints: point[]) {
    super(startPoint, endPoint)

    this.interpolationPoints = [startPoint, ...intermediatePoints, endPoint]
    this.interpolationPoints.sort((a, b) => a.x - b.x)

    const xs = this.interpolationPoints.map(p => p.x)
    const ys = this.interpolationPoints.map(p => p.y)

    if (xs.length > 2) {
      this.splineFunction = new Spline(xs, ys)
    } else {
      this.splineFunction = null
    }
  }

  evaluateY(x: number): number {
    if (this.splineFunction === null) {
      const m = this.intervalY / this.intervalX
      return m * (x - this.startPoint.x) + this.startPoint.y
    } else {
      return this.splineFunction.at(x)
    }
  }

  calculatePoints(): point[] {
    const points: point[] = []
    for (let i = 0; i < Curve.NUMPOINTS - 1; i++) {
      const t = i / (Curve.NUMPOINTS - 1)
      const xCubic = this.intervalX * Math.pow(t, 3)
      const x = this.startPoint.x + xCubic
      const y = this.evaluateY(x)
      points.push({ x, y })
    }
    points.push(this.endPoint)
    return points
  }

  calculateSlopes(): number[] {
    const slopes: number[] = []
    if (this.splineFunction === null) {
      const m = this.intervalY / this.intervalX
      const angle = Math.atan(m)
      for (let i = 0; i < Curve.NUMPOINTS; i++) {
        slopes[i] = angle
      }
    } else {
      for (let i = 0; i < Curve.NUMPOINTS - 1; i++) {
        const t = i / (Curve.NUMPOINTS - 1)
        const xCubic = this.intervalX * Math.pow(t, 3)
        const x = this.startPoint.x + xCubic
        //stima numerica della derivata
        const delta = 1e-5
        const dy = this.evaluateY(x + delta) - this.evaluateY(x)
        const dx = delta
        slopes[i] = Math.atan(dy / dx)
      }
      slopes[Curve.NUMPOINTS - 1] = slopes[Curve.NUMPOINTS - 2]
    }
    return slopes
  }

  curveName(): string {
    return 'spline'
  }
}
