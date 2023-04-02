import { useEffect, useState } from "react";

import NavBar from "../common/navbar";
import DataTable from "./table";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import MyForm, { style } from "./form";
import CustomStyledButton from "../common/custom-styled-button";

const rows = [
  { id: 1, task_name: 'Snow', status: "pending" },
  { id: 2, task_name: 'fire', status: "pending" },
];

const enumActiveTab = {
  ALL: 1,
  COMPLETED: 2,
  PENDING: 3
}

const ToDoMain = () => {

  const [variableData, setVariableData] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<number>(enumActiveTab.ALL)

  const [editAddModal, SetEditAddModal] = useState<any>({
    edit: false,
    add: false
  })

  useEffect(() => {
    console.log(selectedRows, "selectedRows mmmmm useEffect")
  }, [selectedRows])


  const addEntry = (data: any) => {
    let arr: any[] = [...variableData];
    data["id"] = variableData.length + 1;
    data["status"] = "pending";
    arr.push(data);
    setVariableData(arr);
  }

  const deleteEntry = () => {
    let selectedIDs = selectedRows.map(item => item?.id);
    let arrVD = variableData.map((item) => { if (!selectedIDs.includes(item?.id)) return item; }).filter(item => item !== undefined)
    setVariableData(arrVD);
    setSelectedRows([]);
  }

  const getData = () => {
    if (activeTab === enumActiveTab.ALL) return variableData;
    if (activeTab === enumActiveTab.PENDING) return variableData.filter(item => item.status === "pending")
    if (activeTab === enumActiveTab.COMPLETED) return variableData.filter(item => item.status === "completed")
  }

  return (
    <Grid container sx={{ display: "flex", justifyContent: "center", }} margin={3}>
      <Grid item >
        <Typography variant="h3" sx={{ marginBottom: "5%" }}>
          To Do App
        </Typography>
      </Grid>
      <Grid container item sx={{ display: "flex", flexDirection: "row", justifyContent: "center", }} >
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
        <Grid item xs={9} sx={{ display: "flex", flexDirection: "row", }} margin={3} >
          <CustomStyledButton
            keyValue={10}
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
            textContent={"All To-Do's"}
            onClick={() => {
              setActiveTab(enumActiveTab.ALL)
            }}
          />

          <CustomStyledButton
            keyValue={11}
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
            textContent={"Completed To-Do's"}
            onClick={() => {
              setActiveTab(enumActiveTab.COMPLETED)
            }}
          />

          <CustomStyledButton
            keyValue={12}
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
            textContent={"Pending To-Do's"}
            onClick={() => {
              setActiveTab(enumActiveTab.PENDING)
            }}
          />
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
              />
              :
              null
          }
          {/* </Box> */}
        </Grid>
        {
          selectedRows && selectedRows.length ?
            <Grid item xs={9} sx={{ display: "flex", flexDirection: "row", }} margin={3} >
              {
                activeTab === enumActiveTab.PENDING ?
                  <CustomStyledButton
                    keyValue={10}
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
                    textContent={selectedRows.length > 1 ? "Make them completed" : "Make it completed"}
                    onClick={() => {
                      let ar = [...variableData];
                      ar && ar.length ? ar.map((item: any) => { { item.status = "completed"; } }) : ar = [];
                      setVariableData(ar);
                    }}
                  />
                  : null
              }
              <CustomStyledButton
                keyValue={11}
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
                textContent={selectedRows.length > 1 ? "Delete Them" : "Delete it"}
                onClick={() => {
                  deleteEntry()
                  // setActiveTab(enumActiveTab.COMPLETED)
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
        }}
        type={"edit"}
        data={variableData}
      />

    </Grid>
  )
}

export default ToDoMain;
