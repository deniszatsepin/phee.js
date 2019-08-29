import { vec3 } from 'gl-matrix'
import { Sphere } from '../shapes/sphere'
import { AABB } from '../shapes/aabb'
import { OBB } from '../shapes/obb'
import { Plane } from '../shapes/plane'

export function sphereSphere(s1: Sphere, s2: Sphere): boolean {
  const radiiSum = s1.radius + s2.radius
  const squaredDistance = vec3.squaredDistance(s1.position, s2.position)

  return squaredDistance < radiiSum * radiiSum
}

export function sphereAABB(sphere: Sphere, aabb: AABB): boolean {
  const closestPoint = aabb.getClosestPoint(sphere.position)
  const squaredDistance = vec3.squaredDistance(closestPoint, sphere.position)
  const { radius } = sphere

  return squaredDistance < radius * radius
}

export function sphereOBB(sphere: Sphere, obb: OBB): boolean {
  const closestPoint = obb.getClosestPoint(sphere.position)
  const squaredDistance = vec3.squaredDistance(closestPoint, sphere.position)
  const { radius } = sphere

  return squaredDistance < radius * radius
}

export function spherePlane(sphere: Sphere, plane: Plane): boolean {
  const closestPoint = plane.getClosestPoint(sphere.position)
  const squaredDistance = vec3.squaredDistance(closestPoint, sphere.position)
  const { radius } = sphere

  return squaredDistance < radius * radius
}

export function AABBAABB(aabb1: AABB, aabb2: AABB): boolean {
  const aMin = aabb1.getMin()
  const aMax = aabb1.getMax()
  const bMin = aabb2.getMin()
  const bMax = aabb2.getMax()

  return (
    aMin[0] <= bMax[0] &&
    aMax[0] >= bMin[0] &&
    (aMin[1] <= bMax[1] && aMax[1] >= bMin[1]) &&
    (aMin[2] <= bMax[2] && aMax[2] >= bMin[2])
  )
}

// export function AABBOBB(aabb: AABB, obb: OBB): boolean {
//   return false
// }
