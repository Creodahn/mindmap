import Model, { attr, belongsTo } from '@ember-data/model';

export default class NoteModel extends Model {
  @attr('string') content;
  @belongsTo('entry') entry;
}
