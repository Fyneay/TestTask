function sendSuccess(res, data) {
    const successMessage= {
        status: 200,
        data
    }

    return res.status(successMessage.status).json(successMessage)
}

function sendFailure(res, data, status) {
    const failureMessage = {
        status: status ?? 500,
        data
    }
    return res.status(failureMessage.status).json(failureMessage)
}

module.exports = {
    sendSuccess,
    sendFailure,
}