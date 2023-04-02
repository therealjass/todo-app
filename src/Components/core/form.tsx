import { useEffect, useRef, useState } from "react";

import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import { Grid, Modal, TextField, Typography } from "@mui/material";
import CustomStyledButton from "../common/custom-styled-button";

export const style = {
  containertwo: {
    backgroundColor: "#fff",
    // boxShadow: "0 1px 5px 0 rgba(0, 0, 0, 0.16)",
    borderRadius: "8px",
    padding: "21px 40px",
  },
  buttonbtn: {
    height: "48px",
    borderRadius: "8px",
    // boxShadow: "0 4px 8px 0 rgba(35, 219, 123, 0.4)",
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
}

type IProps = {
  openModal: boolean,
  closeModal: (type: string, data: any) => void
  type: string;
  data: any
}

const AddEditSchema = yup.object({
  task_name: yup.string().required("please enter task name!"),
  description: yup.string().required("please enter description!"),
}).required();


const MyForm = (props: IProps) => {
  const btnRef: any = useRef(null);

  const { register, setValue, handleSubmit, control, formState: { errors }, } = useForm<any>({
    resolver: yupResolver(AddEditSchema)
  });

  useEffect(() => {
    const { data } = props;
    if (data && Object.keys(data).length) {
      setValue("id", data?.id)
      setValue("status", data?.status)
      setValue("task_name", data?.task_name);
      setValue("description", data?.description);
    }

    return () => {
      setValue("task_name", "");
      setValue("description", "");
    }

  }, [props?.data])

  const onSubmit = (data: any) => {
    console.log(data, "dats")
    props?.closeModal("save", { ...data })
    // setValue("person_name", "");
    // setValue("person_type", "");
    // setValue("person_email", "");
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
              {props?.type === "edit" ? "Edit" : "Add"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form >
              <button type="submit" ref={btnRef} style={{ display: "none" }} onClick={handleSubmit(onSubmit)} />
              <Grid item width={1}>
                <Typography className="spanSignup" component="span" sx={{ marginBottom: "0px" }}>
                  Task Name
                </Typography>
                <Controller
                  name="task_name"
                  control={control}
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
                  errors?.task_name?.message ? <Typography style={{ color: "red" }} > {errors.task_name?.message} </Typography> : null
                }
              </Grid>
              <Grid item width={1}>
                <Typography className="spanSignup" component="span">
                  Description
                </Typography>
                <Controller
                  name="description"
                  control={control}
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
                  errors?.description?.message ? <Typography style={{ color: "red" }} > {errors.description?.message} </Typography> : null
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

export default MyForm;