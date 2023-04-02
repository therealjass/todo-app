import React from "react";
import {
  TextField,
  Box,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import messages from "../Intl/brw-apply-loan-intl";
import { useForm, Controller, FormProvider } from "react-hook-form"



function GeneralInfo({ ...props }) {

  const { control, formState: { errors } } = useForm()

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage
                {...messages.personalLoanApplyIncomeRevenueLabel}
              />
            </InputLabel>

            <Controller {...props} name="income" control={control}
              rules={{
                required: true,

              }}
              render={({ field }) =>
                <FormControl
                  {...field}
                  fullWidth
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": {
                      top: 0,
                      borderRadius: "10px",
                    },
                  }}
                >
                  <Select placeholder="Select">
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>

              } />

          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage
                {...messages.personalLoanApplyEmployerNameLabel}
              />
            </InputLabel>

            <Controller {...props} name="employeeName" control={control} render={({ field }) =>
              <TextField
                className="textInput"
                fullWidth
                placeholder="Enter full name"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": {
                    top: 0,
                    borderRadius: "10px",
                  },
                }}
                {...field}
              />

            } />

          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage {...messages.personalLoanApplyPhoneLabel} />
            </InputLabel>

            <Controller {...props} name="phone" control={control} render={({ field }) =>
              <TextField
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": {
                    top: 0,
                    borderRadius: "10px",
                  },
                }}
                fullWidth
                placeholder="Enter phone number"
                {...field}

              />

            } />

          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage {...messages.personalLoanApplyEmailIdLabel} />
            </InputLabel>

            <Controller {...props} name="emailId" control={control} render={({ field }) =>
              <TextField
                fullWidth
                placeholder="Enter email id"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": {
                    top: 0,
                    borderRadius: "10px",
                  },
                }}
              />

            } />

          </Grid>

        </Grid>
      </Box>
    </>
  );
}

export default GeneralInfo;
