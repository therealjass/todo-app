import { HANDLE_DIALOG } from "./todo-constant"

const initial = {
  dialog: { data: {} },
}

const todoReducer = (state = initial, action: any) => {
  switch (action?.type) {
    case HANDLE_DIALOG: {
      return {
        ...state,
        dialog: {
          ...state.dialog,
          data: action?.data
        }
      }
    }
    default:
      return initial
  }
}

export default todoReducer