import { Factory, association, trait } from 'miragejs';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  title() {
    return faker.word.noun();
  },
  description() {
    return faker.lorem.paragraph();
  },
  child: trait({
    parent: association(),
  }),
  grandparent: trait({
    afterCreate(parent, server) {
      server.createList('entry', 2, 'intermediate', { parent });
    },
  }),
  intermediate: trait({
    parent: association(),
    afterCreate(parent, server) {
      server.createList('entry', 2, 'child', { parent });
    },
  }),
  parent: trait({
    afterCreate(parent, server) {
      server.createList('entry', 2, 'child', { parent });
    },
  }),
});
