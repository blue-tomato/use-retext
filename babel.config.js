module.exports = api => {
  const isTest = api.env('test');

  return {
    presets: isTest
      ? [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current',
              },
            },
          ],
          // '@babel/preset-typescript',
          '@babel/preset-react',
        ]
      : [/* '@babel/preset-typescript', */ '@babel/preset-react'],
    sourceType: 'unambiguous',
  };
};
