import React, { useEffect, useRef, useState } from "react";

import {
  Typography,
  Card,
  TextField,
  Box,
  Grid,
  InputLabel,
  FormControl,
  MenuItem,
  IconButton,
  Select,
  CardContent,
  Button,
  Menu,
} from "@mui/material";

import { Modal } from "@mui/material"

import { FormattedMessage } from "react-intl";
//import messages from "../../BRW-Intl/brw-intl";
import messages from "../Intl/brw-apply-loan-intl";
// import verticalMore from "../../../../Assets/Img/verticalMore.png";
//@ts-ignore
import verticalMore from "../../../../Assets/Img/verticalMore.png";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { KeyManagementPersonsTypes, res } from "../../../../Utils/GlobalTypes/globalTypes";
import { useDispatch, useSelector } from "react-redux";
import { enumActiveBusinessDocPoint, saveApplyLoanDataSuccessMsgs } from "../../../../Utils/GlobalConstants/globalConstant";
import { clearMessageOfSaveKMPAction, userBusinessLoanDataAction } from "../../../../Store/Borrower Flow/BRW-ApplyLoan/apply-loan-action";
import CustomStyledButton from "../../../../Components/custom-styled-button";
import ApplyLoanSubFooter from "../apply-loan-sub-footer";
import { handlePostDataFromApi } from "../../../../Utils/GlobalFunctions/globalFunctions";
import siteConfig from "../../../../Config/siteConfig";
import SimplySimpleLoader from "../../../../Components/simply-simple-loader";


type IProps = {
  handleNextStep: (step: number) => void;
  handleBackStep: (step: number) => void;
}

const initialKMPData: KeyManagementPersonsTypes = {
  person_email: "",
  person_name: "",
  person_type: ""
}

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
    width: "50%",
    marginBottom: "-1%",
  },
  buttonbtnEx: {
    height: "48px",
    borderRadius: "8px",
    // boxShadow: "0 4px 8px 0 rgba(35, 219, 123, 0.4)",
    // backgroundColor: "#355FE5",
    width: "50%",
    marginBottom: "-1%",
  },
  text: {
    color: "white",
  },
  textEx: {
    color: "black",
  },
  textLogin: {
    color: "#0e0e10",
    fontWeight: "600",
  },
  bannerContainer: {},
};


