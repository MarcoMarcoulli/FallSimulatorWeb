// src/logic/Curve.ts

import { point } from '../types/point'

export abstract class Curve {
  protected intervalX: number
  protected intervalY: number
  protected startPoint: point
  protected endPoint: point

  // componenti del colore
  protected red: number = 0
  protected green: number = 0
  protected blue: number = 0

  // numero di punti da calcolare lungo la curva
  static readonly NUMPOINTS: number = 7000

  constructor(startPoint: point, endPoint: point) {
    this.startPoint = startPoint
    this.endPoint = endPoint
    this.intervalX = endPoint.x - startPoint.x
    this.intervalY = endPoint.y - startPoint.y
  }

  // metodi astratti
  abstract calculatePoints(): point[]
  abstract calculateSlopes(): number[]
  abstract curveName(): string

  // imposta un colore casuale (valori 0–229)
  setRandomColors(): void {
    this.red = Math.floor(Math.random() * 230)
    this.green = Math.floor(Math.random() * 230)
    this.blue = Math.floor(Math.random() * 230)
  }

  // setters
  setRed(red: number): void {
    this.red = red
  }

  setGreen(green: number): void {
    this.green = green
  }

  setBlue(blue: number): void {
    this.blue = blue
  }

  // getters
  getRed(): number {
    return this.red
  }

  getGreen(): number {
    return this.green
  }

  getBlue(): number {
    return this.blue
  }

  static getNumPoints(): number {
    return Curve.NUMPOINTS
  }

  getStartPoint(): point {
    return this.startPoint
  }

  getEndPoint(): point {
    return this.endPoint
  }
}
