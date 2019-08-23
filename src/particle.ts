import { vec3 } from 'gl-matrix'

export interface IParticle {
  integrate(duration: number): void
  clearAccumulator(): void
  addForce(force: vec3): void
  isMovable(): boolean
  getMass(): number
}

export type ParticleConfig = {}

export class Particle implements IParticle {
  private inverseMass: number = 0
  private position: vec3 = vec3.create()
  private velocity: vec3 = vec3.create()
  private acceleration: vec3 = vec3.create()
  private forceAcc: vec3 = vec3.create()

  private dumping: number = 0.999

  getMass() {
    return 1 / this.inverseMass
  }

  integrate: (duration: number) => void = (function() {
    const resultingAcc: vec3 = vec3.create()

    return function integrate(this: Particle, duration: number) {
      if (this.inverseMass <= 0) return

      // Calculate new position from velocity
      vec3.scaleAndAdd(this.position, this.position, this.velocity, duration)

      // Calculate new acceleration from forces
      vec3.copy(resultingAcc, this.acceleration)
      vec3.scaleAndAdd(
        resultingAcc,
        resultingAcc,
        this.forceAcc,
        this.inverseMass
      )

      // Caclulate new velocity from acceleration
      vec3.scaleAndAdd(this.velocity, this.velocity, resultingAcc, duration)

      // Apply dumping
      vec3.scale(this.velocity, this.velocity, this.dumping)

      this.clearAccumulator()
    }
  })()

  clearAccumulator() {
    vec3.set(this.forceAcc, 0, 0, 0)
  }

  /**
   * Add force to the accumulator which will be applyed on the next integration only
   *
   * @param force
   */
  addForce(force: vec3) {
    vec3.add(this.forceAcc, this.forceAcc, force)
  }

  isMovable() {
    return this.inverseMass > 0
  }
}
