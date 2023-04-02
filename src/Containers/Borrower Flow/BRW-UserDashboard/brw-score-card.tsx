import React from 'react'
import { Box, Card, CardContent, CardMedia, InputLabel, Typography } from "@mui/material";

import { FormattedMessage } from "react-intl";
import messages from "../BRW-ApplyLoan/Intl/brw-apply-loan-intl";
import infoLogo from "../../../Assets/Img/info.png"


function BRWScoreCard() {

  return (
    <>
      <Card sx={{ padding: "16px", borderRadius: "18px", border: "1px solid #DBE0FF", minHeight: "300px" }} elevation={0} >
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", height: "100%" }} >
            Chart
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default BRWScoreCard