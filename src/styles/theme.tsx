import { createTheme, responsiveFontSizes, Theme, colors } from "@mui/material";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    textColor?: {
      heading?: string;
      para?: string;
      body?: string;
      placeHolder?: string;
      grad1?: string;
      grad2?: string;
    };
    backgroundColor?: {
      header?: string;
      navBar?: string;
      charcoal?: string;
      yellowRed?: string;
      designStudio1?: string;
      designStudio2?: string;
      orange1?: string;
      orange2?: string;
      green1?: string;
      green2?: string;
      yelgre1?: string;
      yelgre2?: string;
      yelgre3?: string;
      yelgre4?: string;
      mainGradient1?: string;
      mainGradient2?: string;
      fieldBorder?: string;
      yellow?: string;
      pink?: string;
      white?: string;
      purple?: string;
      linear1?: string;
      linear2?: string;
    };
    gapping?: {
      pagePadding?: string;
      pageMargin?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.blue[500],
    },
    secondary: {
      main: colors.orange[500],
    },
  },

  components: {
    MuiButton: {},
  },
});
