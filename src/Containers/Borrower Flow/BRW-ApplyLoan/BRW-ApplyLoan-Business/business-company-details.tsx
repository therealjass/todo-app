import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  TextField,
  Box,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  Button,
} from "@mui/material";
import { FormattedMessage } from "react-intl";
import messages from "../Intl/brw-apply-loan-intl";
import CustomSelectBox from "../../../../Components/custom-select-box";
import { useDispatch, useSelector } from "react-redux";
import { clearMessageOfSaveCompanyDetailsAction, saveCompanyDetailsAction, setActiveStepAction, userBusinessLoanDataAction } from "../../../../Store/Borrower Flow/BRW-ApplyLoan/apply-loan-action";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { companyDetailsTypes, saveApplyLoanCompanyDetailsTypes } from "../../../../Utils/GlobalTypes/globalTypes";
import { enumActiveBusinessDocPoint, saveApplyLoanDataSuccessMsgs } from "../../../../Utils/GlobalConstants/globalConstant";
import SimplySimpleLoader from "../../../../Components/simply-simple-loader";
import CustomStyledButton from "../../../../Components/custom-styled-button";
import ApplyLoanSubFooter from "../apply-loan-sub-footer";



const options = [{ labelKey: "labelKey", valueKey: "valueKey" }, { labelKey: "labelKey", valueKey: "valueKey" }]

type IProps = {
  handleNextStep: (step: number) => void;
  handleBackStep: (step: number) => void;
}

const initialCompanyDetailsData = {
  company_name: "",
  phone_no: "",
  official_email_id: "",
  company_address: "",
  company_type: 0,
  country_id: 0,
  state_id: 0,
  is_aml_agree: true
}

const schema = yup.object({
  company_name: yup.string().required("Company name is required"),
  phone_no: yup.string().required("Phone no is required"),
  official_email_id: yup.string().email().required("Official email id is required"),
  company_address: yup.string().required("Company address is required!"),
  is_aml_agree: yup.boolean(),
  country_id: yup.number().required("Country is required"),
  company_type: yup.number().required("company type is required"),
  state_id: yup.number().required("state is required"),
  // is_aml_agree: yup.boolean().required("Please agree aml"),
}).required();

const countryList = [{ id: 1, name: "UAE" }, { id: 2, name: "India" }];
const stateList = [{ id: 1, name: "Dubai" }, { id: 2, name: "Saudi" }];
const companyTypeList = [{ id: 1, name: "Private" }, { id: 2, name: "Public" }];

