const validator = require('../services/validation/validator')
const {sendFailure} = require('../services/httpSender')

function validate(schema) {
    //Фабрика middleware
    return function (req, res, next) {
        let errors = {}
        for (const [key, value] of Object.entries(schema)) {
            for (const attribute in value) {
                let result = false;
                if (typeof value[attribute].value === 'boolean' && value[attribute].value) {
                    result = validator[attribute](req.body[key])
                } else if (typeof value[attribute].value !== 'boolean') {
                    result = validator[attribute](req.body[key], value[attribute].value)
                } else {
                    result = true
                }
                if (!result) {
                    const error_key = `${key}_${attribute}`
                    errors[error_key] = value[attribute].errorMessage
                    //Прерываем чтобы не все ошибки по полю появились сразу
                    break
                }
            }
        }

        if (Object.keys(errors).length > 0) {
            return sendFailure(res, errors, 403)
        }

        return next()
    }
}

module.exports = validate;