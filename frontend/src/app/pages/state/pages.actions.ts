import {User} from "../../models/user";

export class Login {
  static readonly type = '[Pages] Login';
  constructor(public payload: any) {}
}
export class Logout {
  static readonly type = '[Pages] Logout';
  constructor() {}
}
export class SignUp {
  static readonly type = '[Pages] SignUp';
  constructor(public payload: any) {}
}
export class GetUsers {
  static readonly type = '[Pages] Get Users';
  constructor() {
  }
}
export class GetUserById {
  static readonly type = '[Pages] Get User By Id';
  constructor(public id: number) {
  }
}
export class SetAuthInfo {
  static readonly type = '[Pages] Set Auth Info';
  constructor(public payload: {token: string, user: User} | null, public setToLocalStorage = false) {
  }
}
/*export class SetAuthInfoToLocalStorage {
  static readonly type = '[Pages] Set Auth Info To Local Storage';
  constructor(public payload: {token: string, user: User}) {
  }
}*/


