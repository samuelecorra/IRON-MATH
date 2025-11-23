### **1. Introduzione: che cos’è “dividere”?**

La divisione è l’operazione che risponde a tre domande fondamentali della vita quotidiana:

1. **Quante volte entra una quantità in un’altra?**
    
2. **Quante unità toccano a ciascuno?**
    
3. **Quanto rimane fuori?**
    

Esempi intuitivi:

- Hai **18** biscotti e **3** amici → quanti biscotti per ciascuno?  
    $$18 : 3 = 6$$
    
- In uno scaffale entrano **12** libri. Quanti scaffali servono per **50** libri?  
    $$50 : 12 = 4 \text{ con resto } 2$$
    

La divisione è quindi l’operazione che serve a **spartire**, **misurare**, **scomporre**, **ripartire** una quantità.

---

## **2. Linguaggio della divisione**

Quando scriviamo:

$$  
a : b = c  
$$

i nomi corretti sono:

- **dividendo**: $a$ → la quantità da dividere
    
- **divisore**: $b$ → in quante parti o quante volte
    
- **quoziente**: $c$ → quanto spetta a ciascuno
    
- **resto**: $r$ → ciò che rimane (solo se la divisione non è esatta)
    

In forma completa:

$$  
a : b = q \text{ con resto } r  
$$

Esempi:

- $28 : 4 = 7$ → divisione **esatta**
    
- $23 : 5 = 4$ con resto **3** → divisione **non esatta**
    

---

## **3. Significati della divisione**

### **3.1 Divisione come _spartizione_**

“Ho 20 caramelle e voglio dividerle in 4 gruppi uguali. Quante per ogni gruppo?”

$$  
20 : 4 = 5  
$$

### **3.2 Divisione come _contenimento_**

“Quante volte il 4 entra nel 20?”

Entra 5 volte → risultato 5.

### **3.3 Divisione come operazione inversa della moltiplicazione**

$$  
a : b = c \quad\Longleftrightarrow\quad b \cdot c = a  
$$

Esempi:

- $42 : 7 = 6$ ⇔ $7 \cdot 6 = 42$
    
- $63 : 9 = 7$ ⇔ $9 \cdot 7 = 63$
    

Questo legame è essenziale per:

- verificare se una divisione è corretta
    
- controllare i calcoli
    
- capire l’equivalenza tra divisione e moltiplicazione
    

---

## **4. Proprietà della divisione**

### **4.1 Non è commutativa**

$$  
a : b \ne b : a  
$$

Esempi:

- $12 : 3 = 4$
    
- $3 : 12$ non è un numero naturale → impossibile in ℕ
    

---

### **4.2 Non è associativa**

$$  
(20 : 5) : 2 \ne 20 : (5 : 2)  
$$

Esempio:

- $(20 : 5) : 2 = 4 : 2 = 2$
    
- $20 : (5 : 2)$ non è definito nei naturali
    

---

### **4.3 Elemento neutro**

Il numero **1**:

$$  
a : 1 = a  
$$

Dividere una quantità in “una sola parte” la lascia uguale.

---

### **4.4 Divisione per 1 e divisione per se stessi**

- $a : 1 = a$
    
- $a : a = 1$ (per $a \ne 0$)
    

---

### **4.5 Divisione per 0 — vietata**

$$  
\text{Non esiste } a : 0  
$$

Perché?

Perché non esiste un numero $x$ tale che:

$$  
0 \cdot x = a  
$$

La divisione per zero è **impossibile**, anche alle superiori, all’università e in tutta la matematica.

---

## **5. Divisione in colonna (algoritmo scritto)**

È l’algoritmo più lungo tra le quattro operazioni, ma segue una logica molto semplice:

> **misura quante volte il divisore sta nel dividendo, una cifra alla volta.**

### **5.1 Struttura della divisione in colonna**

Scrivi così:

```
 divisore ) dividendo
```

Esempio:

```
 4 ) 372
```

---

### **5.2 Esempio 1: divisione esatta**

Calcola:

$$  
372 : 4  
$$

Passo per passo:

