import {environment} from "../../../environments/environment";

export const APIS = {
  login: environment.serverUrl + 'auth/login',
  signUp: environment.serverUrl + 'auth/signup',
  getUserById: environment.serverUrl + 'user',
  getUsers: environment.serverUrl + 'user'
}
