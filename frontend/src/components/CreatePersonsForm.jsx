import React, {useEffect, useMemo, useState} from 'react'
import { CButton, CCol, CForm, CFormInput, CFormSelect } from '@coreui/react'
import {getAllTeams, createPerson} from "src/api";
import {InputDateFormat} from "src/components";


export const CreatePersonsForm = ({onSave}) => {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('')
  const [birthday, setBirthday] = useState('')
  //input поле
  const [team, setTeam] = useState('')

  //getAll поле
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      await createPerson({
        lastname,
        firstname,
        middlename,
        birthday,
        team_id: team,
      })

      onSave?.()
    } catch (e) {
        console.log(e)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect( () => {
    async function getTeams() {
      try {
        setLoading(true)
        const response = await getAllTeams(100)
        setTeams(response.data)
        setTeam(response.data[0]?.id || '' )
      } catch (error) {
        console.log(error)
      }
      finally {
        setLoading(false)
      }
    }
    getTeams()
  }, []);

  const options= useMemo(()=> {
    return teams.map(team=> ({
      label: team.name,
      value: team.id
    }))
  }, [teams])

  return (
    <CForm className="row g-3" onSubmit={handleCreate}>
      <CCol md={6}>
        <CFormInput type="text" name="lastname" id="lastname" onChange={(e) => {setLastname(e.target.value)}} label="Фамилия" placeholder="Иванов"/>
      </CCol>
      <CCol md={6}>
        <CFormInput type="text" name="firstname" id="firstname" onChange={(e) => {setFirstname(e.target.value)}} label="Имя" placeholder="Иван"/>
      </CCol>
      <CCol xs={6}>
        <CFormInput type="text" name="middlename" id="middlename" onChange={(e) => {setMiddlename(e.target.value)}} label="Отчество" placeholder="Иванович" />
      </CCol>
      <CCol xs={6}>
        <InputDateFormat type="text" name="birtday" id="birtday" onChange={(e) => {setBirthday(e.target.value)}} label="День рождения" placeholder="1990-12-12" />
      </CCol>
      <CCol md={4}>
        <CFormSelect id="team_id" name="team_id" label="Команда" value={team} onChange={(e) => {setTeam(e.target.value)}} options={options}/>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit" >
          Сохранить
        </CButton>
      </CCol>
    </CForm>
  )
}
