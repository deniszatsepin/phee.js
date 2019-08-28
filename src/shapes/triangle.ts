import { vec3 } from 'gl-matrix'

export interface ITriangle {}

export class Triangle implements ITriangle {
  private a: vec3 = vec3.create()
  private b: vec3 = vec3.create()
  private c: vec3 = vec3.create()

  constructor(a: vec3, b: vec3, c: vec3) {
    a && vec3.copy(this.a, a)
    b && vec3.copy(this.b, b)
    c && vec3.copy(this.c, c)
  }
}
