import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useRef,
} from "react";

import Skeleton from '@mui/material/Skeleton';
import GetData from "../API/GetData";
import moment from "moment";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry, setRowData } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { NavLink } from "react-router-dom";
import "ag-grid-enterprise";
import DatePicker from "./DatePicker";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  FiltersToolPanelModule,
]);

export default function Table() {
  const initialload = function () {
    var initdata = []
    for (let i = 0; i <= 15; i++) {
      initdata.push({
        "recordid": "empty",
        "Id": "empty",
        "Notification": "empty",
        "Dissemination": "empty",
        "ratingTypeId": "empty",
        "Entity": "empty",
        "newhistory": "empty",
        "shl": "empty",
        "Industry": "empty",
        "title": "empty",
        "sr": "empty",
        "RatingAction": "empty",
        "Outlook": "empty",
        "RatingST": "empty",
        "RatingLT": "empty",
        "RatingScale": "empty",
        "analyst": "empty",
        "ratingUpdateType": "empty",
        "pacraAnalyst": "empty",
        "user_id2": "empty",
        "lead_rc_id": "empty",
        "leadRcName": "empty",
        "managerName": "empty",
        "user_id3": "empty",
        "user_id1": "empty",
        "rw": "empty",
        "cf": "empty",
        "sNo": "empty",
        "pr": "empty"
      })
    }
    return initdata;
  }
  const gridRef = useRef();
  const [rowData, setrowData] = useState(initialload());
  const [gridApi, setGridApi] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");



  function fullDate(params) {
    if (params.value === "empty") {
      return <Skeleton variant="rectangular" width={120} height={18} style={{ marginTop: '3px' }} />
    }
    else {
      if (params.value == null) {
        return "-"
      }
      else {

        const date = new Date(params.value);
        const yyyy = date.getFullYear();
        const yy = yyyy.toString();
        const y = yy.slice(2, 4);
        let mm = date.toLocaleString("default", { month: "short" });
        let dd = date.getDate();
        if (dd < 10) dd = "0" + dd;
        return dd + "-" + mm + "-" + y;
      }
    }
  }
  const cellrander = (params) => {
    if (params.value === "empty") {
      return <Skeleton variant="rectangular" width='auto' height={18} style={{ marginTop: '3px' }} />
    }
    else {
      return params.value
    }
  }
  const [columnDefs, setColumnData] = useState([
    {
      headerName: "S.No",
      maxWidth: 75,
      field: "sNo",
      sortable: true,
      filter: "agSetColumnFilter",
      menuTabs: false,
      cellRenderer: cellrander,

    },
    {
      headerName: "Opinion",
      minWidth: 300,
      field: "Entity",
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      headerName: "Sector",
      field: "Industry",
      minWidth: 150,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },
    {
      headerName: "Rating Type",
      field: "RatingScale",
      minWidth: 85,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },
    {
      headerName: "Team",
      field: "managerName",
      minWidth: 100,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      headerName: "Analyst",
      field: "pacraAnalyst",
      minWidth: 90,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      headerName: "Action",
      field: "RatingAction",
      minWidth: 90,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },
    {
      headerName: "R|LT",
      field: "RatingLT",
      minWidth: 90,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },
    {
      headerName: "R|ST",
      field: "RatingST",
      minWidth: 80,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      headerName: "RW",
      field: "rw",
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      headerName: "CF",
      field: "cf",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },
    {
      field: "Outlook",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "Notification",
      hide: true,
      sortable: true,
      filter: 'agDateColumnFilter',
      excelMode: "windows",
      cellRenderer: fullDate,
      debounceMs: "DateFilter",
      filterParams: {
        filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
        inRangeInclusive: true,
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = moment(cellValue).format("DD/MM/YYYY");
          var dateParts = dateAsString.split("/");
          var cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );

          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }

          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }

          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        },
        buttons: ["clear", "reset", "apply"],
      },
      cellRenderer: cellrander
    },

    {
      field: "Dissemination",
      hide: true,
      sortable: true,
      filter: 'agDateColumnFilter',
      excelMode: "windows",
      debounceMs: "DateFilter",
      filterParams: {
        filterOptions: ["equals", "lessThan", "greaterThan", "inRange"],
        inRangeInclusive: true,
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = moment(cellValue).format("DD/MM/YYYY");
          var dateParts = dateAsString.split("/");
          var cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );

          if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
            return 0;
          }

          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }

          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        },
        buttons: ["clear", "reset", "apply"],
      },
      cellRenderer: fullDate,
    },
    {
      field: "pr",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      quickFilterText: "string",
      cellRenderer: (params) => {
        if (params.value === "empty") {
          return <Skeleton variant="rectangular" width={120} height={18} style={{ marginTop: '3px' }} />
        }
        else {

          if (params.value) {
            return <i class="fa-solid fa-check"></i>;
          } else {
            return <i class="fa fa-times" aria-hidden="true"></i>;
          }
        }
      },
    },
    {
      headerName: "H",
      field: "Id",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      cellRenderer: function (params) {
        if (params.value === "empty") {
          return <Skeleton variant="rectangular" width={210} height={118} style={{ marginTop: '3px' }} />
        }
        else {

          return (
            <NavLink to={`/${params.value}`}>
              <i class="fas fa-link"></i>
            </NavLink>
          );
        }
      },
      excelMode: "windows",
    },
    {
      headerName: "SP",
      field: "shl",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      cellRenderer: (params) => {
        if (params.value === "empty") {
          return <Skeleton variant="rectangular" width={210} height={118} style={{ marginTop: '3px' }} />
        }
        else {

          if (params.value) {
            return <i class="fa-solid fa-check"></i>;
          } else {
            return <i class="fa fa-times" aria-hidden="true"></i>;
          }
        }
      },
      excelMode: "windows",
    },
    {
      field: "recordid",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      filterParams: { buttons: ["reset"] },
      cellRenderer: cellrander
    },

    {
      field: "ratingTypeId",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "title",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "sr",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "analyst",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "ratingUpdateType",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "user_id2",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "lead_rc_id",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "leadRcName",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "user_id3",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },

    {
      field: "user_id1",
      hide: true,
      sortable: true,
      filter: "agSetColumnFilter",
      excelMode: "windows",
      cellRenderer: cellrander
    },
  ]);


  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      // minWidth: 100,
      resizable: true,
      menuTabs: ['filterMenuTab', 'generalMenuTab'],
    };
  }, []);


  const onGridReady = useCallback((params) => {
    GetData.OutstandingData().then(res => {
      res = res.data.data;
      for (let i in res) {
        res[i].sNo = Number(i) + 1;
      }
      setrowData(res);
      params.api.setRowData(res);
    })

    setGridApi(params);
    params.api.setDatasource(rowData);
  }, []);

  const getFilterType = () => {
    if (startDate !== "" && endDate !== "") {
      return "inRange";
    }
    // else if(startDate !== ""){
    //   return ("Equal" || "greaterThan");
    // }
    // else if(endDate !==""){
    //   return "lessThan";
    // }
  };

  // useEffect(() => {
  //   if (gridApi) {
  //     var dateFilterComponent = gridApi.api.getFilterInstance("Notification");
  //     dateFilterComponent.setModel({
  //       type: getFilterType(),
  //       inRange: true,
  //       dateFrom: startDate,
  //       dateTo: endDate,
  //     });
  //     gridApi.api.onFilterChanged();
  //   }
  // }, [startDate, endDate]);


  const sideBar = useMemo(() => {
    return {
      toolPanels: [
        {
          id: 'filters',
          labelDefault: 'Filters',
          labelKey: 'filters',
          iconKey: 'filter',
          toolPanel: 'agFiltersToolPanel',
        },
        {
          id: 'columns',
          labelDefault: 'Columns',
          labelKey: 'columns',
          iconKey: 'columns',
          toolPanel: 'agColumnsToolPanel',
        }
      ],
    };
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  return (
    <div style={{ containerStyle }}>
      <DatePicker
        getFilterType={getFilterType}
        gridApi={gridApi}
        endDate={endDate}
        startDate={startDate}
      />
      From: <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      To: <input type="date" onChange={(e) => setEndDate(e.target.value)} />
      <input
        type="text"
        id="filter-text-box"
        placeholder="Filter..."
        onInput={onFilterTextBoxChanged}
      />
      <div
        className="ag-theme-alpine"
        style={{ height: "75vh", width: "100%", gridStyle }}
      >
        <button
          onClick={() => {
            if (gridApi) {
              for (let i in columnDefs) {
                console.log(columnDefs[i].field);
                gridApi.api.getFilterInstance(columnDefs[i].field).setModel(null);
                gridApi.api.onFilterChanged();
              }
            }
          }}
        > Reset
        </button>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={sideBar}
          overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'}
          overlayNoRowsTemplate={'<span class="ag-overlay-loading-center"><i className="fas fa-hourglass-half" style="color: blue; height: 0%"> Please wait while your data are loading </i> </span>'}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
}