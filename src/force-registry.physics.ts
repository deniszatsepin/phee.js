import { BodyInterface } from './body.physics'
import { ForceGeneratorInterface } from './force-generator.physics'

export interface ForceRegistryInterface {
    add(body: BodyInterface, fg: ForceGeneratorInterface);
    remove(body: BodyInterface, fg: ForceGeneratorInterface);
    clear();
    updateForces(duration: number);
}

class RegistryItem {
    body: BodyInterface;
    fg: ForceGeneratorInterface;

    constructor(body: BodyInterface, fg: ForceGeneratorInterface) {
        this.body = body;
        this.fg = fg;
    }
}

export default class ForceRegistry implements ForceRegistryInterface {
    registrations: Array<RegistryItem>;

    add(_body: BodyInterface, _fg: ForceGeneratorInterface) {
        if (!this.registrations.find(({ body, fg }) => body === _body && fg === _fg)) {
            this.registrations.push(new RegistryItem(_body, _fg));
        }
    }

    remove(_body: BodyInterface, _fg: ForceGeneratorInterface) {
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