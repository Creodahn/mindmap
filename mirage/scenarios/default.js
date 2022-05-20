export default function (server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  // server.createList('post', 10);

  server.createList('entry', 2, 'grandparent');
  // let centralIdea = server.create('entry', 'parent');

  // server
  //   .createList('entry', 5, 'child', {
  //     parentEntry: centralIdea,
  //   })
  //   .forEach((idea) =>
  //     server.createList('entry', 2, 'child', { parentEntry: idea })
  //   );
}
