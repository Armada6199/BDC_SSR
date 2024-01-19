import React from "react";
import {  MenuItem, Select, Typography } from "@mui/material";
import '@styles/styles.css';
import { Box, Pagination } from "@mui/material";
const CustomTableFooter = (props) => {
  const {
    count,
    textLabels,
    rowsPerPage,
    page,
    changePage,
    changeRowsPerPage,
  } = props;
  const handleRowChange = (event) => {
    changeRowsPerPage(event.target.value);
  };

  const handlePageChange = (_, page) => {
   
    changePage(page>0?page-1:page);
  };
  return (
    <Box display={"flex"} mt={4} justifyContent={"space-between"}>
      <Box display={'flex'} gap={4} alignItems={'center'}>
        <Select sx={{width:"4rem",height:'35px',backgroundColor:"#fff"}} onChange={handleRowChange} value={rowsPerPage} label={rowsPerPage}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={25}>25</MenuItem>
        </Select>
        <Typography variant="subtitle2" color={'lightgray'} fontWeight={'bold'} >Loan Per Page</Typography>
      </Box>
      <Pagination
        variant="text"
        page={page+1}
        onChange={handlePageChange}
        count={Math.ceil(count/rowsPerPage)}
        color="secondary"
        showFirstButton showLastButton
      />
    </Box>
  );
};

export default CustomTableFooter;
