import {
    Vector3,
    Quaternion,
    Matrix3,
    Matrix4,
    Box3,
    Plane,
    Sphere
} from 'three';

export interface IBodyConfig {
    shape?: Shape;
};

export interface IBody {
    getMass(): number;
    getInverseMass(): number;
    isFiniteMass(): boolean;
    integrate(duration: number): void;
    accumulate(acceleration: Vector3): void;

    setVelocity(x: number, y: number, z: number): void;
    setVelocityV(velocity: Vector3): void;
    cloneVelocity(): Vector3;
    setShape(shape: Shape): void;

    setAcceleration(x: number, y: number, z: number): void;
    setAccelerationV(acceleration: Vector3): void;
    cloneAcceleration(): Vector3;

    getPosition(): Vector3;
    setPositionV(position: Vector3): void;
}

export type ShapeType = 'sphere' | 'box' | 'plane';
export type Shape = Box3 | Sphere | Plane;

export default class Body implements IBody {
    position: Vector3;
    velocity: Vector3;
    acceleration: Vector3;
    orientation: Quaternion;
    rotation: Vector3;
    forceAccum: Vector3;
    torqueAccum: Vector3;
    inverseMass: number;
    inverseInertiaTensor: Matrix3;
    inverseInertiaTensorWorld: Matrix3;
    transformMatrix: Matrix4;
    damping: number;
    angularDamping: number;
    shape: Shape;
    isAwake: boolean;

    constructor(config: IBodyConfig) {
        this.position = new Vector3(0, 0, 0)
        this.velocity = new Vector3(0, 0, 0)
        this.acceleration = new Vector3(0, 0, 0)
        this.orientation = new Quaternion(0, 0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.forceAccum = new Vector3(0, 0, 0)
        this.torqueAccum = new Vector3(0, 0, 0)
        this.inverseMass = 0;
        this.inverseInertiaTensor = new Matrix3()
        this.inverseInertiaTensorWorld = new Matrix3()
        this.transformMatrix = new Matrix4();
        this.isAwake = false
        this.damping = .9999
        this.angularDamping = 0;
        this.shape = config.shape || new Sphere();
    }

    setMass(mass: number) {
        this.inverseMass = mass === 0 ? mass : 1 / mass
    }

    setVelocity(x: number, y: number, z: number) {
        this.velocity.set(x, y, z)
    }

    setVelocityV(velocity: Vector3) {
        this.velocity.copy(velocity)
    }

    cloneVelocity(): Vector3 {
        return this.velocity.clone()
    }

    setShape(shape: Shape) {
        this.shape = shape
    }

    setAcceleration(x: number, y: number, z: number) {
        this.acceleration.set(x, y, z)
    }

    setAccelerationV(acceleration: Vector3) {
        this.acceleration.copy(acceleration)
    }

    cloneAcceleration(): Vector3 {
        return this.acceleration.clone()
    }

    getPosition(): Vector3 {
        return this.position;
    }

    setPositionV(position: Vector3) {
        this.position.copy(position);
    }

    getMass(): number {
        return this.inverseMass / 1; // TODO: looks strange, double check it!
    }

    getInverseMass(): number {
        return this.inverseMass
    }

    isFiniteMass(): boolean {
        return this.inverseMass > 0
    }

    clearAccumulator() {
        this.forceAccum.set(0, 0, 0)
        this.torqueAccum.set(0, 0, 0)
    }

    accumulate(acceleration: Vector3) {
        this.acceleration.add(acceleration)
    }

    addForce(force: Vector3) {
        this.forceAccum.add(force)
    }

    addForceAtPoint(force: Vector3, point: Vector3) {

    }

    addForceAtBodyPoint(force: Vector3, point: Vector3) {

    }

    setInertiaTensor(inertiaTensor: Matrix3) {
        this.inverseInertiaTensor.getInverse(inertiaTensor)
    }

    calculateDerivedData() {
        this.orientation.normalize()
        //calculate transform matrix
        this.transformMatrix.makeRotationFromQuaternion(this.orientation)
		this.transformMatrix.setPosition(this.position)
    }

    integrate(duration: number) {
        if (!this.isFiniteMass()) return

        const lastFrameAcceleration = this.acceleration.clone()
        lastFrameAcceleration.addScaledVector(this.forceAccum, this.inverseMass)

        const angularAcceleration = this.torqueAccum.clone()
        angularAcceleration.applyMatrix3(this.inverseInertiaTensorWorld)

        this.velocity.addScaledVector(lastFrameAcceleration, duration)
        this.rotation.addScaledVector(angularAcceleration, duration)

        const dump = Math.pow(this.damping, duration)
        this.velocity.multiplyScalar(dump)

        const angularDump = Math.pow(this.angularDamping, duration)
        this.rotation.multiplyScalar(angularDump)

        this.position.addScaledVector(this.velocity, duration)

        quaternionAddScaledVector(this.orientation, this.rotation, duration)

        this.calculateDerivedData();
        this.clearAccumulator();
    }
}

function quaternionAddScaledVector(q: Quaternion, v: Vector3, scale: number) {
    const rot = new Quaternion(
        0,
        v.x * scale,
        v.y * scale,
        v.z * scale
    )

    rot.multiply(q)

    q.x = rot.x * 0.5
    q.y = rot.y * 0.5
    q.z = rot.z * 0.5
    q.w = rot.w * 0.5

    return q
}
