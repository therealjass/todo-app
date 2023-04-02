import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FormattedMessage } from "react-intl";

/**Components import */
import BusinessPlan from "./business-plan";
import NavBar from "../../../../Components/navbar";
import messages from "../Intl/brw-apply-loan-intl";
import CompanyDetails from "./business-company-details";
import CompanyDocuments from "./business-company-documents";
import KeyManagementPersons from "./business-key-management-persons";
import CHeckScoreCard from "../../../../Components/check-score-card";
import SimplySimpleLoader from "../../../../Components/simply-simple-loader";
import CustomStyledButton from "../../../../Components/custom-styled-button";

/**Global constant and functions imports */
import { enumActiveBusinessDocPoint } from "../../../../Utils/GlobalConstants/globalConstant";

/** Redux Imports */
import { businessLoanHeadingsAction, saveCompanyDetailsAction, saveCompanyDocsAction, setActiveStepAction } from "../../../../Store/Borrower Flow/BRW-ApplyLoan/apply-loan-action";

/**Mui imports */
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import Stepper from "@mui/material/Stepper";
import StepLabel from "@mui/material/StepLabel";
import { Typography, Box, Grid, Toolbar } from "@mui/material";


type businessLoanType = {
  id: number,
  name: string
}

type navigationTypes = {
  company_details: boolean,
  company_docs: boolean,
  kmp: boolean,
  business_plan: boolean
}

const objInitialNavigation: navigationTypes = {
  company_details: false,
  company_docs: false,
  kmp: false,
  business_plan: false
}

const BrwApplyLoanBusinessMain = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const business_loan = useMemo(() => { return location?.state?.business_loan as businessLoanType }, []);
  const g_businessLoanHeadings = useSelector((state: any) => state?.applyLoanReducer?.businessLoanHeadings);

  const [steps, setSteps] = useState<any[]>([]);
  const [activeStep, setActiveStep] = useState(enumActiveBusinessDocPoint.COMPANY_DETAILS);

  useEffect(() => {
    dispatch(businessLoanHeadingsAction(business_loan?.id))
  }, [business_loan]);

  useEffect(() => {
    const { data } = g_businessLoanHeadings;
    if (data && data.length) {
      setSteps(data);
    } else {

    }
  }, [g_businessLoanHeadings])

  return (
    <>
      <SimplySimpleLoader
        loadingStatus={g_businessLoanHeadings?.loading}
      />
      <NavBar />
      <Toolbar />
      <Box p={3}>
        <Typography
          textAlign="center"
          sx={{ fontSize: "40px", fontWeight: 600 }}
        >
          <FormattedMessage {...messages.businessLoanApplyTitleLabel} />
        </Typography>
        <Box
          textAlign="center"
          sx={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Typography
            sx={{
              mt: 2,
              maxWidth: "300px",
              fontSize: "16px",
              fontWeight: 400,
              letterSpacing: "0.5%",
            }}
            textAlign="center"
          >
            <FormattedMessage {...messages.applyLoanFormSubTitle} />
          </Typography>
        </Box>
      </Box>
      {
        activeStep === enumActiveBusinessDocPoint.SUBMITTED ?
          <>
            <CHeckScoreCard />
          </>
          :
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box p={3} maxWidth="1080px">
              <Stepper
                activeStep={activeStep}
              >
                {
                  steps &&
                  steps.length &&
                  steps.map((item, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                      optional?: React.ReactNode;
                    } = {};
                    return (
                      <Step key={item?.id} {...stepProps}>
                        <StepLabel style={{ fontSize: "12px", fontWeight: 700 }}  {...labelProps}>{item?.heading_name}</StepLabel>
                      </Step>
                    );
                  })
                }
              </Stepper>
              <Box
                mt={4}
                sx={{ background: "#fff", padding: "40px", borderRadius: "24px", maxWidth: "850px", width: "100%" }}
              >
                {
                  activeStep === enumActiveBusinessDocPoint.COMPANY_DETAILS ?
                    <CompanyDetails
                      handleNextStep={(step) => setActiveStep(step)}
                      handleBackStep={(step) => setActiveStep(step)}
                    /> : null
                }
                {
                  activeStep === enumActiveBusinessDocPoint.COMPANY_DOCUMENTS ?
                    <CompanyDocuments
                      handleNextStep={(step) => setActiveStep(step)}
                      handleBackStep={(step) => setActiveStep(step)}
                    /> : null
                }
                {
                  activeStep === enumActiveBusinessDocPoint.KEY_MANAGEMENT_PERSONS ?
                    <KeyManagementPersons
                      handleNextStep={(step) => setActiveStep(step)}
                      handleBackStep={(step) => setActiveStep(step)}

                    /> : null
                }
                {
                  activeStep === enumActiveBusinessDocPoint.BUSINESS_PLAN ?
                    <BusinessPlan
                      handleNextStep={(step) => setActiveStep(step)}
                      handleBackStep={(step) => setActiveStep(step)}
                    /> : null
                }
              </Box>
            </Box>
          </Box>
      }
    </>
  );
};

export default BrwApplyLoanBusinessMain;
