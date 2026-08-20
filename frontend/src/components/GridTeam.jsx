'use client';
import React, {useEffect, useState, useMemo, useCallback, useRef} from "react";
import {AllCommunityModule} from "ag-grid-community";
import 'ag-grid-community/styles/ag-theme-quartz.css'
import {AgGridProvider, AgGridReact} from "ag-grid-react";
import {getAllTeams} from '../api'

const GridTeam = (refreshIndex = 0) => {
  //Ссылка на методы для api InfinityLoad таблицы
  const gridApi = useRef(null);

  const [rowData, setRowData] = useState([])

  const onGridReady = useCallback((params) => {
    const dataSource = {
      getRows: async (params) => {
        console.log(params)
        try {
          //Данные буфера
          const page = params.endRow - params.startRow
          //Получение часть данных
          const result = await getAllTeams(page, params.startRow);
          //Не знаем последнюю строку, поэтому -1, если данных меньшн чем буфер (cacheBlockSize={15}), то устанавливаем последнюю строку
          let lastRow = -1;
          if (result.data.length < page) {
            lastRow = params.startRow + result.data.length;
          }
          params.successCallback(result.data, lastRow);
        } catch (error) {
          console.log(error)
          params.failCallback();
        }
      }
    }
    params.api.setGridOption("datasource", dataSource);
  }, [])


  useEffect(() => {
    //Обновление кэша таблицы после внесения записи
    gridApi.current.api?.refreshInfiniteCache()
  }, [refreshIndex])

  const defaultColDef = useMemo(() => {
    return {
      flex: 1
    };
  }, []);


  const [colDefs, setColDefs] = useState([
    {field: "id", headerName: "Идентификатор"},
    {field: "name", headerName: "Имя", suppressAutoSize: true},
  ]);


  return (
    <AgGridProvider modules={[AllCommunityModule]}>
      <div className='ag-theme-quartz-dark' style={{width: "100%", height: "300px"}}>
        <AgGridReact defaultColDef={defaultColDef} rowData={rowData} columnDefs={colDefs}
                     rowModelType={"infinite"}  onGridReady={onGridReady} cacheBlockSize={15}
                     maxBlocksInCache={10} rowBuffer={0} ref={gridApi}
        />
      </div>
    </AgGridProvider>
  );
};

export default GridTeam;
