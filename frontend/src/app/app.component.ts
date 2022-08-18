import {Component} from '@angular/core';
import {Store} from "@ngxs/store";
import {SetAuthInfo,} from "./pages/state/pages.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = true;
  constructor(private store: Store) {
    const authInfo = localStorage.getItem("auth");
    if (authInfo) {
      try {
        const parsedAuthInfo = JSON.parse(authInfo);
        this.store.dispatch(new SetAuthInfo(parsedAuthInfo));
      } catch (e) {
        console.error(e);
      }
    }

  }
}
