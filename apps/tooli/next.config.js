//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@tooli/wheel-engine': require.resolve(
        '../../libs/wheel-engine/src/index.ts'
      ),
      '@tooli/user-management': require.resolve(
        '../../libs/user-management/src/index.ts'
      ),
      '@tooli/history-tracker': require.resolve(
        '../../libs/history-tracker/src/index.ts'
      ),
      '@tooli/shared-ui': require.resolve('../../libs/shared-ui/src/index.ts'),
      '@tooli/audio-system': require.resolve(
        '../../libs/audio-system/src/index.ts'
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
