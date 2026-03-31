/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Next.js uses _next by default, but Chrome extensions don't allow files starting with _
  // So we build it, and then rename _next to assets using build-ext.js
};

module.exports = nextConfig;
