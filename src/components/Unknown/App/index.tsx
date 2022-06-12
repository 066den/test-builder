import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import firebaseApp from '../../../common/firebaseApp';
import theme from '../../../common/theme';
import Root from '../Root';
import { UIContextProvider } from '../UIContext';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <FirebaseAppProvider firebaseApp={firebaseApp}>
        <ThemeProvider theme={theme}>
          <Router basename={process.env.PUBLIC_URL || '/'}>
            <CssBaseline />
            <UIContextProvider>
              <Root />
            </UIContextProvider>
          </Router>
        </ThemeProvider>
      </FirebaseAppProvider>
    </BrowserRouter>
  );
};

export default App;
