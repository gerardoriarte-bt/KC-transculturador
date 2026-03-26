/**
 * Servidor local: estático en la raíz del repo + rutas /api/* (compatibles con handlers Vercel).
 * Uso: npm run dev
 * Requiere: OPENAI_API_KEY en .env o en el entorno (para transculturación).
 */
require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;

const MIME = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".json": "application/json; charset=utf-8",
    ".pdf": "application/pdf",
    ".woff2": "font/woff2",
};

const transculturate = require("./api/transculturate.js");
const feedback = require("./api/feedback.js");

/** Compatibilidad con handlers estilo Vercel: res.status(code).json() | .end() */
function wrapResponse(res) {
    return {
        setHeader(name, value) {
            res.setHeader(name, value);
        },
        status(code) {
            const statusCode = code;
            return {
                end(body) {
                    if (!res.headersSent) {
                        res.writeHead(statusCode);
                    }
                    res.end(body !== undefined ? body : "");
                },
                json(obj) {
                    if (!res.headersSent) {
                        res.setHeader("Content-Type", "application/json; charset=utf-8");
                        res.writeHead(statusCode);
                    }
                    res.end(JSON.stringify(obj));
                },
            };
        },
    };
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        req.on("data", (c) => chunks.push(c));
        req.on("end", () => {
            const raw = Buffer.concat(chunks).toString("utf8");
            if (!raw) {
                resolve({});
                return;
            }
            try {
                resolve(JSON.parse(raw));
            } catch (e) {
                reject(new Error("Invalid JSON body"));
            }
        });
        req.on("error", reject);
    });
}

async function handleApi(req, res) {
    const pathname = new URL(req.url, `http://127.0.0.1`).pathname;
    let handler;
    if (pathname === "/api/transculturate") handler = transculturate;
    else if (pathname === "/api/feedback") handler = feedback;
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Not found" }));
        return;
    }

    const resWrapped = wrapResponse(res);
    try {
        if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
            req.body = await readBody(req);
        }
        await handler(req, resWrapped);
    } catch (e) {
        if (!res.headersSent) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: e.message }));
        }
    }
}

function serveStatic(req, res) {
    const u = new URL(req.url, `http://127.0.0.1`);
    let rel = u.pathname === "/" ? "index.html" : u.pathname;
    rel = path.normalize(rel).replace(/^(\.\.(\/|\\|$))+/, "");
    const filePath = path.join(ROOT, rel);

    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    fs.stat(filePath, (err, st) => {
        if (err || !st.isFile()) {
            res.writeHead(404);
            res.end("Not found");
            return;
        }
        const ext = path.extname(filePath).toLowerCase();
        const type = MIME[ext] || "application/octet-stream";
        res.writeHead(200, { "Content-Type": type });
        fs.createReadStream(filePath).pipe(res);
    });
}

const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, `http://127.0.0.1`).pathname;
    if (pathname.startsWith("/api/")) {
        handleApi(req, res);
        return;
    }
    serveStatic(req, res);
});

server.listen(PORT, () => {
    console.log(JSON.stringify({
        level: "info",
        module: "local-dev-server",
        function: "listen",
        message: "server_ready",
        url: `http://127.0.0.1:${PORT}/`,
        timestamp: new Date().toISOString(),
    }));
});
