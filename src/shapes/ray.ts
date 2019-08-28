import { vec3, glMatrix as glm } from 'gl-matrix'
import { IShape } from './shape'

export interface IRay extends IShape {
  getDirection(): vec3
  normalizeDireciton(): void
}

export class Ray implements IRay {
  private origin: vec3 = vec3.create()
  private direction: vec3 = vec3.fromValues(0, 0, 1)

  constructor(origin: vec3, direction: vec3) {
    vec3.copy(this.origin, origin)
    vec3.copy(this.direction, direction)
    this.normalizeDireciton()
  }

  static fromPoints(from: vec3, to: vec3) {
    const direction = vec3.sub(vec3.create(), to, from)

    return new Ray(from, vec3.normalize(direction, direction))
  }

  getDirection() {
    return vec3.clone(this.direction)
  }

  normalizeDireciton() {
    vec3.normalize(this.direction, this.direction)
  }

  isPointIn: (point: vec3) => boolean = (function() {
    const norm = vec3.create()

    return function isPointInRay(this: Ray, point: vec3): boolean {
      if (vec3.equals(point, this.origin)) {
        return true
      }

      vec3.sub(norm, point, this.origin)
      vec3.normalize(norm, norm)
      const diff = vec3.dot(norm, this.direction)

      return glm.equals(diff, 1)
    }
  })()

  getClosestPoint: (point: vec3) => vec3 = (function() {
    const norm = vec3.create()

    return function getClosestPoint(this: Ray, point: vec3): vec3 {
      vec3.sub(norm, point, this.origin)
      const diff = vec3.dot(norm, this.direction)
      const t = Math.max(diff, 0)

      return vec3.scaleAndAdd(vec3.create(), this.origin, this.direction, t)
    }
  })()
}
