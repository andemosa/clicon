import { createSystem, defaultConfig, defineRecipe } from "@chakra-ui/react";

export const DocHeight = "var(--doc-height)";

export const system = createSystem(defaultConfig, {
  theme: {
    recipes: {
      Tabs: defineRecipe({
        base: {
          _selected: {
            bg: "#FA8232",
            borderColor: "#FA8232",
          },
        },
      }),
    },
    tokens: {
      colors: {
        blue: {
          50: { value: "#EAF6FE" },
          500: { value: "#2DA5F3" },
          700: { value: "#1B6392" },
        },
        red: {
          500: { value: "#EE5858" },
        },
        orange: {
          50: { value: "#FFF3EB" },
          500: { value: "#FA8232" },
        },
        yellow: {
          50: { value: "#FDFAE7" },
          200: { value: "#F7E99E" },
          300: { value: "#F3DE6D" },
          500: { value: "#EBC80C" },
        },
        gray: {
          50: { value: "#F2F4F5" },
          100: { value: "#E4E7E9" },
          300: { value: "#ADB7BC" },
          400: { value: "#929FA5" },
          600: { value: "#5F6C72" },
          700: { value: "#475156" },
          900: { value: "#191C1F" },
        },
        green: {
          50: { value: "#EAF7E9" },
          100: { value: "#D5F0D3" },
          500: { value: "#2DB224" },
        },
      },
      fonts: {
        heading: { value: `'Public Sans', sans-serif` },
        body: { value: `'Public Sans', sans-serif` },
      },
    },
  },
});
