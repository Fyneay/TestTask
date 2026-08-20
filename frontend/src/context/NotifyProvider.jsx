import React, {createContext, useState, useCallback, useContext} from "react";
import { CToast, CToastBody, CToastHeader, CToaster } from '@coreui/react'

//Создаем общий контекст
const NotifyContext = createContext(null);

//Функция для получения контекста со значением addToast
export function useNotify() {
  return useContext(NotifyContext);
}

export function NotifyProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = 'danger') => {
    setToasts((prev) => [...prev, {message, type }]);
  }, []);

  return (
    <NotifyContext.Provider value={{addToast}}>
      {children}
      <CToaster placement="top-end">
        {toasts.map(toast => (
          <CToast color={toast.type || 'danger'} autohide={true} visible={true}>
            <CToastHeader closeButton>
              <div className="fw-bold me-auto">Оповещение</div>
            </CToastHeader>
            <CToastBody>{toast.message}</CToastBody>
          </CToast>
        ))}
      </CToaster>
    </NotifyContext.Provider>

  )
}
