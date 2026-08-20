import React, { useState } from 'react'

import { CCard, CCardBody, CCardFooter, CButtonGroup, CButton, CCol, CRow } from '@coreui/react'

import {GridPerson} from 'src/components'
import {GridTeam} from 'src/components'
import { deletePerson } from 'src/api'
import { Modal } from 'src/components'
import { CreatePersonsForm } from 'src/components'
import { UpdatePersonsForm } from 'src/components'

const Dashboard = () => {
  const [selectedRow, setSelectedRow] = useState(false)
  const [visible, setVisible] = useState(false)
  const [modalType, setModalType] = useState(null)
  const [takedPersons, setTakedPersons] = useState({})
  const [personsRefresh, setPersonsRefresh] = useState(0);

  const takeData = (event) => {
    const rows = event.selectedNodes || []
    setSelectedRow(rows.length > 0)
    setTakedPersons({ ...rows[0]?.data })
  }

  // const checkButtons = (event) => {
  //   if(selectedRow && Object.keys(takedPersons).length > 0) {
  //     console.log('sig')
  //     setSelectedRow(true)
  //   }
  //   setSelectedRow(event.node.isSelected())
  // }

  const openModal = (type) => {
    setModalType(type)
    setVisible(true)
  }

  const handlerDestroyPerson = async (id) => {
    await deletePerson(id)
    setPersonsRefresh(n => n + 1)
    setSelectedRow(false)
  }

  return (
    <>
      <Modal
        title={modalType === 'create' ? 'Создание персонала' : 'Редактирование персонала'}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        {modalType === 'create' && <CreatePersonsForm onSave={() => {
          setVisible(false)
          setPersonsRefresh(n => n + 1)
          setSelectedRow(false)
        }} />}
        {modalType === 'edit' && <UpdatePersonsForm persons={takedPersons} onSave={() => {
          setVisible(false)
          setPersonsRefresh(n => n + 1)
          setSelectedRow(false)
        }} />
        }
      </Modal>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="personal_header" className="card-title mb-0">
                Персонал
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                {['Создать', 'Изменить', 'Удалить'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    disabled={value !== 'Создать' && !selectedRow}
                    active={value === 'Создать'}
                    onClick={() =>
                      value === 'Создать'
                        ? openModal('create')
                        : value === 'Изменить'
                          ? openModal('edit')
                          : handlerDestroyPerson(takedPersons.id)
                    }
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            <GridPerson onHandlerSelectionChanged={takeData} refreshIndex={personsRefresh}/>
          </CRow>
        </CCardFooter>
      </CCard>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="team_header" className="card-title mb-0">
                Команды
              </h4>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            <GridTeam />
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default Dashboard
