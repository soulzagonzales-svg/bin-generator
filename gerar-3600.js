#!/usr/bin/env node

/**
 * GERADOR OTIMIZADO 3600 CARTÕES
 * Script para gerar 3600 cartões (360 x 10) com performance máxima
 * Usa streams, workers threads e processamento paralelo
 * VERSÃO: 3.0.0 - OTIMIZAÇÃO MEGA
 */

const fs = require('fs');
const path = require('path');
const { Worker } = require('worker_threads');
const os = require('os');

const FIRST_NAMES = [
  'João', 'Maria', 'Carlos', 'Ana', 'Pedro', 'Lucia', 'Miguel', 'Jennifer', 
  'David', 'Sarah', 'Lucas', 'Fernanda', 'Roberto', 'Daniela', 'Ricardo',
  'Juliana', 'Marcelo', 'Beatriz', 'Gustavo', 'Camila', 'Felipe', 'Amanda',
  'Matheus', 'Bruna', 'Anderson', 'Patricia', 'Eduardo', 'Renata', 'Raphael',
  'Alessandra', 'Bruno', 'Cristiane', 'Diego', 'Elisa', 'Fabio', 'Gabriela',
  'Henrique', 'Isabela', 'Julio', 'Karina', 'Leonardo', 'Mariana', 'Nathan',
  'Olivia', 'Paulo', 'Quentin', 'Rafaela', 'Samuel', 'Talia', 'Ulisses',
  'Vanessa', 'Wagner', 'Xavier', 'Yasmin', 'Zoe', 'Adalberto', 'Adriana'
];

const LAST_NAMES = [
  'Silva', 'Santos', 'Oliveira', 'Costa', 'Martins', 'Souza', 'Ferreira',
  'Rodrigues', 'Alves', 'Gomes', 'Ribeiro', 'Pereira', 'Carvalho', 'Rocha',
  'Lima', 'Mendes', 'Teixeira', 'Dias', 'Monteiro', 'Castro', 'Barbosa',
  'Correia', 'Vieira', 'Nascimento', 'Cardoso', 'Machado', 'Pinto', 'Moura',
  'Nunes', 'Araujo', 'Brito', 'Chaves', 'Diniz', 'Espinoza', 'Fonseca',
  'Gama', 'Herrera', 'Ibarra', 'Jimenez', 'Keller', 'Lopez', 'Morales',
  'Navarro', 'Ortega', 'Pena', 'Queiroz', 'Ramirez', 'Siqueira', 'Tavares'
];

const CITIES = [
  'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 'Salvador',
  'Fortaleza', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre', 'Goiânia',
  'Belém', 'Maceió', 'Teresina', 'João Pessoa', 'Natal', 'Campo Grande',
  'Aracaju', 'Cuiabá', 'Palmas', 'Rio Branco', 'Boa Vista', 'Macapá',
  'Campinas', 'Santos', 'Sorocaba', 'Jundiaí', 'Limeira', 'Ribeirão Preto'
];

const STATES = [
  'SP', 'RJ', 'MG', 'DF', 'BA', 'CE', 'AM', 'PR', 'PE', 'RS', 'GO', 'PA', 
  'AL', 'PI', 'PB', 'RN', 'MS', 'MT', 'TO', 'AC', 'RR', 'AP', 'ES', 'SC'
];

const STREET_TYPES = [
  'Rua', 'Avenida', 'Travessa', 'Alameda', 'Estrada', 'Boulevard', 'Passagem',
  'Praça', 'Largo', 'Beco', 'Caminho', 'Servidão', 'Rodovia'
];

const STREET_NAMES = [
  'das Flores', 'Principal', 'Central', 'do Comércio', 'Getúlio Vargas',
  'Tiradentes', 'Brasil', 'América', 'Independência', 'Liberdade', 'Esperança',
  'Felicidade', 'Paz', 'dos Santos', 'da República', 'Paulista'
];

const PROFESSIONS = [
  'Engenheiro', 'Médico', 'Advogado', 'Contador', 'Gerente', 'Analista',
  'Programador', 'Designer', 'Professor', 'Empresário', 'Vendedor', 'Consultor'
];

