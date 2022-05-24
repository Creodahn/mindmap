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
    let parent = document.querySelector(`#child-${model.get('parent.id')}`);
    let child = document.querySelector(`#child-${model.get('id')}`);

    if (parent && child) {
      return this.setupConnector(
        parent.getBoundingClientRect(),
        child.getBoundingClientRect()
      );
    }

    return {};
  }

  setupConnector(parent, child) {
    let top = parent.top + parent.height / 2;
    let childTop = child.top + child.height / 2;
    let left = parent.left + parent.width / 2;
    let childLeft = child.left + child.width / 2;
    let skewAngle =
      Math.atan2(child.top - parent.top, child.left - parent.left) *
      (180 / Math.PI);
    let height = Math.sqrt(
      Math.pow(childTop - top, 2) + Math.pow(childLeft - left, 2)
    );

    return new ConnectorAttrs({
      top: `${top}px`,
      left: `${left}px`,
      height: `${height}px`,
      transform: `rotate(${skewAngle - 90}deg)`,
    });
  }
}
