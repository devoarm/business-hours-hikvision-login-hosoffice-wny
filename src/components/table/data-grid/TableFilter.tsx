// ** React Imports
import { ChangeEvent, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import QuickSearchToolbar from "./QuickSearchToolbar";

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

type Props = {
  title?: string;
  item: any;
  columns: any;
  rowId?: string;
  onClickRow: Function;
};
const TableFilter = ({
  item,
  columns,
  title,
  rowId = "id",
  onClickRow,
}: Props) => {
  // ** States

  const [searchText, setSearchText] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 7,
  });

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = item.filter((row: any) => {
      return Object.keys(row).some((field) => {
        // @ts-ignore
        return searchRegex.test(row[field]);
      });
    });
    if (searchValue.length) {
      setFilteredData(filteredRows);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <div>
      <DataGrid
        autoHeight
        columns={columns}
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        slots={{ toolbar: QuickSearchToolbar }}
        onPaginationModelChange={setPaginationModel}
        rows={filteredData.length ? filteredData : item}
        getRowId={(row) => row?.[rowId]}
        onRowClick={(e: GridRowParams) => onClickRow(e)}
        slotProps={{
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
};

export default TableFilter;
