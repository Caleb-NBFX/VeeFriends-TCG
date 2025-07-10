module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Handle ES modules in a way that works for both dev and production
      webpackConfig.resolve.fullySpecified = false;
      
      // Ensure proper module handling
      webpackConfig.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      });
      
      return webpackConfig;
    },
  },
};