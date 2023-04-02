import { SFDialogProps } from "../../Components/common/success-failure-dialog"
import { HANDLE_DIALOG } from "./todo-constant"


export const handleDialogAction = (data: SFDialogProps) => {
  return { type: HANDLE_DIALOG, data: data }
}