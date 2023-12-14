export const tokenManager = {
  token: '',
  refreshToken: '',
  exp: 0,
  logout: [] as Array<any>,

  setToken(t: string, rT: string) {
    this.token = t;
    this.refreshToken = rT;
  },

  setExpires(exp: number) {
    this.exp = exp;
  },

  setLogoutMethod(m: () => void) {
    this.logout.push(m);
  },

  doLogout() {
    this.logout.forEach(i => i());
  },
};
