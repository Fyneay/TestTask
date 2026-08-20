import React, {useState} from 'react'
import {CCard, CCardBody, CCardHeader, CCol, CRow} from '@coreui/react'
import {CreateTeamsForm} from 'src/components'
import {GridTeam} from 'src/components'

const Teams = () => {
  const [teamsRefresh, setTeamsRefresh] = useState(0);
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Создание команды</strong>
          </CCardHeader>
          <CCardBody>
            <CreateTeamsForm onSave={() => {
              setTeamsRefresh(n => n + 1)}}/>
          </CCardBody>
        </CCard>
        <CCol xs={12}>
          <CCardBody>
            <GridTeam refreshIndex={teamsRefresh}/>
          </CCardBody>
        </CCol>
      </CCol>
    </CRow>
  )
}

export default Teams
