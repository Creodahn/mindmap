import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @tracked model;
  @tracked entryToEdit;

  get rootEntries() {
    let result = this.model.filter((entry) => {
      console.log(entry);
      return isEmpty(entry.get('parent.id'));
    });
    console.log(result);
    return result;
  }

  @action
  cancel() {
    this.entryToEdit = null;
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
    this.cancel();
  }
}