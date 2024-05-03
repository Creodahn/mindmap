import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

class NodeAttrs {
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

export default class ChildListComponent extends Component {
  @tracked index;
  @tracked model;
  @tracked showConnector = false;

  @service connector;
  @service store;

  get angle() {
    return this.entry?.angle;
  }

  get connectorAttrs() {
    return this.entry?.parentConnectorAttributes || {};
  }

  get entry() {
    return this.args.model || {};
  }

  get multiplier() {
    return this.args.multiplier;
  }

  get styles() {
    if (this.angle && this.multiplier >= 0) {
      let angle = this.angle * this.multiplier;
      let ratio = (Math.PI * (angle - 90)) / 180;
      let radius = this.connector.getContainer(this.entry).width / 2;
      let result = new NodeAttrs({
        left: `${radius * Math.sin(ratio) + radius}px`,
        top: `${radius * Math.cos(ratio) + radius}px`,
      });

      // debugger

      console.log(result);

      return result;
    }

    return '';
  }

  @action
  connect(model) {
    if (model.get('parent.id')) {
      model.parentConnectorAttributes = this.connector.connect(model);

      if (model.get('id') === this.entry?.id) {
        this.showConnector = true;
      }
    }
  }

  @action
  reconnect(model) {
    this.connect(model);
    model.get('children')?.forEach((child) => this.reconnect(child));
  }

  @action
  reconnectAll(model) {
    if (model.rootId) {
      this.reconnect(this.store.peekRecord('entry', model.rootId));
    }
  }
}
