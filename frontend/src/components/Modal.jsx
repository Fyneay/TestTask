import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'

import React from 'react'

export const Modal = ({children, title, visible, onClose}) => {
  return (
    <>
      <CModal className="modal-lg" visible={visible} onClose={onClose}>
        <CModalHeader>
          <CModalTitle>{title}</CModalTitle>
        </CModalHeader>
        <CModalBody>{children}</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Закрыть
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
