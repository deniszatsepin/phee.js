import { expect } from 'chai';
import { vec3 } from 'gl-matrix';
import { Plane } from './plane';

describe('Plane', () => {
    it('should be possible to create plane from a distance and normal', () => {
        const normal = vec3.fromValues(0, 1, 0);
        const distance = 1;
        const plane = new Plane(normal, distance);

        expect(plane instanceof Plane).to.be.true;
    });

    it('should be possible to test that a point is on the plane', () => {
        const normal = vec3.fromValues(0, 1, 0);
        const distance = 1;
        const plane = new Plane(normal, distance);
        const point = vec3.fromValues(1, 1, 1);

        expect(plane.planeEquation(point)).to.be.equal(0);
    });

    it('should be possible to test that a point is above the plane', () => {
        const normal = vec3.fromValues(0, 1, 0);
        const distance = .5;
        const plane = new Plane(normal, distance);
        const point = vec3.fromValues(1, 1, 1);

        expect(plane.planeEquation(point)).to.be.greaterThan(0);
    });

    it('should be possible to test that a point is below the plane', () => {
        const normal = vec3.fromValues(0, 1, 0);
        const distance = 1.5;
        const plane = new Plane(normal, distance);
        const point = vec3.fromValues(1, 1, 1);

        expect(plane.planeEquation(point)).to.be.lessThan(0);
    });

    it('should be possible to test if point is on the plane', () => {
        const normal = vec3.fromValues(0, 1, 0);
        const distance = 1;
        const plane = new Plane(normal, distance);
        const point = vec3.fromValues(1, 1, 1);

        expect(plane.isPointIn(point)).to.be.true;
    });

    it('should be possible to test if point is not on the plane', () => {
        const normal = vec3.fromValues(0, 1, 0);
        const distance = 1;
        const plane = new Plane(normal, distance);
        const point = vec3.fromValues(1, 2, 1);

        expect(plane.isPointIn(point)).to.be.false;
    });

    it('should be possible to find closest point on the plane', () => {
        const normal = vec3.fromValues(0, 1, 0);
        const distance = 1;
        const plane = new Plane(normal, distance);
        const point = vec3.fromValues(3, 2, 3);
        const expected = vec3.fromValues(3, 1, 3);
        const closestPoint = plane.getClosestPoint(point);

        expect(vec3.equals(expected, closestPoint)).to.be.true;
    });
});