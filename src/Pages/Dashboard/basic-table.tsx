import { useEffect, useState } from 'react';

import siteConfig from '../../Config/siteConfig';
// import { getDataWithoutToken } from '../../Config/api';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import SprintMoneyLoader from '../../Components/simply-simple-loader';
import { Grid, TableFooter, TablePagination, Typography } from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { getData } from '../../Config/api';

//@ts-ignore
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(id: number, file_name: string, assets: string, liability: string, revenue: string) {
  return { id, file_name, assets, liability, revenue };
}

const NoRecordFound = () => {
  return (
    <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
      <Typography component={"span"} sx={{ color: "grey", fontSize: "14px" }}>
        No Record Found!
      </Typography>
    </Grid>
  )
}

export default function BasicTable() {

  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(15);
  const [loaderStatus, setLoaderStatus] = useState<boolean>(false);
  const [columns, setColumns] = useState<string[]>(["Sno.", "Column 1", "Column 2", "Column 3", "Column 4"]);


  useEffect(() => {
    getExtractedData();
  }, [])

  const getExtractedData = () => {
    setLoaderStatus(true);
    getData(siteConfig.GET_EXTRACTED_DATA)
      .then(res => res.json())
      .then(data => {
        setLoaderStatus(false);
        if (!data?.data) return;
        // let columns = Object.keys(data?.data[0]);
        let myRows: any[] = [];
        data?.data.map((item: any) => {
          console.log(item);
          // myRows.push(createData(item.id, item.file_name, item.assets, item.liability, item.revenue))
          myRows.push(createData(item?.id, item?.column1, item?.column2, item?.column3, item?.column4))
        })
        console.log(columns, "columns")
        console.log(rows, "rows")
        // setColumns(columns);
        setRows(myRows);
      }).catch(err => {
        setLoaderStatus(false);
        console.log(err);
      })
  }
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                columns && columns.length ?
                  <>
                    {
                      columns.map((item: string) => {
                        return (
                          <StyledTableCell>{item}</StyledTableCell>
                        )
                      })
                    }
                  </> : null
              }
            </TableRow>
          </TableHead>
          <TableBody>
            <SprintMoneyLoader
              loadingStatus={loaderStatus}
            />
            {
              rows && rows.length ?
                <>
                  {
                    (rowsPerPage > 0
                      ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : rows).map((row) => (
                        // rows?.map((row) => (
                        <TableRow key={row?.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row"> {row?.id}</TableCell>
                          <TableCell component="th" scope="row"> {row?.file_name}</TableCell>
                          <TableCell align="left">{row?.assets}</TableCell>
                          <TableCell align="left">{row?.liability}</TableCell>
                          <TableCell align="left">{row?.revenue}</TableCell>
                        </TableRow>
                      ))}
                </> : <>
                  <NoRecordFound />
                </>
            }
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                // rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                rowsPerPageOptions={[15, 30, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
