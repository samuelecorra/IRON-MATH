### **(con tutti gli errori tipici da evitare)**

---

## **1. Introduzione: come affrontare un’espressione senza perdersi**

Risolvere un’espressione numerica non significa “fare i conti alla cieca”.  
Significa **seguire una procedura fissa**, uguale per tutti, che ti permette di:

- evitare errori,
    
- non confonderti,
    
- leggere un’espressione come se fosse un meccanismo ordinato.
    

In questa lezione impari **il metodo definitivo** per affrontare qualsiasi espressione, anche lunga, difficile o piena di parentesi.

---

## **2. La Regola d’Oro (da sapere a memoria!)**

> **Un’espressione si risolve smontandola dall’interno verso l’esterno, e dall’alto verso il basso nella gerarchia delle operazioni.**

Più concretamente:

### **Ordine ufficiale:**

1. **Parentesi**
    
2. **Potenze e radici**
    
3. **Moltiplicazioni e divisioni**
    
4. **Addizioni e sottrazioni**
    

All’interno di uno stesso livello:

> **si procede da sinistra verso destra.**

---

## **3. Il metodo universale in 5 passaggi**

### **Passo 1 — Trova la parentesi più interna**

Cerca la parte dell’espressione che è completamente chiusa tra parentesi, senza altre parentesi dentro.

Esempio:

$$  
5 + { 20 - [ 6 + (4 - 1) ] }  
$$

La parentesi più interna è:

$$  
(4 - 1)  
$$

### **Passo 2 — Risolvi tutta la parentesi**

Falla diventare un numero solo.

Esempio:

$(4 - 1) = 3$

Ora l’espressione diventa:

$$  
5 + { 20 - [ 6 + 3 ] }  
$$

### **Passo 3 — Ripeti fino a eliminare TUTTE le parentesi**

Ora la prossima parentesi interna è:

$$  
[ 6 + 3 ] = 9  
$$

Nuova espressione:

$$  
5 + { 20 - 9 }  
$$

Ora risolvo la graffa:

$$  
{ 20 - 9 } = 11  
$$

L’espressione diventa:

$$  
5 + 11  
$$

### **Passo 4 — Risolvi potenze e radici**

Se nell’espressione finale compaiono potenze o radici, si fanno subito.

(Mai dopo + e −)

### **Passo 5 — Fai × e ÷, poi + e −**

Ora l’espressione è “distesa”, senza parentesi.  
Segui la gerarchia finale:

1. **prima tutte le moltiplicazioni e divisioni da sinistra a destra**
    
2. **poi le addizioni e sottrazioni da sinistra a destra**
    

Esempio conclusivo:

$5 + 11 = 16$

---

## **4. Esempi completi — il metodo in azione**

### **Esempio 1: espressione con tutti i livelli**

$$  
3 + 2^3 \cdot (5 - 2)  
$$

**Passo 1 – Parentesi:**

$(5 - 2) = 3$

→ $3 + 2^3 \cdot 3$

**Passo 2 – Potenze:**

$2^3 = 8$

→ $3 + 8 \cdot 3$

**Passo 3 – Moltiplicazioni:**

$8 \cdot 3 = 24$

→ $3 + 24$

**Passo 4 – Addizione:**

$= 27$

---

### **Esempio 2: parentesi annidate**

$$  
{ 40 - [12 - (3^2)] } : 4  
$$

**1. Tonde interne:**  
$(3^2) = 9$

→ ${ 40 - [12 - 9] } : 4$

**2. Quadre:**  
$12 - 9 = 3$

→ ${40 - 3} : 4$

**3. Graffe:**  
$40 - 3 = 37$

→ $37 : 4$

**4. Divisione:**  
$= 9$ con resto $1$

---

### **Esempio 3: gerarchia senza parentesi**

$$  
36 - 2^3 + 4 \cdot 5  
$$

1. Potenza: $2^3 = 8$  
    → $36 - 8 + 20$
    
2. Moltiplicazione: $4 \cdot 5 = 20$  
    → $36 - 8 + 20$
    
3. Addizioni e sottrazioni da sinistra:  
    $36 - 8 = 28$  
    $28 + 20 = 48$
    

---

## **5. Gli errori più comuni (e come evitarli)**

### **❌ Errore 1 — Leggere da sinistra a destra**

Esempio:

$5 + 3 \cdot 4$

Sbagliato fare: $(5 + 3) \cdot 4$.

✔ Giusto: prima $3 \cdot 4$, poi +5.

---

### **❌ Errore 2 — Ignorare le parentesi**

$8 - (3 + 2)$  
NON è $8 - 3 + 2$.

✔ Le parentesi cambiano TUTTO.

---

### **❌ Errore 3 — Fare prima + e − anziché potenze / × / ÷**

Esempio:

$16 - 2^2 \cdot 3$

Sbagliato: $(16 - 2^2) \cdot 3$

---

### **❌ Errore 4 — Non rispettare l’ordine interno delle parentesi**

Nel caso:

$[, 12 - (6 - 2) ,]$

si fa prima $(6 - 2)$, NON $12 - 6$.

---

### **❌ Errore 5 — Confondere potenze con moltiplicazioni**

$3^2$ NON è $3 \cdot 2$.  
È $3 \cdot 3$.

---

## **6. La Checklist finale — La usano pure i professionisti**

Ogni volta che risolvi un’espressione, controlla di aver seguito questo ordine:

### ✔ 1. Ho risolto tutte le parentesi, dalle più interne alle più esterne

### ✔ 2. Ho fatto tutte le potenze e radici

### ✔ 3. Ho fatto tutte le moltiplicazioni e divisioni da sinistra

### ✔ 4. Ho fatto infine addizioni e sottrazioni da sinistra

### ✔ 5. Non ho saltato nessun passaggio

### ✔ 6. Il risultato ha senso (non è assurdo rispetto ai numeri iniziali)

---

## **7. Perché questo metodo è fondamentale**

Questo metodo:

- evita il 90% degli errori tipici della prima media,
    
- è identico a quello usato alle superiori e all’università,
    
- è lo stesso ordine applicato dai computer,
    
- rende qualsiasi espressione “difficile” prevedibile e meccanica,
    
- prepara alla **algebra**, dove questo modo di ragionare diventerà essenziale.
    

> Chi padroneggia questo metodo non si confonde mai,  
> perché sa **cosa va fatto prima** e **cosa va fatto dopo**.