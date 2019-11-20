module.exports = {
  name: 'chchen',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/chchen',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
