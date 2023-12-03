import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardHeader } from "@mui/material";
import {
  DataGrid,
  GridCallbackDetails,
  GridColumns,
  GridRenderCellParams,
  GridRowParams,
  MuiEvent,
} from "@mui/x-data-grid";

// import { toast } from 'react-hot-toast'
import Swal from "sweetalert2";
import moment from "moment";
import { useRouter } from "next/router";
import QuickSearchToolbar from "./QuickSearchToolbar";

type Props = {
  itemsProp: any[];
  fetchData?: Function;
  columns: GridColumns;
  limitSize?: number;
  onClickRow?: Function;
  rowId?: string;
  initialState?: any;
};

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

function TableFilter({
  itemsProp,
  fetchData,
  columns,
  limitSize,
  onClickRow,
  rowId = "id",
  initialState,
}: Props) {
  const [searchText, setSearchText] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(limitSize || 10);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [items, setitems] = useState<any[]>(itemsProp);
  const router = useRouter();
  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = items.filter((row: any) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field]);
      });
    });
    if (searchValue.length) {
      setFilteredData(filteredRows);
    } else {
      setFilteredData([]);
    }
  };

  const handleOnCellClick = (params: GridRowParams) => {
    console.log(params);
  };
  useEffect(() => {
    setitems(itemsProp);
    // setPageSize(itemsProp.length)
  }, [itemsProp]);

  return (
    <div>
      <DataGrid
        autoHeight
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[10, 25, 50, 100]}
        components={{ Toolbar: QuickSearchToolbar }}
        onRowClick={(params: GridRowParams) => {
          onClickRow ? onClickRow(params) : null;
        }}
        rows={filteredData.length ? filteredData : items}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowId={(row: any) => row?.[`${rowId}`]}
        componentsProps={{
          baseButton: {
            variant: "outlined",
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(""),
            onChange: (event: ChangeEvent<HTMLInputElement>) =>
              handleSearch(event.target.value),
          },
        }}
      />
    </div>
  );
}

export default TableFilter;
