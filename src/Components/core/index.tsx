import { Grid, Typography } from "@mui/material";
import NavBar from "../common/navbar";
import DataTable from "./table";

const ToDoMain = () => {
  return (
    <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
      <Grid item >
        <Typography variant="h3">
          To Do App
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <DataTable />
      </Grid>
    </Grid>

  )
}

export default ToDoMain;