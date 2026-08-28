# 📊 COMO ACESSAR OS DADOS DOS 3600 CARTÕES

## 🎯 Opções Rápidas

### **1️⃣ VER OS ARQUIVOS NO SEU COMPUTADOR**

Após executar `node gerar-3600.js`, você terá 3 arquivos:

```
cartoes-3600-1724874224000.json  (2.5 MB)
cartoes-3600-1724874224000.csv   (800 KB)
cartoes-3600-1724874224000.txt   (3.5 MB)
```

---

## 📂 **ABRIR COM PROGRAMAS NORMAIS:**

### **A) Abrir CSV no Excel/Planilha:**

**Windows:**
1. Clique com botão direito em `cartoes-3600-[...].csv`
2. Abrir com → Excel/Planilha Google
3. Pronto! Todos os dados em colunas

**Mac:**
1. Clique duplo em `cartoes-3600-[...].csv`
2. Abre automaticamente em Excel/Numbers
3. Veja todos os 3600 cartões organizados

**Linux:**
```bash
libreoffice --calc cartoes-3600-[...].csv
```

---

### **B) Abrir TXT em Bloco de Notas:**

Clique duplo em `cartoes-3600-[...].txt` para ver todos os dados em texto legível

---

### **C) Abrir JSON em Editor de Código:**

Use qualquer editor:
- Visual Studio Code
- Sublime Text
- Notepad++
- WebStorm

---

## 💻 **ACESSAR EM NODE.JS (PROGRAMATICAMENTE):**

### **1. Ler todos os cartões:**

```javascript
const fs = require('fs');

// Leia o arquivo JSON
const cards = JSON.parse(fs.readFileSync('cartoes-3600-1724874224000.json', 'utf-8'));

console.log(`Total de cartões: ${cards.length}`);
console.log(cards[0]); // Primeiro cartão
```

**Saída:**
```javascript
{
  id: '12345678901-1724874224000',
  timestamp: '2026-08-28T20:23:44.000Z',
  name: 'João Silva',
  cpf: '123.456.789-01',
  rg: '12.345.678-9',
  cnpj: '12.345.678/0001-90',
  birth_date: '15/05/1985',
  email: 'joao.silva123@gmail.com',
  phone: '(11) 98765-4321',
  address: 'Rua das Flores, 123 - São Paulo, SP 01234-567',
  profession: 'Engenheiro',
  card_type: 'Visa',
  card_number: '4532015112830366',
  expiry: '12/28',
  cvv: '123'
}
```

---

### **2. Filtrar apenas Visa:**

```javascript
const fs = require('fs');
const cards = JSON.parse(fs.readFileSync('cartoes-3600-1724874224000.json', 'utf-8'));

const visa = cards.filter(card => card.card_type === 'Visa');

console.log(`Total Visa: ${visa.length}`); // 1000
visa.forEach(card => {
  console.log(`${card.name} - ${card.card_number}`);
});
```

---

### **3. Filtrar por nome:**

```javascript
const cards = JSON.parse(fs.readFileSync('cartoes-3600-1724874224000.json', 'utf-8'));

const joao = cards.filter(card => card.name.includes('João'));

console.log(`Cartões de João: ${joao.length}`);
console.log(joao);
```

---

### **4. Buscar um cartão específico:**

```javascript
const cards = JSON.parse(fs.readFileSync('cartoes-3600-1724874224000.json', 'utf-8'));

// Buscar por CPF
const card = cards.find(c => c.cpf === '123.456.789-01');
console.log(card);

// Buscar por número de cartão
const cardByNumber = cards.find(c => c.card_number === '4532015112830366');
console.log(cardByNumber);
```

---

### **5. Contar cartões por tipo:**

```javascript
const cards = JSON.parse(fs.readFileSync('cartoes-3600-1724874224000.json', 'utf-8'));

const stats = {};
cards.forEach(card => {
  stats[card.card_type] = (stats[card.card_type] || 0) + 1;
});

console.log(stats);
// {
//   Visa: 1000,
//   Mastercard: 1000,
//   'American Express': 600,
//   Discover: 600,
//   'Diners Club': 400
// }
```

---

### **6. Exportar dados filtrados:**

```javascript
const fs = require('fs');
const cards = JSON.parse(fs.readFileSync('cartoes-3600-1724874224000.json', 'utf-8'));

// Apenas Mastercard
const mastercard = cards.filter(c => c.card_type === 'Mastercard');

// Salvar em novo arquivo
fs.writeFileSync('mastercard-1000.json', JSON.stringify(mastercard, null, 2));

console.log('✅ Mastercard exportados para mastercard-1000.json');
```

---

## 🐍 **ACESSAR EM PYTHON:**

### **1. Ler todos os cartões:**

```python
import json

with open('cartoes-3600-1724874224000.json', 'r', encoding='utf-8') as f:
    cards = json.load(f)

print(f"Total de cartões: {len(cards)}")
print(cards[0])
```

---

### **2. Filtrar Visa:**

```python
import json

with open('cartoes-3600-1724874224000.json', 'r', encoding='utf-8') as f:
    cards = json.load(f)

visa = [card for card in cards if card['card_type'] == 'Visa']

print(f"Total Visa: {len(visa)}")  # 1000
for card in visa[:5]:  # Primeiros 5
    print(f"{card['name']} - {card['card_number']}")
```

---

### **3. Contar por tipo:**

```python
import json
from collections import Counter

with open('cartoes-3600-1724874224000.json', 'r', encoding='utf-8') as f:
    cards = json.load(f)

types = [card['card_type'] for card in cards]
counts = Counter(types)

print(dict(counts))
# {'Visa': 1000, 'Mastercard': 1000, 'American Express': 600, ...}
```

