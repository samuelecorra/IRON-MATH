## **1. Introduzione: perché partire da qui?**

Pari e dispari non sono solo “numeri che finiscono in un certo modo”.  
Sono la **prima forma di divisibilità** che gli studenti incontrano:

- un numero **pari** è un numero **divisibile per 2**;
    
- un numero **dispari** è un numero **non divisibile per 2**.
    

Capire bene questa distinzione significa:

- capire la **divisibilità** in modo intuitivo,
    
- prepararsi ai criteri di divisibilità più complessi (3, 5, 9, 10, …),
    
- iniziare a ragionare sui numeri come _strutture_.
    

---

## **2. Definizione profonda (ma spiegata in modo semplice)**

### **Numero pari**

Un numero naturale è **pari** se può essere scritto come:

$$  
\text{pari} = 2 \cdot k  
$$

per qualche numero naturale $k$.

In altre parole:

> un numero è **pari** se “sta dentro” 2 in modo perfetto, senza resto.

Esempi:

- $2 = 2 \cdot 1$
    
- $8 = 2 \cdot 4$
    
- $100 = 2 \cdot 50$
    
- $0 = 2 \cdot 0$ (zero è pari!)
    

---

### **Numero dispari**

Un numero è **dispari** se può essere scritto come:

$$  
\text{dispari} = 2 \cdot k + 1  
$$

per qualche numero naturale $k$.

Che significa:

> è un numero che **non** si può dividere per 2 senza avere resto 1.

Esempi:

- $1 = 2 \cdot 0 + 1$
    
- $7 = 2 \cdot 3 + 1$
    
- $21 = 2 \cdot 10 + 1$
    

---

## **3. La regola pratica (facilissima)**

### **Un numero è pari se la sua ultima cifra è:**

**0, 2, 4, 6, 8**

### **Un numero è dispari se la sua ultima cifra è:**

**1, 3, 5, 7, 9**

Questa regola funziona SEMPRE, anche per numeri enormi.

Esempio:

- 847362 → finisce per 2 → PARI
    
- 739251 → finisce per 1 → DISPARI
    
- 1000000000007 → finisce per 7 → DISPARI
    

---

## **4. La spiegazione profonda: perché conta SOLO l’ultima cifra?**

Perché un numero naturale scritto in forma decimale è fatto così:

$$  
\text{numero} = (\text{parte delle migliaia}) \cdot 10 + \text{unità}  
$$

E osserva:

- tutte le decine, centinaia, migliaia…  
    sono multipli di 10 → quindi **sempre pari**
    
- l’unica parte che può essere pari o dispari è **l’unità**
    

Quindi l’intero numero è pari o dispari **solo** in base all’ultima cifra.

Questo è un esempio perfetto di come funziona il **valore posizionale**.

---

## **5. Perché i numeri pari e dispari si alternano?**

Sequenza:

$$  
0, 1, 2, 3, 4, 5, 6, 7, 8, 9, \dots  
$$

Ogni numero successivo aggiunge +1 rispetto al precedente.

Se un numero è multiplo di 2:

- aggiungere +1 → rompe la divisibilità → diventa dispari
    
- aggiungere +1 a un dispari → lo fa diventare multiplo di 2
    

Quindi i numeri pari e dispari si alternano come il battito di un metronomo:

> PARI → DISPARI → PARI → DISPARI → …

Non ci saranno mai due pari di fila, né due dispari di fila.

---

## **6. Conseguenze utilissime (regole che userai sempre)**

### **1. Somma di due pari → pari**

$2k + 2h$ = $2(k+h)$ → multiplo di 2

Esempio: $8 + 6 = 14$

---

### **2. Somma di due dispari → pari**

$(2k+1) + (2h+1) = 2(k+h+1)$ → multiplo di 2

Esempio: $7 + 5 = 12$

---

### **3. Pari + dispari → dispari**

$2k + (2h+1) = 2(k+h) + 1$

Esempio: $10 + 3 = 13$

---

### **4. Prodotto di pari per qualsiasi numero → sempre pari**

$2k \cdot n = 2(kn)$ → multiplo di 2

Esempi:  
$4 \cdot 7 = 28$ (pari)  
$12 \cdot 9 = 108$ (pari)

---

### **5. Prodotto di due dispari → dispari**

$(2k+1)(2h+1) = 2(\text{qualcosa}) + 1$

Esempio: $7 \cdot 3 = 21$

---

## **7. Errori tipici degli studenti**

### **Errore 1 — Pensare che un numero pari sia “un numero che finisce per 0”**

Assolutamente no:  
anche 2, 4, 6, 8 sono pari.

---

### **Errore 2 — Pensare che un dispari sia “un numero che non finisce per 0”**

Sbagliato:  
anche 2, 4, 6, 8 non finiscono per 0, ma sono pari.

---

### **Errore 3 — Confondere “non pari” con “dispari”**

Tutti i numeri naturali o sono **pari** o sono **dispari**.  
Non esiste un numero naturale che non sia né l’uno né l'altro.

---

### **Errore 4 — Dimenticare che 0 è pari**

Perché $0 = 2 \cdot 0$.

---

## **8. Esempi complessi (livello avanzato)**

### **Esempio 1 — Trovare i pari tra numeri enormi**

Tra 67431942 e 67431958 quanti sono i pari?

Basta guardare l’ultima cifra.

Da 42 a 58 → pari:  
42, 44, 46, 48, 50, 52, 54, 56, 58  
→ **9 numeri pari**

---

### **Esempio 2 — Somma di tanti numeri**

La somma:

$$  
17 + 28 + 45 + 62 + 90 + 13  
$$

chi è? pari o dispari?

Conta quanti sono pari:

- pari → 28, 62, 90 (3 numeri)
    
- dispari → 17, 45, 13 (3 numeri)
    

Somma:

- (pari + pari + pari) → pari
    
- (dispari + dispari + dispari) → dispari
    

pari + dispari → **dispari**

Non serve nemmeno calcolare tutto!

---

### **Esempio 3 — Prodotto di molti numeri**

$$  
7 \cdot 3 \cdot 2 \cdot 5 \cdot 9  
$$

È pari o dispari?

C’è un **2** → il prodotto è **pari**.

---

## **9. Conclusione**

In questa lezione hai imparato che:

- Pari/dispari è la forma più semplice di divisibilità.
    
- Un numero è pari se è multiplo di 2.
    
- Un numero è dispari se non è divisibile per 2.
    
- Conta solo l’ultima cifra per capirlo.
    
- Pari e dispari si alternano con regolarità assoluta.
    
- Le loro regole si ritrovano in tutta la matematica.
    

> Capire pari e dispari significa capire il primo mattone della teoria dei numeri.