import React, {useState} from 'react'
import {CCard, CCardBody, CCardHeader, CCol, CRow} from '@coreui/react'
import {CreatePersonsForm} from "src/components";
import {GridPerson} from 'src/components'

const Persons = () => {

  const [personsRefresh, setPersonsRefresh] = useState(0);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Создание пользователя</strong>
          </CCardHeader>
          <CCardBody>
            <CreatePersonsForm onSave={() => {
              setPersonsRefresh(n => n + 1)}} />
          </CCardBody>
        </CCard>
        <CCol xs={12}>
          <CCardBody>
            <GridPerson refreshIndex={personsRefresh}/>
          </CCardBody>
        </CCol>
      </CCol>
    </CRow>
  )
}

export default Persons
