import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class EntryModel extends Model {
  @attr('string') description;
  @attr({ defaultValue: null, readOnly: true }) parentConnectorAttributes;
  @attr('string') title;
  @belongsTo('entry', { inverse: 'children' }) parent;
  @hasMany('entry', { inverse: 'parent' }) children;
  @hasMany('note') notes;

  get childCount() {
    return this.children.length || 0;
  }

  get cumulativeChildCount() {
    return (
      this.childCount +
      this.children.reduce(
        (prevChild, currentChild) =>
          (prevChild?.childCount || 0) + currentChild.childCount
      )
    );
  }

  get rootId() {
    return this.parent.get('id') ? this.parent.get('rootId') : this.id;
  }
}
