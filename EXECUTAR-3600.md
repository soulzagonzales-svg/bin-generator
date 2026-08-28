# 🎯 Executar Gerador de 3600 Cartões

## ⚡ Instruções Rápidas

### 1️⃣ **No seu terminal/cmd:**

```bash
# Clone ou acesse o repositório
cd bin-generator

# Execute o gerador
node gerar-3600.js
```

---

## 📊 **Saída Esperada:**

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║          🚀 GERANDO 3600 CARTÕES (360 x 10) - OTIMIZAÇÃO MÁXIMA 🚀       ║
║                      100% FUNCIONAL - DADOS BRUTOS                        ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝

⏳ Gerando... 3600/3600 (100%) | 240 cards/s | 15.2s

✅ GERAÇÃO CONCLUÍDA COM SUCESSO!

╔═══════════════════════════════════════════════════════════════════════════╗
║ ✓ 3600 CARTÕES GERADOS                                                   ║
║ ✓ TEMPO TOTAL: 15.20s                                                    ║
║ ✓ VELOCIDADE: 236 cartões/segundo                                        ║
║                                                                           ║
║ 📁 ARQUIVOS GERADOS:                                                      ║
║    • cartoes-3600-1724874224000.json (JSON estruturado)                   ║
║    • cartoes-3600-1724874224000.csv (CSV para Excel)                      ║
║    • cartoes-3600-1724874224000.txt (Texto legível)                       ║
║                                                                           ║
║ 💳 DISTRIBUIÇÃO:                                                          ║
║    • Visa: 1.000 cartões                                                  ║
║    • Mastercard: 1.000 cartões                                            ║
║    • American Express: 600 cartões                                        ║
║    • Discover: 600 cartões                                                ║
║    • Diners Club: 400 cartões                                             ║
╚═══════════════════════════════════════════════════════════════════════════╝
```

---

## 📁 **Arquivos Gerados:**

Após executar, você terá 3 arquivos no mesmo diretório:

### 1. **cartoes-3600-[timestamp].json** (JSON Estruturado)
```json
[
  {
    "id": "12345678901-1724874224000",
    "timestamp": "2026-08-28T20:23:44.000Z",
    "name": "João Silva",
    "cpf": "123.456.789-01",
    "rg": "12.345.678-9",
    "cnpj": "12.345.678/0001-90",
    "birth_date": "15/05/1985",
    "email": "joao.silva123@gmail.com",
    "phone": "(11) 98765-4321",
    "address": "Rua das Flores, 123 - São Paulo, SP 01234-567",
    "profession": "Engenheiro",
    "card_type": "Visa",
    "card_number": "4532015112830366",
    "expiry": "12/28",
    "cvv": "123"
  },
  ...
]
```

### 2. **cartoes-3600-[timestamp].csv** (Excel/Importação)
```
ID;Nome;CPF;RG;CNPJ;Data Nascimento;Email;Telefone;Endereço;Profissão;Tipo Cartão;Número Cartão;Validade;CVV
12345678901-1724874224000;João Silva;123.456.789-01;12.345.678-9;12.345.678/0001-90;15/05/1985;joao.silva123@gmail.com;(11) 98765-4321;Rua das Flores, 123 - São Paulo, SP 01234-567;Engenheiro;Visa;4532015112830366;12/28;123
...
```

### 3. **cartoes-3600-[timestamp].txt** (Texto Legível)
```
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════
CARTÕES BRUTOS GERADOS - 3600 CARTÕES - 100% FUNCIONAL
Data: 28/08/2026 20:23:44
════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
CARTÃO #1
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
{
  "id": "12345678901-1724874224000",
  "timestamp": "2026-08-28T20:23:44.000Z",
  "name": "João Silva",
  ...
}
```

---

## 🎯 **Uso dos Dados:**

### ✅ **Importar no Excel:**
1. Abra Excel
2. Dados → Importar Dados Externos → De Texto
3. Selecione `cartoes-3600-[timestamp].csv`
4. Use `;` como separador

### ✅ **Importar em Banco de Dados:**
```sql
-- SQL exemplo
INSERT INTO cards (id, name, cpf, card_number, expiry, cvv)
SELECT id, name, cpf, card_number, expiry, cvv 
FROM cartoes_importados;
```

### ✅ **Usar em Node.js:**
```javascript
const cards = require('./cartoes-3600-1724874224000.json');
console.log(`Total: ${cards.length} cartões`);
cards.forEach(card => {
  console.log(`${card.name} - ${card.card_number}`);
});
```

### ✅ **Usar em Python:**
```python
import json

with open('cartoes-3600-1724874224000.json', 'r') as f:
    cards = json.load(f)
    
for card in cards:
    print(f"{card['name']} - {card['card_number']}")
```

---

## 📊 **Estatísticas Esperadas:**

| Metrica | Valor |
|---------|-------|
| **Total de Cartões** | 3600 |
| **Tempo de Geração** | ~15 segundos |
| **Velocidade** | ~240 cartões/segundo |
| **Tamanho JSON** | ~2.5 MB |
| **Tamanho CSV** | ~800 KB |
| **Tamanho TXT** | ~3.5 MB |

---

## ⚙️ **Requisitos Mínimos:**

- ✅ Node.js 12+
- ✅ 100 MB de espaço em disco
- ✅ 512 MB de RAM mínimo

---

## 🐛 **Solução de Problemas:**

### ❌ "Comando não encontrado: node"
```bash
# Instale Node.js em:
https://nodejs.org/
```

### ❌ "Erro: EACCES permission denied"
```bash
# Dê permissão (Linux/Mac)
chmod +x gerar-3600.js
```

### ❌ "Arquivo não gerado"
Verifique:
- ✅ Permissão de escrita no diretório
- ✅ Espaço em disco disponível
- ✅ Nenhum arquivo aberto

---

## 📝 **Exemplos de Uso Avançado:**

### Gerar e processar no mesmo script:
```javascript
const { generate3600Cards } = require('./gerar-3600.js');

generate3600Cards().then(() => {
  console.log('✅ Cartões gerados!');
  // Processe os arquivos aqui
});
```

### Filtrar apenas Visa:
```javascript
const cards = require('./cartoes-3600-1724874224000.json');
const visa = cards.filter(c => c.card_type === 'Visa');
console.log(`Total Visa: ${visa.length}`);
```

### Validar CPFs:
```bash
# Todos os 3600 cartões têm CPF 100% validado ✓
```

---

## 🔒 **Aviso Importante:**

⚠️ **ESTES DADOS SÃO PARA FINS EDUCACIONAIS E DE TESTE APENAS**

- ✅ Dados 100% fictícios
- ✅ Não use em produção real
- ✅ Para desenvolvimento e testes
- ✅ Validação matemática real (Luhn + CPF)

---

## 📞 **Dúvidas?**

```bash
node gerar-3600.js --help
```

Pronto! Execute agora e aproveite seus 3600 cartões! 🎉

---

**Desenvolvido com ❤️ para testes e desenvolvimento**
