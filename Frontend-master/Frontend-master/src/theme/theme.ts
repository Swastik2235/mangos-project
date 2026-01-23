import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#262953',
    },
    secondary: {
      main: '#262953',
    },
    background: {
      // default: '#f8f9fa',
      default: '#E7EBF0',

      paper: '#ffffff',
    },
    
    
  },

  
  typography: {
    // fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',.
    fontFamily: '"DM Sans", sans-serif',
    h2: {
      fontSize: '20px',
      fontWeight: 500,
      letterSpacing:0.2
    },// page headings
    h3: {
      fontSize: '16px',
      fontWeight: 700,
      letterSpacing:0.2
    },// component title
    h4: {
      fontSize: '14px',
      fontWeight: 400,
    },// component subtitle
    h5: {
      fontSize: '12px',
      fontWeight: 400,
    },//component desc
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
           '&:hover': {
            backgroundColor: '#1e2045', // your custom hover color
            color: '#fff',              // optional: change text color on hover
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px', // Set font size for all InputLabel components
        },
      },
    },
  },
});

export default theme;