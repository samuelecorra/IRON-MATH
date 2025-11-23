### **1. Introduzione: perché servono MCD e MCM?**

MCD e MCM NON sono “due retine da imparare a memoria”.  
Sono due idee potentissime che servono a risolvere **tantissimi** problemi reali:

- semplificare frazioni,
    
- trovare cicli che si ripetono,
    
- organizzare gruppi e pacchetti,
    
- capire quando due eventi si “sincronizzano”,
    
- capire quanti pezzi si possono ricavare senza sprechi,
    
- fare ragionamenti avanzati di teoria dei numeri.
    

Per capirli bene basta una sola intuizione:

> **Il MCD guarda “in basso”, verso i divisori.  
> Il MCM guarda “in alto”, verso i multipli.**

Capita tutto quando vedi questa simmetria.

---

## **Parte 1 – MCD (Massimo Comune Divisore)**

### **2. Che cos’è il MCD?**

Dato un insieme di numeri, il **MCD** è:

> **il più grande numero che divide tutti i numeri senza lasciare resto.**

È il **divisore comune più grande**.

Simbolo:

$$  
\text{MCD}(a, b)  
$$

o anche:

$$  
(a, b)  
$$

Esempi intuitivi:

- MCD(12, 18) = 6  
    (perché 6 è il più grande numero che divide sia 12 sia 18)
    
- MCD(15, 20) = 5  
    (solo 5 divide entrambi)
    
- MCD(9, 28) = 1  
    (si dicono _primi tra loro_)
    

---

## **3. Come pensarlo con un’immagine semplice**

Immagina i **divisori** di due numeri come due scale di gradini:

- i gradini di 12: 1, 2, 3, 4, 6, 12
    
- i gradini di 18: 1, 2, 3, 6, 9, 18
    

Il MCD è **l’ultimo gradino comune**, quello più alto.

---

## **4. Metodo base per calcolarlo (livello prima media)**

### **Metodo A — Lista dei divisori**

Esempio: MCD(24, 36)

1. Divisori di 24  
    → 1, 2, 3, 4, 6, 8, 12, 24
    
2. Divisori di 36  
    → 1, 2, 3, 4, 6, 9, 12, 18, 36
    
3. Divisori comuni  
    → 1, 2, 3, 4, 6, 12
    
4. Il più grande è → **12**
    

Quindi:

$$  
\text{MCD}(24, 36) = 12  
$$

---

## **5. Esempi complessi (per consolidare)**

### **Esempio 1**

MCD(32, 48)

Divisori di 32 → 1, 2, 4, 8, 16, 32  
Divisori di 48 → 1, 2, 3, 4, 6, 8, 12, 16, 24, 48

Comuni: 1, 2, 4, 8, 16  
→ MCD = **16**

---

### **Esempio 2**

MCD(27, 45)

27 → 1, 3, 9, 27  
45 → 1, 3, 5, 9, 15, 45

Comuni: 1, 3, 9  
→ MCD = **9**

---

## **Parte 2 – MCM (Minimo Comune Multiplo)**

### **6. Che cos’è il MCM?**

Dato un insieme di numeri, il **MCM** è:

> **il più piccolo numero che è multiplo di tutti.**

È il primo numero in cui **tutti i loro multipli si incontrano**.

Simbolo:

$$  
\text{MCM}(a, b)  
$$

o:

$$  
[a, b]  
$$

Esempi intuitivi:

- MCM(4, 6) = 12  
    (il primo multiplo comune)
    
- MCM(3, 5) = 15  
    (3 → 3,6,9,12,15; 5 → 5,10,15)
    
- MCM(8, 20) = 40  
    (8 → 8,16,24,32,40; 20 → 20,40)
    

---

## **7. L’immagine potente per capirlo**

Immagina due fili che fanno “salti” di lunghezza:

- il 4 saltella ogni 4 numeri → 4, 8, 12, 16, 20, …
    
- il 6 saltella ogni 6 numeri → 6, 12, 18, 24, …
    

Il primo punto in cui **atterrano insieme** è → **12**  
E questo punto è l’MCM.

---

## **8. Metodo base per calcolarlo (livello prima media)**

### **Metodo A — Lista dei multipli**

Esempio: MCM(4, 6)

Multipli di 4 → 4, 8, 12, 16, 20…  
Multipli di 6 → 6, 12, 18, 24…

Il primo numero che compare in entrambe è → **12**

Quindi:

$$  
\text{MCM}(4, 6) = 12  
$$

---

## **9. Esempi complessi (per consolidare)**

### **Esempio 1**

MCM(5, 12)

Multipli di 5 → 5, 10, 15, 20, 25, 30, 35, 40, 45, 50…  
Multipli di 12 → 12, 24, 36, 48, 60…

Comune → **60**

---

### **Esempio 2**

MCM(8, 14)

Multipli di 8 → 8, 16, 24, 32, 40, 48, 56, 64…  
Multipli di 14 → 14, 28, 42, 56, 70…

Comune → **56**

---

## **Parte 3 – Quando si usano MCD e MCM?**

### **MCD — Situazioni tipiche**

- semplificare frazioni
    
- dividere in gruppi uguali senza resto
    
- tagliare una corda/striscia/asta senza sprechi
    
- capire una periodicità minima comune
    

### **MCM — Situazioni tipiche**

- sincronizzazione di eventi periodici
    
- trovare un tempo in cui due cicli si riallineano
    
- determinare un “packaging” minimo
    
- trovare denominatori comuni nelle frazioni
    

---

## **Parte 4 – Esempi applicativi (molto chiari)**

### **Esempio MCD – Tagliare senza sprechi**

Una trave di 36 cm e una di 48 cm devono essere tagliate in pezzi identici della stessa lunghezza massima.

Lunghezza massima = **MCD(36, 48)**  
MCD = 12 ⇒ pezzi da **12 cm**

---

### **Esempio MCM – Sincronizzazione**

Un autobus passa ogni 12 minuti.  
Un tram ogni 20 minuti.  
Ogni quanto ripassano insieme alla fermata?

Tempo di incontro → **MCM(12, 20)**  
MCM = 60 ⇒ **ogni 60 minuti**

---

## **10. Riepilogo finale: due idee, due direzioni**

### **MCD → va verso i divisori (in basso)**

il più grande divisore comune.

### **MCM → va verso i multipli (in alto)**

il più piccolo multiplo comune.

Questi concetti sono come due metà della teoria dei numeri:  
se li capisci, tutto diventa più semplice — dalle frazioni all’algebra.