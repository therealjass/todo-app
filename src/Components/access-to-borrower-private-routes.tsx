import { Navigate, useLocation } from 'react-router-dom';
import siteConfig from '../Config/siteConfig';
import { enumBorrowerPublicRoutesConstant } from '../Utils/GlobalConstants/enum-routes';

const AccessToBorrowerPrivateRoutes = ({ children }: any) => {
  const location = useLocation();
  /**Dsiabling this for now */
  let strLStoken: string | null = localStorage.getItem(siteConfig.ACCESS_TOKEN_KEY);
  if (!strLStoken) {
    // not logged in so redirect to login page with the return url
    return <Navigate to={enumBorrowerPublicRoutesConstant.BRW_LOGIN} state={{ from: location }} />
  }

  // authorized so return child components
  return children;
}

export default AccessToBorrowerPrivateRoutes;