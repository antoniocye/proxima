const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function withAndroidStrategiesPlugin(config) {
  return withAndroidManifest(config, config => {
    config.modResults.manifest.application[0].activity[0].$[
      'android:launchMode'
    ] = 'singleTask'; // SingleTask/SingleMode
    return config;
  });
};