function KeyManagementPersons(props: IProps) {

  const dispatch = useDispatch();


  const wrapperRef = useRef(null);
  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setActiveKmpIndex(-1)
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);

  /** redux states declarations */
  const g_saveKeyManagementPersons = useSelector((state: any) => state?.applyLoanReducer?.saveKeyManagementPersons);
  const g_businessLoanHeadings = useSelector((state: any) => { return state?.applyLoanReducer?.businessLoanHeadings?.data });
  const g_userBusinessLoanData = useSelector((state: any) => state?.applyLoanReducer?.userBusinessLoanData);

  const [KMP, setKMP] = useState<KeyManagementPersonsTypes[]>([]);
  const [activeKmpIndex, setActiveKmpIndex] = useState<number>();
  const [activeKMPData, setActiveKMPData] = useState<KeyManagementPersonsTypes>({
    person_name: "",
    person_type: "",
    person_email: ""
  })
  const [editAddModal, SetEditAddModal] = useState<any>({
    edit: false,
    add: false
  })
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /** useEffects */
  useEffect(() => {
    dispatch(userBusinessLoanDataAction());
  }, [])

  useEffect(() => {
    if (!g_userBusinessLoanData) {
      return;
    }
    const { data } = g_userBusinessLoanData;
    let arrSavedKMPDetail: KeyManagementPersonsTypes[] = data?.key_management_persons;

    if (arrSavedKMPDetail && arrSavedKMPDetail.length) {
      setKMP(arrSavedKMPDetail);
    }
  }, [g_userBusinessLoanData])

  useEffect(() => {
    if (!g_saveKeyManagementPersons) {
      return;
    }

    let { data, error, message } = g_saveKeyManagementPersons;

    if (error && error.length) {
      //set error
    }

    if (message === saveApplyLoanDataSuccessMsgs.KMP) {
      dispatch(clearMessageOfSaveKMPAction());
      props?.handleNextStep(enumActiveBusinessDocPoint.BUSINESS_PLAN);
    }
  }, [g_saveKeyManagementPersons])


  const addNewKMPEntry = (data: KeyManagementPersonsTypes) => {
    let arrKMP: KeyManagementPersonsTypes[] = [...KMP];
    arrKMP.push(data);
    setKMP(arrKMP);
  }

  const handleMenuOnCLick = (e: any, item: KeyManagementPersonsTypes, index: number, type: string) => {
    if (type === "Edit") {
      //for edit functioonality
      SetEditAddModal((p: any) => ({
        ...p,
        edit: true
      }))
      setActiveKMPData(item);
      return;
    }

    //for delete functionality
    let arrKMP: KeyManagementPersonsTypes[] = [...KMP];
    arrKMP.splice(index, 1)
    setKMP(arrKMP);
  }

  const handleNext = async (step: number) => {
    let arrKMP: KeyManagementPersonsTypes[] = [...KMP]
    if (arrKMP && !arrKMP.length) {
      setError("Please Add Kmps")
      return;
    }
    setLoading(true);
    let res: any = []
    await arrKMP.forEach(async (item: KeyManagementPersonsTypes) => {
      let o = { apply_loan_heading_type: 3, data: { ...item } }
      let d = await handlePostDataFromApi(o, siteConfig.APPLYLOAN_SAVE_APPLY_LOAN_DATA)
        .then((r) => {
          res.push(r);
          if (arrKMP.length === res.length) {
            setLoading(false);
            props?.handleNextStep(step);
          }
        });
    })

  }

  return (
    <>
      <SimplySimpleLoader
        loadingStatus={loading}
      />
      <Grid container spacing={3} >
        {
          KMP &&
            KMP.length ?
            <>
              {KMP.map((item, index) => {
                return (
                  <Grid item xs={12} sm={6} lg={6} >
                    <Box component={Card}
                      variant="outlined"
                      sx={{
                        background: "#E4E4E4",
                        borderRadius: "12px",
                        position: "relative"
                      }}
                    >
                      <CardContent style={{ padding: "24px" }} >
                        <Grid container>
                          <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }} >
                            <Typography variant="h6" >{item?.person_name}</Typography>
                            <IconButton>
                              {/* <img src={verticalMore} alt="verticalMore" width={24} height={24} onClick={(e: any) => { setAnchorEl(e) }} /> */}
                              <img src={verticalMore} alt="verticalMore" width={24} height={24} onClick={(e: any) => {
                                // setOpenMenu(!openMenu);
                                setActiveKmpIndex(index)
                              }} />

                            </IconButton>
                            {
                              activeKmpIndex === index ?
                                <>
                                  <Grid container sx={{ backgroundColor: "white", height: "55%", width: "33%", padding: "5px", borderRadius: "10px", position: "absolute", right: "4%" }} ref={wrapperRef} padding={3} >
                                    <Grid item xs={12} >
                                      <Button component={"span"} variant={"outlined"} fullWidth sx={{ color: "black", fontSize: "14px", cursor: "pointer" }} onClick={(e: any) => handleMenuOnCLick(e, item, index, "Edit")}>
                                        Edit
                                      </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                      <Button component={"span"} fullWidth variant={"outlined"} sx={{ color: "black", fontSize: "14px", cursor: "pointer" }} onClick={(e: any) => handleMenuOnCLick(e, item, index, "Delete")} >
                                        Delete
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </>
                                : null
                            }
                          </Grid>
                          <Grid xs={12}>
                            <Typography sx={{ mb: 2 }} >{item?.person_type}</Typography>
                          </Grid>
                          <Grid xs={12}>
                            <Typography>{item?.person_email}</Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Box>
                  </Grid>
                )
              })}
            </> : null
        }

        <Grid item xs={12} sm={6} lg={6} >
          <Box component={Card}
            variant="outlined"
            sx={{
              background: "#E4E4E4",
              borderRadius: "12px",
            }}
          >
            <CardContent style={{ padding: "24px" }}  >
              <Grid container sx={{ display: "flex", justifyContent: "center" }}>
                <Grid item sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography component={"span"} sx={{ fontSize: "24px", cursor: "pointer" }} onClick={() => {
                    SetEditAddModal((p: any) => ({
                      ...p,
                      add: true
                    }))
                  }}>
                    +
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
      <KMPForm
        openModal={editAddModal.edit}
        closeModal={(type, data) => {
          SetEditAddModal((p: any) => ({
            ...p,
            edit: false
          }))
          if (type === "cancel") return;
        }}
        type={"edit"}
        data={activeKMPData}
      />
      <KMPForm
        openModal={editAddModal.add}
        closeModal={(type, data) => {
          SetEditAddModal((p: any) => ({
            ...p,
            add: false
          }))
          if (type === "cancel") return;

          addNewKMPEntry(data)
        }}
        type={"add"}
        data={initialKMPData}
      />
      <ApplyLoanSubFooter
        handleBackStep={(step) => props?.handleBackStep(step)}
        handleNextStep={(step) => { handleNext(step) }}
        nextStep={enumActiveBusinessDocPoint.BUSINESS_PLAN}
        backStep={enumActiveBusinessDocPoint.COMPANY_DOCUMENTS}
      />
    </>
  );
}

export default KeyManagementPersons;

type KMPFormTypes = {
  openModal: boolean,
  closeModal: (type: string, data: KeyManagementPersonsTypes) => void
  type: string;
  data: KeyManagementPersonsTypes
}

