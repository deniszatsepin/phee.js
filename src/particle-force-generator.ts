import { IParticle } from './particle';

export interface IParticleForceGenerator {
    updateForce(particle: IParticle, duration: number): void;
}

export class ParticleForceGenerator {

}