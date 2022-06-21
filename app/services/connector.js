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
    let top = parent.top + parent.height / 2;
    let childTop = child.top + child.height / 2;
    let left = parent.left + parent.width / 2;
    let childLeft = child.left + child.width / 2;
    let topForAngle = childTop - top;
    let leftForAngle = childLeft - left;
    let skewAngle = Math.atan2(topForAngle, leftForAngle) * (180 / Math.PI);
    let height = Math.sqrt(
      Math.pow(topForAngle, 2) + Math.pow(leftForAngle, 2)
    );

    return new ConnectorAttrs({
      top: `${container.height / 2}px`,
      left: `${container.width / 2}px`,
      height: `${height}px`,
      transform: `rotate(${skewAngle - 90}deg)`,
    });
  }
}
