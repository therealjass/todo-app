import { Toolbar, Box, Grid } from "@mui/material";
import CustomCard from "./brw-onboarding-card";
import NavBar from "../../../Components/navbar";
import BusinessMan from "../../../Assets/Img/businessMan.png";
import PersionalLoanMan from "../../../Assets/Img/persionalLoan.png";
import CustomBox from "./brw-onboarding-customBox";
import TermsAndConditionsComp from "../../../Components/terms-and-conditions";
import { enumBorrowerPrivateRoutesConstant } from "../../../Utils/GlobalConstants/enum-routes";

// import messages from "./Intl/authentication-intl";
// import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyLoanTypeListAction } from "../../../Store/Borrower Flow/BRW-Onboarding/onboarding-action";


const Business_Loan = ["Existing Business", "Startup Business"];
const Personal_Loan = ["Salaried Employee", "Self Employee"];

const BrwOnBoardingMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const g_applyLoanTypes = useSelector((state: any) => {
    return state?.onBoardingReducer?.applyLoanTypes
  }) || [];
  const [businessLoan, setBusinessLoan] = useState<any>({
    name: "Business Loan"
  })

  useEffect(() => {
    dispatch(applyLoanTypeListAction());
  }, []);

  useEffect(() => {
    if (g_applyLoanTypes?.data[0]) {
      setBusinessLoan(g_applyLoanTypes?.data[0]);
    }
  }, [g_applyLoanTypes])

  const handleApplyBusinessLoan = (name: any) => {
    console.log(name, "name")
    navigate(enumBorrowerPrivateRoutesConstant.BRW_BUSINESS_LOAN_APPLY, { replace: true, state: { business_loan: { ...businessLoan } } });
  };

  // const handleApplyPersonalLoan = () => {
  //   navigate(
  //     // enumBorrowerPersonalLoanApplyPrivateRoutesConstant.BRW_PERSONAL_LOAN_APPLY,
  //     enumBorrowerPrivateRoutesConstant.BRW_PERSONAL_LOAN_APPLY,
  //     {
  //       replace: true,
  //     }
  //   );
  // };

  return (
    <>
      <NavBar />
      <Toolbar />
      <Box p={3} sx={{ background: "#E5E5E5" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <CustomCard
              subTitle="Apply For"
              // title="Bussiness Loan"
              title={businessLoan?.name}
              image={BusinessMan}
              buttonLabel="Apply Now"
              bgcolor="primary.main"
              onClick={handleApplyBusinessLoan}
              radioGroupArray={Business_Loan}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <CustomCard
              subTitle="Apply For"
              title="Personal Loan"
              image={PersionalLoanMan}
              buttonLabel=" Apply Now"
              radioGroupArray={Personal_Loan}
              onClick={handleApplyPersonalLoan}
            />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <CustomBox />
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <CustomBox />
          </Grid> */}
          <Grid item xs={12}>
            <TermsAndConditionsComp />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default BrwOnBoardingMain;
