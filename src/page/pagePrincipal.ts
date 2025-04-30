import {
  Card,
  loadStateFromLocalStorage,
  addCard,
  removeCardById,
  editCard,
  getState,
} from "../state";
import { ReusableInput } from "../components/input/input";
export function page(el: HTMLElement) {
  const divEl = document.createElement("div");
  divEl.classList.add("page");

  const style = document.createElement("style");
  style.textContent = `
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
  `;

  divEl.innerHTML = `
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
  `;

  const unorderList = divEl.querySelector(
    ".container-cards"
  ) as HTMLUListElement;
  const pError: HTMLParagraphElement = divEl.querySelector(".p-error")!;
  const buttonForm = divEl.querySelector("reusable-button");

  // Cargar el estado desde localStorage al iniciar
  loadStateFromLocalStorage();
  renderCards(unorderList);

  // const pError: HTMLParagraphElement = divEl.querySelector(".p-error")!;

  function showMessage(
    element: HTMLParagraphElement,
    text: string,
    type: "success" | "error"
  ) {
    element.textContent = text;

    // Aplicar estilo dependiendo del tipo
    if (type === "success") {
      element.className = "p-add show"; // Clase para éxito
    } else {
      element.className = "p-error show"; // Clase para error
    }

    // Mostrar el mensaje
    element.style.opacity = "1";
    element.style.display = "block"; // Aseguramos que se muestre

    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => {
      element.className = type === "success" ? "p-add" : "p-error"; // Remueve "show"
      element.style.opacity = "0"; // Suaviza la transición visual

      // Asegurarnos de que desaparezca del flujo después de la transición
      setTimeout(() => {
        element.style.display = "none"; // Ocultarlo completamente
      }, 500); // Ajusta este valor al mismo tiempo que la duración de la transición en CSS (0.5s en este caso)
    }, 3000);
  }

  // Uso en el evento del botón
  buttonForm?.addEventListener("click", () => {
    const inputForm = divEl.querySelector("reusable-input") as ReusableInput;
    const valorInput = inputForm.getValue();

    if (valorInput.trim() !== "") {
      const newCard = { id: generarIdUnico(), paragraph: valorInput };
      addCard(newCard); // Actualiza el estado
      showMessage(pError, "Tarea agregada correctamente", "success"); // Mensaje de éxito
      createCard(newCard, unorderList);
      inputForm.clearValue();
    } else {
      showMessage(pError, "Debes ingresar una tarea", "error"); // Mensaje de error
    }
  });

  function createCard(params: Card, container: HTMLUListElement) {
    const myCard = document.createElement("li");
    myCard.classList.add("card"); // Agregamos la clase "card"
    myCard.id = params.id; // Establecemos el ID único de la tarjeta

    myCard.innerHTML = `
      <div class="card-p">
        <p>${params.paragraph}</p>
      </div>
      <div class="card-check-delete">
        <input type="checkbox" />
        <button>
          <img src="/post-it/public/trash-solid.svg" alt="Eliminar" />
        </button>
      </div>
    `;

    const paragraphElement = myCard.querySelector("p")!;
    const buttonDelete: HTMLButtonElement = myCard.querySelector(
      ".card-check-delete button"
    )!;
    const inputCheck = myCard.querySelector(".card-check-delete input");

    // Evento de doble clic para editar el texto
    paragraphElement.addEventListener("dblclick", () => {
      const currentText = paragraphElement.textContent;
      const input = document.createElement("input");
      input.type = "text";
      input.value = currentText || "";
      paragraphElement.replaceWith(input);

      input.addEventListener("blur", () => {
        const newText = input.value.trim();
        if (newText) {
          paragraphElement.textContent = newText;
          input.replaceWith(paragraphElement);

          editCard(params.id, newText); // Actualiza el estado
        } else {
          input.replaceWith(paragraphElement); // Revertir si no hay texto válido
        }
      });

      input.focus();
    });

    // Evento del checkbox para mostrar/ocultar el botón de eliminación
    inputCheck!.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;

      if (target.checked) {
        // Mostrar el botón de eliminación
        buttonDelete.style.display = "block";

        // Listener para eliminar la tarjeta
        buttonDelete.addEventListener("click", () => {
          myCard.remove(); // Eliminar del DOM
          removeCardById(params.id); // Actualizar el estado
        });
      } else {
        // Ocultar el botón de eliminación
        buttonDelete.style.display = "none";
      }
    });

    // Agregar la tarjeta al contenedor
    container.appendChild(myCard);
  }

  function renderCards(container: HTMLUListElement) {
    container.innerHTML = "";
    const state = getState();
    state.forEach((card) => createCard(card, container));
  }

  function generarIdUnico() {
    return (
      Date.now().toString(36) + Math.random().toString(36).substring(2, 10)
    );
  }

  divEl.appendChild(style);
  return el.appendChild(divEl);
}
