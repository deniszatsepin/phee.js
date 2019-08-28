import { vec3 } from 'gl-matrix'
import { IShape } from './shape'

export interface IAABB extends IShape {
  getMin(): vec3
  getMax(): vec3
}

export class AABB implements IAABB {
  private origin: vec3 = vec3.create()
  private size: vec3 = vec3.fromValues(1, 1, 1)

  constructor(origin: vec3, size: vec3) {
    vec3.copy(this.origin, origin)
    vec3.copy(this.size, size)
  }

  getMin: () => vec3 = (function() {
    const p1 = vec3.create()
    const p2 = vec3.create()

    return function getMin(this: AABB) {
      vec3.add(p1, this.origin, this.size)
      vec3.sub(p2, this.origin, this.size)

      return vec3.fromValues(
        Math.min(p1[0], p2[0]),
        Math.min(p1[1], p2[1]),
        Math.min(p1[2], p2[2])
      )
    }
  })()

  getMax: () => vec3 = (function() {
    const p1 = vec3.create()
    const p2 = vec3.create()

    return function getMin(this: AABB) {
      vec3.add(p1, this.origin, this.size)
      vec3.sub(p2, this.origin, this.size)

      return vec3.fromValues(
        Math.max(p1[0], p2[0]),
        Math.max(p1[1], p2[1]),
        Math.max(p1[2], p2[2])
      )
    }
  })()

  static fromMinMax(min: vec3, max: vec3): AABB {
    const origin = vec3.scale(
      vec3.create(),
      vec3.add(vec3.create(), min, max),
      0.5
    )
    const size = vec3.scale(
      vec3.create(),
      vec3.sub(vec3.create(), max, min),
      0.5
    )

    return new AABB(origin, size)
  }

  isPointIn: (point: vec3) => boolean = (function() {
    const tmp = vec3.create()

    return function isPointInAABB(this: AABB, point: vec3): boolean {
      const min = this.getMin()
      const max = this.getMax()

      if (point[0] < min[0] || point[1] < min[1] || point[2] < min[2]) {
        return false
      }

      if (point[0] > max[0] || point[1] > max[1] || point[2] > max[2]) {
        return false
      }

      return true
    }
  })()

  getClosestPoint(point: vec3): vec3 {
    const result = vec3.clone(point)
    const min = this.getMin()
    const max = this.getMax()

    result[0] = result[0] < min[0] ? min[0] : result[0]
    result[1] = result[1] < min[1] ? min[1] : result[1]
    result[2] = result[2] < min[2] ? min[2] : result[2]

    result[0] = result[0] > max[0] ? max[0] : result[0]
    result[1] = result[1] > max[1] ? max[1] : result[1]
    result[2] = result[2] > max[2] ? max[2] : result[2]

    return result
  }
}
