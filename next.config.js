/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/", destination: "/es", permanent: true },
      { source: "/diagnostico", destination: "/es/diagnostico", permanent: true },
      { source: "/contact", destination: "/es/contact", permanent: true },
      { source: "/pricing", destination: "/es/pricing", permanent: true },
      { source: "/privacy-policy", destination: "/es/privacy-policy", permanent: true },
      { source: "/legal-notice", destination: "/es/legal-notice", permanent: true },
      { source: "/terms-of-service", destination: "/es/terms-of-service", permanent: true },
      { source: "/success-cases/:slug", destination: "/es/success-cases/:slug", permanent: true },
      { source: "/en/diagnostico", destination: "/en/diagnosis", permanent: true },
    ];
  },
};

module.exports = nextConfig;