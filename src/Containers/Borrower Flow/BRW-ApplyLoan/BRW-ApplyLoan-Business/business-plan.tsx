import React, { useEffect, useRef, useState } from "react";
import { Typography, TextField, Box, Grid, InputLabel, FormControl, MenuItem, Select, InputAdornment } from "@mui/material";

import { FormattedMessage } from "react-intl";

import messages from "../Intl/brw-apply-loan-intl";
import { enumActiveBusinessDocPoint, globalConstant, saveApplyLoanDataSuccessMsgs } from "../../../../Utils/GlobalConstants/globalConstant";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { businessPlanTypes, financialDocsTypes } from "../../../../Utils/GlobalTypes/globalTypes";
import { saveApplyLoanBusinessPlanTypes } from "../../../../Utils/GlobalTypes/globalTypes";
import { uploadImages } from "../../../../Utils/GlobalFunctions/aws-file-upload";
import { useDispatch, useSelector } from "react-redux";
import { clearMessageOfSaveBusinessPlanAction, clearMessageOfSubmitAndVerifyDataAction, saveBusinessPlanAction, saveFinancialDocsAction, submitAndVerifyAllFieldsAction } from "../../../../Store/Borrower Flow/BRW-ApplyLoan/apply-loan-action";
import { ContactError, ContactTick } from "../../../../Utils/GlobalConstants/src";
import ApplyLoanSubFooter from "../apply-loan-sub-footer";

type IProps = {
  handleNextStep: (step: number) => void;
  handleBackStep: (step: number) => void;
}

const schema = yup.object({
  business_segment: yup.string().required("Business segment is required"),
  fund_required: yup.string().required("Fund amount is required"),
}).required();

const businessPlanKeys = ["business_segment", "fund_required"]

