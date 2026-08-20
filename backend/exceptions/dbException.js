class ConnectDBException extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = 'ConnectDBException';
        this.statusCode = statusCode;
    }
}



module.exports = {
    ConnectDBException
}