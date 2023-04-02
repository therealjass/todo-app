import AdmDashboardMain from "../../Containers/Admin Flow/ADM-Dashboard/adm-dashboard-index";
import { enumAdminPrivateRoutesConstant } from "../../Utils/GlobalConstants/enum-routes";
import { prConstant } from "../../Utils/GlobalTypes/globalTypes";

export const adminPrivateRoutesConstants: prConstant[] = [
  {
    path: enumAdminPrivateRoutesConstant.ADM_DASHBOARD,
    component: <AdmDashboardMain />
  }
]