import { vec3, quat, mat3, mat4 } from 'gl-matrix'
import { IShape } from './shapes/shape'
import { Sphere } from './shapes/sphere'

export interface IBodyConfig {
  shape?: IShape
}

export interface IBody {
  getMass(): number
  getInverseMass(): number
  isFiniteMass(): boolean
  integrate(duration: number): void
  accumulate(acceleration: vec3): void

  setVelocity(x: number, y: number, z: number): void
  setVelocityV(velocity: vec3): void
  cloneVelocity(): vec3
  setShape(shape: IShape): void

  setAcceleration(x: number, y: number, z: number): void
  setAccelerationV(acceleration: vec3): void
  cloneAcceleration(): vec3

  getPosition(): vec3
  setPositionV(position: vec3): void
}

export enum ShapeType {
  Sphere = 'sphere',
  AABB = 'aabb',
  OBB = 'obb',
  Plane = 'plane'
}

export default class Body implements IBody {
  position: vec3 = vec3.create()
  velocity: vec3 = vec3.create()
  acceleration: vec3 = vec3.create()
  orientation: quat = quat.create()
  rotation: vec3 = vec3.create()
  forceAccum: vec3 = vec3.create()
  torqueAccum: vec3 = vec3.create()
  inverseMass: number = 0
  inverseInertiaTensor: mat3 = mat3.create()
  inverseInertiaTensorWorld: mat3 = mat3.create()
  transformMatrix: mat4 = mat4.create()
  damping: number = 0.9999
  angularDamping: number = 0
  shape: IShape
  isAwake: boolean = false

  constructor(config: IBodyConfig) {
    this.shape = config.shape || new Sphere()
  }

  setMass(mass: number) {
    this.inverseMass = mass === 0 ? mass : 1 / mass
  }

  setVelocity(x: number, y: number, z: number) {
    vec3.set(this.velocity, x, y, z)
  }

  setVelocityV(velocity: vec3) {
    vec3.copy(this.velocity, velocity)
  }

  cloneVelocity(): vec3 {
    return vec3.clone(this.velocity)
  }

  setShape(shape: IShape) {
    this.shape = shape
  }

  setAcceleration(x: number, y: number, z: number) {
    vec3.set(this.acceleration, x, y, z)
  }

  setAccelerationV(acceleration: vec3) {
    vec3.copy(this.acceleration, acceleration)
  }

  cloneAcceleration(): vec3 {
    return vec3.clone(this.acceleration)
  }

  getPosition(): vec3 {
    return vec3.clone(this.position)
  }

  setPositionV(position: vec3) {
    vec3.copy(this.position, position)
  }

  getMass(): number {
    return 1 / this.inverseMass
  }

  getInverseMass(): number {
    return this.inverseMass
  }

  isFiniteMass(): boolean {
    return this.inverseMass > 0
  }

  clearAccumulator() {
    vec3.set(this.forceAccum, 0, 0, 0)
    vec3.set(this.torqueAccum, 0, 0, 0)
  }

  accumulate(acceleration: vec3) {
    vec3.add(this.acceleration, this.acceleration, acceleration)
  }

  addForce(force: vec3) {
    vec3.add(this.forceAccum, this.forceAccum, force)
  }

  // addForceAtPoint(force: Vector3, point: Vector3) {}

  // addForceAtBodyPoint(force: Vector3, point: Vector3) {}

  setInertiaTensor(inertiaTensor: mat3) {
    mat3.invert(this.inverseInertiaTensor, inertiaTensor)
  }

  calculateDerivedData() {
    quat.normalize(this.orientation, this.orientation)
    // calculate transform matrix

    mat4.fromRotationTranslation(
      this.transformMatrix,
      this.orientation,
      this.position
    )
  }

  integrate(duration: number) {
    if (!this.isFiniteMass()) return

    const lastFrameAcceleration = vec3.clone(this.acceleration)
    vec3.scaleAndAdd(
      lastFrameAcceleration,
      lastFrameAcceleration,
      this.forceAccum,
      this.inverseMass
    )

    const angularAcceleration = vec3.clone(this.torqueAccum)
    vec3.transformMat3(
      angularAcceleration,
      angularAcceleration,
      this.inverseInertiaTensorWorld
    )

    vec3.scaleAndAdd(
      this.velocity,
      this.velocity,
      lastFrameAcceleration,
      duration
    )
    vec3.scaleAndAdd(
      this.rotation,
      this.rotation,
      angularAcceleration,
      duration
    )

    const dump = Math.pow(this.damping, duration)
    vec3.scale(this.velocity, this.velocity, dump)

    const angularDump = Math.pow(this.angularDamping, duration)
    vec3.scale(this.rotation, this.rotation, angularDump)

    vec3.scaleAndAdd(this.position, this.position, this.velocity, duration)

    quaternionAddScaledVector(this.orientation, this.rotation, duration)

    this.calculateDerivedData()
    this.clearAccumulator()
  }
}

function quaternionAddScaledVector(q: quat, v: vec3, scale: number) {
  const rot = quat.fromValues(0, v[0] * scale, v[1] * scale, v[2] * scale)

  quat.mul(rot, rot, q)
  quat.scale(q, rot, 0.5)

  return q
}
