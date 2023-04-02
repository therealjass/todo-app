import React from "react";
import { Typography, TextField, Box, Grid, InputLabel, FormControl, MenuItem, Select } from "@mui/material";

import { FormattedMessage } from "react-intl";

import messages from "../Intl/brw-apply-loan-intl";
import { useForm, Controller, FormProvider } from "react-hook-form"




function LoanRequirement() {
  const { control, formState: { errors } } = useForm()


  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage
                {...messages.businessLoanApplyBusinessSegmentLabel}
              />
            </InputLabel>

            <Controller name="businessSegment" control={control} render={({ field }) =>
              <TextField
                {...field}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": {
                    top: 0,
                    borderRadius: "10px",
                  },
                }}
                className="textInput"
                fullWidth
                placeholder="Enter your business segment"
              />

            } />

          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage
                {...messages.businessLoanApplyHowMuchFundRequiredLabel}
              />
            </InputLabel>

            <Controller name="howMuchFundREquired" control={control} render={({ field }) =>
              <TextField
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": {
                    top: 0,
                    borderRadius: "10px",
                  },
                }}
                className="textInput"
                fullWidth
                placeholder="Enter amount"
              />

            } />

          </Grid>



          <Grid item xs={12}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage
                {...messages.businessLoanApplyUploadMOADocLabel}
              />
            </InputLabel>
            <Controller name="uploadMOCDoc" control={control} render={({ field }) =>
              <TextField
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": {
                    top: 0,
                    borderRadius: "10px",
                  },
                }}
                type="file" fullWidth placeholder="Upload Financial Document" minRows={4} />
            } />

          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default LoanRequirement;
