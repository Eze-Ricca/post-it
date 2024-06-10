import { state } from "../../../state";

export function initHomePage(containerEl: HTMLDivElement) {
  const div = document.createElement("div");
  const tasks = state.getEnabledTasks();
  console.log(tasks);
  div.innerHTML = /*html*/ `
    <style>
      .lista{
        padding:0px;
      }
      h1{
        font-family: "Permanent Marker", cursive;
        font-weight: 400;
        font-style: normal;
        text-align: center;
        color:#80062f;
        letter-spacing: 0.15em;
        text-shadow: 2px 2px 4px #000000;
      }
      .input-add, .add-button{      
        border-radius: 4px;
      }
      .container{
        display: flex;
        justify-content:space-between;
        align-content: center;
        gap: 10px
      }
      .input-add{
        flex-grow: 1;
        height: 25px;
        padding: 10px;
        outline: none;
        border: solid 1px #80062f;
        font-family: "Roboto", sans-serif;
        font-weight: 500;
        font-style: normal;
        
      }
   
      .add-button{
        max-width: 100px;
        background-color: #80062f;
        color: white;
        border: solid 1px white;

      }
    </style>
    <h1>Tareas Pendientes</h1>
    <div class="container">
    <input class="input-add" type="text"><button class="add-button">Agregar</button></div>
    <ul class=lista></ul>  
     `;

  const listaEl = div.querySelector(".lista");

  function createTasks(items: any) {
    listaEl!.innerHTML = "";
    for (const item of items) {
      const todoItemEl = document.createElement("todo-item");
      todoItemEl.setAttribute("title", item.title);
      todoItemEl.setAttribute("id", item.id);
      // if (item.deleted) {
      //   todoItemEl.setAttribute("deleted", "false");
      // }
      if (item.completed) {
        todoItemEl.setAttribute("checked", "true");
      }
      todoItemEl.addEventListener("change", (e: any) => {
        console.log(e.detail);
        state.changeItemState(e.detail.id, e.detail.value);
      });
      listaEl?.append(todoItemEl);
    }
  }

  state.subscribe(() => {
    createTasks(state.getEnabledTasks());
  });

  createTasks(tasks);

  div.querySelector(".add-button")!.addEventListener("click", () => {
    const inputEl: HTMLInputElement = div.querySelector(".input-add")!;
    console.log(div);
    state.addTasks(Math.random(), `${inputEl!.value}`);
  });

  containerEl.append(div);
}
