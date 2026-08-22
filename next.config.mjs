/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export -> ./out, which GitHub Pages serves directly.
  output: "export",
  // next/image optimization needs a server; static export has none.
  images: { unoptimized: true },
  // Emit /about/index.html style paths so Pages resolves them without a router.
  trailingSlash: true,
};

export default nextConfig;
