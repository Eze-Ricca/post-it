import { state } from "../../../state";
class TodoItem extends HTMLElement {
  shadow: ShadowRoot;
  checked: boolean = false;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.title = this.getAttribute("title") || "";
    this.checked = this.hasAttribute("checked");
    // this.deleted = this.hasAttribute("deleted");
    this.id = this.getAttribute("id")!;

    const style = document.createElement("style");
    style.innerHTML = /*CSS*/ `
      .root{
      box-sizing: border-box;
      width: 100%;  
      max-height: 90px;  
      color: #010127;
      border-radius: 4px;
      overflow-wrap: anywhere;
      background: rgb(253,194,29);
      background: linear-gradient(148deg, rgba(253,194,29,0.28335084033613445) 0%, rgba(252,176,69,1) 100%);
      font-size: 18px;
      margin-bottom: 10px;
      display: flex;    
      justify-content: space-between;   
      align-items: center;  
      gap: 15px;   
      padding:10px;
      }       
      .clase-h4{
        flex-grow: 1;
      }
      .titulo {      
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-style: normal;
      }
      .titulo.checked{
      text-decoration: line-through;
      }
      input, button{
      display: block;
      font-family: "Roboto", sans-serif;
      font-weight: 500;
      font-style: normal;
      }
      .delete{
      display:none;
      min-width: 70px;
      height: 40px;
      background-color: white;
      color: #80062f;
      border: solid 2px #80062f;
      border-radius: 4px
      }
        
      `;
    this.shadow.append(style);
    this.render();
  }

  render() {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="root">
    <div>
     <input class="checkbox-input" type="checkbox" ${
       this.checked ? "checked" : ""
     }/>
    </div>
    <div class="clase-h4">
    <h4 class="titulo ${this.checked ? "checked" : ""}">${this.title}</h4> 
    </div>
    <div>
    <button class="delete">Eliminar</button>
    </div>
    </div>
    `;
    this.shadow.append(div);
    this.addListener();
  }

  addListener() {
    const chEl = this.shadow.querySelector(".checkbox-input")!;
    const deleteBtn: HTMLButtonElement = this.shadow.querySelector(".delete")!;
    chEl.addEventListener("click", (e) => {
      const target = e.target as any;
      const event = new CustomEvent("change", {
        detail: {
          id: this.id,
          value: target.checked,
        },
      });
      this.dispatchEvent(event);
    });
    if (chEl.hasAttribute("checked")) {
      deleteBtn.style.display = "block";
      deleteBtn.addEventListener("click", () => {
        console.log(this.id);
        state.removeTaskById(Number(this.id)); // Informa al estado sobre la eliminación de esta tarea
      });
    }
  }
}
customElements.define("todo-item", TodoItem);
