// app/theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#FFF5E5",
      100: "#FFE4CC",
      200: "#FFCA99",
      300: "#FFB066",
      400: "#FF9640",  // Principal cor laranja
      500: "#FF7A1A",
      600: "#E66A17",
      700: "#CC5A13",
      800: "#B34A10",
      900: "#993A0C",
    },
  },
});

export default theme;
