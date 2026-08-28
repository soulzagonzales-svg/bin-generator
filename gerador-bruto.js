#!/usr/bin/env node

/**
 * GERADOR BRUTO COMPLETO - TODAS AS INFORMAÇÕES
 * Gera TODOS os cartões com DADOS BRUTOS E COMPLETOS
 * SEM FORMATAÇÃO - DADOS PUROS PARA BANCO DE DADOS
 * VERSÃO: 2.0.0 - MEGA PRODUÇÃO
 */

const fs = require('fs');
const path = require('path');

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
  'Campinas', 'Santos', 'Sorocaba', 'Jundiaí', 'Limeira', 'Ribeirão Preto',
  'Piracicaba', 'Jaboticabal', 'Franca', 'Araraquara', 'São Carlos', 'Guarulhos',
  'Osasco', 'Mauá', 'São Bernardo do Campo', 'Santo André', 'Diadema'
];

const STATES = [
  'SP', 'RJ', 'MG', 'DF', 'BA', 'CE', 'AM', 'PR', 'PE', 'RS', 'GO', 'PA', 
  'AL', 'PI', 'PB', 'RN', 'MS', 'MT', 'TO', 'AC', 'RR', 'AP', 'ES', 'SC'
];

const STREET_TYPES = [
  'Rua', 'Avenida', 'Travessa', 'Alameda', 'Estrada', 'Boulevard', 'Passagem',
  'Praça', 'Largo', 'Beco', 'Caminho', 'Servidão', 'Rodovia', 'Viaduto'
];

const STREET_NAMES = [
  'das Flores', 'Principal', 'Central', 'do Comércio', 'Getúlio Vargas',
  'Tiradentes', 'Brasil', 'América', 'Independência', 'Liberdade', 'Esperança',
  'Felicidade', 'Paz', 'dos Santos', 'da República', 'Paulista',
  'Augusta', 'Oscar Freire', 'Brigadeiro', 'das Acácias', 'Dom Pedro',
  'dos Bandeirantes', 'do Ouvidor', 'da Consolação', 'da Paz', 'do Carmo'
];

const PROFESSIONS = [
  'Engenheiro', 'Médico', 'Advogado', 'Contador', 'Gerente', 'Analista',
  'Programador', 'Designer', 'Professor', 'Empresário', 'Vendedor', 'Consultor',
  'Psicólogo', 'Dentista', 'Enfermeiro', 'Técnico', 'Eletricista', 'Encanador',
  'Motorista', 'Cozinheiro', 'Chef', 'Diretor', 'Coordenador', 'Supervisor',
  'Arquiteto', 'Fotógrafo', 'Jornalista', 'Administrador', 'Economista',
  'Farmacêutico', 'Fisioterapeuta', 'Nutricionista', 'Veterinário', 'Zahoeiro'
];

const DOMAINS = [
  'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'email.com',
  'uol.com.br', 'bol.com.br', 'terra.com.br', 'ig.com.br', 'oi.com.br',
  'live.com', 'aol.com', 'protonmail.com', 'tutanota.com', 'disroot.org'
];

const BANK_TYPES = ['Visa', 'Mastercard', 'American Express', 'Discover', 'Diners Club'];

/**
 * Calcula checksum de Luhn - BRUTO
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
 * Valida CPF - BRUTO
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
 * Gera CPF BRUTO (com e sem formatação)
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
  
  return {
    raw: cpf,
    formatted: formatted,
    valid: validateCPF(formatted)
  };
}

/**
 * Gera RG BRUTO
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
  
  return {
    raw: rg,
    formatted: `${rg.substring(0, 2)}.${rg.substring(2, 5)}.${rg.substring(5, 8)}-${rg.substring(8)}`
  };
}

/**
 * Gera CNPJ BRUTO
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
  
  return {
    raw: cnpj,
    formatted: `${cnpj.substring(0, 2)}.${cnpj.substring(2, 5)}.${cnpj.substring(5, 8)}/${cnpj.substring(8, 12)}-${cnpj.substring(12)}`
  };
}

/**
 * Gera data de nascimento BRUTA
 */
