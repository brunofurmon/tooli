//@ts-check

const { composePlugins, withNx } = require('@nx/next');
const path = require('path');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  webpack: (config, { isServer }) => {
    // Add path mapping for libraries
    config.resolve.alias = {
      ...config.resolve.alias,
      '@tooli/wheel-engine': path.resolve(
        __dirname,
        '../../libs/wheel-engine/src/index.ts'
      ),
      '@tooli/user-management': path.resolve(
        __dirname,
        '../../libs/user-management/src/index.ts'
      ),
      '@tooli/history-tracker': path.resolve(
        __dirname,
        '../../libs/history-tracker/src/index.ts'
      ),
      '@tooli/audio-system': path.resolve(
        __dirname,
        '../../libs/audio-system/src/index.ts'
      ),
      '@tooli/shared-ui': path.resolve(
        __dirname,
        '../../libs/shared-ui/src/index.ts'
      ),
    };
    return config;
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
