import { expect } from 'chai';
import { vec3 } from 'gl-matrix';
import { AABB } from './aabb';

describe('AABB', () => {
    it('should be possible to create AABB origin and size', () => {
        const origin = vec3.fromValues(0, 0, 0);
        const size = vec3.fromValues(1, 1, 1);
        const aabb = new AABB(origin, size);

        expect(aabb instanceof AABB).to.be.true;
    });

    it('should be possible to get min point from AABB', () => {
        const origin = vec3.fromValues(0, 0, 0);
        const size = vec3.fromValues(1, 1, 1);
        const aabb = new AABB(origin, size);

        expect(vec3.equals(aabb.getMin(), [-1, -1, -1])).to.be.true;
    });

    it('should be possible to get max point from AABB', () => {
        const origin = vec3.fromValues(0, 0, 0);
        const size = vec3.fromValues(1, 1, 1);
        const aabb = new AABB(origin, size);

        expect(vec3.equals(aabb.getMax(), [1, 1, 1])).to.be.true;
    });

    it('should be possible to create AABB from min and max points', () => {
        const origin = vec3.fromValues(0, 0, 0);
        const size = vec3.fromValues(1, 1, 1);
        const aabb = new AABB(origin, size);

        expect(vec3.equals(aabb.getMax(), [1, 1, 1])).to.be.true;
    });

    it('should be possible to check if a point is in a AABB', () => {
        const point = vec3.fromValues(1, 1, 1);
        const origin = vec3.fromValues(2, 2, 2);
        const size = vec3.fromValues(2, 2, 2);
        const aabb = new AABB(origin, size);

        expect(aabb.isPointIn(point)).to.be.true;
    });

    it('should be possible to check if a point is not in a AABB', () => {
        const point = vec3.fromValues(-1, 1, 1);
        const origin = vec3.fromValues(2, 2, 2);
        const size = vec3.fromValues(2, 2, 2);
        const aabb = new AABB(origin, size);

        expect(aabb.isPointIn(point)).to.be.false;
    });

    it('should be possible to get a closes point on AABB', () => {
        const point = vec3.fromValues(1, 0, 0);
        const origin = vec3.fromValues(20, 0, 0);
        const size = vec3.fromValues(2, 2, 2);
        const aabb = new AABB(origin, size);
        const expectedPoint = vec3.fromValues(18, 0, 0);
        const closestPoint = aabb.getClosestPoint(point);

        expect(vec3.equals(closestPoint, expectedPoint)).to.be.true;
    });
});

