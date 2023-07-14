import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: '#1e232c',
    },
    secondary: {
      main: '#6d6e75',
    },
    background: {
      default: '#272d38'
    }
  },
  text: '#E8EBEB',
  accent: {
    light: '#039408',
    dark: '#017305'
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#E8EBEB'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            color: '#E8EBEB',
            fontSize: '.8rem',
            '@media (min-width:600px)': {
              fontSize: '1rem'
            }
          },
        },
      },
    },
  }
});

theme = responsiveFontSizes(theme);

export default theme;