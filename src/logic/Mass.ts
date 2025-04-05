// src/logic/Mass.ts

import { point } from '../types/Point' 

export enum MassIcon {
	GALILEO,
	NEWTON,
	LEIBNITZ,
	BERNOULLI,
	JAKOB
}

export class Mass {
  private position: point
  private iconType: MassIcon
  private icon: HTMLImageElement
  private static readonly MASS_DIAMETER = 40

  private xProperty: number
  private yProperty: number

  constructor(startPosition: point, iconType: MassIcon, icon: HTMLImageElement) {
    this.position = startPosition
    this.iconType = iconType
    this.icon = icon

    this.xProperty = startPosition.x - Mass.MASS_DIAMETER / 2
    this.yProperty = startPosition.y - Mass.MASS_DIAMETER / 2

    this.icon.style.position = 'absolute'
    this.icon.width = Mass.MASS_DIAMETER
    this.icon.height = Mass.MASS_DIAMETER
    this.icon.style.left = `${this.xProperty}px`
    this.icon.style.top = `${this.yProperty}px`
  }

  getCurrentPosition(): point {
    return this.position
  }

  getMassDiameter(): number {
    return Mass.MASS_DIAMETER
  }

  setCurrentPosition(newPosition: point): void {
    this.position = newPosition
    this.xProperty = newPosition.x - Mass.MASS_DIAMETER / 2
    this.yProperty = newPosition.y - Mass.MASS_DIAMETER / 2
    this.icon.style.left = `${this.xProperty}px`
    this.icon.style.top = `${this.yProperty}px`
  }

  getX(): number {
    return this.xProperty
  }

  getY(): number {
    return this.yProperty
  }

  getIconTypeString(): string {
    return this.iconType.toString()
  }

  getIcon(): HTMLImageElement {
    return this.icon
  }
}
