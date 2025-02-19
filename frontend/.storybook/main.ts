// .storybook/main.ts
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
  viteFinal: async (viteConfig, { configType }) => {
    return mergeConfig(viteConfig, {
      resolve: {
        alias: {
          // Replace the real useAuth hook with our mock.
          "@/hooks/auth/useAuth": path.resolve(
            process.cwd(),
            "../src/stories/__mock__/useAuthMock.ts",
          ),
        },
      },
    });
  },
};

export default config;
