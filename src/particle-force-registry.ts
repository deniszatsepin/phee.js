import { IParticle } from './particle';
import { IParticleForceGenerator } from './particle-force-generator';

export interface IParticleForceRegistry {
    add(particle: IParticle, fg: IParticleForceGenerator): void;
    remove(particle: IParticle, fg: IParticleForceGenerator): void;
    clear(): void;
    updateForces(duration: number): void;
}

class RegistryItem {
    particle: IParticle;
    fg: IParticleForceGenerator;

    constructor(particle: IParticle, fg: IParticleForceGenerator) {
        this.particle = particle;
        this.fg = fg;
    }
}

export class ParticleForceRegistry implements IParticleForceRegistry {
    registrations: Array<RegistryItem>;

    constructor() {
        this.registrations = [];
    }

    add(_particle: IParticle, _fg: IParticleForceGenerator) {
        if (!this.registrations.find(({ particle, fg }) => particle === _particle && fg === _fg)) {
            this.registrations.push(new RegistryItem(_particle, _fg));
        }
    }

    remove(_particle: IParticle, _fg: IParticleForceGenerator) {
        const idx = this.registrations.findIndex(({ particle, fg }) => particle === _particle && fg === _fg);
        if (idx >= 0) {
            this.registrations.splice(idx, 1);
        }
    }

    clear() {
        this.registrations = [];
    }

    updateForces(duration: number) {
        this.registrations.forEach(({ particle, fg }) => {
            fg.updateForce(particle, duration);
        });
    }
}