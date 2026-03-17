import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@tiefamt/core', 'react-bootstrap', 'bootstrap'],
};

export default nextConfig;
