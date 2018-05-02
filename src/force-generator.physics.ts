import { BodyInterface } from './body.physics';

export interface ForceGeneratorInterface {
    updateForce(particle: BodyInterface, duration: number);
}
