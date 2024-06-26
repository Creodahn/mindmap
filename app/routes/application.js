import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  @service store;

  model() {
    return this.store.query('entry', { include: 'parent,children' });
  }
}
