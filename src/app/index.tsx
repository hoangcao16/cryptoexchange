/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyles } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { LoginPage } from './pages/LoginPage/Loadable';
import { RegisterPage } from './pages/RegisterPage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { FiatSpotPage } from 'app/pages/FiatSpotPage/Loadable';
import { useTranslation } from 'react-i18next';
// Theme
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from 'theme/theme';
import { useThemeContext } from 'app/components/common/themeContext';
import { StyledSuccessToast, StyledToastContainer } from './style';
import { Toast } from 'react-bootstrap';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';

//get store redux
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin } from 'app/container/LoginContainer/slice/selectors';
import { useLoginSlice } from 'app/container/LoginContainer/slice';
import { selectVerifyEmailRegister } from 'app/container/RegisterContainer/components/EmailVerification/slice/selectors';
import { useVerifyEmailRegisterSlice } from 'app/container/RegisterContainer/components/EmailVerification/slice';

export function App() {
  const dispatch = useDispatch();
  const { actions: actionsLogin } = useLoginSlice();
  const { actions: actionsRegister } = useVerifyEmailRegisterSlice();
  const dataLogin: any = useSelector(selectLogin);
  const dataRegister: any = useSelector(selectVerifyEmailRegister);
  const { i18n } = useTranslation();
  const { theme } = useThemeContext();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  //success toast
  const SuccessLoginToast = () => {
    return (
      <StyledSuccessToast
        onClose={() => {
          dispatch(actionsLogin.handleOpenFinishToast(false));
        }}
        show={dataLogin.openFinishToast}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <IoCheckmarkDoneCircleSharp className="icon-success" />
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Login Successfully</Toast.Body>
      </StyledSuccessToast>
    );
  };
  const SuccessRegisterToast = () => {
    return (
      <StyledSuccessToast
        onClose={() => {
          dispatch(actionsRegister.handleOpenFinishToast(false));
        }}
        show={dataRegister.openFinishToast}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <IoCheckmarkDoneCircleSharp className="icon-success" />
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Register Successfully</Toast.Body>
      </StyledSuccessToast>
    );
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={themeMode}>
        <Helmet
          // titleTemplate="Trading Platform"
          // defaultTitle="Trading Platform"
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name="description" content="Trading View" />
        </Helmet>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/wallet/fiat" element={<FiatSpotPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <StyledToastContainer>
          <SuccessLoginToast />
          <SuccessRegisterToast />
        </StyledToastContainer>
        <GlobalStyles />
      </ThemeProvider>
    </BrowserRouter>
  );
}