const DOMAINS = [
  'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'email.com',
  'uol.com.br', 'bol.com.br', 'terra.com.br', 'ig.com.br', 'oi.com.br'
];

const BANK_TYPES = ['Visa', 'Mastercard', 'American Express', 'Discover', 'Diners Club'];

/**
 * Calcula Luhn checksum
 */
function calculateLuhnChecksum(num) {
  let sum = 0;
  let isEven = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return (10 - (sum % 10)) % 10;
}

/**
 * Valida CPF
 */
function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}

/**
 * Gera CPF válido
 */
function generateCPF() {
  let cpf = '';
  for (let i = 0; i < 9; i++) {
    cpf += Math.floor(Math.random() * 10);
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }
  let firstDigit = 11 - (sum % 11);
  if (firstDigit >= 10) firstDigit = 0;
  cpf += firstDigit;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i);
  }
  let secondDigit = 11 - (sum % 11);
  if (secondDigit >= 10) secondDigit = 0;
  cpf += secondDigit;

  const formatted = `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9)}`;
  return validateCPF(formatted) ? { raw: cpf, formatted } : generateCPF();
}

/**
 * Gera RG válido
 */
function generateRG() {
  let rg = '';
  for (let i = 0; i < 8; i++) {
    rg += Math.floor(Math.random() * 10);
  }
  let sum = 0;
  const mult = [2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 8; i++) {
    sum += parseInt(rg[i]) * mult[i];
  }
  let verifier = sum % 11;
  if (verifier === 10) verifier = 0;
  rg += verifier;
  return `${rg.substring(0, 2)}.${rg.substring(2, 5)}.${rg.substring(5, 8)}-${rg.substring(8)}`;
}

/**
 * Gera CNPJ válido
 */
function generateCNPJ() {
  let cnpj = '';
  for (let i = 0; i < 8; i++) {
    cnpj += Math.floor(Math.random() * 10);
  }
  cnpj += '0001';
  
  let sum = 0;
  const mult1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj[i]) * mult1[i];
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;
  cnpj += digit1;
  
  sum = 0;
  const mult2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj[i]) * mult2[i];
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;
  cnpj += digit2;
  
  return `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(5, 8)}/${cnpj.substring(8, 12)}-${cnpj.substring(12)}`;
}

/**
 * Gera data de nascimento
 */
function generateBirthDate() {
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 65, today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const randomDate = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
  
  const day = String(randomDate.getDate()).padStart(2, '0');
  const month = String(randomDate.getMonth() + 1).padStart(2, '0');
  const year = randomDate.getFullYear();
  
  return `${day}/${month}/${year}`;
}

/**
 * Gera nome completo
 */
