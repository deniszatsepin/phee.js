import { IBody } from './body.physics'
import { ForceGeneratorInterface } from './force-generator.physics'

export interface ForceRegistryInterface {
    add(body: IBody, fg: ForceGeneratorInterface): void;
    remove(body: IBody, fg: ForceGeneratorInterface): void;
    clear(): void;
    updateForces(duration: number): void;
}

class RegistryItem {
    body: IBody;
    fg: ForceGeneratorInterface;

    constructor(body: IBody, fg: ForceGeneratorInterface) {
        this.body = body;
        this.fg = fg;
    }
}

export default class ForceRegistry implements ForceRegistryInterface {
    registrations: Array<RegistryItem>;

    constructor() {
        this.registrations = [];
    }

    add(_body: IBody, _fg: ForceGeneratorInterface) {
        if (!this.registrations.find(({ body, fg }) => body === _body && fg === _fg)) {
            this.registrations.push(new RegistryItem(_body, _fg));
        }
    }

    remove(_body: IBody, _fg: ForceGeneratorInterface) {
        const idx = this.registrations.findIndex(({ body, fg }) => body === _body && fg === _fg);
        if (idx >= 0) {
            this.registrations.splice(idx, 1);
        }
    }

    clear() {
        this.registrations = [];
    }

    updateForces(duration: number) {
        this.registrations.forEach(({ body, fg }) => {
            fg.updateForce(body, duration);
        });
    }
}