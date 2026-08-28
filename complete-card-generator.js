/**
 * Complete Card Generator - Gera cartões completos com todas as informações
 */

const crypto = require('crypto');

const BANK_PREFIXES = {
  '4': { name: 'Visa', country: 'USA', type: 'Credit' },
  '5': { name: 'Mastercard', country: 'USA', type: 'Credit' },
  '3': { name: 'American Express', country: 'USA', type: 'Credit' },
  '6': { name: 'Discover', country: 'USA', type: 'Credit' },
  '36': { name: 'Diners Club', country: 'USA', type: 'Credit' }
};

const FIRST_NAMES = ['John', 'Maria', 'Carlos', 'Ana', 'Pedro', 'Lucia', 'Michael', 'Jennifer', 'David', 'Sarah'];
const LAST_NAMES = ['Smith', 'Silva', 'Johnson', 'Santos', 'Williams', 'Oliveira', 'Brown', 'Costa', 'Davis', 'Martins'];

/**
 * Calcula checksum de Luhn
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
 * Valida um cartão com Luhn
 */
function validateCard(cardNumber) {
  if (!/^\d+$/.test(cardNumber) || cardNumber.length < 13 || cardNumber.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i], 10);

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
 * Gera um nome aleatório
 */
function generateName() {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${firstName} ${lastName}`;
}

/**
 * Gera uma data de validade
 */
function generateExpiryDate() {
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const year = String(Math.floor(Math.random() * 10) + 25); // 2025-2034
  return `${month}/${year}`;
}

/**
 * Gera um CVV
 */
function generateCVV(isAmex = false) {
  const length = isAmex ? 4 : 3;
  return String(Math.floor(Math.random() * Math.pow(10, length))).padStart(length, '0');
}

/**
 * Gera um número de cartão válido
 */
function generateCardNumber(length = 16, prefix = null) {
  if (length < 13 || length > 19) {
    throw new Error('Comprimento do cartão deve ser entre 13 e 19 dígitos');
  }

  let cardNumber = prefix;
  if (!cardNumber) {
    const prefixes = Object.keys(BANK_PREFIXES);
    cardNumber = prefixes[Math.floor(Math.random() * prefixes.length)];
  }

  while (cardNumber.length < length - 1) {
    cardNumber += Math.floor(Math.random() * 10);
  }

  const checksum = calculateLuhnChecksum(cardNumber);
  cardNumber += checksum;

  return cardNumber;
}

/**
 * Obtém informações do banco pelo prefixo
 */
function getBankInfo(cardNumber) {
  for (let [prefix, info] of Object.entries(BANK_PREFIXES)) {
    if (cardNumber.startsWith(prefix)) {
      return info;
    }
  }
  return { name: 'Unknown', country: 'Unknown', type: 'Unknown' };
}

/**
 * Gera um cartão completo com todas as informações
 */
function generateCompleteCard(cardType = null) {
  const prefixMap = {
    'visa': '4',
    'mastercard': '5',
    'amex': '3',
    'discover': '6',
    'diners': '36'
  };

  let prefix = null;
  if (cardType) {
    prefix = prefixMap[cardType.toLowerCase()];
    if (!prefix) {
      throw new Error(`Tipo de cartão desconhecido: ${cardType}`);
    }
  }

  const cardNumber = generateCardNumber(16, prefix);
  const bankInfo = getBankInfo(cardNumber);
  const isAmex = cardNumber.startsWith('3');
  const expiryDate = generateExpiryDate();
  const cvv = generateCVV(isAmex);
  const holder = generateName();

  return {
    holder_name: holder,
    card_number: cardNumber,
    card_type: bankInfo.name,
    bank_country: bankInfo.country,
    expiry_date: expiryDate,
    cvv: cvv,
    valid: validateCard(cardNumber)
  };
}

/**
 * Gera múltiplos cartões completos
 */
function generateMultipleCompleteCards(count = 10, cardType = null) {
  const cards = [];
  for (let i = 0; i < count; i++) {
    cards.push(generateCompleteCard(cardType));
  }
  return cards;
}

/**
 * Formata um cartão para exibição bonita
 */
function formatCard(card, index = 1) {
  return `
╔════════════════════════════════════════════════════╗
║  CARTÃO #${String(index).padStart(2, '0')}                              ║
╠════════════════════════════════════════════════════╣
║  Titular:         ${card.holder_name.padEnd(38)}║
║  Banco:           ${card.card_type.padEnd(38)}║
║  País:            ${card.bank_country.padEnd(38)}║
╠════════════════════════════════════════════════════╣
║  Número:          ${card.card_number}           ║
║  Validade:        ${card.expiry_date}                        ║
║  CVV:             ${card.cvv}                            ║
║  Status:          ${card.valid ? '✓ VÁLIDO' : '✗ INVÁLIDO'}                        ║
╚════════════════════════════════════════════════════╝`;
}

// Export
module.exports = {
  generateCompleteCard,
  generateMultipleCompleteCards,
  formatCard,
  validateCard,
  generateCardNumber,
  getBankInfo
};

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === 'help') {
    console.log('\n╔════════════════════════════════════════════════════╗');
    console.log('║     💳 GERADOR DE CARTÕES COMPLETO 💳            ║');
    console.log('╚════════════════════════════════════════════════════╝\n');
    
    console.log('Uso:');
    console.log('  node complete-card-generator.js generate [quantidade]');
    console.log('  node complete-card-generator.js type <tipo> [quantidade]');
    console.log('  node complete-card-generator.js help\n');
    
    console.log('Exemplos:');
    console.log('  node complete-card-generator.js generate');
    console.log('  node complete-card-generator.js generate 5');
    console.log('  node complete-card-generator.js type visa 3');
    console.log('  node complete-card-generator.js type mastercard 5');
    console.log('  node complete-card-generator.js type amex 2\n');
    
    console.log('Tipos disponíveis: visa, mastercard, amex, discover, diners\n');
    return;
  }

  const command = args[0];

  try {
    if (command === 'generate') {
      const count = parseInt(args[1]) || 5;
      const cards = generateMultipleCompleteCards(count);
      
      console.log('\n╔════════════════════════════════════════════════════╗');
      console.log(`║  GERANDO ${String(count).padStart(2, '0')} CARTÕES ALEATÓRIOS         ║`);
      console.log('╚════════════════════════════════════════════════════╝\n');
      
      cards.forEach((card, i) => {
        console.log(formatCard(card, i + 1));
      });
      
    } else if (command === 'type') {
      const cardType = args[1];
      const count = parseInt(args[2]) || 5;
      
      if (!cardType) {
        console.error('❌ Tipo de cartão obrigatório!');
        return;
      }
      
      const cards = generateMultipleCompleteCards(count, cardType);
      
      console.log('\n╔════════════════════════════════════════════════════╗');
      console.log(`║  GERANDO ${String(count).padStart(2, '0')} CARTÕES ${cardType.toUpperCase().padEnd(21)}║`);
      console.log('╚════════════════════════════════════════════════════╝\n');
      
      cards.forEach((card, i) => {
        console.log(formatCard(card, i + 1));
      });
      
    } else {
      console.error(`❌ Comando desconhecido: ${command}`);
      console.log('Use "node complete-card-generator.js help" para ajuda\n');
    }
  } catch (error) {
    console.error(`❌ Erro: ${error.message}\n`);
  }
}