const AddEditSchema = yup.object({
  person_name: yup.string().required("please enter person name!"),
  person_email: yup.string().email().required("Enter valid email address"),
  person_type: yup.string().required("please enter person type!"),
}).required();

const KMPForm = (props: KMPFormTypes) => {
  const btnRef: any = useRef(null);
  const [action, setAction] = useState<number>(0)

  const { register, setValue, handleSubmit, control, formState: { errors }, } = useForm<any>({
    resolver: yupResolver(AddEditSchema)
  });

  useEffect(() => {
    const { data } = props;
    if (data && Object.keys(data).length) {
      setValue("person_name", data?.person_name);
      setValue("person_type", data?.person_type);
      setValue("person_email", data?.person_email);
    }

    return () => {
      console.log("kmp form unmounted")
      setValue("person_name", "");
      setValue("person_type", "");
      setValue("person_email", "");
    }

  }, [props?.data])

  const onSubmit = (data: any) => {
    console.log(data, "dats")
    props?.closeModal("save", { ...data })
    setValue("person_name", "");
    setValue("person_type", "");
    setValue("person_email", "");
  }

  return (
    <>
      <Modal
        open={props?.openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}
      >
        <Grid container direction="row" sx={{ width: "50%", height: "70%", backgroundColor: "white", borderRadius: "10px" }} padding={3}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography component={"span"} sx={{ fontSize: "20px", fontWeight: "bold" }}>
              {props?.type === "edit" ? "Edit" : "Add"} Key Management Person
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form >
              <button type="submit" ref={btnRef} style={{ display: "none" }} onClick={handleSubmit(onSubmit)} />
              <Grid item width={1}>
                <Typography className="spanSignup" component="span" sx={{ marginBottom: "0px" }}>
                  Person Name
                </Typography>
                <Controller
                  name="person_name"
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field }) =>
                    <TextField
                      {...field}
                      required
                      id="outlined-required"
                      sx={{
                        fontSize: "16px",
                        color: "rgba(0, 0, 0, 0.6)",
                        boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.12)",
                        width: '100%',
                        maxWidth: '45rem',
                        margin: "2px 10px 10px 0",
                      }}
                    />
                  } />
                {
                  //@ts-ignore
                  errors?.person_name?.message ? <Typography style={{ color: "red" }} > {errors.person_name?.message} </Typography> : null
                }
              </Grid>
              <Grid item width={1}>
                <Typography className="spanSignup" component="span">
                  Person Type
                </Typography>
                <Controller
                  name="person_type"
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field }) =>
                    <TextField
                      {...field}
                      id="outlined-required"
                      required
                      sx={{
                        fontSize: "16px",
                        color: "rgba(0, 0, 0, 0.6)",
                        boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.12)",
                        width: 1,
                        maxWidth: '45rem',
                        margin: "2px 10px 10px 0",
                      }}
                    />
                  } />
                {
                  //@ts-ignore
                  errors?.person_type?.message ? <Typography style={{ color: "red" }} > {errors.person_type?.message} </Typography> : null
                }

              </Grid>
              <Grid item width={1}>
                <Typography className="spanSignup" component="span">
                  Person Email
                </Typography>
                <Controller
                  name="person_email"
                  control={control}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field }) =>
                    <TextField
                      {...field}
                      sx={{
                        fontSize: "16px",
                        color: "rgba(0, 0, 0, 0.6)",
                        boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.12)",
                        width: 1,
                        maxWidth: '45rem',
                        margin: "2px 10px 10px 0",
                      }}
                    />
                  } />
                {
                  //@ts-ignore
                  errors?.person_email?.message ? <Typography style={{ color: "red" }} > {errors.person_email?.message} </Typography> : null
                }
              </Grid>
            </form>
          </Grid>
          <Grid item container xs={12} padding={2} spacing={2}>
            <Grid item xs={6}>
              <CustomStyledButton
                keyValue={6}
                type="submit"
                variant="outlined"
                style={style.buttonbtnEx}
                sx={{
                  width: "100% !important"
                }}
                className="buttonCenterStyle"
                disabled={false}
                fullWidth={false}
                textClassName={"largeButtonText"}
                textComponent={"span"}
                textStyle={style.textEx}
                textContent={"cancel"}
                onClick={() => {
                  //@ts-ignore
                  props?.closeModal("cancel", {});
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomStyledButton
                keyValue={8}
                type="submit"
                variant="contained"
                style={style.buttonbtn}
                sx={{
                  width: "100% !important"
                }}
                className="buttonCenterStyle"
                disabled={false}
                fullWidth={false}
                textClassName={"largeButtonText"}
                textComponent={"span"}
                textStyle={style.text}
                textContent={"save"}
                onClick={() => {
                  btnRef.current.click();
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  )
}
