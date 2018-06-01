import { expect } from 'chai';
import { vec3, glMatrix as glm } from 'gl-matrix';
import { Sphere } from './sphere';

describe('Sphere', () => {
    it('should be possible to create sphere from position and radius', () => {
        const position = vec3.fromValues(0, 0, 0);
        const radius = 1;
        const sphere = new Sphere(position, radius);

        expect(sphere instanceof Sphere).to.be.true;
    });

    it('should be possible to get position', () => {
        const position = vec3.fromValues(1, 2, 3);
        const radius = 1;
        const sphere = new Sphere(position, radius);

        expect(vec3.equals(sphere.position, position)).to.be.true;
    });

    it('should be possible to set position', () => {
        const position = vec3.fromValues(1, 2, 3);
        const radius = 1;
        const sphere = new Sphere(position, radius);
        const nextPosition = vec3.fromValues(3, 2, 1);
        sphere.position = nextPosition;

        expect(vec3.equals(sphere.position, nextPosition)).to.be.true;
    });

    it('should be possible to get radius', () => {
        const position = vec3.fromValues(1, 2, 3);
        const radius = 11;
        const sphere = new Sphere(position, radius);

        expect(sphere.radius).to.be.equal(radius);
    });

    it('should be possible to set radius', () => {
        const position = vec3.fromValues(1, 2, 3);
        const radius = 11;
        const sphere = new Sphere(position, radius);
        const nextRadius = 22;
        sphere.radius = nextRadius;

        expect(sphere.radius).to.be.equal(nextRadius);
    });

    it('should be possible to check if a point is in a sphere', () => {
        const point = vec3.fromValues(1, 1, 1);
        const radius = 3;
        const position = vec3.fromValues(2, 2, 2);
        const sphere = new Sphere(position, radius);

        expect(sphere.isPointIn(point)).to.be.true;
    });

    it('should be possible to check if a point is not in a sphere', () => {
        const point = vec3.fromValues(1, 1, 1);
        const radius = 3;
        const position = vec3.fromValues(-2, -2, -2);
        const sphere = new Sphere(position, radius);

        expect(sphere.isPointIn(point)).to.be.false;
    });

    it('should be possible to get a closes point on sphere', () => {
        const point = vec3.fromValues(1, 0, 0);
        const radius = 3;
        const position = vec3.fromValues(20, 0, 0);
        const expectedPoint = vec3.fromValues(17, 0, 0);
        const sphere = new Sphere(position, radius);
        const closestPoint = sphere.getClosestPoint(point);

        expect(vec3.equals(closestPoint, expectedPoint)).to.be.true;
    });
});
