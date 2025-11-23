### **Le regole geniali per capire se un numero si divide senza fare la divisione**

---

## **1. Introduzione: perché servono i criteri di divisibilità?**

I criteri di divisibilità sono **trucchi matematici intelligenti** che permettono di capire in pochi secondi se un numero è divisibile per un altro _senza fare la divisione_.

Sono utilissimi quando i numeri diventano grandi, perché evitano calcoli lunghi e permettono di:

- riconoscere divisori rapidamente,
    
- semplificare frazioni,
    
- calcolare MCD/MCM,
    
- risolvere problemi,
    
- fare controlli veloci sulle espressioni,
    
- ragionare con i numeri più velocemente.
    

Ogni criterio si basa sul **valore posizionale** delle cifre e sulla struttura del numero.

---

## **2. Criterio di divisibilità per 2 (il più semplice)**

### **Regola**

Un numero è divisibile per **2** se **finisce con una cifra pari**:

**0, 2, 4, 6, 8**

### **Perché funziona?**

Perché solo l’unità decide se il numero è multiplo di 2.  
Tutte le altre cifre (decine, centinaia…) sono multipli di 10 → e 10 è già multiplo di 2.

### **Esempi**

- 456 → finisce per 6 → **divisibile per 2**
    
- 173 → finisce per 3 → **non divisibile**
    
- 10000000028 → finisce per 8 → **sì**
    

---

## **3. Criterio di divisibilità per 5**

### **Regola**

Un numero è divisibile per **5** se finisce con:

**0 oppure 5**

### **Perché funziona?**

Perché tutti i multipli di 5 terminano sempre con 0 o 5:  
$5, 10, 15, 20, 25, 30, \dots$

### **Esempi**

- 235 → finisce per 5 → **sì**
    
- 880 → finisce per 0 → **sì**
    
- 241 → finisce per 1 → **no**
    

---

## **4. Criterio di divisibilità per 10**

### **Regola**

Un numero è divisibile per **10** se finisce con:

**0**

### **Perché funziona?**

Perché 10 = $2 \cdot 5$, e ogni multiplo di 10 termina con zero.

### **Esempi**

- 520 → **sì**
    
- 3000 → **sì**
    
- 732 → **no**
    

---

## **5. Criterio di divisibilità per 4**

### _(Molto utile e spesso sottovalutato)_

### **Regola**

Un numero è divisibile per **4** se **le sue ultime due cifre** formano un numero divisibile per 4.

### **Perché funziona?**

Perché un numero naturale si può scrivere come:

$$  
\text{numero} = 100 \cdot k + (\text{ultime due cifre})  
$$

E poiché 100 è multiplo di 4:

$$  
100 \cdot k ; \text{è sempre divisibile per 4}  
$$

Quindi decide tutto il numero formato dalle ultime due cifre.

### **Esempi**

- **312** → ultime due cifre: **12** → 12 è divisibile per 4 → **sì**
    
- **538** → ultime due cifre: **38** → 38 non è divisibile per 4 → **no**
    
- **7200** → ultime due cifre: **00** → 0 è divisibile per 4 → **sì**
    

### **Esempi avanzati**

- 982, perché 82 non è divisibile per 4 → **no**
    
- 14736 → ultime due cifre: 36 → 36 sì → **divisibile**
    

---

## **6. Criterio di divisibilità per 3**

### **Regola**

Un numero è divisibile per **3** se **la somma delle sue cifre** è divisibile per 3.

### **Perché funziona?**

Perché:

- 10 ≡ 1 (mod 3)
    
- 100 ≡ 1 (mod 3)
    
- 1000 ≡ 1 (mod 3)
    

Ogni cifra contribuisce come se valesse solo la cifra stessa → conta **solo la somma delle cifre**.

### **Esempi**

- 27 → $2 + 7 = 9$ → 9 è divisibile per 3 → **sì**
    
- 345 → $3+4+5 = 12$ → 12 è divisibile per 3 → **sì**
    
- 1337 → $1+3+3+7 = 14$ → 14 no → **non divisibile**
    

---

## **7. Criterio di divisibilità per 9**

### **Regola**

Un numero è divisibile per **9** se **la somma delle sue cifre** è divisibile per 9.

### **Perché funziona?**

Per lo stesso motivo del criterio del 3:

- $10 \equiv 1$ (mod 9)
    
- $100 \equiv 1$ (mod 9)
    
- $1000 \equiv 1$ (mod 9)
    

### **Esempi**

- 81 → $8 + 1 = 9$ → **sì**
    
- 729 → $7+2+9 = 18$ → **sì**
    
- 1003 → $1+0+0+3 = 4$ → **no**
    

### **Esempio avanzato**

Numero enorme:

**457123896**

Somma cifre =  
$4+5+7+1+2+3+8+9+6 = 45$

45 è multiplo di 9 → **sì, numero divisibile per 9**

---

## **8. Riepilogo dei criteri (tutti in un colpo d’occhio)**

|Numero|Regola veloce|Perché funziona|
|---|---|---|
|**2**|ultima cifra pari|conta solo l’unità|
|**4**|ultime 2 cifre formano numero divisibile per 4|100 è multiplo di 4|
|**5**|ultima cifra 0 o 5|multipli di 5|
|**9**|somma cifre multipla di 9|10 ≡ 1 mod 9|
|**3**|somma cifre multipla di 3|10 ≡ 1 mod 3|
|**10**|ultima cifra 0|multipli di 10|

---

## **9. Problemi avanzati con criteri combinati**

### **Esempio 1 — Divisibile per 6?**

Un numero è divisibile per 6 se:

- è divisibile per 2
    
- ed è divisibile per 3
    

Esempio:  
132 → finisce per 2 (pari) → sì  
Somma cifre: $1+3+2 = 6$ → sì  
→ **132 è divisibile per 6**

---

### **Esempio 2 — Divisibile per 12?**

12 = $3 \cdot 4$  
quindi deve essere:

- divisibile per 3
    
- e per 4
    

Esempio: 348

- ultime due cifre: 48 → divisibile per 4
    
- somma cifre: $3+4+8 = 15$ → divisibile per 3  
    → **348 è divisibile per 12**
    

---

### **Esempio 3 — Trovare cifre mancanti**

Il numero **4□82** è divisibile per 9.  
Qual è la cifra mancante?

Somma cifre: $4 + □ + 8 + 2 = 14 + □$  
Deve essere multiplo di 9 → 18, 27, 36…

La prima è 18 →  
$14 + □ = 18$ → □ = 4

Numero: **4482** → divisibile per 9.

---

## **10. Conclusione**

In questa lezione hai imparato i criteri che permettono di:

- capire rapidamente se un numero è divisibile,
    
- evitare calcoli lunghi,
    
- riconoscere multipli e divisori,
    
- prepararti all’MCD e all’MCM,
    
- affrontare frazioni e semplificazioni.
    

Questi criteri sono strumenti potentissimi: una volta imparati diventano automatici.