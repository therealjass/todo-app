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


function AddressDetails() {

  const { control, formState: { errors } } = useForm()
  return (
    <>
      <Box sx={{ width: "845px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage
                {...messages.personalLoanApplyCountryLabel}
              />
            </InputLabel>

            <Controller name="country" control={control} render={({ field }) =>
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
                <Select placeholder="Select" fullWidth >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>

            } />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage {...messages.personalLoanApplyStateLabel} />
            </InputLabel>


            <Controller name="state" control={control} render={({ field }) =>
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


          <Grid item xs={12}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage
                {...messages.personalLoanApplyAddressLabel}
              />
            </InputLabel>

            <Controller name="address" control={control} render={({ field }) =>
              <TextField
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": {
                    top: 0,
                    borderRadius: "10px",
                  },
                }}
                fullWidth
                placeholder="Enter full address.."
                multiline
              />

            } />

          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AddressDetails;
