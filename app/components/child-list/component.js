import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class ChildListComponent extends Component {
  @tracked childCoordinates;
  @tracked parentCoordinates;

  get showConnector() {
    return this.parentCoordinates && this.childCoordinates;
  }

  @action
  connect() {
    let model = this.args.model;

    console.log(`#root-${model.rootId}`, `#child-${model.parent?.get('id')}`);

    if (model.parent.get('id')) {
      let parent = document.querySelector(`#child-${model.parent.get('id')}`);
      let child = document.querySelector(`#child-${model.id}`);

      this.parentCoordinates = parent.getBoundingClientRect();
      this.childCoordinates = child.getBoundingClientRect();
    }
  }
}
