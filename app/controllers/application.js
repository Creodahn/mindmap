import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @tracked model;
  @tracked entryToEdit;

  @service connector;
  @service store;

  get rootEntries() {
    return this.model.filter((entry) => isEmpty(entry.get('parent.id')));
  }

  @action
  cancel() {
    this.entryToEdit = null;
  }

  @action
  createNewNode() {
    this.parentForNewEntry = this.entryToEdit;
    this.entryToEdit = this.store.createRecord('entry');
  }

  @action
  async delete() {
    await this.entryToEdit.destroyRecord();
    this.cancel();
  }

  @action
  open(entry) {
    this.entryToEdit = entry;
  }

  @action
  async save() {
    await this.entryToEdit.save();

    if (this.parentForNewEntry) {
      this.entryToEdit.parent = this.parentForNewEntry;
      this.parentForNewEntry = null;
      this.entryToEdit.save();
    }

    this.cancel();
  }
}
