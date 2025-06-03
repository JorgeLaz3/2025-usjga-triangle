// tests.js

const { expect } = require('chai');
const { integerToRoman, romanToInteger } = require('./script');

describe('integerToRoman', function() {
  it('should convert 1 to "I"', function() {
    expect(integerToRoman(1)).to.equal('I');
  });

  it('should convert 4 to "IV"', function() {
    expect(integerToRoman(4)).to.equal('IV');
  });

  it('should convert 9 to "IX"', function() {
    expect(integerToRoman(9)).to.equal('IX');
  });

  it('should convert 58 to "LVIII"', function() {
    expect(integerToRoman(58)).to.equal('LVIII');
  });

  it('should convert 1994 to "MCMXCIV"', function() {
    expect(integerToRoman(1994)).to.equal('MCMXCIV');
  });

  it('should throw an error for numbers less than 1', function() {
    expect(() => integerToRoman(0)).to.throw('The number must be between 1 and 3999.');
  });

  it('should throw an error for numbers ≥ 4000', function() {
    expect(() => integerToRoman(4000)).to.throw('The number must be between 1 and 3999.');
  });

  it('should throw an error if input is not an integer', function() {
    expect(() => integerToRoman(3.14)).to.throw('Input must be an integer.');
    expect(() => integerToRoman(NaN)).to.throw('Input must be an integer.');
  });
});

describe('romanToInteger', function() {
  it('should convert "I" to 1', function() {
    expect(romanToInteger('I')).to.equal(1);
  });

  it('should convert "IV" to 4', function() {
    expect(romanToInteger('IV')).to.equal(4);
  });

  it('should convert "IX" to 9', function() {
    expect(romanToInteger('IX')).to.equal(9);
  });

  it('should convert "LVIII" to 58', function() {
    expect(romanToInteger('LVIII')).to.equal(58);
  });

  it('should convert "MCMXCIV" to 1994', function() {
    expect(romanToInteger('MCMXCIV')).to.equal(1994);
  });

  it('should be case-insensitive (e.g., "mcmxciv" to 1994)', function() {
    expect(romanToInteger('mcmxciv')).to.equal(1994);
  });

  it('should throw an error for empty input', function() {
    expect(() => romanToInteger('')).to.throw('Input must be a valid Roman numeral.');
  });

  it('should throw an error for invalid characters', function() {
    expect(() => romanToInteger('ABC')).to.throw('Input must be a valid Roman numeral.');
  });

  it('should throw an error for malformed patterns like "IM"', function() {
    expect(() => romanToInteger('IM')).to.throw('Input must be a valid Roman numeral.');
  });
});
