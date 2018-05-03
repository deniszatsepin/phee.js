import {
    Vector3
} from 'three'

import { IBody } from './body.physics'

export type PhysicsWorldConfiguration = {
    gravity: Vector3
}

export default class PhysicsWorld {
    bodies: Array<IBody>
    gravity: Vector3

    constructor(config: PhysicsWorldConfiguration) {
        this.gravity = config.gravity;
        this.bodies = [];
    }

    addBody(body: IBody) {
        this.bodies.push(body);
        body.accumulate(this.gravity)
    }

    removeBody(body: IBody) {
        const idx = this.bodies.indexOf(body);

        if (idx >= 0) {
            this.bodies.splice(idx, 1);
        }
    }

    integrate(duration: number) {
        this.bodies.forEach(body => body.integrate(duration));
    }
}