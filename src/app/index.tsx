/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyles } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { RegisterPage } from './pages/RegisterPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
// Theme
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from 'theme/theme';
import { useThemeContext } from 'app/components/common/themeContext';
export function App() {
  const { i18n } = useTranslation();
  const { theme } = useThemeContext();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeMode}>
        <Helmet
          titleTemplate="Trading Platform"
          defaultTitle="Trading Platform"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="Trading Platform" />
        </Helmet>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={RegisterPage} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyles />
      </ThemeProvider>
    </BrowserRouter>
  );
}
