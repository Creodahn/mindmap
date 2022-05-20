import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class NodeConnectorComponent extends Component {
  @tracked height;
  @tracked left;
  @tracked top;
  @tracked transform;

  @action
  setupConnector() {
    let child = this.args.childCoordinates;
    let parent = this.args.parentCoordinates;
    let top = parent.top + parent.height / 2;
    let childTop = child.top + child.height / 2;
    let left = parent.left + parent.width / 2;
    let childLeft = child.left + child.width / 2;
    let skewAngle =
      Math.atan2(child.top - parent.top, child.left - parent.left) * (180 / Math.PI);

    this.top = `${top}px`;
    this.left = `${left}px`;
    this.height = `${childTop - top}px`;
    this.transform = `rotate(${skewAngle - 90}deg)`;
  }
}
