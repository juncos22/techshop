/** @type {import('next').NextConfig} */
const { withAxiom } = require('next-axiom');

module.exports = withAxiom({
  reactStrictMode: true,
  images: {
    domains: ['mexx-img-2019.s3.amazonaws.com']
  }
})
