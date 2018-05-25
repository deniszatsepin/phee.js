import {
    vec3
} from 'gl-matrix'

export interface ILine {
    length(): number;
    lengthSq(): number;
};

export class Line implements ILine {
    private start: vec3 = vec3.create();
    private end: vec3 = vec3.create();

    constructor(start: vec3, end: vec3) {
        vec3.copy(this.start, start);
        vec3.copy(this.end, end);
    }

    length() {
        return vec3.distance(this.start, this.end);
    }

    lengthSq() {
        return vec3.squaredDistance(this.start, this.end);
    }
}
