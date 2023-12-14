const {getDefaultConfig} = require('@react-native/metro-config');
const {mergeConfig} = require('metro-config');

module.exports = mergeConfig(
  getDefaultConfig(__dirname),
  (async () => {
    const {
      resolver: {sourceExts, assetExts},
    } = await getDefaultConfig();
    return {
      transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
      },
      resolver: {
        assetExts: assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
      },
    };
  })(),
);
