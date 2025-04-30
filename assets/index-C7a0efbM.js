var E=Object.defineProperty;var C=(r,e,n)=>e in r?E(r,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[e]=n;var w=(r,e,n)=>C(r,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();class k extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){var o,s;const e=document.createElement("button"),n=this.getAttribute("label")||"Click Me",i=this.getAttribute("bg-color")||"linear-gradient(135deg, #7f53ac, #647dee)",t=this.getAttribute("text-color")||"#fff",a=this.getAttribute("border-color")||"none",d=this.getAttribute("hover-bg-color")||"#5863f8",h=this.getAttribute("active-bg-color")||"#7f53ac",b=this.getAttribute("size-text")||"18px",u=document.createElement("style");u.textContent=`
      button {
        background: ${i};
        color: ${t};
        font-size: ${b};
        font-weight: 700;
        font-family: "Roboto", sans-serif;
        letter-spacing: 0.05rem;
        width: 100%;
        height: 50px;
        padding: 0 20px;
        border: ${a};
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      button:hover {
        background: ${d};
        transform: scale(1.05);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
      }

      button:active {
        background: ${h};
        transform: scale(0.98);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
    `,e.textContent=n,(o=this.shadowRoot)==null||o.appendChild(u),(s=this.shadowRoot)==null||s.appendChild(e)}}customElements.define("reusable-button",k);class S extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){var t;const e=document.createElement("header"),n=document.createElement("h3");n.textContent="";const i=document.createElement("style");i.textContent=`
      header{
          background-color: #ff8282;
           max-width: 1280px;
           height: 80px;
           margin-left: auto;
           margin-right: auto;
           display: grid;
           place-content: center;
           }
      `,e.appendChild(n),e.appendChild(i),(t=this.shadowRoot)==null||t.appendChild(e)}}customElements.define("header-el",S);class L extends HTMLElement{constructor(){super();w(this,"inputElement");this.attachShadow({mode:"open"})}connectedCallback(){var o,s;const n=document.createElement("div"),i=document.createElement("input"),t=document.createElement("label"),a=this.getAttribute("label")||"Etiqueta",d=this.getAttribute("size-label")||"16px",h=this.getAttribute("placeholder")||"Escribe aquí...",b=this.getAttribute("type")||"text";t.textContent=a,i.placeholder=h,i.type=b,this.inputElement=i;const u=document.createElement("style");u.textContent=`
      div {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
      }

      label {
        font-size: ${d};
        font-weight: 600;
        font-family: "Roboto", sans-serif;
        color: #333;
      }

      input {
        box-sizing: border-box;
        width: 100%;
        height: 45px;
        padding: 10px 12px;
        font-size: 1rem;
        font-family: "Roboto", sans-serif;
        color: #333;
        background: #f9f9f9;
        border: 2px solid #ddd;
        border-radius: 6px;
        transition: all 0.3s ease;
      }

      input:focus {
        border-color: #5863f8;
        background: #ffffff;
        outline: none;
        box-shadow: 0 0 5px rgba(88, 99, 248, 0.5);
      }

      input:hover {
        border-color: #aaa;
      }
    `,n.appendChild(t),n.appendChild(i),(o=this.shadowRoot)==null||o.appendChild(u),(s=this.shadowRoot)==null||s.appendChild(n)}getValue(){return this.inputElement.value}clearValue(){this.inputElement.value=""}}customElements.define("reusable-input",L);let p=[];function T(){const r=localStorage.getItem("cards");r&&(p=JSON.parse(r))}function y(){localStorage.setItem("cards",JSON.stringify(p))}function A(){return p}function z(r){p.push(r),y()}function R(r){p=p.filter(e=>e.id!==r),y()}function q(r,e){const n=p.findIndex(i=>i.id===r);n!==-1&&(p[n].paragraph=e,y())}function M(r){const e=document.createElement("div");e.classList.add("page");const n=document.createElement("style");n.textContent=`
    .page {
      margin: 0;
    }
    .container-page {
      max-width: 960px;
      margin: 0 auto;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    /* form */
    .container-form {
      width: 100%;
      margin: 0 auto;
    }
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .p-add,
.p-error {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 25px;
  border-radius: 8px;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  text-align: center;
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease; /* Transición suave para opacidad */
}

.p-add {
  background-color: #48c78e; /* Verde éxito */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.p-error {
  background-color: #ff6b6b; /* Rojo error */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.p-add.show,
.p-error.show {
  opacity: 1;
  pointer-events: auto;
  top: 15%; /* Baja un poco para el efecto */
}
    @media (min-width: 960px) {
      .container-form {
        max-width: 960px;
      }
      .form {
        flex-direction: row;
        justify-content: space-between;
        align-items: end;
      }
      .form reusable-input {
        flex-grow: 1;
      }
    }
    .container-cards {
        list-style-type: none;  
        width: 100%;
        padding: 0;
        display: grid;
         grid-template-columns: 1fr;  
         gap: 10px;
    }
    .card {
  background: linear-gradient(145deg, #e0d1f9, #f4f0fc); /* Gradiente violeta sutil */
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -2px -2px 8px rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  overflow: hidden;
}

.card:hover {
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.15), -3px -3px 12px rgba(255, 255, 255, 0.85);
  transform: translateY(-5px) scale(1.02);
}

.card-p {
  color: #4a4a4a;
  font-size: 1rem;
  font-weight: 500;
  word-wrap: break-word;
}

.card-check-delete {
  display: flex;
  align-items: center;
  gap: 10px;
}

.card-check-delete input[type="checkbox"] {
  appearance: none;
  width: 20px;
  height: 20px;
  background: #ffffff;
  border: 2px solid #d3d3d3;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card-check-delete input[type="checkbox"]:checked {
  background: #48c78e;
  border-color: #48c78e;
}

.card-check-delete button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.card-check-delete button img {
  width: 16px;
  height: 16px;
}

.card-check-delete input[type="checkbox"]:checked + button {
  display: block;
}
    @media (min-width: 720px) {
      .container-cards {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (min-width: 960px) {
      .container-cards {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  `,e.innerHTML=`
    <header-el></header-el>
    <div class="container-page">
      <h1>Mis Pendientes</h1>
      <div class="container-form">
        <form class="form" action="">
          <reusable-input
            label="Nuevo pendiente:"
            placeholder="Escribe tu tarea"
            type="text"
            size-label="20px"
          >
          </reusable-input>
      
          <reusable-button
            label="Agregar"
            text-color="fff"
            border-color="none"
            hover-bg-color="none"
            active-bg-color="none"
          ></reusable-button>
        </form>
        <p class="p-error"></p>
      </div>
      <ul class="container-cards"></ul>
    </div>
  `;const i=e.querySelector(".container-cards"),t=e.querySelector(".p-error"),a=e.querySelector("reusable-button");T(),b(i);function d(o,s,c){o.textContent=s,c==="success"?o.className="p-add show":o.className="p-error show",o.style.opacity="1",o.style.display="block",setTimeout(()=>{o.className=c==="success"?"p-add":"p-error",o.style.opacity="0",setTimeout(()=>{o.style.display="none"},500)},3e3)}a==null||a.addEventListener("click",()=>{const o=e.querySelector("reusable-input"),s=o.getValue();if(s.trim()!==""){const c={id:u(),paragraph:s};z(c),d(t,"Tarea agregada correctamente","success"),h(c,i),o.clearValue()}else d(t,"Debes ingresar una tarea","error")});function h(o,s){const c=document.createElement("li");c.classList.add("card"),c.id=o.id,c.innerHTML=`
      <div class="card-p">
        <p>${o.paragraph}</p>
      </div>
      <div class="card-check-delete">
        <input type="checkbox" />
        <button>
          <img src="./public/trash-solid.svg" alt="Eliminar" />
        </button>
      </div>
    `;const f=c.querySelector("p"),g=c.querySelector(".card-check-delete button"),v=c.querySelector(".card-check-delete input");f.addEventListener("dblclick",()=>{const x=f.textContent,l=document.createElement("input");l.type="text",l.value=x||"",f.replaceWith(l),l.addEventListener("blur",()=>{const m=l.value.trim();m?(f.textContent=m,l.replaceWith(f),q(o.id,m)):l.replaceWith(f)}),l.focus()}),v.addEventListener("change",x=>{x.target.checked?(g.style.display="block",g.addEventListener("click",()=>{c.remove(),R(o.id)})):g.style.display="none"}),s.appendChild(c)}function b(o){o.innerHTML="",A().forEach(c=>h(c,o))}function u(){return Date.now().toString(36)+Math.random().toString(36).substring(2,10)}return e.appendChild(n),r.appendChild(e)}(()=>{const r=document.querySelector("#app");M(r)})();
