export class UndoRedo {
  constructor(state) {
    this.previous = []
    this.next = []
  }

  save = state => {
    const clonedState = JSON.parse(JSON.stringify(state))
    this.previous.push(clonedState)
    this.next = []
  }

  undo = state => {
    this.next.push(state)
    return this.previous.pop()
  }

  redo = state => {
    this.previous.push(state)
    return this.next.pop()
  }
}
