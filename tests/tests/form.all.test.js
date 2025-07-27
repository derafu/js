const path = require('path');

describe('Form.js Test Suite', () => {
  beforeAll(async () => {
    const absolutePath = path.join(__dirname, '../html/form.all.test.html');
    await page.goto(`file://${absolutePath}`);
  });

  test('Form.showPassword functionality', async () => {
    await page.click('#passwordField + .input-group-text'); // Click on the show password icon.
    const passwordFieldType = await page.$eval('#passwordField', el => el.type);
    expect(passwordFieldType).toBe('text'); // Check the field type after clicking.
  });

  test('Form.growup functionality', async () => {
    // Direct call to the Form.growup function.
    await page.evaluate(() => {
      const textField = document.getElementById('text_growupField');
      Form.growup(textField);
    });

    // Wait for the modal to become visible.
    await page.waitForSelector('.bootbox.modal', { visible: true });
    const isModalVisible = await page.$eval('.bootbox.modal', el => el.style.display !== 'none');
    expect(isModalVisible).toBeTruthy(); // Check if the modal is displayed.

    // Explicit wait to give the modal time to process completely.
    await new Promise(resolve => setTimeout(resolve, 500));

    // Close the modal by clicking the close button.
    await page.click('.bootbox.modal .bootbox-close-button');

    // Wait for the modal to close.
    await page.waitForSelector('.bootbox.modal', { hidden: true });

    // Wait for the closing process to finish.
    await new Promise(resolve => setTimeout(resolve, 500));
  });

  // Test for Form.addJS and Form.delJS functionality.
  test('Form.addJS and Form.delJS functionality', async () => {
    // Add a new row.
    await page.click('#jsField .btn-primary');
    await page.waitForFunction('document.querySelectorAll("#jsField tbody tr").length === 2');
    let rowsCount = await page.$$eval('#jsField tbody tr', rows => rows.length);
    expect(rowsCount).toBe(2); // Verify that there are now 2 rows.

    // Remove a row.
    await page.click('#jsField .btn-danger');
    await page.waitForFunction('document.querySelectorAll("#jsField tbody tr").length === 1');
    rowsCount = await page.$$eval('#jsField tbody tr', rows => rows.length);
    expect(rowsCount).toBe(1); // Verify that there are now 1 row.
  });

  // Test for Form.checkboxesSet functionality.
  test('Form.checkboxesSet functionality', async () => {
    // Uncheck all checkboxes.
    await page.click('#tablecheckField thead th input[type="checkbox"]');
    await page.waitForFunction('document.querySelector("#tablecheckField tbody tr:first-child td input[type=checkbox]").checked === false');
    const firstCheckboxChecked = await page.$eval('#tablecheckField tbody tr:first-child td input[type="checkbox"]', el => el.checked);
    expect(firstCheckboxChecked).toBe(false); // Verify that the first checkbox is unchecked.
  });

  test('Form.check.notempty validation', async () => {
    await _test_element_value('#text_notemptyField', '', false);
    await _test_element_value('#text_notemptyField', 'ABC123', true);
  });

  test('Form.check.integer validation', async () => {
    await _test_element_value('#text_integerField', 'abc', false);
    await _test_element_value('#text_integerField', '1a', false);
    await _test_element_value('#text_integerField', 'a1', false);
    await _test_element_value('#text_integerField', '123.0', false);
    await _test_element_value('#text_integerField', '123,0', false);
    await _test_element_value('#text_integerField', '123', true);
  }, 30000);

  test('Form.check.real validation', async () => {
    await _test_element_value('#text_realField', 'abc', false);
    await _test_element_value('#text_realField', '1a', false);
    await _test_element_value('#text_realField', 'a1', false);
    await _test_element_value('#text_realField', '123.0', true);
    await _test_element_value('#text_realField', '123.5', true);
    await _test_element_value('#text_realField', '123,0', true);
    await _test_element_value('#text_realField', '123,5', true);
    await _test_element_value('#text_realField', '123', true);
  }, 30000);

  test('Form.check.notempty Form.check.integer validation', async () => {
    await _test_element_value('#text_notempty_integerField', '', false);
    await _test_element_value('#text_notempty_integerField', '123', true);
  });

  test('Form.check.notempty Form.check.real validation', async () => {
    await _test_element_value('#text_notempty_realField', '', false);
    await _test_element_value('#text_notempty_realField', '2.5', true);
  });

  test('Form.check.email validation', async () => {
    await _test_element_value('#text_emailField', 'correo@example', false);
    await _test_element_value('#text_emailField', 'correo@example.com', true);
  });

  test('Form.check.emails validation', async () => {
    await _test_element_value('#text_emailsField', 'correo@example', false);
    await _test_element_value('#text_emailsField', 'correo1@example.com,correo2@example.com,correo3@example.com', true);
  });

  test('Form.check.date validation', async () => {
    await _test_element_value('#dateField', '19/12/2023', false);
    await _test_element_value('#dateField', '2023-12-19', true);
  });

  test('Form.check.telephone validation', async () => {
    await _test_element_value('#text_telephoneField', '123456', false);
    await _test_element_value('#text_telephoneField', '1234567', true);
    await _test_element_value('#text_telephoneField', '+56987654321', true);
  });

  test('Form.check.rut validation', async () => {
    await _test_element_value('#text_rutField', '1-2', false);
    await _test_element_value('#text_rutField', '1-9', true);
    await _test_element_value('#text_rutField', '76192083-9', true);
    await _test_element_value('#text_rutField', '76.192.083-9', true);
  });

  test('Form.check.notempty validation (password)', async () => {
    await _test_element_value('#password_notemptyField', '', false);
    await _test_element_value('#password_notemptyField', 'admin', true);
  });

  test('Form.check.notempty validation (checkbox)', async () => {
    await _test_element_value('#checkbox_notemptyField', false, false);
    await _test_element_value('#checkbox_notemptyField', true, true);
  });

  test('Form.check.notempty validation (select)', async () => {
    await _test_element_value('#select_notemptyField', '', false);
    await _test_element_value('#select_notemptyField', 'o2', true);
  });

  test('Form.check.notempty validation (input JS)', async () => {
    await _test_element_value('#jsField > tbody > tr > td:nth-child(2) > div > input', '', false);
    await _test_element_value('#jsField > tbody > tr > td:nth-child(2) > div > input', 'Valor Input JS', true);
  });

  // TODO: fix final test to validate form submission (only tested manually).
  /*test('Form.check validation (submit final)', async () => {
    await page.click('#submitField');
    await new Promise(resolve => setTimeout(resolve, 2000));
    const actionUrl = await page.url();
    expect(actionUrl).toContain('https://jkorpela.fi/cgi-bin/echo.cgi');
  }, 10000);*/

  async function _test_element_value(elementSelector, value, expectedIsValid) {
    // Find the element and assign the value.
    const elementType = await page.$eval(elementSelector, el => el.nodeName.toLowerCase());
    if (elementType === 'input' || elementType === 'textarea') {
      const inputType = await page.$eval(elementSelector, el => el.type.toLowerCase());
      if (inputType === 'checkbox' || inputType === 'radio') {
        // Assign the value for checkboxes and radios.
        await page.evaluate((id, val) => {
          const el = document.querySelector(id);
          el.checked = val;
        }, elementSelector, value);
      } else {
        // Assign the value for other input types and textarea.
        await page.evaluate((id, val) => {
          document.querySelector(id).value = val;
        }, elementSelector, value);
      }
    } else if (elementType === 'select') {
      // Check if Select2 is being used.
      const isSelect2 = await page.evaluate((id) => {
        const select = document.querySelector(id);
        return !!$(select).data('select2');
      }, elementSelector);

      if (isSelect2) {
        // Assign the value to the select and trigger the 'change' event to update Select2.
        await page.evaluate((id, val) => {
          const select = document.querySelector(id);
          select.value = val;
          $(select).trigger('change');
        }, elementSelector, value);
      } else {
        // Assign the value directly to the select.
        await page.evaluate((id, val) => {
          const select = document.querySelector(id);
          select.value = val;
          select.dispatchEvent(new Event('change'));
        }, elementSelector, value);
      }
    }

    // Validate only the specific field without running the complete Form.check().
    await page.evaluate((selector) => {
      const field = document.querySelector(selector);
      if (field) {
        // Clear previous classes.
        field.classList.remove('is-valid', 'is-invalid');

        // Get the validation classes from the field.
        let checks = field.className.replace("check ", "").split(" ");

        // Validate each check individually.
        for (let check of checks) {
          if (check === "") continue;

          let checkFunction = Form.check[check];
          if (typeof checkFunction === 'function') {
            let status = checkFunction(field);
            if (status !== true) {
              field.classList.add("is-invalid");
              field.classList.remove("is-valid");
              break; // Stop at the first error.
            } else {
              field.classList.remove("is-invalid");
              field.classList.add("is-valid");
            }
          }
        }
      }
    }, elementSelector);

    // Wait for validation to complete.
    await new Promise(resolve => setTimeout(resolve, 100));

    // Verify the validation result.
    let isValid, isInvalid;
    if (elementType === 'checkbox' || elementType === 'radio') {
      // Check status for checkboxes and radios.
      const isChecked = await page.$eval(elementSelector, el => el.checked);
      isInvalid = await page.$eval(elementSelector, el => el.classList.contains('is-invalid'));
      isValid = isChecked === value && !isInvalid;
    } else {
      // Check classes for other element types using classList.contains.
      isValid = await page.$eval(elementSelector, el => el.classList.contains('is-valid'));
      isInvalid = await page.$eval(elementSelector, el => el.classList.contains('is-invalid'));
    }

    if (expectedIsValid) {
      if (!isValid || isInvalid) {
        console.error(`Validation failed for ${elementSelector} with value '${value}'. Expected valid: ${expectedIsValid}, but got isValid: ${isValid}, isInvalid: ${isInvalid}.`);
      }
      expect(isValid).toBeTruthy();
      expect(isInvalid).toBeFalsy();
    } else {
      if (isValid || !isInvalid) {
        console.error(`Validation failed for ${elementSelector} with value '${value}'. Expected valid: ${expectedIsValid}, but got isValid: ${isValid}, isInvalid: ${isInvalid}.`);
      }
      expect(isValid).toBeFalsy();
      expect(isInvalid).toBeTruthy();
    }
  }
});
