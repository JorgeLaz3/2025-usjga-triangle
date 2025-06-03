/**
 * Converts an integer (between 1 and 3999) to its Roman numeral equivalent.
 *
 * @param {number} num - The integer to convert.
 * @returns {string} The Roman numeral representation.
 * @throws {Error} Throws an error if the number is not within the allowed range.
 */
function integerToRoman(num) {
  if (typeof num !== 'number' || isNaN(num) || !Number.isInteger(num)) {
    throw new Error('Input must be an integer.');
  }
  if (num <= 0 || num >= 4000) {
    throw new Error('The number must be between 1 and 3999.');
  }

  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900,  numeral: 'CM' },
    { value: 500,  numeral: 'D' },
    { value: 400,  numeral: 'CD' },
    { value: 100,  numeral: 'C' },
    { value: 90,   numeral: 'XC' },
    { value: 50,   numeral: 'L' },
    { value: 40,   numeral: 'XL' },
    { value: 10,   numeral: 'X' },
    { value: 9,    numeral: 'IX' },
    { value: 5,    numeral: 'V' },
    { value: 4,    numeral: 'IV' },
    { value: 1,    numeral: 'I' }
  ];

  let result = '';
  let remaining = num;

  for (const { value, numeral } of romanNumerals) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
}

/**
 * Converts a Roman numeral string to its integer equivalent.
 *
 * @param {string} roman - The Roman numeral (uppercase or lowercase).
 * @returns {number} The integer representation.
 * @throws {Error} Throws an error if the input is not a valid Roman numeral.
 */
function romanToInteger(roman) {
  if (typeof roman !== 'string') {
    throw new Error('Input must be a string.');
  }
  const s = roman.trim().toUpperCase();
  if (s.length === 0) {
    throw new Error('Input must be a valid Roman numeral.');
  }

  // Validate that the string only contains valid Roman letters
  if (!/^[MDCLXVI]+$/.test(s)) {
    throw new Error('Input must be a valid Roman numeral.');
  }

  const values = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'L': 50,
    'X': 10,
    'V': 5,
    'I': 1
  };

  let total = 0;
  let i = 0;
  while (i < s.length) {
    const currVal = values[s[i]];
    const nextVal = i + 1 < s.length ? values[s[i + 1]] : 0;

    if (nextVal > currVal) {
      total += nextVal - currVal;
      i += 2;
    } else {
      total += currVal;
      i += 1;
    }
  }

  // After computing, convert back to Roman to verify correctness
  const reconversion = integerToRoman(total);
  if (reconversion !== s) {
    throw new Error('Input must be a valid Roman numeral.');
  }

  return total;
}

// Solo si existe `document` (o sea, en navegador), conectamos los event listeners:
if (typeof document !== 'undefined') {
  /**
   * Maneja el clic del botón: lee el modo y valor de entrada,
   * llama al conversor y muestra el resultado o error correspondiente.
   */
  function handleConversion() {
    const mode = document.getElementById('conversionMode').value;
    const inputValue = document.getElementById('inputValue').value.trim();
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    // Limpiar mensajes anteriores
    resultDiv.textContent = '';
    errorDiv.textContent = '';

    try {
      if (mode === 'intToRoman') {
        const num = parseInt(inputValue, 10);
        const roman = integerToRoman(num);
        resultDiv.textContent = `Roman: ${roman}`;
      } else if (mode === 'romanToInt') {
        const intVal = romanToInteger(inputValue);
        resultDiv.textContent = `Integer: ${intVal}`;
      } else {
        throw new Error('Unknown conversion mode.');
      }
    } catch (err) {
      errorDiv.textContent = err.message;
    }
  }

  // Esperamos a que el DOM esté completamente cargado:
  document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('convertButton');
    button.addEventListener('click', handleConversion);
  });
}

// Export para Node.js (CommonJS), de modo que Mocha pueda importar estas funciones:
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { integerToRoman, romanToInteger };
}
