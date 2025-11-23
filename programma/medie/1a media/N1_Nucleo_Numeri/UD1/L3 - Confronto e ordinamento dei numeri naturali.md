### **1. Introduzione**

Per lavorare davvero con i numeri non basta saperli leggere e scrivere: bisogna **capire chi è più grande, chi è più piccolo, e quando due numeri sono uguali**.  
Sembra banale, ma questa abilità è fondamentale per tutto ciò che faremo dopo: operazioni, problemi, frazioni, percentuali, potenze e persino la programmazione informatica.

In questa lezione impariamo a usare **tutti gli operatori di confronto** e a ordinare numeri anche molto grandi con ragionamento, non “a occhio”.

---

## **2. Gli operatori di confronto: il linguaggio matematico**

Gli operatori di confronto sono simboli che ci permettono di descrivere relazioni tra due numeri in modo preciso e immediato.

### **2.1 Operatori stretti**

- **Maggiore di:**  
    $$  
    a > b  
    $$  
    Significa che _a è strettamente più grande di b_.
    
- **Minore di:**  
    $$  
    a < b  
    $$  
    Significa che _a è strettamente più piccolo di b_.
    

Esempi:  
$8 > 3$  
$12 < 40$

### **2.2 Operatori larghi (o non stretti)**

- **Maggiore o uguale a:**  
    $$  
    a \ge b  
    $$  
    Significa che _a è più grande di b oppure esattamente uguale_.
    
- **Minore o uguale a:**  
    $$  
    a \le b  
    $$
    

Esempi:  
$7 \ge 7$ (vero, perché sono uguali)  
$5 \le 12$ (vero)

### **2.3 Uguaglianza**

- **Uguale a:**  
    $$  
    a = b  
    $$
    

Esempi:  
$300 = 300$  
$4{,}000 = 4000$

### **2.4 Diverso da**

- **Diverso da:**  
    $$  
    a \ne b  
    $$
    

Significa che due numeri _non sono uguali_.  
Non dice quale dei due è più grande: solo che **sono distinti**.

Esempi:  
$15 \ne 18$  
$502 \ne 520$

---

## **3. Come si confrontano due numeri grandi**

### **3.1 Prima regola: conta le cifre**

Se due numeri hanno _un numero diverso di cifre_, è facilissimo:

- **più cifre = numero più grande**
    
- **meno cifre = numero più piccolo**
    

Esempi:  
$8 < 12$ (due cifre > una cifra)  
$235 > 98$ (tre cifre > due cifre)

### **3.2 Seconda regola: confronta da sinistra**

Se hanno lo stesso numero di cifre, si procede **da sinistra verso destra**, una cifra alla volta:

Esempio:

Confrontiamo  
$$  
482,315 \quad\text{e}\quad 491,200  
$$

1. confrontiamo le **centinaia di migliaia**: 4 = 4 → continua
    
2. confrontiamo le **decine di migliaia**: 8 < 9 → abbiamo già il risultato
    

Quindi:

$$  
482,315 < 491,200  
$$

### **3.3 Terza regola: lo zero conta eccome**

Gli zeri in mezzo non fanno “finta parte”:  
$405$ è **maggiore** di $399$.

Per confronto:

- 4 vs 3 → già deciso → $405 > 399$
    

---

## **4. Ordinare un insieme di numeri**

Ordinare significa mettere i numeri **dal più piccolo al più grande** (ordine crescente) o **dal più grande al più piccolo** (ordine decrescente).

### **4.1 Ordine crescente**

Esempio:

Ordina:  
$58, 7, 402, 40$

1. conta le cifre
    
    - 7 → 1 cifra
        
    - 40, 58 → 2 cifre
        
    - 402 → 3 cifre
        

Ordine crescente:

$$  
7 < 40 < 58 < 402  
$$

### **4.2 Ordine decrescente**

Invertiamo:

$$  
402 > 58 > 40 > 7  
$$

---

## **5. La retta numerica come strumento di confronto**

Una **retta numerica orientata** è un modo geometrico per vedere i confronti.

- a sinistra → numeri **piccoli**
    
- a destra → numeri **grandi**
    

Se un punto è più a destra di un altro, allora il numero è più grande:

$$  
a < b \quad\text{se e solo se}\quad a \text{ sta a sinistra di } b  
$$

Questo aiuta moltissimo a visualizzare ordine, distanza e intervalli.

---

## **6. Perché il confronto è fondamentale**

Saper confrontare numeri significa:

- capire quale quantità è maggiore in un problema,
    
- stabilire limiti, condizioni e intervalli,
    
- prepararsi alla lettura dei grafici,
    
- comprendere misure, scale e grandezze,
    
- ragionare con precisione algebrica,
    
- affrontare le disuguaglianze più avanti.
    

È una delle abilità più usate nell’intera matematica.

---

## **7. Appendice (gentile ma motivante): il confronto nelle altre basi numeriche**

In **binario**, **ottale** ed **esadecimale** esistono gli stessi operatori:

- $>$
    
- $<$
    
- $\ge$
    
- $\le$
    
- $=$
    
- $\ne$
    

Ma confrontare i numeri non è immediato come in decimale, perché le cifre sono diverse e le grandezze crescono in potenze _diverse_.

Esempio binario:

$$  
10101_2 \quad\text{vs}\quad 1100_2  
$$

Bisogna:

1. contare cifre in base 2
    
2. convertire mentalmente in potenze di 2
    
3. confrontare i valori “pesati”
    

Non è istantaneo come vedere 48 e 72.

### **Messaggio motivazionale per i futuri informatici**

> Vedete? Il nostro sistema decimale è di gran lunga il più naturale e immediato.  
> Se imparate bene a confrontare i numeri in base 10, convertire e lavorare in base 2 o 16 sarà molto più semplice.  
> Il segreto per non soffrire con il binario è **dominare alla perfezione il confronto in decimale**.