---

### **4. Buscar por CPF:**

```python
import json

with open('cartoes-3600-1724874224000.json', 'r', encoding='utf-8') as f:
    cards = json.load(f)

cpf_procurado = '123.456.789-01'
card = next((c for c in cards if c['cpf'] == cpf_procurado), None)

if card:
    print(card)
else:
    print("Cartão não encontrado")
```

---

### **5. Salvar em CSV:**

```python
import json
import csv

with open('cartoes-3600-1724874224000.json', 'r', encoding='utf-8') as f:
    cards = json.load(f)

with open('cartoes-novo.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=cards[0].keys(), delimiter=';')
    writer.writeheader()
    writer.writerows(cards)

print("✅ CSV criado!")
```

---

## 🗄️ **ACESSAR EM SQL (BANCO DE DADOS):**

### **1. Importar no SQLite:**

```python
import json
import sqlite3

# Criar banco de dados
conn = sqlite3.connect('cartoes.db')
cursor = conn.cursor()

# Criar tabela
cursor.execute('''
    CREATE TABLE IF NOT EXISTS cartoes (
        id TEXT PRIMARY KEY,
        timestamp TEXT,
        name TEXT,
        cpf TEXT,
        rg TEXT,
        cnpj TEXT,
        birth_date TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        profession TEXT,
        card_type TEXT,
        card_number TEXT,
        expiry TEXT,
        cvv TEXT
    )
''')

# Ler JSON
with open('cartoes-3600-1724874224000.json', 'r', encoding='utf-8') as f:
    cards = json.load(f)

# Inserir dados
for card in cards:
    cursor.execute('''
        INSERT INTO cartoes VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
    ''', (
        card['id'], card['timestamp'], card['name'], card['cpf'],
        card['rg'], card['cnpj'], card['birth_date'], card['email'],
        card['phone'], card['address'], card['profession'],
        card['card_type'], card['card_number'], card['expiry'], card['cvv']
    ))

conn.commit()
conn.close()

print("✅ 3600 cartões inseridos no banco de dados!")
```

---

### **2. Consultar no banco:**

```python
import sqlite3

conn = sqlite3.connect('cartoes.db')
cursor = conn.cursor()

# Buscar todos Visa
cursor.execute("SELECT * FROM cartoes WHERE card_type = 'Visa'")
visa_cards = cursor.fetchall()

print(f"Total Visa: {len(visa_cards)}")

# Buscar por CPF
cursor.execute("SELECT * FROM cartoes WHERE cpf = ?", ('123.456.789-01',))
card = cursor.fetchone()

print(card)

conn.close()
```

---

## 📱 **ACESSAR ONLINE (JSON Viewer):**

Copie os dados e cole em:

1. **jsoncrack.com** - Visualizador visual
2. **jsonformatter.org** - Formatar e validar
3. **jq.play** - Query JSON

---

## 🎯 **RESUMO RÁPIDO:**

| Método | Como | Dificuldade |
|--------|------|------------|
| Excel | Duplo clique no `.csv` | ⭐ Fácil |
| Notepad | Duplo clique no `.txt` | ⭐ Fácil |
| VS Code | Abrir `.json` | ⭐ Fácil |
| Node.js | `require()` ou `fs.readFileSync()` | ⭐⭐ Médio |
| Python | `json.load()` | ⭐⭐ Médio |
| SQL | Importar JSON em banco | ⭐⭐⭐ Difícil |

---

## 🚀 **EXEMPLO COMPLETO - NODE.JS:**

Crie um arquivo `acessar-cartoes.js`:

```javascript
const fs = require('fs');

// 1. Ler dados
const cards = JSON.parse(
  fs.readFileSync('cartoes-3600-1724874224000.json', 'utf-8')
);

console.log('\n📊 ESTATÍSTICAS DOS 3600 CARTÕES:\n');

// 2. Total de cartões
console.log(`✓ Total: ${cards.length} cartões`);

// 3. Por tipo
const types = {};
cards.forEach(c => {
  types[c.card_type] = (types[c.card_type] || 0) + 1;
});

console.log('\n💳 Por tipo de cartão:');
Object.entries(types).forEach(([type, count]) => {
  console.log(`   • ${type}: ${count}`);
});

// 4. Primeiros 5
console.log('\n📋 Primeiros 5 cartões:');
cards.slice(0, 5).forEach((card, i) => {
  console.log(`\n  ${i+1}. ${card.name}`);
  console.log(`     CPF: ${card.cpf}`);
  console.log(`     Cartão: ${card.card_type} - ${card.card_number}`);
  console.log(`     Validade: ${card.expiry}`);
});
```

**Executar:**
```bash
node acessar-cartoes.js
```

**Saída:**
```
📊 ESTATÍSTICAS DOS 3600 CARTÕES:

✓ Total: 3600 cartões

💳 Por tipo de cartão:
   • Visa: 1000
   • Mastercard: 1000
   • American Express: 600
   • Discover: 600
   • Diners Club: 400

📋 Primeiros 5 cartões:

  1. João Silva
     CPF: 123.456.789-01
     Cartão: Visa - 4532015112830366
     Validade: 12/28

  2. Maria Santos
     CPF: 234.567.890-12
     Cartão: Mastercard - 5425233010103442
     Validade: 03/27
```

---

## 🎯 **QUAL É A MELHOR OPÇÃO?**

- **Para ver rápido:** Excel/CSV ✅
- **Para análise simples:** Node.js ✅
- **Para análise complexa:** Python ✅
- **Para produção:** SQL/Banco de dados ✅

**Escolha a que preferir! Todos os métodos funcionam!** 🚀
