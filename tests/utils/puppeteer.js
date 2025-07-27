/**
 * Espera hasta que el número de páginas abiertas en Puppeteer alcance un número esperado.
 *
 * @param {number} initial - Número inicial de páginas abiertas.
 * @param {number} expected - Número esperado de nuevas páginas abiertas.
 * @param {number} [sleep=1000] - Tiempo de espera en milisegundos entre verificaciones.
 * @param {number} [timeout=10000] - Tiempo máximo de espera en milisegundos.
 * @returns {Promise<Array>} Retorna un array de las páginas abiertas si se alcanza el número esperado.
 * @throws {Error} Lanza un error si se supera el tiempo de espera.
 */
async function pages_open_wait(initial, expected, sleep = 1000, timeout = 10000) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
        const pages = await browser.pages();
        if (pages.length === initial + expected) {
            return pages; // Retorna las páginas abiertas
        }
        await new Promise(resolve => setTimeout(resolve, sleep)); // Espera antes de volver a verificar
    }
    throw new Error('Tiempo de espera superado para la apertura de nuevas páginas.'); // Lanza un error
}

// Exportar funciones del módulo
module.exports = { pages_open_wait };
