import apiClient from 'services/apiService';

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
  verifyEmailLogin(email, code, requestTime) {
    return apiClient.request({
      method: 'POST',
      url: '/account-svc/users/auth/check-email-code-login',
      data: {
        email,
        code,
        requestTime,
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
    localStorage.removeItem('lastToken');
    return localStorage.removeItem('access_token');
  },
};
