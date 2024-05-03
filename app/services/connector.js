import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';

class ConnectorAttrs {
  @tracked height;
  @tracked left;
  @tracked top;
  @tracked transform;

  constructor() {
    let args = [...arguments];

    if (args[0]) {
      Object.keys(args[0]).forEach((key) => (this[key] = args[0][key]));
    }
  }
}

export default class ConnectorService extends Service {
  connect(model) {
    let parent = this.getParentNode(model);
    let container = this.getContainer(model);
    let child = this.getChildNode(model);

    if (parent && child) {
      return this.setupConnector(parent, container, child);
    }

    return {};
  }

  getBoundingRect(selectorString) {
    return document.querySelector(selectorString)?.getBoundingClientRect();
  }

  getChildNode(model) {
    return this.getBoundingRect(`#child-${model.get('id')}`);
  }

  getContainer(model) {
    return this.getBoundingRect(
      `#child-${model.get('parent.id')} ~ .child-list-root`
    );
  }

  getParentNode(model) {
    return this.getBoundingRect(`#child-${model.get('parent.id')}`);
  }

  setupConnector(parent, container, child) {
    let parentY = parent.y + parent.height / 2;
    let childY = child.y + child.height / 2;
    let parentX = parent.x + parent.width / 2;
    let childX = child.x + child.width / 2;
    let yForAngle = parentY - childY;
    let xForAngle = parentX - childX;
    let skewAngle = 90 + Math.atan2(yForAngle, xForAngle) * (180 / Math.PI);

    return new ConnectorAttrs({
      top: `${container.height / 2}px`,
      left: `${container.width / 2}px`,
      height: `${container.width / 2}px`,
      transform: `rotate(${skewAngle}deg)`,
    });
  }
}
