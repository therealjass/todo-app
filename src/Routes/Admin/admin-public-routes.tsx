import AdminLogin from "../../Containers/Authentication/admin-login";
import { enumAdminPublicRoutesConstant } from "../../Utils/GlobalConstants/enum-routes";
import { prConstant } from "../../Utils/GlobalTypes/globalTypes";

export const adminPublicRoutesConstants: prConstant[] = [
  {
    path: enumAdminPublicRoutesConstant.ADM_LOGIN,
    component: <AdminLogin />
  }
]