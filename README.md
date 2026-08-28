# 🏦 BIN Generator

A functional **Bank Identification Number (BIN) generator** with built-in validation using the Luhn algorithm, bank information lookup, and support for multiple card types.

## ✨ Features

- ✅ **Generate valid BINs** with Luhn algorithm validation
- ✅ **Support for multiple card types**: Visa, Mastercard, Amex, Discover, Diners Club
- ✅ **Bank information lookup** (card type, issuer, country)
- ✅ **Customizable BIN length** (13-19 digits)
- ✅ **CLI interface** for easy testing
- ✅ **Module exports** for programmatic use
- ✅ **Comprehensive test suite**

## 📦 Installation

```bash
git clone https://github.com/soulzagonzales-svg/bin-generator.git
cd bin-generator
npm install
```

## 🚀 Usage

### CLI Commands

#### Generate Random BINs
```bash
# Generate 10 random BINs (16 digits)
node index.js generate

# Generate 5 BINs with custom length
node index.js generate 5 16

# Generate 3 BINs with 15 digits
node index.js generate 3 15
```

#### Generate by Card Type
```bash
# Generate 5 Visa BINs
node index.js type visa 5

# Generate 3 Mastercard BINs
node index.js type mastercard 3

# Supported types: visa, mastercard, amex, discover, diners
node index.js type amex 2
```

#### Validate a BIN
```bash
node index.js validate 4532015112830366
```

#### Get Bank Information
```bash
node index.js info 4532015112830366
```

#### Show Help
```bash
node index.js help
```

### Programmatic Use

```javascript
const {
  generateBIN,
  generateMultipleBINs,
  generateByCardType,
  validateBIN,
  getBankInfo
} = require('./index.js');

// Generate a single BIN
const bin = generateBIN();
console.log(bin); // e.g., "4532015112830366"

// Generate multiple BINs
const bins = generateMultipleBINs(5, 16);
console.log(bins);

// Generate BINs by card type
const visaBins = generateByCardType('visa', 3);
console.log(visaBins);

// Validate a BIN
const isValid = validateBIN('4532015112830366');
console.log(isValid); // true or false

// Get bank information
const info = getBankInfo('4532015112830366');
console.log(info);
// Output: { name: 'Visa', country: 'USA', type: 'Credit' }
```

## 📚 API Reference

### Functions

#### `generateBIN(length, prefix)`
Generates a single valid BIN.

**Parameters:**
- `length` (number, optional): BIN length (13-19, default: 16)
- `prefix` (string, optional): Card type prefix to use

**Returns:** Valid BIN as string

```javascript
generateBIN(16, '4'); // Generates Visa BIN
```

#### `generateMultipleBINs(count, length)`
Generates multiple BINs.

**Parameters:**
- `count` (number, optional): Number of BINs to generate (default: 10)
- `length` (number, optional): BIN length (default: 16)

**Returns:** Array of BINs

```javascript
generateMultipleBINs(5, 16); // Generates 5 BINs
```

#### `generateByCardType(cardType, count)`
Generates BINs for a specific card type.

**Parameters:**
- `cardType` (string): Card type ('visa', 'mastercard', 'amex', 'discover', 'diners')
- `count` (number, optional): Number of BINs (default: 10)

**Returns:** Array of BINs

```javascript
generateByCardType('visa', 5); // Generates 5 Visa BINs
```

#### `validateBIN(bin)`
Validates a BIN using Luhn algorithm.

**Parameters:**
- `bin` (string): BIN to validate

**Returns:** Boolean (true if valid)

```javascript
validateBIN('4532015112830366'); // true
validateBIN('1234567890123');    // false
```

#### `getBankInfo(bin)`
Gets bank information from a BIN.

**Parameters:**
- `bin` (string): BIN to analyze

**Returns:** Object with bank information

```javascript
getBankInfo('4532015112830366');
// { name: 'Visa', country: 'USA', type: 'Credit' }
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

This will run comprehensive tests including:
- Single BIN generation
- Multiple BIN generation
- Card type generation
- BIN validation
- Bank information lookup
- Various BIN lengths

## 🛠️ Supported Card Types

| Card Type | Prefix | Country | Type |
|-----------|--------|---------|------|
| Visa | 4 | USA | Credit |
| Mastercard | 5 | USA | Credit |
| American Express | 3 | USA | Credit |
| Discover | 6 | USA | Credit |
| Diners Club | 36, 38 | USA | Credit |

## 📝 Notes

- Generated BINs are mathematically valid but **fictional**
- All BINs pass Luhn algorithm validation
- BINs follow industry standards for length (13-19 digits)
- This tool is for **educational and testing purposes only**

## 📄 License

MIT

## 👨‍💻 Author

Created by soulzagonzales-svg

---

**Happy generating! 🎉**