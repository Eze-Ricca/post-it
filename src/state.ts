export type Card = {
  id: string;
  paragraph: string;
};

let state: Card[] = []; // Estado inicial

// Cargar el estado desde localStorage
export function loadStateFromLocalStorage(): void {
  const storedData = localStorage.getItem("cards");
  if (storedData) {
    state = JSON.parse(storedData);
  }
}

// Guardar el estado en localStorage
export function saveStateToLocalStorage(): void {
  localStorage.setItem("cards", JSON.stringify(state));
}

// Obtener el estado actual
export function getState(): Card[] {
  return state;
}

// Actualizar el estado
export function updateState(newState: Card[]): void {
  state = newState;
  saveStateToLocalStorage();
}

// Agregar una tarjeta al estado
export function addCard(card: Card): void {
  state.push(card);
  saveStateToLocalStorage();
}

// Eliminar una tarjeta por ID
export function removeCardById(cardId: string): void {
  state = state.filter((card) => card.id !== cardId);
  saveStateToLocalStorage();
}

// Editar una tarjeta por ID
export function editCard(cardId: string, newParagraph: string): void {
  const index = state.findIndex((card) => card.id === cardId);
  if (index !== -1) {
    state[index].paragraph = newParagraph;
    saveStateToLocalStorage();
  }
}
