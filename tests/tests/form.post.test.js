const path = require('path');

describe('Form.post()', () => {
  let requestListener;

  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/form.post.test.html');
    const url = `file://${absolutePath}`;
    await page.goto(url);
  });

  afterEach(async () => {
    if (requestListener) {
      page.removeListener('request', requestListener);
    }
  });

  test('Debe enviar un formulario y recibir la respuesta', async () => {
    // Configurar para escuchar las solicitudes de red
    let requestMade = false;
    page.on('request', request => {
      if (request.method() === 'POST' && request.url() === 'https://jkorpela.fi/cgi-bin/echo.cgi') {
        requestMade = true;
      }
    });

    await page.click('#testButton');

    // Esperar un momento para dar tiempo a que se realice la solicitud
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Verificar que se hizo la solicitud POST
    expect(requestMade).toBe(true);
  }, 10000);
});
