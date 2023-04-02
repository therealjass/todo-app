
import React from "react";
import { Typography, Box, Grid, Toolbar } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { FormattedMessage } from "react-intl";
import messages from "../Intl/brw-apply-loan-intl";
import GeneralInfo from "./personal-general-info";
import EmployeerDetails from "./personal-employeer-details";
import AddressDetails from "./personal-address-details";
import LoanRequirement from "./personal-loan-requirement";
import CustomStyledButton from "../../../../Components/custom-styled-button";
import NavBar from "../../../../Components/navbar";
import { useForm, Controller, FormProvider } from "react-hook-form"
import CHeckScoreCard from "../../../../Components/check-score-card";


const steps = [
  "General Info",
  "Employer Details",
  "Address Details",
  "Loan Requirement",
];


const style = {
  containertwo: {
    backgroundColor: "#fff",
    boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.16)",
    borderRadius: "8px",
    padding: "21px 40px",
  },
  buttonbtn: {
    height: "48px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px 0 rgba(35, 219, 123, 0.4)",
    backgroundColor: "#355FE5",
    width: "100%",
    marginBottom: "-1%",
  },

  backButtonbtn: {
    height: "48px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px 0 rgba(35, 219, 123, 0.4)",
    backgroundColor: "#fff",
    width: "100%",
    marginBottom: "-1%",
  },
  text: {
    color: "white",
  },
  textLogin: {
    color: "#0e0e10",
    fontWeight: "600",
  },
  bannerContainer: {},
};

type IProps = {

}

type formDataProps = {
  income: string,
  employeeName: string,
  phone: string,
  emailId: string,
  employerName: string,
  employerAddress: string,
  salarySlip: string,
  country: string,
  state: string,
  address: string
  businessSegment: string,
  howMuchFundREquired: number,
  uploadMOCDoc: string


}



const BrwApplyLoanPersonalMain = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const method = useForm<formDataProps>({
    defaultValues: {
      income: '',
      employeeName: '',
      phone: '',
      emailId: '',
      employerName: '',
      employerAddress: '',
      salarySlip: '',
      country: '',
      state: '',
      address: '',
      businessSegment: '',
      howMuchFundREquired: 0,
      uploadMOCDoc: ''

    }
  })

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBackStep = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step: any) => {
    switch (step) {
      case 0:
        return <GeneralInfo />;
      case 1:
        return <EmployeerDetails />;
      case 2:
        return <AddressDetails />;
      case 3:
        return <LoanRequirement />;
      default:
        return "Unkown step";
    }
  };


  return (
    <>
      <NavBar />
      <Toolbar />
      <Box p={3}>
        <Typography textAlign="center"
          sx={{
            fontSize: "40px", fontWeight: 600
          }}>
          Apply Personal Loan{" "}
        </Typography>
      </Box>
      <Box
        textAlign="center"
        sx={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        <Typography sx={{ mt: 2, maxWidth: "300px" }} textAlign="center">
          {" "}
          <FormattedMessage {...messages.applyLoanFormSubTitle} />
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {activeStep === steps.length ? (
          <CHeckScoreCard />
        ) : (
          <Box p={3} maxWidth="1080px">
            <Stepper activeStep={activeStep}   >
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel style={{ fontSize: "12px", fontWeight: 700 }}  {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Box
              mt={4}
              sx={{ background: "#fff", padding: "40px", borderRadius: "24px", maxWidth: "850px", width: "100%" }}
            >
              <FormProvider {...method} >

                <form onSubmit={method.handleSubmit(handleNext)} >
                  {getStepContent(activeStep)}

                  <Box textAlign="center" mt={5} >
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Button
                          fullWidth
                          disabled={activeStep === 0 ? true : false}
                          variant="text"
                          onClick={handleBackStep}
                        >
                          Back
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <CustomStyledButton
                          keyValue={1}
                          type="submit"
                          variant="contained"
                          style={style.buttonbtn}
                          className="buttonCenterStyle"
                          disabled={false}
                          // onClick={handleNext}
                          fullWidth={true}
                          textClassName={"largeButtonText"}
                          textComponent={"span"}
                          textStyle={style.text}
                          textContent={
                            <FormattedMessage
                              {...messages.businessLoanApplyNextButtonLabel}
                            />
                          }
                        />
                      </Grid>
                    </Grid>
                    {/* <Button variant="text" onClick={handleBackStep}>
                Back
              </Button> */}
                  </Box>

                </form>
              </FormProvider>

            </Box>

          </Box>
        )}
      </Box>
    </>
  );
};

export default BrwApplyLoanPersonalMain;
