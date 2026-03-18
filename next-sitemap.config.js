/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.scripthuman.com',
  generateRobotsTxt: true, // (optional)
  // ...other options
}
