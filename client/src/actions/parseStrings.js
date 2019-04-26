const convertToURI = (string) => {
  string.replace(/[;,?:@=+$#/]/g, (value) => {
    return encodeURIComponent(value);
  });
  return string;
};

const testJest = (numOne, numTwo) => {
  return numOne + numTwo;
};

module.exports = {
  convertToURI,
  testJest,
};