import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class ChildListComponent extends Component {
  @tracked showConnector = false;

  @service connector;
  @service store;

  get connectorAttrs() {
    return this.args.model.parentConnectorAttributes || {};
  }

  @action
  connect(model) {
    if (model.get('parent.id')) {
      model.parentConnectorAttributes = this.connector.connect(model);

      if (model.get('id') === this.args.model.id) {
        this.showConnector = true;
      }
    }
  }

  @action
  reconnect(model) {
    console.log('reconnecting', model.id);
    this.connect(model);
    model.get('children')?.forEach((child) => this.reconnect(child));
  }

  @action
  reconnectAll(model) {
    console.log('reconnecting all', model);
    if (model.rootId) {
      this.reconnect(this.store.peekRecord('entry', model.rootId));
    }
  }
}
