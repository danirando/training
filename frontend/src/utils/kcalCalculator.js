/**
 * Calcola il MET in base a velocità e inclinazione
 * Formula basata sul Compendium of Physical Activities (ACSM)
 */
export function calculateMET(speedKmh, inclinePercent) {
  const speedMmin = (speedKmh * 1000) / 60;
  const isRunning = speedKmh >= 8;

  if (isRunning) {
    // Formula corsa ACSM
    const met =
      (0.2 * speedMmin + 0.9 * speedMmin * (inclinePercent / 100) + 3.5) / 3.5;
    return met;
  } else {
    // Formula camminata ACSM
    const met =
      (0.1 * speedMmin + 1.8 * speedMmin * (inclinePercent / 100) + 3.5) / 3.5;
    return met;
  }
}

/**
 * Calcola le kcal per un intervallo
 * @param {number} weightKg
 * @param {number} speedKmh
 * @param {number} inclinePercent
 * @param {number} durationSeconds
 */
export function calculateKcalForInterval(
  weightKg,
  speedKmh,
  inclinePercent,
  durationSeconds,
) {
  const met = calculateMET(speedKmh, inclinePercent);
  const durationMinutes = durationSeconds / 60;
  // kcal = MET × peso(kg) × 3.5 / 200 × minuti
  return (met * weightKg * 3.5 * durationMinutes) / 200;
}

/**
 * Calcola le kcal totali di una sessione con intervalli
 * Restituisce array di punti per il grafico + totale
 */
export function calculateSession(params) {
  const { weightKg, intervals } = params; // rimuovi age e gender dal destructuring
  // age e gender serviranno in futuro per calcoli HR-based

  let totalKcal = 0;
  const chartPoints = [];

  intervals.forEach((interval) => {
    const durationSec = interval.endSecond - interval.startSecond;
    const kcal = calculateKcalForInterval(
      weightKg,
      interval.speedKmh,
      interval.inclinePercent,
      durationSec,
    );

    totalKcal += kcal;

    const steps = Math.ceil(durationSec / 30);
    for (let i = 0; i < steps; i++) {
      chartPoints.push({
        second: interval.startSecond + i * 30,
        kcalCumulative: totalKcal,
        speedKmh: interval.speedKmh,
        inclinePercent: interval.inclinePercent,
        met: calculateMET(interval.speedKmh, interval.inclinePercent),
      });
    }
  });

  return { totalKcal, chartPoints };
}
