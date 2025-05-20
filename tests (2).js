// tests.js

// Use Chai's expect for assertions
const expect = chai.expect;

describe('integerToRoman', function() {
  it('should convert 1 to "I"', function() {
    expect(integerToRoman(1)).to.equal('I');
  });

  it('should throw an error for numbers less than 1', function() {
    expect(() => integerToRoman(0)).to.throw("The number must be between 1 and 3999.");
  });
});

describe('romanToInteger', function() {
  it('should convert "I" to 1', function() {
    expect(romanToInteger('I')).to.equal(1);
  });

  it('should throw an error for empty input', function() {
    expect(() => romanToInteger('')).to.throw("Input must be a valid Roman numeral.");
  });
});

