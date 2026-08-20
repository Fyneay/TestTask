import React from 'react'
import {CFormInput} from '@coreui/react'
import {IMaskMixin} from 'react-imask'


const CFormInputWithMask = IMaskMixin(({inputRef, ...props}) => (
  <CFormInput {...props} ref={inputRef}/>
))

export const InputDateFormat = (props) => {
  return (
    <CFormInputWithMask
      mask={Date}
      pattern="Y-`m-`d"
      format={date => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (day < 10) day = "0" + day;
        if (month < 10) month = "0" + month;

        return [year, month, day].join('-');
      }
      }
      parse={str => {
        const yearMonthDay = str.split('-');
        return new Date(yearMonthDay[0], yearMonthDay[1] - 1, yearMonthDay[2]);
      }
      }
      min={new Date(1910, 0, 31)}
      max={new Date()}
      {...props}
    />
  )
}
