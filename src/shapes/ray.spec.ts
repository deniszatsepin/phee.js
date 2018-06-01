import { expect } from 'chai';
import { vec3, glMatrix as glm } from 'gl-matrix';
import { Ray } from './ray';

describe('Ray', () => {
    it('should be possible to create ray base on origin and direction', () => {
        const origin = vec3.fromValues(0, 0, 0);
        const direciton = vec3.fromValues(1, 1, 1);
        const ray = new Ray(origin, direciton);

        expect(ray instanceof Ray).to.be.true;
    });

    it('should be possible to create ray from to points', () => {
        const from = vec3.fromValues(1, 1, 1);
        const to = vec3.fromValues(2, 2, 2);
        const ray = Ray.fromPoints(from, to);
        const direction = ray.getDirection();
        const testDirection = vec3.normalize(
            vec3.create(),
            vec3.subtract(vec3.create(), to, from)
        );
        const dot = vec3.dot(direction, testDirection);

        expect(ray instanceof Ray).to.be.true;
        expect(glm.equals(dot, 1)).to.be.true;
    });

    it('should be possible to check if a point is on the ray', () => {
        const from = vec3.fromValues(0, 0, 0);
        const to = vec3.fromValues(2, 2, 0);
        const ray = new Ray(from, to);
        const point = vec3.fromValues(1, 1, 0)

        expect(ray.isPointIn(point)).to.be.true;
    });

    it('should be possible to check if a point is not on the ray', () => {
        const from = vec3.fromValues(0, 0, 0);
        const to = vec3.fromValues(2, 2, 0);
        const ray = new Ray(from, to);
        const point = vec3.fromValues(1, 0, 0)

        expect(ray.isPointIn(point)).to.be.false;
    });

    it('should be possible to find a closest point to the ray', () => {
        const from = vec3.fromValues(0, 0, 0);
        const to = vec3.fromValues(2, 0, 0);
        const ray = new Ray(from, to);
        const point = vec3.fromValues(10, 10, 0)
        const closest = ray.getClosestPoint(point);
        const expected = vec3.fromValues(10, 0, 0);

        expect(vec3.equals(closest, expected)).to.be.true;
    })
});
