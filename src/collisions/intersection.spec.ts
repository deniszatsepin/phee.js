import { vec3, mat3 } from 'gl-matrix'
import { Sphere } from '../shapes/sphere'
import { AABB } from '../shapes/aabb'
import { OBB } from '../shapes/obb'
import { Plane } from '../shapes/plane'
import {
  sphereSphere,
  sphereAABB,
  sphereOBB,
  spherePlane,
  AABBAABB
} from './intersection'

describe('Intersection', () => {
  describe('SphereSphere', () => {
    it('should not be intersected', () => {
      const radius1 = 1
      const position1 = vec3.fromValues(0, 0, 0)
      const s1 = new Sphere(position1, radius1)
      const radius2 = 1
      const position2 = vec3.fromValues(2, 0, 0)
      const s2 = new Sphere(position2, radius2)

      expect(sphereSphere(s1, s2)).toBeFalsy()
    })

    it('should be intersected', () => {
      const radius1 = 1
      const position1 = vec3.fromValues(0, 0, 0)
      const s1 = new Sphere(position1, radius1)
      const radius2 = 3
      const position2 = vec3.fromValues(2, 2, 2)
      const s2 = new Sphere(position2, radius2)

      expect(sphereSphere(s1, s2)).toBeTruthy()
    })
  })

  describe('SphereAABB', () => {
    it('should not be intersected', () => {
      const radius = 1
      const position = vec3.fromValues(0, 0, 0)
      const sphere = new Sphere(position, radius)
      const origin = vec3.fromValues(3, 3, 3)
      const size = vec3.fromValues(1, 1, 1)
      const aabb = new AABB(origin, size)

      expect(sphereAABB(sphere, aabb)).toBeFalsy()
    })

    it('should be intersected', () => {
      const radius = 1
      const position = vec3.fromValues(0, 0, 0)
      const sphere = new Sphere(position, radius)
      const origin = vec3.fromValues(3, 0, 0)
      const size = vec3.fromValues(3, 3, 3)
      const aabb = new AABB(origin, size)

      expect(sphereAABB(sphere, aabb)).toBeTruthy()
    })
  })

  describe('SphereOBB', () => {
    it('should not be intersected', () => {
      const radius = 1
      const sPosition = vec3.fromValues(0, 0, 0)
      const sphere = new Sphere(sPosition, radius)
      const position = vec3.fromValues(3, 3, 3)
      const size = vec3.fromValues(1, 1, 1)
      const orientation = mat3.create()
      const obb = new OBB(position, size, orientation)

      expect(sphereOBB(sphere, obb)).toBeFalsy()
    })

    it('should be intersected', () => {
      const radius = 1
      const sPosition = vec3.fromValues(0, 0, 0)
      const sphere = new Sphere(sPosition, radius)
      const position = vec3.fromValues(3, 3, 3)
      const size = vec3.fromValues(3, 3, 3)
      const orientation = mat3.create()
      const obb = new OBB(position, size, orientation)

      expect(sphereOBB(sphere, obb)).toBeTruthy()
    })
  })

  describe('SpherePlane', () => {
    it('should not be intersected', () => {
      const radius = 1
      const position = vec3.fromValues(0, 0, 0)
      const sphere = new Sphere(position, radius)
      const normal = vec3.fromValues(0, 1, 0)
      const distance = 3
      const plane = new Plane(normal, distance)

      expect(spherePlane(sphere, plane)).toBeFalsy()
    })

    it('should be intersected', () => {
      const radius = 2
      const position = vec3.fromValues(0, 0, 0)
      const sphere = new Sphere(position, radius)
      const normal = vec3.fromValues(0, 1, 0)
      const distance = 1
      const plane = new Plane(normal, distance)

      expect(spherePlane(sphere, plane)).toBeTruthy()
    })
  })

  describe('AABBAABB', () => {
    it('should not be intersected', () => {
      const o1 = vec3.fromValues(3, 3, 3)
      const s1 = vec3.fromValues(1, 1, 1)
      const aabb1 = new AABB(o1, s1)
      const o2 = vec3.fromValues(-3, -3, -3)
      const s2 = vec3.fromValues(1, 1, 1)
      const aabb2 = new AABB(o2, s2)

      expect(AABBAABB(aabb1, aabb2)).toBeFalsy()
    })

    it('should be intersected', () => {
      const o1 = vec3.fromValues(3, 3, 3)
      const s1 = vec3.fromValues(1, 1, 1)
      const aabb1 = new AABB(o1, s1)
      const o2 = vec3.fromValues(3, 3, 3)
      const s2 = vec3.fromValues(1, 1, 1)
      const aabb2 = new AABB(o2, s2)

      expect(AABBAABB(aabb1, aabb2)).toBeTruthy()
    })
  })
})
