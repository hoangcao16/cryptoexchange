import apiClient from 'services/apiService';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import moment from 'moment';

export const authService = {
  register(email, password, referralId, allowReceiveEmail, allowShareData) {
    return apiClient.request({
      method: 'POST',
      url: '/account-svc/users/auth/register',
      data: {
        email,
        password,
        referralId,
        allowReceiveEmail,
        allowShareData,
      },
    });
  },
  verifyEmailRegister(email, code) {
    return apiClient.request({
      method: 'POST',
      url: '/account-svc/users/auth/check-email-code',
      data: {
        email,
        code,
      },
    });
  },
  login(email, password, recaptcha_response) {
    return apiClient.request({
      method: 'POST',
      url: '/account-svc/users/auth/login',
      data: {
        email,
        password,
        recaptcha_response,
      },
    });
  },
  verifyEmailLogin(email, code) {
    return apiClient.request({
      method: 'POST',
      url: '/account-svc/users/auth/check-email-code-login',
      data: {
        email,
        code,
      },
    });
  },
  setAccessToken(token: string) {
    return localStorage.setItem('access_token', token);
  },
  getAccessToken() {
    return localStorage.getItem('access_token');
  },
  removeAccessToken() {
    return localStorage.removeItem('access_token');
  },
  getDecodedAccessToken() {
    const token = this.getAccessToken();
    if (token) {
      try {
        return jwtDecode<JwtPayload>(token);
      } catch (err) {
        return null;
      }
    }
    return null;
  },
  autoRefreshAccessToken() {
    const decodedAccessToken = this.getDecodedAccessToken();
    if (!decodedAccessToken) {
      return null;
    }
    const intervalId = setInterval(() => {
      console.log('Check auto refresh token at', moment().toString());
      // const decodedAccessToken = this.getDecodedAccessToken();

      if (!decodedAccessToken) {
        return null;
      }
      // Access token is expired, redirect to login page
      if (
        decodedAccessToken.exp &&
        moment().isAfter(moment(decodedAccessToken.exp * 1000))
      ) {
        this.removeAccessToken();
        clearInterval(intervalId);
        window.location.href = '/?authTab=1';
      }
    }, 60000);
  },
};
