import { expect } from 'chai';
import { vec3 } from 'gl-matrix';
import { Line } from './line';

describe('Line', () => {
    it('should be possible to create line base on two vec3', () => {
        const start = vec3.fromValues(0, 0, 0);
        const end = vec3.fromValues(1, 1, 1);
        const line = new Line(start, end);

        expect(line instanceof Line).to.be.true;
    });

    it('should be possible to get line length', () => {
        const start = vec3.fromValues(0, 0, 0);
        const end = vec3.fromValues(1, 1, 1);
        const line = new Line(start, end);

        expect(line.length()).is.equal(vec3.distance(start, end));
    });

    it('should be possible to get line square length', () => {
        const start = vec3.fromValues(0, 0, 0);
        const end = vec3.fromValues(1, 1, 1);
        const line = new Line(start, end);

        expect(line.lengthSq()).is.equal(vec3.squaredDistance(start, end));
    });

    it('should be possible to get a closest point to the line', () => {
        const start = vec3.fromValues(0, 0, 0);
        const end = vec3.fromValues(2, 0, 0);
        const line = new Line(start, end);
        const point = vec3.fromValues(1, 1, 0)
        const expected = vec3.fromValues(1, 0, 0);
        const closest = line.getClosestPoint(point);

        expect(vec3.equals(closest, expected)).to.be.true;
    });

    it('should be possible to check if a point is on the line', () => {
        const start = vec3.fromValues(0, 0, 0);
        const end = vec3.fromValues(2, 0, 0);
        const line = new Line(start, end);
        const point = vec3.fromValues(1, 0, 0)

        expect(line.isPointIn(point)).to.be.true;
    });

    it('should be possible to check if a point is not on the line', () => {
        const start = vec3.fromValues(0, 0, 0);
        const end = vec3.fromValues(2, 0, 0);
        const line = new Line(start, end);
        const point = vec3.fromValues(1, 1, 0)

        expect(line.isPointIn(point)).to.be.false;
    });
});
