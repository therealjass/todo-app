import { useState } from "react";

import DataTable from "./table";

import MyForm, { style } from "./form";
import { Box, Grid, Typography } from "@mui/material";
import CustomStyledButton from "../common/custom-styled-button";
import { useDispatch } from "react-redux";
import { handleDialogAction } from "../../Store/todo/todo-action";
import SuccessFailureDialog from "../common/success-failure-dialog";

const enumActiveTab = {
  ALL: 1,
  COMPLETED: 2,
  PENDING: 3
}

const ToDoMain = () => {

  const dispatch = useDispatch();

  const [variableData, setVariableData] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [editableData, setEditableData] = useState<any>({});

  const [activeTab, setActiveTab] = useState<number>(enumActiveTab.ALL)

  const [editAddModal, SetEditAddModal] = useState<any>({
    edit: false,
    add: false
  })

  const addEntry = (data: any) => {
    let arr: any[] = [...variableData];
    data["id"] = variableData.length + 1;
    data["status"] = "pending";
    arr.push(data);
    setVariableData(arr);
    dispatch(handleDialogAction({
      open: true,
      title: "Add",
      content: "Data has been successfully saved.",
    }));
  }

  const deleteEntry = () => {
    let selectedIDs = selectedRows.map(item => item?.id);
    let arrVD = variableData.map((item) => { if (!selectedIDs.includes(item?.id)) return item; }).filter(item => item !== undefined)
    setVariableData(arrVD);
    setSelectedRows([]);
    dispatch(handleDialogAction({
      open: true,
      title: "Delete",
      content: "Data has been successfully deleted.",
    }));
  }

  const editEntry = (data: any) => {
    let arrVD: any[] = [...variableData]
    let index = arrVD.map((item, index) => {
      if (item?.id === data?.id) {
        return index
      }
    }).filter(item => item !== undefined)[0];
    if (index === undefined) return;
    arrVD[index] = data;
    setVariableData(arrVD);
    dispatch(handleDialogAction({
      open: true,
      title: "Edit",
      content: "Data has been successfully updated.",
    }));
  }

  const getData = () => {
    if (activeTab === enumActiveTab.ALL) return variableData;
    if (activeTab === enumActiveTab.PENDING) return variableData.filter(item => item.status === "pending")
    if (activeTab === enumActiveTab.COMPLETED) return variableData.filter(item => item.status === "completed")
  }

  return (
    <>
      <SuccessFailureDialog />
      <Grid container sx={{ display: "flex", justifyContent: "center", }} margin={3}>
        <Grid item >
          <Typography variant="h3" sx={{ marginBottom: "5%" }}>
            TO-DO APPLICATION
          </Typography>
        </Grid>
        <Grid container item sx={{ display: "flex", flexDirection: "row", justifyContent: "center", }} marginTop={2} >
          <Grid item xs={12} sx={{ display: "flex", flexDirection: "row", justifyContent: "center", }} >
            <CustomStyledButton
              keyValue={12}
              variant="outlined"
              style={style.buttonbtnEx}
              sx={{
                width: "75% !important"
              }}
              className="buttonCenterStyle"
              disabled={false}
              fullWidth={false}
              textClassName={"largeButtonText"}
              textComponent={"span"}
              textStyle={style.textEx}
              textContent={"Add"}
              onClick={() => {
                SetEditAddModal((p: any) => ({
                  ...p,
                  add: true
                }))
              }}
            />
          </Grid>

          <Grid item xs={9} sx={{ display: "flex", flexDirection: "row", }} marginTop={5} marginBottom={2} >
            {
              variableData && variableData.length ?
                <>
                  <CustomStyledButton
                    keyValue={10}
                    variant={activeTab === enumActiveTab.ALL ? "contained" : "outlined"}
                    style={activeTab === enumActiveTab.ALL ? style.buttonbtn : style.buttonbtnEx}
                    textStyle={activeTab === enumActiveTab.ALL ? style.text : style.textEx}
                    sx={{
                      width: "100% !important",
                      marginRight: 1
                    }}
                    className="buttonCenterStyle"
                    disabled={false}
                    fullWidth={false}
                    textClassName={"largeButtonText"}
                    textComponent={"span"}
                    textContent={"All To-Do's"}
                    onClick={() => {
                      setActiveTab(enumActiveTab.ALL)
                    }}
                  />
                  <CustomStyledButton
                    keyValue={11}
                    variant={activeTab === enumActiveTab.COMPLETED ? "contained" : "outlined"}
                    style={activeTab === enumActiveTab.COMPLETED ? style.buttonbtn : style.buttonbtnEx}
                    textStyle={activeTab === enumActiveTab.COMPLETED ? style.text : style.textEx}
                    sx={{
                      width: "100% !important",
                      marginRight: 1
                    }}
                    className="buttonCenterStyle"
                    disabled={false}
                    fullWidth={false}
                    textClassName={"largeButtonText"}
                    textComponent={"span"}
                    textContent={"Completed To-Do's"}
                    onClick={() => {
                      setActiveTab(enumActiveTab.COMPLETED)
                    }}
                  />
                  <CustomStyledButton
                    keyValue={12}
                    variant={activeTab === enumActiveTab.PENDING ? "contained" : "outlined"}
                    style={activeTab === enumActiveTab.PENDING ? style.buttonbtn : style.buttonbtnEx}
                    textStyle={activeTab === enumActiveTab.PENDING ? style.text : style.textEx}
                    sx={{
                      width: "100% !important"
                    }}
                    className="buttonCenterStyle"
                    disabled={false}
                    fullWidth={false}
                    textClassName={"largeButtonText"}
                    textComponent={"span"}
                    textContent={"Pending To-Do's"}
                    onClick={() => {
                      setActiveTab(enumActiveTab.PENDING)
                    }}
                  />
                </>
                :
                <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                  <Typography component={"span"} sx={{ fontSize: "14px", fontWeight: "bold", color: "grey" }}>
                    Please add some new To-do's!
                  </Typography>
                </Box>
            }
          </Grid>

          <Grid item xs={12} marginTop={3} sx={{ display: "flex", flexDirection: "row", justifyContent: "center", }} marginBottom={3}>
            {
              variableData && variableData.length ?
                <DataTable
                  //@ts-ignore
                  rows={getData()}
                  setSelectedRow={(data) => {
                    if (data && data.length) {
                      setSelectedRows(data);
                    } else {
                      setSelectedRows([]);
                    }
                  }
                  }
                  openEditModal={(data) => {
                    SetEditAddModal((p: any) => ({
                      ...p,
                      edit: true
                    }))

                    setEditableData(data);
                  }}
                />
                :
                null
            }
            {/* </Box> */}
          </Grid>
          {
            selectedRows && selectedRows.length ?
              <Grid item xs={9} sx={{ display: "flex", flexDirection: "row", }} margin={3} marginBottom={3}>
                {
                  activeTab === enumActiveTab.PENDING ?
                    <CustomStyledButton
                      keyValue={10}
                      variant="contained"
                      style={style.buttonbtn}
                      sx={{
                        width: "100% !important",
                        marginRight: 1
                      }}
                      className="buttonCenterStyle"
                      disabled={false}
                      fullWidth={false}
                      textClassName={"largeButtonText"}
                      textComponent={"span"}
                      textStyle={style.text}
                      textContent={selectedRows.length > 1 ? "Make them completed" : "Make it completed"}
                      onClick={() => {
                        let selectedIDs = selectedRows.map(item => item?.id);
                        let arrVD = variableData.map((item) => {
                          if (selectedIDs.includes(item?.id)) {
                            item.status = "completed";
                          }

                          return item;
                        })

                        setVariableData(arrVD);
                      }}
                    />
                    : null
                }
                <CustomStyledButton
                  keyValue={11}
                  variant="contained"
                  style={style.buttonbtn}
                  sx={{
                    width: "100% !important",
                    marginLeft: 1
                  }}
                  className="buttonCenterStyle"
                  disabled={false}
                  fullWidth={false}
                  textClassName={"largeButtonText"}
                  textComponent={"span"}
                  textStyle={style.text}
                  textContent={selectedRows.length > 1 ? "Delete Them" : "Delete it"}
                  onClick={() => {
                    deleteEntry()
                  }}
                />

              </Grid>
              : null
          }

        </Grid>

        <MyForm
          openModal={editAddModal.add}
          closeModal={(type, data) => {
            SetEditAddModal((p: any) => ({
              ...p,
              add: false
            }))
            if (type === "cancel") return;

            addEntry(data)
          }}
          type={"add"}
          data={{}}
        />
        <MyForm
          openModal={editAddModal.edit}
          closeModal={(type, data) => {
            SetEditAddModal((p: any) => ({
              ...p,
              edit: false
            }))
            if (type === "cancel") return;
            editEntry(data)
          }}
          type={"edit"}
          data={editableData}
        />

      </Grid>
    </>
  )
}

export default ToDoMain;