function generateBirthDate() {
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 65, today.getMonth(), today.getDate());
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const randomDate = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
  
  const day = String(randomDate.getDate()).padStart(2, '0');
  const month = String(randomDate.getMonth() + 1).padStart(2, '0');
  const year = randomDate.getFullYear();
  
  return {
    formatted: `${day}/${month}/${year}`,
    raw: `${year}${month}${day}`,
    iso: randomDate.toISOString().split('T')[0],
    day: parseInt(day),
    month: parseInt(month),
    year: year,
    timestamp: randomDate.getTime()
  };
}

/**
 * Calcula idade BRUTA
 */
function calculateAge(birthDate) {
  const birth = new Date(birthDate.year, birthDate.month - 1, birthDate.day);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

/**
 * Gera nome BRUTO
 */
function generateName() {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return {
    first_name: first,
    last_name: last,
    full_name: `${first} ${last}`,
    uppercase: `${first.toUpperCase()} ${last.toUpperCase()}`,
    lowercase: `${first.toLowerCase()} ${last.toLowerCase()}`,
    initials: `${first.charAt(0)}${last.charAt(0)}`
  };
}

/**
 * Gera email BRUTO
 */
function generateEmail(name) {
  const namePart = name.toLowerCase().replace(/\s+/g, '.');
  const domain = DOMAINS[Math.floor(Math.random() * DOMAINS.length)];
  const number = Math.floor(Math.random() * 9999);
  
  return {
    email: `${namePart}${number}@${domain}`,
    username: `${namePart}${number}`,
    domain: domain,
    provider: domain.split('.')[0]
  };
}

/**
 * Gera telefone BRUTO
 */
function generatePhone() {
  const ddd = String(Math.floor(Math.random() * 85) + 11).padStart(2, '0');
  const first = String(Math.floor(Math.random() * 9) + 1);
  const middle = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  const last = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  const raw = ddd + '9' + first + middle + last;
  
  return {
    formatted: `(${ddd}) 9${first}${middle}-${last}`,
    raw: raw,
    ddd: ddd,
    number: `9${first}${middle}${last}`,
    country_code: '+55',
    international: `+55 ${ddd} 9 ${first}${middle}-${last}`
  };
}

/**
 * Gera endereço BRUTO
 */
function generateAddress() {
  const streetType = STREET_TYPES[Math.floor(Math.random() * STREET_TYPES.length)];
  const streetName = STREET_NAMES[Math.floor(Math.random() * STREET_NAMES.length)];
  const number = Math.floor(Math.random() * 9999) + 1;
  const city = CITIES[Math.floor(Math.random() * CITIES.length)];
  const state = STATES[Math.floor(Math.random() * STATES.length)];
  const zipRaw = String(Math.floor(Math.random() * 99999999)).padStart(8, '0');
  const zip = `${zipRaw.substring(0, 5)}${zipRaw.substring(5)}`;
  const complements = ['Apt. 101', 'Casa 45', 'Apto. 502', 'Loja 3', 'Sala 201', ''];
  const complement = complements[Math.floor(Math.random() * complements.length)];
  const neighborhood = STREET_NAMES[Math.floor(Math.random() * STREET_NAMES.length)].replace('das ', '').replace('do ', '').replace('da ', '');
  
  return {
    street_type: streetType,
    street_name: streetName,
    street_full: `${streetType} ${streetName}`,
    number: number,
    complement: complement || null,
    neighborhood: neighborhood,
    city: city,
    state: state,
    zip_code: zip,
    zip_formatted: `${zip.substring(0, 5)}-${zip.substring(5)}`,
    country: 'Brazil',
    country_code: 'BR',
    full_address: `${streetType} ${streetName}, ${number} ${complement} - ${neighborhood}, ${city}, ${state} ${zip.substring(0, 5)}-${zip.substring(5)}, Brazil`.replace(/\s+/g, ' ').trim()
  };
}

/**
 * Gera número de cartão BRUTO
 */
function generateCardNumber(cardType = null) {
  const prefixes = {
    'Visa': '4',
    'Mastercard': '5',
    'American Express': '3',
    'Discover': '6',
    'Diners Club': '36'
  };

  let prefix;
  if (cardType) {
    prefix = prefixes[cardType];
  } else {
    const types = Object.keys(prefixes);
    cardType = types[Math.floor(Math.random() * types.length)];
    prefix = prefixes[cardType];
  }

  let cardNumber = prefix;
  while (cardNumber.length < 15) {
    cardNumber += Math.floor(Math.random() * 10);
  }

  const checksum = calculateLuhnChecksum(cardNumber);
  const complete = cardNumber + checksum;

  return {
    card_type: cardType,
    prefix: prefix,
    raw: complete,
    formatted: complete.replace(/(\d{4})/g, '$1 ').trim(),
    formatted_masked: complete.substring(0, 6) + '*'.repeat(8) + complete.substring(14),
    first_6: complete.substring(0, 6),
    last_4: complete.substring(12),
    length: complete.length,
    valid: validateCard(complete)
  };
}

/**
 * Valida cartão
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
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

/**
 * Gera data de validade BRUTA
 */
function generateExpiryDate() {
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const year = String(Math.floor(Math.random() * 10) + 25);
  const fullYear = `20${year}`;
  
  return {
    formatted: `${month}/${year}`,
    raw: `${month}${year}`,
    month: parseInt(month),
    year: parseInt(year),
    full_year: parseInt(fullYear),
    iso: `${fullYear}-${month}-01`
  };
}

/**
 * Gera CVV BRUTO
 */
function generateCVV(isAmex = false) {
  const length = isAmex ? 4 : 3;
  const cvv = String(Math.floor(Math.random() * Math.pow(10, length))).padStart(length, '0');
  
  return {
    value: cvv,
    raw: cvv,
    length: length,
    type: isAmex ? 'CID' : 'CVV2'
  };
}

/**
 * GERA CARTÃO COMPLETO COM DADOS BRUTOS
 */
function generateCompleteCard(cardType = null) {
  const name = generateName();
  const birthDate = generateBirthDate();
  const card = generateCardNumber(cardType);
  const cpf = generateCPF();
  const rg = generateRG();
  const cnpj = generateCNPJ();
  const email = generateEmail(name.full_name);
  const phone = generatePhone();
  const address = generateAddress();
  const expiry = generateExpiryDate();
  const cvv = generateCVV(card.card_type === 'American Express');
  const profession = PROFESSIONS[Math.floor(Math.random() * PROFESSIONS.length)];
  const motherName = generateName();
  const age = calculateAge(birthDate);

  const timestamp = new Date();

  return {
    // ID e metadata
    id: `${cpf.raw}-${timestamp.getTime()}`,
    timestamp: timestamp.toISOString(),
    timestamp_unix: timestamp.getTime(),
    date_time: timestamp.toLocaleString('pt-BR'),
    
    // DADOS PESSOAIS BRUTOS
    personal: {
      names: name,
      date_birth: birthDate,
      age: age,
      gender: Math.random() > 0.5 ? 'M' : 'F',
      mother_name: motherName.full_name,
      mother_name_details: motherName,
      profession: profession,
      marital_status: ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'][Math.floor(Math.random() * 4)]
    },
    
    // DOCUMENTOS BRUTOS
    documents: {
      cpf: cpf,
      rg: rg,
      cnpj: cnpj,
      passport: `BR${Math.random().toString().substring(2, 11)}`,
      driver_license: `${Math.floor(Math.random() * 9999999999)}`
    },
    
    // CONTATO BRUTO
    contact: {
      email: email,
      phone: phone,
      whatsapp: phone.raw,
      telegram: `+55${phone.ddd}9${phone.number.substring(1)}`
    },
    
    // ENDEREÇO BRUTO COMPLETO
    address: address,
    
    // CARTÃO BRUTO COMPLETO
    credit_card: {
      ...card,
      holder_name: name.full_name,
      cardholder_name_raw: name.uppercase,
      expiry_date: expiry,
      cvv: cvv,
      card_holder: {
        first_name: name.first_name,
        last_name: name.last_name,
        full_name: name.full_name
      },
      security: {
        cvv: cvv.value,
        pin: String(Math.floor(Math.random() * 10000)).padStart(4, '0'),
        password: Math.random().toString(36).substring(2, 12)
      }
    },
    
    // VALIDAÇÕES BRUTAS
    validations: {
      cpf_valid: cpf.valid,
      card_valid: card.valid,
      expiry_valid: expiry.month > 0 && expiry.month <= 12,
      data_complete: true
    },
    
    // DADOS BANCÁRIOS ADICIONAIS
    banking: {
      account_number: String(Math.floor(Math.random() * 999999999)).padStart(9, '0'),
      account_digit: Math.floor(Math.random() * 9),
      bank_code: String(Math.floor(Math.random() * 300)).padStart(3, '0'),
      bank_name: ['Banco do Brasil', 'Caixa Econômica', 'Itaú', 'Bradesco', 'Santander'][Math.floor(Math.random() * 5)],
      agency: String(Math.floor(Math.random() * 9999)).padStart(4, '0'),
      agency_digit: Math.floor(Math.random() * 9)
    }
  };
}

/**
 * GERA TODOS OS CARTÕES
 */
function generateAllCardsRaw(quantities = {}) {
  const defaultQties = {
    'Visa': 100,
    'Mastercard': 100,
    'American Express': 60,
    'Discover': 60,
    'Diners Club': 40
  };

  const qties = { ...defaultQties, ...quantities };
  const allCards = [];

  console.log('\n╔════════════════════════════════════════════════════════════════════════╗');
  console.log('║                                                                        ║');
  console.log('║        🎯 GERANDO TODOS OS CARTÕES - DADOS BRUTOS COMPLETOS 🎯       ║');
  console.log('║                   SEM FORMATAÇÃO - DADOS PUROS                        ║');
  console.log('║                                                                        ║');
  console.log('╚════════════════════════════════════════════════════════════════════════╝\n');

  let totalCount = 0;
  const types = Object.keys(qties);

  types.forEach(type => {
    const count = qties[type];
    console.log(`⏳ Gerando ${count} cartões ${type}...`);
    
    for (let i = 0; i < count; i++) {
      allCards.push(generateCompleteCard(type));
    }
    
    totalCount += count;
    console.log(`   ✅ ${count} cartões ${type} gerados`);
  });

  console.log(`\n✅ ${totalCount} CARTÕES GERADOS COM SUCESSO!\n`);

  return allCards;
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === 'help') {
    console.log('\n╔════════════════════════════════════════════════════════════════════════╗');
    console.log('║              🎯 GERADOR BRUTO - DADOS COMPLETOS SEM LIMITE 🎯         ║');
    console.log('║                  TODAS AS INFORMAÇÕES - DADOS PUROS                   ║');
    console.log('╚════════════════════════════════════════════════════════════════════════╝\n');
    
    console.log('COMANDOS:');
    console.log('  node gerador-bruto.js all');
    console.log('  node gerador-bruto.js all 10');
    console.log('  node gerador-bruto.js custom Visa:100 Mastercard:100 "American Express":50');
    console.log('  node gerador-bruto.js json');
    console.log('  node gerador-bruto.js csv');
    console.log('  node gerador-bruto.js txt');
    console.log('  node gerador-bruto.js sample 1');
    console.log('  node gerador-bruto.js help\n');

    console.log('TIPOS:');
    console.log('  • Visa');
    console.log('  • Mastercard');
    console.log('  • American Express');
    console.log('  • Discover');
    console.log('  • Diners Club\n');

    return;
  }

  try {
    const command = args[0];

    if (command === 'all') {
      const multiplier = parseInt(args[1]) || 1;
      const quantities = {
        'Visa': 100 * multiplier,
        'Mastercard': 100 * multiplier,
        'American Express': 60 * multiplier,
        'Discover': 60 * multiplier,
        'Diners Club': 40 * multiplier
      };

      const cards = generateAllCardsRaw(quantities);
      const totalCount = cards.length;

      // Salva JSON
      const jsonFile = `cartoes-brutos-${totalCount}-${new Date().getTime()}.json`;
      fs.writeFileSync(jsonFile, JSON.stringify(cards, null, 2));
      console.log(`📁 JSON salvo: ${jsonFile}\n`);

      // Salva CSV
      const csvFile = `cartoes-brutos-${totalCount}-${new Date().getTime()}.csv`;
      const csvContent = [];
      
      // Headers
      const headers = [
        'ID', 'Data', 'Nome', 'CPF', 'RG', 'CNPJ', 'Data Nascimento', 'Idade',
        'Email', 'Telefone', 'Rua', 'Número', 'Complemento', 'Bairro', 'Cidade', 'Estado', 'CEP',
        'Tipo Cartão', 'Número Cartão', 'Validade', 'CVV', 'Válido'
      ];
      csvContent.push(headers.join(';'));
      
      cards.forEach(card => {
        const row = [
          card.id,
          card.timestamp,
          card.personal.names.full_name,
          card.documents.cpf.formatted,
          card.documents.rg.formatted,
          card.documents.cnpj.formatted,
          card.personal.date_birth.formatted,
          card.personal.age,
          card.contact.email.email,
          card.contact.phone.formatted,
          card.address.street_full,
          card.address.number,
          card.address.complement || '',
          card.address.neighborhood,
          card.address.city,
          card.address.state,
          card.address.zip_formatted,
          card.credit_card.card_type,
          card.credit_card.raw,
          card.credit_card.expiry_date.formatted,
          card.credit_card.cvv.value,
          card.credit_card.valid ? 'Sim' : 'Não'
        ];
        csvContent.push(row.join(';'));
      });
      
      fs.writeFileSync(csvFile, csvContent.join('\n'), 'utf-8');
      console.log(`📊 CSV salvo: ${csvFile}\n`);

      // Salva TXT
      const txtFile = `cartoes-brutos-${totalCount}-${new Date().getTime()}.txt`;
      const txtContent = [];
      txtContent.push('═'.repeat(100));
      txtContent.push('CARTÕES BRUTOS - DADOS COMPLETOS - 100% FUNCIONAL');
      txtContent.push(`Total: ${totalCount} cartões gerados`);
      txtContent.push(`Data: ${new Date().toLocaleString('pt-BR')}`);
      txtContent.push('═'.repeat(100));
      txtContent.push('');

      cards.forEach((card, idx) => {
        txtContent.push(`CARTÃO #${idx + 1}`);
        txtContent.push('─'.repeat(100));
        txtContent.push(JSON.stringify(card, null, 2));
        txtContent.push('');
      });

      fs.writeFileSync(txtFile, txtContent.join('\n'));
      console.log(`📄 TXT salvo: ${txtFile}\n`);

      console.log(`✅ ${totalCount} cartões exportados em 3 formatos!\n`);

    } else if (command === 'custom') {
      const quantities = {};
      for (let i = 1; i < args.length; i++) {
        const [type, count] = args[i].split(':');
        quantities[type] = parseInt(count) || 10;
      }

      const cards = generateAllCardsRaw(quantities);
      const totalCount = cards.length;

      const jsonFile = `cartoes-custom-${totalCount}-${new Date().getTime()}.json`;
      fs.writeFileSync(jsonFile, JSON.stringify(cards, null, 2));
      
      console.log(`\n✅ ${totalCount} cartões customizados salvos em: ${jsonFile}\n`);

    } else if (command === 'json') {
      const cards = generateAllCardsRaw({
        'Visa': 50,
        'Mastercard': 50,
        'American Express': 30,
        'Discover': 30,
        'Diners Club': 20
      });

      console.log(JSON.stringify(cards, null, 2));

    } else if (command === 'sample') {
      const count = parseInt(args[1]) || 1;
      const cards = [];
      
      BANK_TYPES.forEach(type => {
        for (let i = 0; i < count; i++) {
          cards.push(generateCompleteCard(type));
        }
      });

      console.log('\n' + JSON.stringify(cards, null, 2));

    } else {
      console.error(`❌ Comando desconhecido: ${command}`);
      console.log('Use "node gerador-bruto.js help" para ajuda\n');
    }
  } catch (error) {
    console.error(`❌ Erro: ${error.message}\n`);
    console.error(error.stack);
  }
}

module.exports = {
  generateCompleteCard,
  generateAllCardsRaw,
  generateCPF,
  generateRG,
  generateCNPJ,
  generateName,
  generateEmail,
  generatePhone,
  generateAddress,
  generateCardNumber,
  validateCPF,
  validateCard
};
