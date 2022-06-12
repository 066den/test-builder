import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  typography: {
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
  },
  palette: {
    secondary: {
      light: '#f73378',
      main: '#F50057',
      dark: '#ab003c',
    },
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: 'absolute',
          top: '100%',
        },
      },
    },
  },
});

export default defaultTheme;
