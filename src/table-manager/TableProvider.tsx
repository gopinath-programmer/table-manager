/** @format */

import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { produce } from "immer";
import { data } from "./data";
import { Detail } from "./data";
import "./tablemanager.css";
import _ from "lodash";

type Select = "Detail" | "Log" | "Delete" | "";

interface Table {
  tableData: Detail[];
  selectedDetails: number[];
  tabOption: Select;
}

type Action =
  | { type: "ADD_ROW"; payload: Detail }
  | { type: "SET_SELECTED_DETAILS"; payload: number }
  | { type: "SET_TAB_OPTION"; payload: Select }
  | {type: "HANDLE_DELETE"}
  | {type: "DELETE_ROW" ; payload: number};

interface TableContextType {
  tableData: Detail[];
  tabOption: Select;
  selectedDetails: number[];
  addRow: (details: Detail) => void;
  setSelectedDetails: (id: number) => void;
  setTabOption: (value: Select) => void;
  deleteSelected: () => void;
  deleteRow: (id: number) => void;
}

const TableContext = createContext<TableContextType | null>(null);

const initialTable: Table = {
  tableData: data,
  selectedDetails: [],
  tabOption: "",
};

const tableReducer = produce((state: Table, action: Action) => {
  switch (action.type) {
    case "ADD_ROW":
      state.tableData = [...state.tableData, action.payload];
      break;

    case "SET_SELECTED_DETAILS":
      state.selectedDetails = _.includes(state.selectedDetails, action.payload)
        ? _.without(state.selectedDetails, action.payload)
        : [...state.selectedDetails, action.payload];
      break;

    case "SET_TAB_OPTION":
      if (state.tabOption === action.payload) {
        state.tabOption = "";
      } else {
        state.tabOption = action.payload;
      }
      if (state.tabOption === "Log") {
        _.filter(state.tableData, (details) => {
          if (
            _.includes(state.selectedDetails, details.id) &&
            _.size(state.selectedDetails) === 1
          ) {
            console.log(_.fromPairs(_.toPairs(details)));
          }
        });
      }
      break;

      case "HANDLE_DELETE": 
         _.remove(state.tableData , (details) => (_.includes(state.selectedDetails , details.id)));
         state.tabOption = '';
          break;

          case "DELETE_ROW":
            _.remove(state.tableData , (details) => details.id === action.payload);
            break;
    default:
      break;
  }
});

function TableManagerProvider({ children }: PropsWithChildren) {
  const [table, dispatch] = useReducer(tableReducer, initialTable);

  const addRow = (details: Detail) => {
    dispatch({ type: "ADD_ROW", payload: details });
  };

  const setSelectedDetails = (id: number) => {
    dispatch({ type: "SET_SELECTED_DETAILS", payload: id });
  };

  const setTabOption = (value: Select) => {
    dispatch({ type: "SET_TAB_OPTION", payload: value });
  };

  const deleteSelected = () => {
    dispatch({type: "HANDLE_DELETE"})
  }

  const deleteRow = (id: number) => {
    dispatch({type: "DELETE_ROW" , payload: id})
  }

  const value = {
    tableData: table.tableData,
    tabOption: table.tabOption,
    selectedDetails: table.selectedDetails,
    addRow,
    setSelectedDetails,
    setTabOption,
    deleteSelected,
    deleteRow
  };

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("The components should be enclosed by provider");
  }
  return context;
};

export default TableManagerProvider;
