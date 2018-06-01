import { expect } from 'chai';
import { vec3, glMatrix as glm } from 'gl-matrix';
import { Triangle } from './triangle';

describe('Triangle', () => {
    it('should be possible to create a triangle from three points', () => {
        const a = vec3.fromValues(0, 0, 0);
        const b = vec3.fromValues(0, 0, 0);
        const c = vec3.fromValues(0, 0, 0);
        const triangle = new Triangle(a, b, c);

        expect(triangle instanceof Triangle).to.be.true;
    });
});