import { vec3 } from 'gl-matrix';
import { IParticle } from './particle';
import { IParticleForceGenerator } from './particle-force-generator';

class ParticleGravity implements IParticleForceGenerator {
    private gravity: vec3 = vec3.create();

    constructor(gravity: vec3) {
        if (gravity) {
            vec3.copy(this.gravity, gravity);
        }
    }

    updateForce(particle: IParticle, duration: number) {
        if (!particle.isMovable()) return;

        particle.addForce(vec3.scale(vec3.create(), this.gravity, particle.getMass()));
    }
}
