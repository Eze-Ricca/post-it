interface StateData {
  tasks: Array<{
    id?: number;
    title?: string;
    completed?: boolean;
    deleted?: boolean;
  }>;
}

const state = {
  data: {
    tasks: [],
  } as StateData,
  listeners: [] as Function[],
  init() {
    if (!localStorage.getItem("saved-state")) {
      this.data = { tasks: [] };
    } else {
      const localData = localStorage.getItem("saved-state");
      this.setState(JSON.parse(localData! || `{}`));
    }
  },

  getState() {
    return this.data ? this.data : { tasks: [] };
  },

  getEnabledTasks() {
    const currentState = this.getState();
    return currentState.tasks.filter((t) => !t.deleted);
  },

  addTasks(id: number, title: string) {
    const currentState = this.getState();
    currentState.tasks.push({
      id: id,
      title: title,
      completed: false,
      deleted: false,
    });
    this.setState(currentState);
  },

  removeTaskById(id: number) {
    const currentState = this.getState();
    // Filtramos el array para excluir la tarea con el ID especificado
    currentState.tasks = currentState.tasks.filter((task) => task.id !== id);
    this.setState(currentState);
  },

  changeItemState(id: number, value: boolean) {
    const currentState = this.getState();
    const found = currentState.tasks.find((t) => t.id == id);
    found!.completed = value;
    this.setState(currentState);
  },

  setState(newState: StateData): void {
    this.data = newState;
    for (const cb of this.listeners) {
      cb(newState);
    }
    localStorage.setItem("saved-state", JSON.stringify(newState));
    console.log("Soy el state, he cambiado", this.data);
  },
  subscribe(callback: Function) {
    this.listeners.push(callback as Function);
  },
};

export { state };
