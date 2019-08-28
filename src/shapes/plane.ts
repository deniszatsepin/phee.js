import { vec3, glMatrix as glm } from 'gl-matrix'
import { IShape } from './shape'

export interface IPlane extends IShape {
  planeEquation(point: vec3): number
}

export class Plane implements IPlane {
  private normal: vec3 = vec3.create()
  private distance: number = 0

  constructor(normal: vec3, distance: number) {
    vec3.copy(this.normal, normal)
    this.distance = distance
  }

  planeEquation(point: vec3) {
    return vec3.dot(point, this.normal) - this.distance
  }

  isPointIn(point: vec3) {
    return glm.equals(this.planeEquation(point), 0)
  }

  getClosestPoint(point: vec3) {
    const dot = vec3.dot(this.normal, point)
    const distance = dot - this.distance
    const result = vec3.create()

    return vec3.scaleAndAdd(result, point, this.normal, -distance)
  }
}
