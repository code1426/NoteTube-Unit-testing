import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config, { configType }) => {
    // Extend Vite config here.
    return mergeConfig(config, {
      resolve: {
        alias: {
          // override useAuth with our mock file.
          "../hooks/auth/useAuth": path.resolve(
            __dirname,
            "@/components/stories/__mock__/useAuthMock.ts",
          ),
        },
      },
    });
  },
};
export default config;
