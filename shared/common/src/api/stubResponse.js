/**
 * Placeholder until Prisma + business logic are wired.
 * @param {string} srsRef - Human-readable SRS reference
 * @param {object} [data]
 */
function stubOk(srsRef, data = {}) {
  return { ok: true, stub: true, srsRef, ...data };
}

module.exports = { stubOk };
