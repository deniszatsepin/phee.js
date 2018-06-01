import { expect } from 'chai';
import { vec3, mat3 } from 'gl-matrix';
import { OBB } from './obb';

describe('OBB', () => {
    it('should be possible to create OBB from position, size and orientation', () => {
        const position = vec3.fromValues(0, 0, 0);
        const size = vec3.fromValues(1, 1, 1);
        const orientation = mat3.create();
        const obb = new OBB(position, size, orientation);

        expect(obb instanceof OBB).to.be.true;
    });

    it('should be possible to check if a point is in a OBB', () => {
        const point = vec3.fromValues(1, 1, 1);
        const position = vec3.fromValues(0, 0, 0);
        const size = vec3.fromValues(1, 1, 1);
        const orientation = mat3.create();
        const obb = new OBB(position, size, orientation);

        expect(obb.isPointIn(point)).to.be.true;
    });

    it('should be possible to check if a point is not in a OBB', () => {
        const point = vec3.fromValues(1, 1, 1);
        const position = vec3.fromValues(0, 0, 0);
        const size = vec3.fromValues(.1, .1, .1);
        const orientation = mat3.create();
        const obb = new OBB(position, size, orientation);

        expect(obb.isPointIn(point)).to.be.false;
    });

    it('should be possible to get a closes point on OBB', () => {
        const point = vec3.fromValues(2, 0, 0);
        const position = vec3.fromValues(20, 0, 0);
        const size = vec3.fromValues(2, 2, 2);
        const orientation = mat3.create();
        const obb = new OBB(position, size, orientation);
        const expectedPoint = vec3.fromValues(18, 0, 0);
        const closestPoint = obb.getClosestPoint(point);

        expect(vec3.equals(closestPoint, expectedPoint)).to.be.true;
    });
});
