import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import siteConfig from '../Config/siteConfig';
import ExpireTokenDialog from '../Components/expire-token-dialog';
import { adminPublicRoutesConstants } from './Admin/admin-public-routes';
import { adminPrivateRoutesConstants } from './Admin/admin-private-routes';
import { borrowerPublicRoutesConstant } from './Borrower/brw-public-routes';
import { borrowerPrivateRoutesConstants } from './Borrower/brw-private-routes';
import AccessToAdminPrivateRoutes from '../Components/access-to-admin-private-routes';
import AccessToBorrowerPrivateRoutes from '../Components/access-to-borrower-private-routes';

const MainRoutes = () => {
  const dispatch = useDispatch();
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const isAdmin = useMemo(() => { return localStorage.getItem(siteConfig.IS_ADMIN) }, [])

  useEffect(() => {
    initiate();
  }, []);

  const initiate = async () => {
    await handleTokenExpiry();
  }

  const handleTokenExpiry = async () => {
    return null
    // let res: apiResponse = await getUserProfileDataThunk();
    // if (checkExpirationOfToken(res?.code)) {
    //   setIsTokenExpired(true);
    //   dispatch(setTokenExpiredStatusAction(true));
    //   return;
    // }

    // if (res?.data) {
    //   dispatch(setUserViewProfileDataAction(res?.data))
    // }
  }

  return (
    <div>
      <ExpireTokenDialog
        isTokenExpired={isTokenExpired}
        homeAllowed={true}
        setIsTokenExpired={(val) => setIsTokenExpired(val)}
      />
      <Routes>

        {/* ADMIN ROUTES BELOW */}
        {
          adminPublicRoutesConstants.map((item, index) => {
            return (
              <Route
                key={index}
                path={item?.path}
                element={item?.component}
              />
            )
          })
        }
        {
          adminPrivateRoutesConstants.map((item, index) => {
            return (
              <Route
                key={index}
                path={item?.path}
                element={
                  <AccessToAdminPrivateRoutes>
                    {item?.component}
                  </AccessToAdminPrivateRoutes>
                }
              />

            )
          })
        }

        {/* BORROWER ROUTES BELOW */}
        {
          borrowerPublicRoutesConstant.map((item, index) => {
            return (
              <Route
                key={index}
                path={item?.path}
                element={item?.component}
              />
            )
          })
        }
        {
          borrowerPrivateRoutesConstants.map((item, index) => {
            return (
              <Route
                key={index}
                path={item?.path}
                element={
                  <AccessToBorrowerPrivateRoutes>
                    {item?.component}
                  </AccessToBorrowerPrivateRoutes>
                }
              />

            )
          })
        }
      </Routes>
    </div>
  );
}

export default MainRoutes;


