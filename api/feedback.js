const { randomUUID } = require("crypto");
const { logStructured } = require("./logger");

const ALLOWED_RATINGS = new Set(["up", "down"]);
const ALLOWED_REASON_CODES = new Set([
    "imported_tone",
    "wrong_treatment",
    "brand_mismatch",
    "too_literal",
    "other",
    "",
]);

module.exports = async (req, res) => {
    if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-CSRF-Token, X-Requested-With, Accept, Content-Type, Date, X-Request-Id"
        );
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const feedbackId = randomUUID();
    const started = Date.now();

    try {
        const body = typeof req.body === "object" && req.body ? req.body : {};
        const {
            requestId,
            rating,
            reasonCode = "",
            comment = "",
            brand,
            country,
            clientTimestamp,
        } = body;

        if (!rating || !ALLOWED_RATINGS.has(rating)) {
            logStructured({
                level: "warn",
                module: "feedback",
                function: "handler",
                message: "validation_failed",
                feedbackId,
                field: "rating",
            });
            return res.status(400).json({ error: "Invalid or missing rating" });
        }
        if (!brand || !country) {
            logStructured({
                level: "warn",
                module: "feedback",
                function: "handler",
                message: "validation_failed",
                feedbackId,
                field: "brand_country",
            });
            return res.status(400).json({ error: "Missing brand or country" });
        }
        if (reasonCode && !ALLOWED_REASON_CODES.has(reasonCode)) {
            return res.status(400).json({ error: "Invalid reasonCode" });
        }

        const commentTrim = String(comment).trim().slice(0, 2000);
        const logComment =
            process.env.FEEDBACK_LOG_FULL_COMMENT === "true" ? commentTrim : undefined;

        logStructured({
            level: "info",
            module: "feedback",
            function: "handler",
            message: "human_feedback_received",
            feedbackId,
            requestId: requestId || null,
            rating,
            reasonCode: reasonCode || null,
            commentLength: commentTrim.length,
            ...(logComment !== undefined && logComment.length > 0 ? { comment: logComment } : {}),
            brand,
            country,
            clientTimestamp: clientTimestamp || null,
            durationMs: Date.now() - started,
        });

        return res.status(200).json({ ok: true, feedbackId });
    } catch (error) {
        logStructured({
            level: "error",
            module: "feedback",
            function: "handler",
            message: error.message,
            stack: error.stack,
            feedbackId,
            durationMs: Date.now() - started,
        });
        return res.status(500).json({ error: "Feedback processing failed" });
    }
};
