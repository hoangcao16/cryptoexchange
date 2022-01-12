import { authService } from 'services/authService';
export const getToken = () => {
  const userToken = authService.getAccessToken();
  if (userToken) {
    return userToken;
  } else {
    return null;
  }
};
