/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
  webpack(config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
      issuer: {
        and: [/\.(js|ts|jsx|tsxcss|scss|sass)?$/],
      },
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
      issuer: {
        and: [/\.(js|ts|jsx|tsx|css|scss|sass)?$/],
      },
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  },
};

export default nextConfig;
