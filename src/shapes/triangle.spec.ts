import { vec3 } from 'gl-matrix'
import { Triangle } from './triangle'

describe('Triangle', () => {
  it('should be possible to create a triangle from three points', () => {
    const a = vec3.fromValues(0, 0, 0)
    const b = vec3.fromValues(0, 0, 0)
    const c = vec3.fromValues(0, 0, 0)
    const triangle = new Triangle(a, b, c)

    expect(triangle).toBeInstanceOf(Triangle)
  })
})
