export class ReusableInput extends HTMLElement {
  inputElement!: HTMLInputElement;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const wrapper: HTMLDivElement = document.createElement("div");
    const input: HTMLInputElement = document.createElement("input");
    const label: HTMLLabelElement = document.createElement("label");

    const labelText = this.getAttribute("label") || "Etiqueta";
    const sizeLabel = this.getAttribute("size-label") || "16px";
    const placeholder = this.getAttribute("placeholder") || "Escribe aquí...";
    const type = this.getAttribute("type") || "text";

    label.textContent = labelText;
    input.placeholder = placeholder;
    input.type = type;

    this.inputElement = input;

    const style: HTMLStyleElement = document.createElement("style");
    style.textContent = `
      div {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
      }

      label {
        font-size: ${sizeLabel};
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
    `;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(wrapper);
  }

  getValue() {
    return this.inputElement.value;
  }

  clearValue() {
    this.inputElement.value = "";
  }
}

customElements.define("reusable-input", ReusableInput);
