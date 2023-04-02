import React, { useEffect, useRef } from "react";
import {
  Typography,
  TextField,
  Box,
  Grid,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Button,
} from "@mui/material";

import { FormattedMessage } from "react-intl";

import messages from "../Intl/brw-apply-loan-intl";
import "../../../../Assets/Css/Style.css";
import { useDispatch, useSelector } from "react-redux";
import { companyDocsTypes, saveApplyLoanCompanyDocsTypes } from "../../../../Utils/GlobalTypes/globalTypes";
// import "../../../../Assets/Css/";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { clearMessageOfSaveCompanyDocsAction, saveCompanyDocsAction, userBusinessLoanDataAction } from "../../../../Store/Borrower Flow/BRW-ApplyLoan/apply-loan-action";
import { enumActiveBusinessDocPoint, saveApplyLoanDataSuccessMsgs } from "../../../../Utils/GlobalConstants/globalConstant";
import SimplySimpleLoader from "../../../../Components/simply-simple-loader";

import CustomStyledButton from "../../../../Components/custom-styled-button";
import ApplyLoanSubFooter from "../apply-loan-sub-footer";

type IProps = {
  handleNextStep: (step: number) => void;
  handleBackStep: (step: number) => void;
}

const initialCompanyDocsData: companyDocsTypes = {
  trade_licence: "",
  moa_doc: "",
  vat_number: ""
}

const companyDocsKeys: string[] = Object.keys(initialCompanyDocsData);

const schema = yup.object({
  trade_licence: yup.string().required("Trade Licence is required"),
  vat_number: yup.string().required("VAT number is required"),
  moa_doc: yup.string().required("MOA document is required"),
}).required();

const CompanyDocuments = (props: IProps) => {
  const dispatch = useDispatch();

  /**useRef declarations */
  const btnRef = useRef<any>(null);

  /** redux states declarations */
  const g_saveCompanyDocs = useSelector((state: any) => state?.applyLoanReducer?.saveCompanyDocs);
  const g_businessLoanHeadings = useSelector((state: any) => { return state?.applyLoanReducer?.businessLoanHeadings?.data });
  const g_userBusinessLoanData = useSelector((state: any) => state?.applyLoanReducer?.userBusinessLoanData);

  /**react hook form declarations */
  const { register, handleSubmit, control, formState: { errors, }, setValue } = useForm<companyDocsTypes>({
    resolver: yupResolver(schema),
  });

  /** useEffects */
  useEffect(() => {
    dispatch(userBusinessLoanDataAction());
  }, [])

  useEffect(() => {
    if (!g_userBusinessLoanData) {
      return;
    }
    const { data } = g_userBusinessLoanData;
    let objSavedCompanyDetail: companyDocsTypes = data;

    if (objSavedCompanyDetail) {
      setValue("trade_licence", objSavedCompanyDetail.trade_licence);
      setValue("vat_number", objSavedCompanyDetail.vat_number);
      //@ts-ignore
      setValue("moa_doc_new", objSavedCompanyDetail.moa_doc);
      setValue("moa_doc", objSavedCompanyDetail.moa_doc);
    }
  }, [g_userBusinessLoanData])

  useEffect(() => {
    if (!g_saveCompanyDocs) {
      return;
    }

    let { data, error, message } = g_saveCompanyDocs;


    if (error && error.length) {
      //set error
    }

    if (message === saveApplyLoanDataSuccessMsgs.COMPANY_DOCS) {
      dispatch(clearMessageOfSaveCompanyDocsAction());
      props?.handleNextStep(enumActiveBusinessDocPoint.KEY_MANAGEMENT_PERSONS);
    }

  }, [g_saveCompanyDocs])

  /**function declarations */
  const onSubmit = (formData: companyDocsTypes) => {
    let myForm: saveApplyLoanCompanyDocsTypes = {
      apply_loan_heading_type: g_businessLoanHeadings[1]?.id,
      data: { ...formData }
    };

    dispatch(saveCompanyDocsAction(myForm));
  }

  return (
    <>
      <SimplySimpleLoader
        loadingStatus={g_saveCompanyDocs.loading}
      />
      <form>
        <button type="submit" ref={btnRef} style={{ display: "none" }} onClick={handleSubmit(onSubmit)} />
        <Grid container spacing={3} maxWidth="lg" >
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage
                {...messages.businessLoanApplyTradeLicenceLabel}
              />
            </InputLabel>
            <Controller
              control={control}
              name="trade_licence"
              rules={{
                required: true,
              }}
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
                  className="textInput"
                  fullWidth
                  placeholder="Enter licence"
                />
              )} />
            {
              errors.trade_licence?.message ? (<Typography style={{ color: "red" }} > {errors.trade_licence?.message} </Typography>) : null
            }
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage {...messages.businessLoanApplyVatNumberLabel} />
            </InputLabel>
            <Controller
              control={control}
              name="vat_number"
              rules={{
                required: true,
              }}
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
                  className="textInput"
                  fullWidth
                  placeholder="Enter VAT number"
                />
              )} />
            {
              errors.vat_number?.message ? (<Typography style={{ color: "red" }} > {errors.vat_number?.message} </Typography>) : null
            }
          </Grid>
          <Grid item xs={12}>
            <InputLabel className="apply-loan-input-label">
              <FormattedMessage
                {...messages.businessLoanApplyUploadMOADocLabel}
              />
            </InputLabel>
            {
              g_userBusinessLoanData?.data?.moa_doc ?
                <>
                  <Controller
                    control={control}
                    //@ts-ignore
                    name="moa_doc_new"
                    rules={{
                      required: true,
                    }}
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
                        className="Mui-disabled"
                        type="text"
                        fullWidth
                        placeholder="MOA Docs"
                        minRows={4}
                      />
                    )} />
                </>
                : <>
                  <Controller
                    control={control}
                    name="moa_doc"
                    rules={{
                      required: true,
                    }}
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
                        type="file"
                        fullWidth
                        placeholder="MOA Docs"
                        minRows={4}
                      />
                    )} />
                  {
                    errors.moa_doc?.message ? (<Typography style={{ color: "red" }} > {errors.moa_doc?.message} </Typography>) : null
                  }
                </>
            }
          </Grid>
        </Grid>
      </form>
      <ApplyLoanSubFooter
        handleNextStep={(step) => btnRef.current.click()}
        handleBackStep={(step) => props?.handleBackStep(step)}
        nextStep={enumActiveBusinessDocPoint.KEY_MANAGEMENT_PERSONS}
        backStep={enumActiveBusinessDocPoint.COMPANY_DETAILS}
      />
    </>
  );
}

export default CompanyDocuments;
