import {Injectable} from "@angular/core";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {GetUserById, GetUsers, Login, Logout, SetAuthInfo, SignUp} from "./pages.actions";
import {tap} from "rxjs/operators";
import {AuthService} from "../services/auth.service";
import {get} from 'lodash';
import {UserService} from "../services/user.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";

export class PagesStateModel {
  token: string | null;
  user: User | null;
  users: any;
  userInfo: any;
}

const defaults = {
  token: null,
  user: null,
  users: null,
  userInfo: null
};

@State<PagesStateModel>({
  name: 'pages',
  defaults
})

@Injectable()
export class PagesState {
  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
  }

  @Selector()
  static token(state: PagesStateModel) {
    return get(state, 'token');
  }

  @Selector()
  static users(state: PagesStateModel) {
    return get(state, 'users');
  }

  @Selector()
  static userInfo(state: PagesStateModel) {
    return get(state, 'userInfo');
  }

  @Action(SetAuthInfo)
  setAuthInfo({patchState}: StateContext<PagesStateModel>, {payload, setToLocalStorage}: SetAuthInfo) {
    patchState({
      token: payload?.token ? `Bearer ${payload?.token}` : undefined,
      user: payload?.user
    });
    if (setToLocalStorage) {
      if (payload)
        localStorage.setItem("auth", JSON.stringify(payload));
      else
        localStorage.removeItem("auth")
    }
  }

  @Action(Login)
  login({dispatch, patchState}: StateContext<PagesStateModel>, action: Login) {
    return this.authService.login(action.payload).pipe(
      tap((result: { token: string, user: User }) => {
        dispatch(new SetAuthInfo(result, true));
      })
    );
  }

  @Action(Logout)
  async Logout({dispatch, patchState}: StateContext<PagesStateModel>, action: Login) {
    dispatch(new SetAuthInfo(null, true));
    await this.router.navigate(['pages','auth'])
  }

  @Action(SignUp)
  signUp(ctx: StateContext<PagesStateModel>, action: SignUp) {
    return this.authService.signUp(action.payload).pipe(
      tap((result) => {
        ctx.patchState({});
      })
    );
  }

  @Action(GetUsers)
  getUsers(
    {getState, setState}: StateContext<PagesStateModel>,
    {}: GetUsers
  ) {
    return this.userService.getUsers().pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          users: result,
        });
      }));
  }
  // error: {message: "jwt expired"}
  // message: "jwt expired"
  @Action(GetUserById)
  getUserById(
    {getState, patchState, dispatch, setState}: StateContext<PagesStateModel>,
    {id}: GetUserById
  ) {
    return this.userService.getUserById(id).pipe(
      tap((result) => {
        const state = getState();
        setState({
          ...state,
          userInfo: get(result, '[0].[0]')
        });
      }));
  }
}
