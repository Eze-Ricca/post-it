import "./src/components/text";
import "./src/components/todo-item";
import { initHomePage } from "./src/pages/home";
import { state } from "./state";

(() => {
  state.init();
  initHomePage(document.querySelector(".root")!);
})();