1. Prendo il primo numero utile: **37**
    
    - $37 : 4 = 9$ (perché $9 \cdot 4 = 36$)
        
    - scrivo **9** nel quoziente
        
    - $37 - 36 = 1$
        
2. Abbasso la cifra successiva: diventa **12**
    
    - $12 : 4 = 3$
        
    - scrivo **3**
        
    - $12 - 12 = 0$
        

Risultato:

```
 4 ) 372
     93
```

Quindi:

$$  
372 : 4 = 93  
$$

---

### **5.3 Esempio 2: divisione NON esatta (con resto)**

Calcola:

$$  
527 : 6  
$$

Procedura:

1. Prendo **52**
    
    - $52 : 6 = 8$ perché $8 \cdot 6 = 48$
        
    - resto = $52 - 48 = 4$
        
2. Abbasso **7** → diventa **47**
    
3. $47 : 6 = 7$
    
    - $7 \cdot 6 = 42$
        
    - resto = $47 - 42 = 5$
        

Risultato:

```
 6 ) 527
     87 r5
```

Quindi:

$$  
527 : 6 = 87 \text{ con resto } 5  
$$

---

### **5.4 Regola d’oro del risultato**

Nelle divisioni:

$$  
\text{dividendo} = (\text{divisore} \cdot \text{quoziente}) + \text{resto}  
$$

Controllo dell’ultimo esempio:

$$  
6 \cdot 87 + 5 = 522 + 5 = 527  
$$

Perfetto.

---

## **6. Calcolo mentale nella divisione**

La divisione mentale è più complessa della moltiplicazione, ma con strategie intelligenti diventa semplice.

### **6.1 Uso delle tabelline**

Sempre fondamentale:

- $72 : 8$ → basta ricordare che $8 \cdot 9 = 72$
    

---

### **6.2 Arrotondamenti intelligenti**

Esempio:

$$  
93 : 3  
$$

- 93 è vicino a 90
    
- $90 : 3 = 30$
    
- ma 93 ha 3 in più → $3 : 3 = 1$
    

Risultato:

$$  
93 : 3 = 31  
$$

---

### **6.3 Scomposizione del dividendo**

Esempio:

$$  
84 : 7  
$$

- $77 : 7 = 11$
    
- $7 : 7 = 1$
    

Sommo:

$$  
11 + 1 = 12  
$$

---

## **7. Divisione, sottrazioni ripetute e resto**

La divisione può essere vista come un processo di _sottrazioni ripetute_:

Per calcolare:

$$  
23 : 4  
$$

Posso fare:

- $23 - 4 = 19$ → 1 volta
    
- $19 - 4 = 15$ → 2 volte
    
- $15 - 4 = 11$ → 3 volte
    
- $11 - 4 = 7$ → 4 volte
    
- $7 - 4 = 3$ → 5 volte
    
- non posso continuare: resto = 3
    

Quindi:

$$  
23 : 4 = 5 \text{ con resto } 3  
$$

Questo metodo è lungo, ma aiuta a capire **perché** la divisione funziona.

---

## **8. Perché la divisione è fondamentale**

La divisione è indispensabile in:

- problemi di ripartizione
    
- media, percentuali e proporzioni
    
- frazioni e razionalità
    
- misure, scalature e ingrandimenti
    
- algebra (equazioni, parametri, coefficienti)
    
- informatica (strutture dati, pagine di memoria, indirizzi)
    
- geometria (densità, frequenze, rapporti)
    

È l’operazione che mette ordine nei numeri e ne misura la struttura.

---

## **9. Per concludere: divisione e vita reale**

Ogni volta che:

- condividi,
    
- distribuisci,
    
- calcoli un prezzo unitario,
    
- misuri quante volte qualcosa “sta” in qualcos’altro,
    
- controlli una proporzione…
    

…stai facendo divisioni.

Più la divisione diventa automatica, più capisci la matematica che costruisce il mondo reale.

---

Vuoi ora:

📘 **Lezione 5: Proprietà delle operazioni (commutativa, associativa, distributiva…)**  
oppure preferisci un **set di esercizi graduati su addizione, sottrazione, moltiplicazione e divisione**?