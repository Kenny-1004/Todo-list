const { StatusCodes, getReasonPhrase } = require('http-status-codes');

async function reponseFormatter(req, res, next) {
    const originalJson = res.json.bind(res);

    res.json = (value) => {
        const safeValue = value ?? {}
        return originalJson({
            status: res.statusCode >= 200 && res.statusCode < 300 ? "Success" : "Error",
            statusCode: res.statusCode,
            message: safeValue.message ?? getReasonPhrase(res.statusCode),
            error: safeValue.error ?? "None",
            errMessage: safeValue.errMessage ?? "None",
            defaultValue: value ?? "None",
            data: safeValue.data ?? "None"
        })
    }
    next()
}

module.exports = reponseFormatter