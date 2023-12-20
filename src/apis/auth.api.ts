import authorizedRequest from 'utils/request/authorizedRequest';
import unauthorizedRequest from 'utils/request/unauthorizedRequest';

interface LoginResponse {
  accessTokenInfo: AccessTokenInfo;
}

interface AccessTokenInfo {
  accessToken: string;
  idToken: string;
  expiresIn: number;
  refreshToken: string;
}

export function loginApi(body: {username: string; password: string}) {
  return unauthorizedRequest.post<LoginResponse>(
    '/public/v1/sso/jwt-login',
    body,
  );
}

export function verifyRecaptchaApi(token: string) {
  return unauthorizedRequest.get('/public/v1/sso/captcha', {
    params: {response: token},
  });
}

export function loginWso2isApi(token: string) {
  return unauthorizedRequest.post('/public/v1/sso/is-login', {
    authorizationCode: token,
  });
}

export function logoutApi() {
  return authorizedRequest.get('/public/v1/sso/jwt-logout');
}
