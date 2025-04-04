// src/logic/SimulationManager.ts

import { point } from '../types/point'
import { Curve } from './Curve'
import { Mass } from './Mass'
import { MassArrivalObserver } from './MassArrivalObserver'

export class SimulationManager {
  private mass: Mass | null = null
  private curve: Curve
  private points: point[]
  private slopes: number[] = []
  private times: number[] = []

  private observer: MassArrivalObserver | null = null
  private startTime: number = 0
  private animationFrameId: number = 0

  constructor(curve: Curve) {
    this.curve = curve
    this.points = curve.calculatePoints()
  }

  addMassArrivalObserver(observer: MassArrivalObserver): void {
    this.observer = observer
  }

  notifyMassArrivalObserver(arrived: boolean): void {
    this.observer?.onMassArrival(this, arrived)
  }

  getCurve(): Curve {
    return this.curve
  }

  setMass(mass: Mass): void {
    this.mass = mass
  }

  getMass(): Mass | null {
    return this.mass
  }

  getPoints(): point[] {
    return this.points
  }

  getArrivalTime(): number {
    return this.times[this.points.length - 1]
  }

  setSlopes(slopes: number[]): void {
    this.slopes = slopes
  }

  calculateTimeParametrization(g: number): number[] {
    this.times = new Array(this.points.length)
    this.times[0] = 0
    this.times[1] = Number.EPSILON

    console.info('Parametrizzazione curva rispetto al tempo')

    for (let i = 2; i < this.points.length; i++) {
      const h1 = this.points[i - 1].y - this.curve.getStartPoint().y
      const h2 = this.points[i].y - this.curve.getStartPoint().y

      if (h1 === 0) {
        this.times[i] = this.times[i - 1] + Number.EPSILON
        continue
      }

      const v1 = Math.sqrt(2 * g * h1)
      const v2 = Math.sqrt(2 * g * h2)
      const v1y = v1 * Math.abs(Math.sin(this.slopes[i - 1]))
      const v2y = v2 * Math.abs(Math.sin(this.slopes[i]))

      const dy = Math.abs(this.points[i].y - this.points[i - 1].y)
      const integrand = (1 / v1y + 1 / v2y) / 2

      this.times[i] = this.times[i - 1] + integrand * dy

      console.debug(`h1[${i}]: ${h1}, v1y: ${v1y}, tempo: ${this.times[i]}`)
    }

    return this.times
  }

  startAnimation(): void {
    if (!this.mass) return

    const icon = this.mass.getIcon()
    const radius = this.mass.getMassDiameter() / 2

    const relocateIcon = (x: number, y: number) => {
      icon.style.position = 'absolute'
      icon.style.left = `${x}px`
      icon.style.top = `${y}px`
    }

    const startX = this.points[0].x - radius
    const startY = this.points[0].y - radius
    relocateIcon(startX, startY)

    this.startTime = performance.now()

    const animate = (now: number) => {
      const elapsedTime = (now - this.startTime) / 1000

      let index = this.binarySearch(this.times, elapsedTime)
      if (index < 0) index = ~index // bitwise not = -(index + 1)

      if (index >= this.times.length - 1) {
        const x = this.points[this.points.length - 1].x - radius
        const y = this.points[this.points.length - 1].y - radius
        relocateIcon(x, y)
        this.notifyMassArrivalObserver(true)
        return
      }

      if (
        index < this.times.length - 2 &&
        this.points[index + 2].y < this.points[0].y
      ) {
        relocateIcon(this.points[index].x - radius, this.points[index].y - radius)
        this.notifyMassArrivalObserver(false)
        return
      }

      const ratio = (elapsedTime - this.times[index]) /
                    (this.times[index + 1] - this.times[index])
      const x =
        this.points[index].x +
        (this.points[index + 1].x - this.points[index].x) * ratio -
        radius
      const y =
        this.points[index].y +
        (this.points[index + 1].y - this.points[index].y) * ratio -
        radius

      relocateIcon(x, y)
      this.animationFrameId = requestAnimationFrame(animate)
    }

    this.animationFrameId = requestAnimationFrame(animate)
  }

  // versione equivalente di Arrays.binarySearch()
  private binarySearch(arr: number[], target: number): number {
    let low = 0
    let high = arr.length - 1

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      if (arr[mid] < target) {
        low = mid + 1
      } else if (arr[mid] > target) {
        high = mid - 1
      } else {
        return mid
      }
    }

    return ~low // se non trovato, ritorna l'inserzione negativa come in Java
  }
}
