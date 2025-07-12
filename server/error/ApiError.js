class ApiError extends Error {
    constructor(status, message, fields = null) {
        super();
        this.status = status;
        this.message = message;
        this.fields = fields;
    }

    static badRequest(message, fields = null) {
        return new ApiError(400, message, fields);
    }

    static forbidden(message) {
        return new ApiError(403, message);
    }

    static notFound(message) {
        return new ApiError(404, message);
    }

    static internal(message) {
        return new ApiError(500, message);
    }

}

module.exports = ApiError;