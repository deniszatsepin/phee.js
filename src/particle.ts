import {
    vec3
} from 'gl-matrix'

export interface IParticle {

}

export type ParticleConfig = {

}

export class Particle implements IParticle {
    private inverseMass: number = 0;
    private position: vec3 = vec3.create();
    private velocity: vec3 = vec3.create();
    private acceleration: vec3 = vec3.create();

    private dumping: number = 0.999;

    constructor() {

    }
}
