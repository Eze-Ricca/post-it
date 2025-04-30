class ReusableButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const button: HTMLButtonElement = document.createElement("button");
    const label = this.getAttribute("label") || "Click Me";

    const bgColor: string =
      this.getAttribute("bg-color") ||
      "linear-gradient(135deg, #7f53ac, #647dee)";
    const textColor: string = this.getAttribute("text-color") || "#fff";
    const border: string = this.getAttribute("border-color") || "none";
    const hoverColor: string = this.getAttribute("hover-bg-color") || "#5863f8";
    const activeColor: string =
      this.getAttribute("active-bg-color") || "#7f53ac";
    const sizeText: string = this.getAttribute("size-text") || "18px";

    const style = document.createElement("style");
    style.textContent = `
      button {
        background: ${bgColor};
        color: ${textColor};
        font-size: ${sizeText};
        font-weight: 700;
        font-family: "Roboto", sans-serif;
        letter-spacing: 0.05rem;
        width: 100%;
        height: 50px;
        padding: 0 20px;
        border: ${border};
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      button:hover {
        background: ${hoverColor};
        transform: scale(1.05);
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
      }

      button:active {
        background: ${activeColor};
        transform: scale(0.98);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
    `;

    button.textContent = label;

    this.shadowRoot?.appendChild(style);
    this.shadowRoot?.appendChild(button);
  }
}

customElements.define("reusable-button", ReusableButton);
