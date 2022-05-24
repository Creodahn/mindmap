import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class ChildListComponent extends Component {
  @tracked showConnector = false;
  @service connector;

  get connectorAttrs() {
    return this.args.model.parentConnectorAttributes || {};
  }

  @action
  connect(model) {
    if (model.get('parent.id')) {
      model.parentConnectorAttributes = this.connector.connect(model);

      if (model.id === this.args.model.id) {
        this.showConnector = true;
      }
    }
  }

  @action
  reconnect(model) {
    this.connect(model);

    console.log('reconnecting');

    model.children.forEach((child) => this.connect(child));
  }
}
