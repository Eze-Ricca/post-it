import "./components/button/button";
import "./components/header/header";
import "./components/input/input";
import { page } from "./page/pagePrincipal";
(() => {
  const app: HTMLElement = document.querySelector("#app")!;
  page(app);
})();
