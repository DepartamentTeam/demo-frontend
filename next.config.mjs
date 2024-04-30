/** @type {import('next').NextConfig} */

const nextConfig = {
    productionBrowserSourceMaps: true,
    output: "standalone",
    i18n: {
        locales: ["en", "ru"],
        defaultLocale: "en",
        localeDetection: false,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    trailingSlash: true,
};

export default nextConfig;
