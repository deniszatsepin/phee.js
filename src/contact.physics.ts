import { Vector3 } from 'three'
import { BodyInterface } from './body.physics'

export interface ContactInterface {
    resolve(duration: number)
    calculateSeparatingVelocity(): number
}

export default class Contact implements ContactInterface {
    bodies: Array<BodyInterface>
    movement: Array<Vector3>
    normal:  Vector3
    restitution: number
    penetration: number

    constructor(body1, body2) {
        this.bodies.push(body1)
        this.bodies.push(body2)

        this.movement = [
            new Vector3(),
            new Vector3()
        ]
    }

    resolve(duration: number) {
        this.resolveVelocity(duration)
        this.resolveInterpenetration(duration)
    }

    calculateSeparatingVelocity(): number {
        const relativeVelocity = this.bodies[0].cloneVelocity()

        if (this.bodies[1]) {
            relativeVelocity.sub(this.bodies[1].cloneVelocity())
        }

        return relativeVelocity.dot(this.normal)
    }

    resolveVelocity(duration: number) {
        const separatingVelocity = this.calculateSeparatingVelocity()
        const [body1, body2] = this.bodies

        if (separatingVelocity > 0) {
            return
        }

        let newSepVelocity = -separatingVelocity * this.restitution
        const accCausedVelocity = body1.cloneAcceleration()

        if (body2) accCausedVelocity.sub(body2.cloneAcceleration())

        const accCausedSepVelocity = accCausedVelocity.dot(this.normal.clone().multiplyScalar(duration))

        if (accCausedSepVelocity < 0) {
            newSepVelocity += this.restitution * accCausedSepVelocity;

            if (newSepVelocity < 0) newSepVelocity = 0;
        }

        const deltaVelocity = newSepVelocity - separatingVelocity

        let totalInverseMass = body1.getInverseMass()
        if (body2) totalInverseMass += body2.getInverseMass()

        if (totalInverseMass <= 0) return

        const impulse = deltaVelocity / totalInverseMass

        const impulsePerInverseMass = this.normal.multiplyScalar(impulse)

        body1.setVelocityV(
            body1.cloneVelocity().add(
                impulsePerInverseMass.multiplyScalar(body1.getInverseMass())
            )
        )

        if (body2) {
            body2.setVelocityV(
                body2.cloneVelocity().add(
                    impulsePerInverseMass.multiplyScalar(-body2.getInverseMass())
                )
            )
        }
    }

    resolveInterpenetration(duration: number) {
        if (this.penetration <= 0) return
        const [body1, body2] = this.bodies
        const [move1, move2] = this.movement


        let totalInverseMass = body1.getInverseMass()
        if (body2) totalInverseMass += body2.getInverseMass()

        if (totalInverseMass <= 0) return

        const movePerInversMass = this.normal.clone().multiplyScalar(this.penetration / totalInverseMass)

        move1.copy(movePerInversMass);
        move2.multiplyScalar(body1.getInverseMass())

        if (body2) {
            move2.copy(movePerInversMass)
            move2.multiplyScalar(-body2.getInverseMass())
        } else {
            move2.set(0, 0, 0)
        }

        body1.getPosition().add(move1)

        if (body2) {
            body2.getPosition().add(move2)
        }
    }
}
