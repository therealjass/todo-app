/** MUI imports */
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const TermsAndConditionsComp = () => {
  return (
    <Box className="footerBottomPosi" sx={{ bottom: "0", width: "100%" }}>
      <Box className="dflexSpaceBetween" sx={{ display: "flex", justifyContent: "center", padding: "15px", }}>
        <Typography sx={{ fontSize: "12px", color: "#0000007d" }} component="p">
          Simply Simple @2023, All Rights Reserved
        </Typography>
        <Box>
          <Link className="textFooterLink" to="#">
            Term & Conditions
          </Link>{" "}
          &nbsp;
          <Link className="textFooterLink" to="#">
            Privacy Policy
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default TermsAndConditionsComp;
