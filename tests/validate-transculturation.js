/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const MATRIX_PATH = path.join(__dirname, "transculturation-matrix.json");
const API_URL = process.env.TRANSCULTURATION_API_URL || "http://localhost:3000/api/transculturate";
const API_TIMEOUT_MS = Number(process.env.TRANSCULTURATION_TIMEOUT_MS || 25000);

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function includesOneOf(normalizedText, terms) {
  return terms.some((term) => normalizedText.includes(normalize(term)));
}

function includesAny(normalizedText, terms) {
  return terms.filter((term) => normalizedText.includes(normalize(term)));
}

function validateTreatment(normalizedText, treatment) {
  if (treatment === "voseo") {
    const voseoSignals = [" vos ", " podés", " sentite", " elegi", " veni"];
    return voseoSignals.some((s) => normalizedText.includes(s.trim()) || normalizedText.includes(s));
  }
  if (treatment === "tuteo") {
    const voseoLeak = [" vos ", " podés", " sentite", " veni"];
    return !voseoLeak.some((s) => normalizedText.includes(s.trim()) || normalizedText.includes(s));
  }
  return true;
}

async function postWithTimeout(url, payload, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    const json = await response.json();
    return { ok: response.ok, status: response.status, data: json };
  } finally {
    clearTimeout(timeout);
  }
}

async function run() {
  const raw = fs.readFileSync(MATRIX_PATH, "utf8");
  const matrix = JSON.parse(raw);
  const results = [];

  console.log(`Running matrix: ${matrix.description}`);
  console.log(`Cases: ${matrix.cases.length}`);
  console.log(`API: ${API_URL}\n`);

  for (const testCase of matrix.cases) {
    const payload = {
      copy: testCase.input,
      brand: testCase.brand,
      country: testCase.country
    };

    try {
      const response = await postWithTimeout(API_URL, payload, API_TIMEOUT_MS);
      if (!response.ok) {
        results.push({
          id: testCase.id,
          status: "fail",
          reason: `API ${response.status}: ${response.data.error || response.data.details || "unknown"}`
        });
        continue;
      }

      const adaptation = response.data.adaptation || "";
      const normalized = ` ${normalize(adaptation)} `;

      const hasMustOneOf = includesOneOf(normalized, testCase.expect.must_include_one_of || []);
      const forbiddenHits = includesAny(normalized, testCase.expect.must_not_include || []);
      const treatmentOk = validateTreatment(normalized, testCase.expect.treatment);

      const pass = hasMustOneOf && forbiddenHits.length === 0 && treatmentOk;

      results.push({
        id: testCase.id,
        status: pass ? "pass" : "fail",
        details: {
          hasMustOneOf,
          forbiddenHits,
          treatmentOk,
          adaptation
        }
      });
    } catch (error) {
      results.push({
        id: testCase.id,
        status: "fail",
        reason: error.name === "AbortError" ? "Timeout" : error.message
      });
    }
  }

  const passed = results.filter((r) => r.status === "pass").length;
  const failed = results.length - passed;
  console.log("=== Matrix Results ===");
  for (const result of results) {
    if (result.status === "pass") {
      console.log(`PASS  ${result.id}`);
    } else {
      console.log(`FAIL  ${result.id}`);
      if (result.reason) console.log(`      reason: ${result.reason}`);
      if (result.details) {
        console.log(`      hasMustOneOf: ${result.details.hasMustOneOf}`);
        console.log(`      treatmentOk: ${result.details.treatmentOk}`);
        console.log(`      forbiddenHits: ${result.details.forbiddenHits.join(", ") || "-"}`);
        console.log(`      adaptation: ${result.details.adaptation}`);
      }
    }
  }

  console.log(`\nSummary: ${passed}/${results.length} passed, ${failed} failed.`);
  if (failed > 0) process.exitCode = 1;
}

run();
