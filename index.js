/**
 * BIN Generator - Bank Identification Number Generator
 * Generates valid BINs with Luhn algorithm validation
 */

const BANK_PREFIXES = {
  '4': { name: 'Visa', country: 'USA', type: 'Credit' },
  '5': { name: 'Mastercard', country: 'USA', type: 'Credit' },
  '3': { name: 'American Express', country: 'USA', type: 'Credit' },
  '6': { name: 'Discover', country: 'USA', type: 'Credit' },
  '36': { name: 'Diners Club', country: 'USA', type: 'Credit' },
  '38': { name: 'Diners Club', country: 'USA', type: 'Credit' }
};

/**
 * Calculates Luhn checksum
 * @param {string} num - Number without checksum
 * @returns {number} - Checksum digit
 */
function calculateLuhnChecksum(num) {
  let sum = 0;
  let isEven = false;

  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return (10 - (sum % 10)) % 10;
}

/**
 * Validates a BIN using Luhn algorithm
 * @param {string} bin - BIN to validate
 * @returns {boolean} - True if valid
 */
function validateBIN(bin) {
  if (!/^\d+$/.test(bin) || bin.length < 13 || bin.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = bin.length - 1; i >= 0; i--) {
    let digit = parseInt(bin[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Gets bank information from BIN prefix
 * @param {string} bin - BIN to analyze
 * @returns {object} - Bank information
 */
function getBankInfo(bin) {
  for (let [prefix, info] of Object.entries(BANK_PREFIXES)) {
    if (bin.startsWith(prefix)) {
      return info;
    }
  }
  return { name: 'Unknown', country: 'Unknown', type: 'Unknown' };
}

/**
 * Generates a random BIN
 * @param {number} length - BIN length (13-19, default 16)
 * @param {string} prefix - Optional prefix to use
 * @returns {string} - Generated valid BIN
 */
function generateBIN(length = 16, prefix = null) {
  if (length < 13 || length > 19) {
    throw new Error('BIN length must be between 13 and 19 digits');
  }

  // Use provided prefix or random card type
  let bin = prefix;
  if (!bin) {
    const prefixes = Object.keys(BANK_PREFIXES);
    bin = prefixes[Math.floor(Math.random() * prefixes.length)];
  }

  // Generate random digits
  while (bin.length < length - 1) {
    bin += Math.floor(Math.random() * 10);
  }

  // Add Luhn checksum
  const checksum = calculateLuhnChecksum(bin);
  bin += checksum;

  return bin;
}

/**
 * Generates multiple BINs
 * @param {number} count - Number of BINs to generate
 * @param {number} length - BIN length (default 16)
 * @returns {array} - Array of generated BINs
 */
function generateMultipleBINs(count = 10, length = 16) {
  const bins = [];
  for (let i = 0; i < count; i++) {
    bins.push(generateBIN(length));
  }
  return bins;
}

/**
 * Generates BINs by specific card type
 * @param {string} cardType - Card type (visa, mastercard, amex, discover, diners)
 * @param {number} count - Number of BINs to generate
 * @returns {array} - Array of generated BINs
 */
function generateByCardType(cardType, count = 10) {
  const prefixMap = {
    'visa': '4',
    'mastercard': '5',
    'amex': '3',
    'discover': '6',
    'diners': '36'
  };

  const prefix = prefixMap[cardType.toLowerCase()];
  if (!prefix) {
    throw new Error(`Unknown card type: ${cardType}`);
  }

  const bins = [];
  for (let i = 0; i < count; i++) {
    bins.push(generateBIN(16, prefix));
  }
  return bins;
}

// Export functions
module.exports = {
  generateBIN,
  generateMultipleBINs,
  generateByCardType,
  validateBIN,
  getBankInfo,
  calculateLuhnChecksum,
  BANK_PREFIXES
};

// CLI Usage
if (require.main === module) {
  console.log('🏦 BIN Generator CLI\n');
  
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === 'help') {
    console.log('Usage:');
    console.log('  node index.js generate [count] [length]  - Generate random BINs');
    console.log('  node index.js type <type> [count]        - Generate by card type (visa, mastercard, amex, discover, diners)');
    console.log('  node index.js validate <bin>             - Validate a BIN');
    console.log('  node index.js info <bin>                 - Get bank info from BIN');
    console.log('\nExamples:');
    console.log('  node index.js generate');
    console.log('  node index.js generate 5 16');
    console.log('  node index.js type visa 5');
    console.log('  node index.js validate 4532015112830366');
    console.log('  node index.js info 4532015112830366\n');
    return;
  }

  const command = args[0];

  try {
    if (command === 'generate') {
      const count = parseInt(args[1]) || 10;
      const length = parseInt(args[2]) || 16;
      const bins = generateMultipleBINs(count, length);
      console.log(`Generated ${count} BINs (${length} digits each):\n`);
      bins.forEach((bin, i) => {
        const info = getBankInfo(bin);
        console.log(`${i + 1}. ${bin} - ${info.name} (${info.country})`);
      });
    } else if (command === 'type') {
      const cardType = args[1];
      const count = parseInt(args[2]) || 10;
      const bins = generateByCardType(cardType, count);
      console.log(`Generated ${count} ${cardType.toUpperCase()} BINs:\n`);
      bins.forEach((bin, i) => {
        const info = getBankInfo(bin);
        console.log(`${i + 1}. ${bin} - ${info.name}`);
      });
    } else if (command === 'validate') {
      const bin = args[1];
      if (!bin) {
        console.error('Error: BIN required for validation');
        return;
      }
      const isValid = validateBIN(bin);
      const info = getBankInfo(bin);
      console.log(`BIN: ${bin}`);
      console.log(`Valid: ${isValid ? '✓ YES' : '✗ NO'}`);
      console.log(`Bank: ${info.name}`);
      console.log(`Country: ${info.country}`);
      console.log(`Type: ${info.type}`);
    } else if (command === 'info') {
      const bin = args[1];
      if (!bin) {
        console.error('Error: BIN required');
        return;
      }
      const info = getBankInfo(bin);
      console.log(`BIN: ${bin}`);
      console.log(`Bank: ${info.name}`);
      console.log(`Country: ${info.country}`);
      console.log(`Type: ${info.type}`);
    } else {
      console.error(`Unknown command: ${command}`);
      console.log('Use "node index.js help" for usage information');
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}