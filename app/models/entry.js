import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class EntryModel extends Model {
  @attr('string') description;
  @attr({ defaultValue: null, readOnly: true }) parentConnectorAttributes;
  @attr('string') title;
  @belongsTo('entry', { inverse: 'children' }) parent;
  @hasMany('entry', { inverse: 'parent' }) children;
  @hasMany('note') notes;

  get angle() {
    return this.siblingCount > 0 ? 360 / this.siblingCount : 0;
  }

  get childCount() {
    return this.children?.length || 0;
  }

  get cumulativeChildCount() {
    return (
      this.childCount +
        this.children.reduce(
          (prevChild, currentChild) =>
            (prevChild?.cumulativeChildCount || 0) +
            currentChild?.cumulativeChildCount
        ) || 0
    );
  }

  get cumulativeChildren() {
    return this.children.map((child) => child.get('children')).flat();
  }

  get childDepth() {
    return this.childCount > 0 ? this.depth + 1 : this.depth;
  }

  get deepestChild() {
    return this.hasChildren
      ? Math.max(...this.children.map((child) => child.childDepth))
      : this.depth;
  }

  get depth() {
    if (this.isRoot) {
      return 0;
    } else {
      return this.parent.get('depth') + 1;
    }
  }

  get isRoot() {
    return this.id === this.rootId;
  }

  get hasChildren() {
    return this.children.length > 0;
  }

  get rootId() {
    return this.parent.get('id') ? this.parent.get('rootId') : this.id;
  }

  get siblingCount() {
    return this.parent?.get('childCount');
  }
}
