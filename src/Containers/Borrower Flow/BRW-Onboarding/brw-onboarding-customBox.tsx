import React from "react";
import { Box, Typography, Paper } from "@mui/material";

type Document = {
  subTitle: String;
  description: string;
};

export type DocumentGroup = {
  [key: string]: Document;
};

function CustomBox({ DocumentGroup }: DocumentGroup) {
  return (
    <Box
      p={4}
      component={Paper}
      elevation={0}
      sx={{ borderRadius: "18px", border: "1px solid #DBE0FF" }}
    >
      <Typography  sx={{fontSize:"24px", fontWeight: 700 }}>
        Document Required{" "}
      </Typography>
      <Box mt={2}>
        <Typography  sx={{fontSize:"16px", fontWeight: 700 }} >Lorem Ipsum </Typography>
        <Typography  sx={{fontSize:"14px", fontWeight: 500,color:"#666666" }}  >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.{" "}
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography  sx={{fontSize:"16px", fontWeight: 700 }} >Lorem Ipsum </Typography>
        <Typography  sx={{fontSize:"14px", fontWeight: 500,color:"#666666" }}  >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.{" "}
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography  sx={{fontSize:"16px", fontWeight: 700 }} >Lorem Ipsum </Typography>
        <Typography  sx={{fontSize:"14px", fontWeight: 500,color:"#666666" }}  >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.{" "}
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography  sx={{fontSize:"16px", fontWeight: 700 }} >Lorem Ipsum </Typography>
        <Typography  sx={{fontSize:"14px", fontWeight: 500,color:"#666666" }}  >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.{" "}
        </Typography>
      </Box>
    
     
    </Box>
  );
}

export default CustomBox;
