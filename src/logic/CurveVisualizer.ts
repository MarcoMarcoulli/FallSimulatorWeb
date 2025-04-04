import { point } from '../types/point'

export class CurveVisualizer {
  // Utility class: non si istanzia
  private constructor() {
    throw new Error('Utility class')
  }

  // Metodo per disegnare la curva sul canvas
  public static drawCurve(
    points: point[],
    ctx: CanvasRenderingContext2D,
    red: number,
    green: number,
    blue: number
  ): void {
    ctx.strokeStyle = `rgb(${red}, ${green}, ${blue})`
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let i = 0; i < points.length - 1; i++) {
      ctx.moveTo(points[i].x, points[i].y)
      ctx.lineTo(points[i + 1].x, points[i + 1].y)
    }

    ctx.stroke()
  }
}
