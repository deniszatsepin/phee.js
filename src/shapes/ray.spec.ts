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
});
