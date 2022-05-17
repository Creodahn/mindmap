import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class EntryModel extends Model {
  @attr('string') description;
  @attr('string') title;
  @belongsTo('entry', { inverse: 'children' }) parent;
  @hasMany('entry', { inverse: 'parent' }) children;
  @hasMany('note') notes;
}
