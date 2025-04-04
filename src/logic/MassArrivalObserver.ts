import { SimulationManager } from './SimulationManager'

export interface MassArrivalObserver {
  onMassArrival(source: SimulationManager, arrived: boolean): void
}
