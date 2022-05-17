import { module, test } from 'qunit';
import { setupTest } from 'mindmap/tests/helpers';

module('Unit | Model | note', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('note', {});
    assert.ok(model);
  });
});
