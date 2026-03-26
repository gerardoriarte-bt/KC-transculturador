/**
 * Logging estructurado para funciones serverless (Vercel / Node).
 * Campos obligatorios: level, module, function (nombre lógico de la operación).
 */
function logStructured({ level, module, function: fn, message, ...meta }) {
    const payload = {
        level,
        module,
        function: fn,
        message: message || "",
        timestamp: new Date().toISOString(),
        ...meta,
    };
    const line = JSON.stringify(payload);
    if (level === "error") {
        console.error(line);
    } else {
        console.log(line);
    }
}

module.exports = { logStructured };