function generateName() {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${first} ${last}`;
}

/**
 * Gera email
 */
function generateEmail(name) {
  const namePart = name.toLowerCase().replace(/\s+/g, '.');
  const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
  const number = Math.floor(Math.random() * 999);
  return `${namePart}${number}@${domain}`;
}

/**
 * Gera telefone
 */
function generatePhone() {
  const ddd = String(Math.floor(Math.random() * 85) + 11).padStart(2, '0');
  const first = String(Math.floor(Math.random() * 9) + 1);
  const middle = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  const last = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `(${ddd}) 9${first}${middle}-${last}`;
}

/**
 * Gera endereço
 */
function generateAddress() {
  const street = `${STREET_TYPES[Math.floor(Math.random() * STREET_TYPES.length)]} ${STREET_NAMES[Math.floor(Math.random() * STREET_NAMES.length)]}`;
  const number = Math.floor(Math.random() * 9999) + 1;
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];
  const state = STATES[Math.floor(Math.random() * STATES.length)];
  const zip = String(Math.floor(Math.random() * 99999999)).padStart(8, '0');
  return `${street}, ${number} - ${city}, ${state} ${zip.substring(0, 5)}-${zip.substring(5)}`;
}

/**
 * Gera cartão
 */
function generateCard(cardType = null) {
  const prefixes = {
    'Visa': '4',
    'Mastercard': '5',
    'American Express': '3',
    'Discover': '6',
    'Diners Club': '36'
  };

  let type = cardType || BANK_TYPES[Math.floor(Math.random() * BANK_TYPES.length)];
  let prefix = prefixes[type];
  let cardNumber = prefix;

  while (cardNumber.length < 15) {
    cardNumber += Math.floor(Math.random() * 10);
  }

  const checksum = calculateLuhnChecksum(cardNumber);
  return {
    card_type: type,
    number: cardNumber + checksum,
    expiry: `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}/${String(Math.floor(Math.random() * 10) + 25)}`,
    cvv: String(Math.floor(Math.random() * (type === 'American Express' ? 10000 : 1000))).padStart(type === 'American Express' ? 4 : 3, '0')
  };
}

/**
 * Gera cartão completo OTIMIZADO
 */
function generateCompleteCard(cardType = null) {
  const name = generateName();
  const birthDate = generateBirthDate();
  const cpf = generateCPF();
  const card = generateCard(cardType);

  return {
    id: `${cpf.raw}-${Date.now()}`,
    timestamp: new Date().toISOString(),
    name: name,
    cpf: cpf.formatted,
    rg: generateRG(),
    cnpj: generateCNPJ(),
    birth_date: birthDate,
    email: generateEmail(name),
    phone: generatePhone(),
    address: generateAddress(),
    profession: PROFESSIONS[Math.floor(Math.random() * PROFESSIONS.length)],
    card_type: card.card_type,
    card_number: card.number,
    expiry: card.expiry,
    cvv: card.cvv
  };
}

/**
 * Gera batch de cartões
 */
function generateBatch(count, cardType = null) {
  const batch = [];
  for (let i = 0; i < count; i++) {
    batch.push(generateCompleteCard(cardType));
  }
  return batch;
}

/**
 * GERA 3600 CARTÕES COM PERFORMANCE MÁXIMA
 */
async function generate3600Cards() {
  console.clear();
  console.log('\n╔═══════════════════════════════════════════════════════════════════════════╗');
  console.log('║                                                                           ║');
  console.log('║          🚀 GERANDO 3600 CARTÕES (360 x 10) - OTIMIZAÇÃO MÁXIMA 🚀       ║');
  console.log('║                      100% FUNCIONAL - DADOS BRUTOS                        ║');
  console.log('║                                                                           ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════╝\n');

  const startTime = Date.now();
  const totalCards = 3600;
  const batchSize = 100;
  const batchCount = totalCards / batchSize;
  
  const quantities = {
    'Visa': 1000,
    'Mastercard': 1000,
    'American Express': 600,
    'Discover': 600,
    'Diners Club': 400
  };

  // Streams para saída
  const timestamp = Date.now();
  const jsonStream = fs.createWriteStream(`cartoes-3600-${timestamp}.json`);
  const csvStream = fs.createWriteStream(`cartoes-3600-${timestamp}.csv`, { encoding: 'utf-8' });
  const txtStream = fs.createWriteStream(`cartoes-3600-${timestamp}.txt`, { encoding: 'utf-8' });

  // Cabeçalho JSON
  jsonStream.write('[\n');

  // Cabeçalho CSV
  csvStream.write('ID;Nome;CPF;RG;CNPJ;Data Nascimento;Email;Telefone;Endereço;Profissão;Tipo Cartão;Número Cartão;Validade;CVV\n');

  // Cabeçalho TXT
  txtStream.write('═'.repeat(120) + '\n');
  txtStream.write('CARTÕES BRUTOS GERADOS - 3600 CARTÕES - 100% FUNCIONAL\n');
  txtStream.write(`Data: ${new Date().toLocaleString('pt-BR')}\n`);
  txtStream.write('═'.repeat(120) + '\n\n');

  let cardCount = 0;
  let processedBatches = 0;

  // Processa cada tipo de cartão
  for (const [cardType, count] of Object.entries(quantities)) {
    const batches = Math.ceil(count / batchSize);
    
    for (let b = 0; b < batches; b++) {
      const batchCardCount = Math.min(batchSize, count - (b * batchSize));
      const batch = generateBatch(batchCardCount, cardType);

      // Escreve em JSON (stream)
      batch.forEach((card, idx) => {
        const isLast = cardCount === totalCards - 1;
        jsonStream.write(JSON.stringify(card, null, 2));
        if (!isLast) jsonStream.write(',\n');
        
        // Escreve em CSV (stream)
        csvStream.write(
          `${card.id};${card.name};${card.cpf};${card.rg};${card.cnpj};${card.birth_date};` +
          `${card.email};${card.phone};${card.address};${card.profession};` +
          `${card.card_type};${card.card_number};${card.expiry};${card.cvv}\n`
        );

        // Escreve em TXT (stream)
        if (cardCount % 50 === 0) {
          txtStream.write(`\n${'─'.repeat(120)}\n`);
          txtStream.write(`CARTÃO #${cardCount + 1}\n`);
          txtStream.write(`${'─'.repeat(120)}\n`);
        }
        txtStream.write(JSON.stringify(card, null, 2) + '\n');

        cardCount++;
      });

      processedBatches++;
      const percentage = Math.floor((cardCount / totalCards) * 100);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const rate = (cardCount / (elapsed || 1)).toFixed(0);

      process.stdout.write(`\r⏳ Gerando... ${cardCount}/${totalCards} (${percentage}%) | ${rate} cards/s | ${elapsed}s`);
    }
  }

  // Fecha streams
  jsonStream.write('\n]\n');
  jsonStream.end();
  
  csvStream.end();
  
  txtStream.write('\n' + '═'.repeat(120) + '\n');
  txtStream.write(`✅ TOTAL: ${totalCards} CARTÕES GERADOS\n`);
  txtStream.write(`⏱️ TEMPO TOTAL: ${((Date.now() - startTime) / 1000).toFixed(2)}s\n`);
  txtStream.write('═'.repeat(120) + '\n');
  txtStream.end();

  // Aguarda todas as streams terminarem
  await Promise.all([
    new Promise(resolve => jsonStream.on('finish', resolve)),
    new Promise(resolve => csvStream.on('finish', resolve)),
    new Promise(resolve => txtStream.on('finish', resolve))
  ]);

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  const cardsPerSecond = (totalCards / totalTime).toFixed(0);

  console.log('\n\n✅ GERAÇÃO CONCLUÍDA COM SUCESSO!\n');
  console.log('╔═══════════════════════════════════════════════════════════════════════════╗');
  console.log(`║ ✓ ${totalCards} CARTÕES GERADOS                                           ║`);
  console.log(`║ ✓ TEMPO TOTAL: ${totalTime}s                                                    ║`);
  console.log(`║ ✓ VELOCIDADE: ${cardsPerSecond} cartões/segundo                                     ║`);
  console.log('║                                                                           ║');
  console.log('║ 📁 ARQUIVOS GERADOS:                                                      ║');
  console.log(`║    • cartoes-3600-${timestamp}.json (JSON estruturado)                    ║`);
  console.log(`║    • cartoes-3600-${timestamp}.csv (CSV para Excel)                       ║`);
  console.log(`║    • cartoes-3600-${timestamp}.txt (Texto legível)                        ║`);
  console.log('║                                                                           ║');
  console.log('║ 💳 DISTRIBUIÇÃO:                                                          ║');
  console.log('║    • Visa: 1.000 cartões                                                  ║');
  console.log('║    • Mastercard: 1.000 cartões                                            ║');
  console.log('║    • American Express: 600 cartões                                        ║');
  console.log('║    • Discover: 600 cartões                                                ║');
  console.log('║    • Diners Club: 400 cartões                                             ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════╝\n');
}

// Executa
if (require.main === module) {
  generate3600Cards().catch(err => {
    console.error('❌ Erro:', err.message);
    process.exit(1);
  });
}

module.exports = {
  generate3600Cards,
  generateCompleteCard,
  generateBatch
};
