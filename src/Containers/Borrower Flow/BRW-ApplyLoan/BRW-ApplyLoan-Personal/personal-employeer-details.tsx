import React from "react";
import { TextField, Box, Grid, InputLabel } from "@mui/material";

import { FormattedMessage } from "react-intl";

import messages from "../Intl/brw-apply-loan-intl";
import { useForm, Controller, FormProvider } from "react-hook-form"



function EmployeerDetails() {

  const { control, formState: { errors } } = useForm()

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage
                {...messages.personalLoanApplyEmployerNameLabel}
              />
            </InputLabel>

            <Controller name="employerName" control={control} render={({ field }) =>
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
                placeholder="Enter employer name"
                {...field}
              />

            } />

          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage
                {...messages.personalLoanApplyEmployerAddressLabel}
              />
            </InputLabel>
            <Controller name="employerAddress" control={control} render={({ field }) =>
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
                placeholder="Enter address"
              />
            } />
          </Grid>

          <Grid item xs={12}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage
                {...messages.personalLoanApplySalarySlipsBankStatementLabel}
              />
            </InputLabel>
            <Controller name="salarySlip" control={control} render={({ field }) =>
              <TextField
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": {
                    top: 0,
                    borderRadius: "10px",
                  },
                }}
                type="file" fullWidth placeholder="Salary Slips / Bank Statement" minRows={4} />

            } />

          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default EmployeerDetails;
