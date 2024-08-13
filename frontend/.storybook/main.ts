import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [// "@storybook/addon-onboarding",
  "@storybook/addon-links", "@storybook/addon-essentials", "@chromatic-com/storybook", "@storybook/addon-interactions", "@storybook/addon-webpack5-compiler-babel", "@chromatic-com/storybook"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

// module.exports = {
//   addons: ['@chakra-ui/storybook-addon'],
//   features: {
//     emotionAlias: false,
//   },
// }
export default config;
