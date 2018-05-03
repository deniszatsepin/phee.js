import {
    vec3
} from 'gl-matrix';

import { IBody } from './body.physics'

export type PhysicsWorldConfiguration = {
    gravity: vec3
}

export default class PhysicsWorld {
<<<<<<< HEAD
    bodies: Array<IBody>
<<<<<<< HEAD
    gravity: Vector3
=======
    bodies: Array<BodyInterface>
    gravity: vec3
>>>>>>> 41847ef... Add particle
=======
    gravity: vec3
>>>>>>> df977fd... Add particle

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