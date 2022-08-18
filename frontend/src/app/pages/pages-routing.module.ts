import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {UsersListComponent} from "./components/users-list/users-list.component";

const routes: Routes = [
  {
    path: 'users',
    component: UsersListComponent
  },
  {
    path: 'auth',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
