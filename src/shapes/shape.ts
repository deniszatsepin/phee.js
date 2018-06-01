import { vec3 } from 'gl-matrix';

export interface IShape {
    isPointIn(point: vec3): boolean;
    getClosestPoint(point: vec3): vec3;
}