const BusinessPlan = (props: IProps) => {

  const btnRef = useRef<any>({});
  const dispatch = useDispatch();

  /**react hook form declarations */
  const { register, handleSubmit, control, formState: { errors, }, setValue } = useForm<businessPlanTypes>({
    resolver: yupResolver(schema),
  });

  const g_saveFinancialDocs = useSelector((state: any) => state?.applyLoanReducer?.saveFinancialDocs);
  const g_saveBusinessPlan = useSelector((state: any) => state?.applyLoanReducer?.saveBusinessPlan);
  const g_businessLoanHeadings = useSelector((state: any) => { return state?.applyLoanReducer?.businessLoanHeadings?.data });
  const g_userBusinessLoanData = useSelector((state: any) => state?.applyLoanReducer?.userBusinessLoanData);
  const g_submitAndVerifyAllFields = useSelector((state: any) => state?.applyLoanReducer?.submitAndVerifyAllFields);

  const [error, setError] = useState<string>("");
  const [financialDocs, setFinancalDocs] = useState<any[]>([]);

  useEffect(() => {
    if (!g_saveFinancialDocs) return;

    let { data, message, error } = g_saveFinancialDocs;
    let arrFinancialDocs = [...financialDocs];
    if (arrFinancialDocs[financialDocs.length - 1]) {
      if (error == globalConstant.DATA_NOT_SAVED) {
        arrFinancialDocs[financialDocs.length - 1]["error"] = true;
      } else {
        arrFinancialDocs[financialDocs.length - 1]["error"] = false;
      }
    }

    setFinancalDocs(arrFinancialDocs);

  }, [g_saveFinancialDocs]);

  useEffect(() => {
    if (!g_userBusinessLoanData) {
      return;
    }
    const { data } = g_userBusinessLoanData;
    let objSavedCompanyDetail: businessPlanTypes = data;

    if (objSavedCompanyDetail) {
      setValue("business_segment", objSavedCompanyDetail.business_segment)
      setValue("fund_required", objSavedCompanyDetail.fund_required)
    }

    const { financial_documents } = data;
    if (financial_documents && financial_documents.length) {
      setFinancalDocs(financial_documents);
    }
  }, [g_userBusinessLoanData])

  useEffect(() => {
    if (!g_saveBusinessPlan) {
      return;
    }

    let { data, error, message } = g_saveBusinessPlan;


    if (error && error.length) {
      //set error
    }

    if (message === saveApplyLoanDataSuccessMsgs.BUSINESS_PLAN) {
      dispatch(clearMessageOfSaveBusinessPlanAction());
      dispatch(submitAndVerifyAllFieldsAction());
      // props?.moveToNextStep(enumActiveBusinessDocPoint.COMPANY_DOCUMENTS);
    } else {
      // data not saved
    }

  }, [g_saveBusinessPlan])

  useEffect(() => {
    if (!g_submitAndVerifyAllFields) return;
    let { message, error } = g_submitAndVerifyAllFields;
    if (error && error.length) {
      setError(error);
      return;
    }

    if (message === saveApplyLoanDataSuccessMsgs.VERIFY_AND_SUBMITTED) {
      dispatch(clearMessageOfSubmitAndVerifyDataAction());
      props?.handleNextStep(enumActiveBusinessDocPoint.SUBMITTED);
    }
  }, [g_submitAndVerifyAllFields])


  const onSubmit = (formData: any) => {
    let myForm: saveApplyLoanBusinessPlanTypes = {
      apply_loan_heading_type: 4,
      is_financial_document: false,
      data: { ...formData }
    };

    dispatch(saveBusinessPlanAction(myForm));
  }

  const handleUploadFinancialDocs = async (e: any) => {
    let arrFinancialDocs: any[] = [...financialDocs];

    // const url = await uploadImages(e.target.files[0])
    // console.log(url);

    arrFinancialDocs.push({
      documents: e.target.files[0].name
    })

    dispatch(saveFinancialDocsAction({
      apply_loan_heading_type: 4,
      is_financial_document: true,
      data: {
        doc: e.target.files[0].name
      }
    }))

    setFinancalDocs(arrFinancialDocs);
  }

  return (
    <>
      <form>

        <button type="submit" ref={btnRef} style={{ display: "none" }} onClick={handleSubmit(onSubmit)} />
        <Box>
          {
            error && error.length ?
              <Typography style={{ color: "red", fontSize: "15px" }} > {error} </Typography>
              : null
          }
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <InputLabel className="apply-loan-input-label">
                <FormattedMessage
                  {...messages.businessLoanApplyBusinessSegmentLabel}
                />
              </InputLabel>
              <Controller
                control={control}
                name="business_segment"
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
                    placeholder="Enter your business segment"
                  />
                )} />
              {
                errors.business_segment?.message ? (<Typography style={{ color: "red" }} > {errors.business_segment?.message} </Typography>) : null
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel className="apply-loan-input-label">
                <FormattedMessage
                  {...messages.businessLoanApplyHowMuchFundRequiredLabel}
                />
              </InputLabel>
              <Controller
                control={control}
                name="fund_required"
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
                    placeholder="Enter amount"
                  />
                )} />
              {
                errors.fund_required?.message ? (<Typography style={{ color: "red" }} > {errors.fund_required?.message} </Typography>) : null
              }
            </Grid>
            <Grid item xs={12}>
              <InputLabel className="apply-loan-input-label">
                <FormattedMessage
                  {...messages.businessLoanApplyUploadFinancialDocumentLabel}
                />
              </InputLabel>
              <TextField
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": {
                    top: 0,
                    borderRadius: "10px",
                  },
                }}
                type="file"
                fullWidth
                placeholder="Upload Financial Document"
                minRows={4}
                onChange={handleUploadFinancialDocs}
              />
              {financialDocs && financialDocs.length ?
                (financialDocs.map((item: any) => {
                  return (
                    <>
                      <TextField
                        sx={{
                          "& legend": { display: "none" },
                          "& fieldset": {
                            top: 0,
                            borderRadius: "10px",
                          },
                        }}
                        className="Mui-disabled"
                        type="text"
                        fullWidth
                        placeholder=""
                        minRows={4}
                        value={item?.documents}
                        InputProps={{
                          endAdornment: item?.error ?
                            <InputAdornment position="end"><img src={ContactError} width="22px" alt="Tick" /></InputAdornment> :
                            <InputAdornment position="end"><img src={ContactTick} width="22px" alt="Tick" /></InputAdornment>,
                        }}
                      />
                    </>
                  )
                })) : null}
            </Grid>
          </Grid>
        </Box>
      </form>
      <ApplyLoanSubFooter
        handleBackStep={(step) => props?.handleBackStep(step)}
        handleNextStep={(step) => btnRef.current.click()}
        nextStep={enumActiveBusinessDocPoint.SUBMITTED}
        backStep={enumActiveBusinessDocPoint.KEY_MANAGEMENT_PERSONS}
      />
    </>
  );
}

export default BusinessPlan;
