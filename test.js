/**
 * Test file for BIN Generator
 */

const {
  generateBIN,
  generateMultipleBINs,
  generateByCardType,
  validateBIN,
  getBankInfo
} = require('./index.js');

console.log('🧪 BIN Generator Tests\n');
console.log('='.repeat(50));

// Test 1: Generate single BIN
console.log('\n✓ Test 1: Generate Single BIN');
const singleBIN = generateBIN();
console.log(`Generated: ${singleBIN}`);
console.log(`Valid: ${validateBIN(singleBIN) ? 'YES' : 'NO'}`);

// Test 2: Generate multiple BINs
console.log('\n✓ Test 2: Generate Multiple BINs');
const multipleBINs = generateMultipleBINs(5);
console.log(`Generated 5 BINs:`);
multipleBINs.forEach((bin, i) => {
  console.log(`  ${i + 1}. ${bin} - Valid: ${validateBIN(bin) ? 'YES' : 'NO'}`);
});

// Test 3: Generate by card type
console.log('\n✓ Test 3: Generate by Card Type');
const cardTypes = ['visa', 'mastercard', 'amex'];
cardTypes.forEach(type => {
  const bins = generateByCardType(type, 2);
  console.log(`${type.toUpperCase()}:`);
  bins.forEach(bin => {
    console.log(`  ${bin} - Valid: ${validateBIN(bin) ? 'YES' : 'NO'}`);
  });
});

// Test 4: Validate BINs
console.log('\n✓ Test 4: Validate BINs');
const testBINs = [
  '4532015112830366', // Should be valid
  '5425233010103442', // Should be valid
  '378282246310005',  // Should be valid
  '1234567890123',    // Should be invalid
  'invalid'           // Should be invalid
];

testBINs.forEach(bin => {
  const isValid = validateBIN(bin);
  console.log(`${bin}: ${isValid ? '✓ VALID' : '✗ INVALID'}`);
});

// Test 5: Get bank info
console.log('\n✓ Test 5: Bank Information');
const infoBINs = [
  generateByCardType('visa', 1)[0],
  generateByCardType('mastercard', 1)[0],
  generateByCardType('amex', 1)[0]
];

infoBINs.forEach(bin => {
  const info = getBankInfo(bin);
  console.log(`${bin}`);
  console.log(`  Bank: ${info.name}`);
  console.log(`  Country: ${info.country}`);
  console.log(`  Type: ${info.type}`);
});

// Test 6: Different BIN lengths
console.log('\n✓ Test 6: Different BIN Lengths');
[13, 14, 15, 16, 17, 18, 19].forEach(length => {
  const bin = generateBIN(length);
  const isValid = validateBIN(bin);
  console.log(`Length ${length}: ${bin} - Valid: ${isValid ? 'YES' : 'NO'}`);
});

console.log('\n' + '='.repeat(50));
console.log('✓ All tests completed!\n');