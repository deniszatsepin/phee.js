import { IBody } from './body.physics'

export interface ForceGeneratorInterface {
  updateForce(particle: IBody, duration: number): void
}
