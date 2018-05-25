import {
    vec3,
    mat3
} from 'gl-matrix';
import { IShape } from './shape';

export interface IOBB extends IShape {

}

export class OBB implements IOBB {
    private position: vec3 = vec3.create();
    private size: vec3 = vec3.fromValues(1, 1, 1);
    private orientation: mat3 = mat3.create();

    constructor(position: vec3, size: vec3, orientation?: mat3) {
        vec3.copy(this.position, position);
        vec3.copy(this.size, size);

        if (orientation) {
            mat3.copy(this.orientation, orientation);
        }
    }

    isPointIn: (point: vec3) => boolean = function () {
        const dir = vec3.create();
        const axis = vec3.create();

        return function isPointInOBB(this: OBB, point: vec3): boolean {
            const orientation = this.orientation;
            vec3.sub(dir, point, this.position);


            for (let i = 0; i < 3; i += 1) {
                let step = i * 3;
                vec3.set(
                    axis,
                    orientation[step],
                    orientation[step + 1],
                    orientation[step + 2],
                );
                let distance = vec3.dot(dir, axis);

                if (distance > this.size[i]) {
                    return false;
                }
                if (distance < -this.size[i]) {
                    return false;
                }
            }

            return true;
        }
    }();

    getClosestPoint: (point: vec3) => vec3 = function () {
        const dir = vec3.create();
        const axis = vec3.create();

        return function getClosestPoint(this: OBB, point: vec3): vec3 {
            const orientation = this.orientation;
            const result = vec3.clone(this.position);
            vec3.sub(dir, point, this.position);


            for (let i = 0; i < 3; i += 1) {
                let step = i * 3;
                vec3.set(
                    axis,
                    orientation[step],
                    orientation[step + 1],
                    orientation[step + 2],
                );
                let distance = vec3.dot(dir, axis);

                if (distance > this.size[i]) {
                    distance = this.size[i];
                }

                if (distance < -this.size[i]) {
                    distance = -this.size[i];
                }

                vec3.scaleAndAdd(result, result, axis, distance);
            }

            return result;
        }
    }();
}
