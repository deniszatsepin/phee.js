import { vec3 } from 'gl-matrix'
import { IBody } from './body.physics'

export type PhysicsWorldConfiguration = {
  gravity?: vec3
}

export const GRAVITY = vec3.fromValues(0, -9.80665, 0)

export default class PhysicsWorld {
  bodies: IBody[] = []
  gravity: vec3 = vec3.copy(vec3.create(), GRAVITY)

  constructor({ gravity }: PhysicsWorldConfiguration = {}) {
    if (gravity) {
      vec3.copy(this.gravity, gravity)
    }
  }

  addBody(body: IBody) {
    this.bodies.push(body)
    body.accumulate(this.gravity)
  }

  removeBody(body: IBody) {
    const idx = this.bodies.indexOf(body)

    if (idx >= 0) {
      this.bodies.splice(idx, 1)
    }
  }

  integrate(duration: number) {
    this.bodies.forEach(body => body.integrate(duration))
  }
}
