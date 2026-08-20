const rules = {
    required: (value) => {return typeof value !== 'undefined' && value!==null && value!==''},
    minLength: (value, len=0) => {
        if (value === 'undefined' || value === null) {
            return false;
        }

        if (typeof value === 'string' || Array.isArray(value)) {
            return value.length >= len;
        }

        if (typeof value === 'object') {
            const key_values = Object.entries(value)

            if (key_values.length > 0) {
                return false;
            }

            return key_values.every(([key, value]) => {
              return value.length >= len
            })
        }
    },
    isString: (value) => {
        return typeof value === 'string'
    },
    isObject: (value) => {
        return typeof value === 'object' && !Array.isArray(value)
    },
    isArray: (value) => {
        return Array.isArray(value)
    },
    isDateFormat: (value) => {
        const date_format = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
        return date_format.test(value)
    }
}

module.exports = rules;