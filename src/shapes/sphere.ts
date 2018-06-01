import { vec3 } from 'gl-matrix';
import { IShape } from './shape';

export interface ISphere extends IShape {
    position: vec3;
    radius: number;
}

export class Sphere implements ISphere {
    private _position: vec3 = vec3.create();
    private _radius: number = 1;

    constructor(position: vec3, radius: number) {
        vec3.copy(this._position, position);
        this._radius = radius;
    }

    get position(): vec3 {
        return this._position;
    }

    set position(position: vec3) {
        vec3.copy(this._position, position);
    }

    get radius(): number {
        return this._radius;
    }

    set radius(radius: number) {
        this._radius = radius;
    }

    isPointIn: (point: vec3) => boolean = function () {
        const tmp = vec3.create();

        return function isPointInSphere(this: Sphere, point: vec3): boolean {
            const { position, radius } = this;
            const squaredRadius = radius * radius;
            const squaredLength = vec3.squaredLength(
                vec3.sub(tmp, point, position)
            );

            return squaredLength < squaredRadius;
        }
    }();

    getClosestPoint: (point: vec3) => vec3 = function() {
        const tmp = vec3.create();
    
        return function getClosestPoint(this: Sphere, point: vec3): vec3 {
            const sphereToPoint = vec3.sub(tmp, point, this.position);
            vec3.normalize(sphereToPoint, sphereToPoint);
            vec3.scale(sphereToPoint, sphereToPoint, this.radius);
    
            return vec3.add(sphereToPoint, sphereToPoint, this.position);
        }
    }(); 
}
