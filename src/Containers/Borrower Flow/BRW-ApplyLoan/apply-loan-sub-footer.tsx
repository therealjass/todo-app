import { Box, Button, Grid } from "@mui/material";
import { FormattedMessage } from "react-intl";
import CustomStyledButton from "../../../Components/custom-styled-button";

import messages from "../BRW-ApplyLoan/Intl/brw-apply-loan-intl";

type IProps = {
  handleNextStep: (step: number) => void;
  handleBackStep: (step: number) => void;
  backStep: number | null;
  nextStep: number;
}

const footerButtonOfApplyLoanStyle = {
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

const ApplyLoanSubFooter = (props: IProps) => {
  return (
    <Box pt={3} textAlign="center">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            onClick={() => {
              if (props?.backStep !== null) props?.handleBackStep(props?.backStep)
            }}
            variant="text"
            disabled={props?.backStep == null ? true : false}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomStyledButton
            keyValue={1}
            variant="contained"
            style={footerButtonOfApplyLoanStyle.buttonbtn}
            className="buttonCenterStyle"
            disabled={false}
            onClick={() => {
              props?.handleNextStep(props?.nextStep);
            }}
            fullWidth={true}
            textClassName={"largeButtonText"}
            textComponent={"span"}
            textStyle={footerButtonOfApplyLoanStyle.text}
            textContent={
              <FormattedMessage
                {...messages.businessLoanApplyNextButtonLabel}
              />
            }
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ApplyLoanSubFooter;