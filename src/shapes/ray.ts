import {
    vec3
} from 'gl-matrix';

export interface IRay {
    getDirection(): vec3;
    normalizeDireciton(): void;
}

export class Ray implements IRay {
    private origin: vec3 = vec3.create();
    private direction: vec3 = vec3.fromValues(0, 0, 1);

    constructor(origin: vec3, direction: vec3) {
        vec3.copy(this.origin, origin);
        vec3.copy(this.direction, direction);
        this.normalizeDireciton();
    }

    static fromPoints(from: vec3, to: vec3) {
        const direction = vec3.sub(vec3.create(), to, from);

        return new Ray(from, vec3.normalize(direction, direction));
    }

    getDirection() {
        return vec3.clone(this.direction);
    }

    normalizeDireciton() {
        vec3.normalize(this.direction, this.direction);
    }
}
