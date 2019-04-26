const functions = require('../actions/parseStrings');

test('Adds 2+2 to equal 4', () => {
  expect(functions.testJest(2,2)).toBe(4);
});