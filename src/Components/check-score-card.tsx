import React from 'react'
import { Box, Typography, Button } from "@mui/material"
import successIcon from "../Assets/Img/successIcon.svg"
import CustomStyledButton from './custom-styled-button'
import { useNavigate } from "react-router-dom";
import { enumBorrowerPrivateRoutesConstant } from "../Utils/GlobalConstants/enum-routes";


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


function CHeckScoreCard() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(
      // enumBorrowerdashboardPrivateRoutesConstant.BRW_DASHBOARD,
      enumBorrowerPrivateRoutesConstant.BRW_DASHBOARD,
      {
        replace: false,
      }
    );

  }
  return (
    <>
      <Box textAlign="center" p={4} sx={{ background: "#fff", borderRadius: "18px", maxWidth: "450px", marginTop: "40px" }}  >
        <img src={successIcon} alt="response-icon" />
        <Typography sx={{ fontSize: "40px", fontWeight: 700, color: "#1F2C37" }}>
          Application Submitted Successfully
        </Typography>

        <Box pt={2} pb={2} >
          <Typography sx={{ fontSize: '24px', fontWeight: 400, color: "#1F2C37" }} >
            Your application is under review our team will revert you back.
          </Typography>
        </Box>

        <Box>
          <CustomStyledButton
            keyValue={1}
            variant="contained"
            style={style.buttonbtn}
            className="buttonCenterStyle"
            disabled={false}
            onClick={handleNext}
            fullWidth={true}
            textClassName={"largeButtonText"}
            textComponent={"span"}
            textStyle={style.text}
            textContent="Check Your Score Card"

          />
        </Box>
      </Box>

    </>
  )


}

export default CHeckScoreCard