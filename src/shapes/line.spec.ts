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
});
