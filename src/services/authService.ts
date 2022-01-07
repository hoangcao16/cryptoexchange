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
  verifyEmail(email, code) {
    return apiClient.request({
      method: 'POST',
      url: '/account-svc/users/auth/check-email-code',
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
    localStorage.removeItem('lastToken');
    return localStorage.removeItem('access_token');
  },
};
