module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
};