function CompanyDetails(props: IProps) {
  const dispatch = useDispatch();

  /**useRef declarations */
  const btnRef = useRef<any>(null);

  /** redux states declarations */
  const g_saveCompanyDetails = useSelector((state: any) => state?.applyLoanReducer?.saveCompanyDetails);
  const g_businessLoanHeadings = useSelector((state: any) => { return state?.applyLoanReducer?.businessLoanHeadings?.data });
  const g_userBusinessLoanData = useSelector((state: any) => state?.applyLoanReducer?.userBusinessLoanData);

  /**react hook form declarations */
  const { register, handleSubmit, control, formState: { errors, }, setValue } = useForm<companyDetailsTypes>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(userBusinessLoanDataAction());
  }, [])

  useEffect(() => {
    if (!g_userBusinessLoanData) {
      return;
    }
    const { data } = g_userBusinessLoanData;
    let objSavedCompanyDetail: any = data;
    if (objSavedCompanyDetail && Object.keys(objSavedCompanyDetail).length) {
      let state_id = objSavedCompanyDetail.state_id?.id;
      let country_id = objSavedCompanyDetail.country_id?.id
      if (objSavedCompanyDetail) {
        setValue("company_name", objSavedCompanyDetail.company_name)
        setValue("phone_no", objSavedCompanyDetail.phone_no)
        setValue("official_email_id", objSavedCompanyDetail.official_email_id)
        setValue("company_address", objSavedCompanyDetail.company_address)
        setValue("company_type", objSavedCompanyDetail.company_type)
        setValue("country_id", country_id)
        setValue("state_id", state_id)
        setValue("is_aml_agree", objSavedCompanyDetail.is_aml_agree
        )
      }
    }
  }, [g_userBusinessLoanData])

  useEffect(() => {
    if (!g_saveCompanyDetails) {
      return;
    }

    let { data, error, message } = g_saveCompanyDetails;

    if (error && error.length) {
      //set error
    }

    if (message === saveApplyLoanDataSuccessMsgs.COMPANY_DETAILS) {
      dispatch(clearMessageOfSaveCompanyDetailsAction());
      props?.handleNextStep(enumActiveBusinessDocPoint.COMPANY_DOCUMENTS);
    }
  }, [g_saveCompanyDetails])

  /**function declarations */
  const onSubmit = (formData: companyDetailsTypes) => {
    let myForm: saveApplyLoanCompanyDetailsTypes = {
      apply_loan_heading_type: g_businessLoanHeadings[0]?.id,
      data: { ...formData }
    };

    myForm["data"]["is_aml_agree"] = true;

    dispatch(saveCompanyDetailsAction(myForm));
  }

  return (
    <>
      <SimplySimpleLoader
        loadingStatus={g_saveCompanyDetails.loading}
      />
      <form>
        <button type="submit" ref={btnRef} style={{ display: "none" }} onClick={handleSubmit(onSubmit)} />
        {
          g_saveCompanyDetails?.error ? (<Typography style={{ color: "red", fontSize: "14px" }} > {g_saveCompanyDetails?.error} </Typography>) : null
        }
        < Grid container spacing={3} maxWidth="lg" >
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label" >
              <FormattedMessage
                {...messages.businessLoanApplyCompanyTypeLabel}
              />
            </InputLabel>
            <Controller
              control={control}
              name="company_type"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <CustomSelectBox
                  // name={"countryofbirth_id"}
                  labelKey={'name'}
                  valueKey={'id'}
                  options={companyTypeList}
                  // inpurLabelValue={"Country of birth *"}
                  isReadOnly={false}
                  inputLabelSX={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontSize: "15px",
                    fontWeight: "normal",
                    top: "1px",
                    background: "#fff"
                  }}
                  {...field}
                // onChange={(val: any) => {
                //   customSelectBoxOnChange("countryofbirth_id", val)
                // }}
                />

              )} />
            {
              errors.company_type?.message ? (<Typography style={{ color: "red" }} > {errors.company_type?.message} </Typography>) : null
            }
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage
                {...messages.businessLoanApplyCompanyNameLabel}
              />
            </InputLabel>
            <Controller
              name="company_name"
              control={control}
              render={({ field }) => (
                <TextField
                  className="textInput"
                  fullWidth
                  placeholder="Enter company name"
                  {...field}
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": {
                      top: 0,
                      borderRadius: "10px",
                    },
                  }}
                />
              )}
            />
            {
              errors.company_name?.message ? (<Typography style={{ color: "red" }} > {errors.company_name?.message} </Typography>) : null
            }
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage {...messages.businessLoanApplyPhoneLabel} />
            </InputLabel>
            <Controller
              name="phone_no"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  message: "Invalid phone number"
                }
              }}
              render={({ field }) => (
                <TextField
                  type="number"
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": {
                      top: 0,
                      borderRadius: "10px",
                    },
                  }}
                  fullWidth
                  {...field}
                  placeholder="Enter phone number"
                />
              )}
            />
            {
              errors.phone_no?.message ? (<Typography style={{ color: "red" }} > {errors.phone_no?.message} </Typography>) : null
            }
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage {...messages.businessLoanApplyEmailLabel} />
            </InputLabel>
            <Controller
              name="official_email_id"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  placeholder="Enter email id"
                  {...field}
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": {
                      top: 0,
                      borderRadius: "10px",
                    },
                  }}
                />
              )}
            />
            {
              errors.official_email_id?.message ? (<Typography style={{ color: "red" }} > {errors.official_email_id?.message} </Typography>) : null
            }
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage {...messages.businessLoanApplyCountryLabel} />
            </InputLabel>
            <Controller
              name="country_id"
              control={control}
              render={({ field }) => (
                <CustomSelectBox
                  labelKey={'name'}
                  valueKey={'id'}
                  options={countryList}
                  isReadOnly={false}
                  inputLabelSX={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontSize: "15px",
                    fontWeight: "normal",
                    top: "1px",
                    background: "#fff"
                  }}
                  {...field}
                />
              )}
            />
            {
              errors.country_id?.message ? (<Typography style={{ color: "red" }} > {errors.country_id?.message} </Typography>) : null
            }
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage {...messages.businessLoanApplyStateLabel} />
            </InputLabel>
            <Controller
              name="state_id"
              control={control}
              render={({ field }) => (
                <CustomSelectBox
                  labelKey={'name'}
                  valueKey={'id'}
                  options={stateList}
                  isReadOnly={false}
                  inputLabelSX={{
                    color: "rgba(0, 0, 0, 0.6)",
                    fontSize: "15px",
                    fontWeight: "normal",
                    top: "1px",
                    background: "#fff"
                  }}
                  {...field}
                />
              )}
            />
            {
              errors.state_id?.message ? (<Typography style={{ color: "red" }} > {errors.state_id?.message} </Typography>) : null
            }
          </Grid>
          <Grid item xs={12}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage
                {...messages.businessLoanApplyCompanyAddressLabel}
              />
            </InputLabel>
            <Controller
              name="company_address"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": {
                      top: 0,
                      borderRadius: "10px",
                    },
                  }}
                  {...field}
                  fullWidth
                  placeholder="Enter full address.."
                  multiline
                />
              )}
            />
            {
              errors.company_address?.message ? (<Typography style={{ color: "red" }} > {errors.company_address?.message} </Typography>) : null
            }
          </Grid>
        </Grid>
      </form>
      <ApplyLoanSubFooter
        handleBackStep={(step) => props?.handleBackStep(step)}
        handleNextStep={(step) => btnRef.current.click()}
        nextStep={enumActiveBusinessDocPoint.COMPANY_DOCUMENTS}
        backStep={null}
      />
    </>
  );
}

export default CompanyDetails;
