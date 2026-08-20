import React, {useEffect, useMemo, useState} from 'react'
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect } from '@coreui/react'
import {createTeam} from "src/api";



export const CreateTeamsForm = ({onSave}) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true)

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      await createTeam({
        name,
      })
      onSave?.()
    } catch (e) {
      console.log(e)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <CForm className="row g-3" onSubmit={handleCreate}>
      <CCol md={6}>
        <CFormInput type="text" name="name" id="name" onChange={(e)=> {setName(e.target.value)}} label="Имя" placeholder="Прислуга"/>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Сохранить
        </CButton>
      </CCol>
    </CForm>
  )
}
