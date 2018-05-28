import {
    vec3, glMatrix as glm
} from 'gl-matrix'
import { IShape } from './shape';
import { Triangle } from './triangle';

export interface ILine extends IShape {
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

    isPointIn(this: Line, point: vec3): boolean {
        const closest = this.getClosestPoint(point);
        const squaredDistance = vec3.squaredDistance(closest, point);

        return glm.equals(squaredDistance, 0);
    }

    getClosestPoint: (point: vec3) => vec3 = function () {
        const lVec = vec3.create();
        const tmp = vec3.create();

        return function getClosestPoint(this: Line, point: vec3): vec3 {
            vec3.sub(lVec, this.end, this.start);
            vec3.sub(tmp, point, this.start);
            let t = vec3.dot(tmp, lVec) / vec3.dot(lVec, lVec);
            t = Math.max(t, 0);
            t = Math.min(t, 1);

            return vec3.scaleAndAdd(vec3.create(), this.start, lVec, t);
        }
    }();
}
