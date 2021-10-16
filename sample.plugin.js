module.exports = {
  getPluginName: () => 'testPlugin',
  create: (a) => ({
    onLoad: () => console.log('Loaded test plugin'),
    handleEvent: (e) => {
      console.log('Event received');
      console.log(e);
    },
    onUnload: () => console.log('Unloaded test plugin'),
  }),
};
