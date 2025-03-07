const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  // Add other asset file extensions here
  "obj",
  "mtl"
);

module.exports = config;
