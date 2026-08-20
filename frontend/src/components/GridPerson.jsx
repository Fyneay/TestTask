'use client';
import React, {useEffect, useMemo, useState} from "react";
import {AllCommunityModule} from "ag-grid-community";
import 'ag-grid-community/styles/ag-theme-quartz.css'
import {AgGridProvider, AgGridReact} from "ag-grid-react";
import {getAllPersons} from '../api'

const GridPerson = ({onHandlerSelectionChanged, refreshIndex=0}) => {

  const [rowData, setRowData] = useState([])
  // const [teams, setTeams] = useState([])

  useEffect(() => {
    getAllPersons()
      .then(rowData => setRowData(rowData.data));
  }, [refreshIndex])

  const defaultColDef = useMemo(() => {
    return {
      flex: 1
    };
  }, []);

  const rowSelection = {
    mode: "singleRow",
    headerCheckbox: false,
  };

  const [colDefs, setColDefs] = useState([
    {field: "id", headerName: "Идентификатор"},
    {field: "lastname", headerName: "Фамилия"},
    {field: "firstname", headerName: "Имя"},
    {field: "middlename", headerName: "Отчество"},
    {field: "birthday", headerName: "День рождения"},
    {field: "team_persons.name", headerName: "Команда"},
  ]);

  return (
    <AgGridProvider modules={[AllCommunityModule]}>
      <div className='ag-theme-quartz-dark' style={{width: "100%", height: "300px"}}>
        <AgGridReact defaultColDef={defaultColDef}
                     onSelectionChanged={onHandlerSelectionChanged}
                     rowSelection={rowSelection} rowData={rowData} columnDefs={colDefs}/>
      </div>
    </AgGridProvider>
  );
};

export default GridPerson;
