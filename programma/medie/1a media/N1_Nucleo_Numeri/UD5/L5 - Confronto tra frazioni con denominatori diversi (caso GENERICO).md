### **La tecnica completa: portare le frazioni allo stesso “linguaggio” usando MCM e confronto finale**

---

## **1. Introduzione: il problema generale**

Fino ad ora abbiamo visto solo i casi “facili”:

- **stesso denominatore**
    
- **stesso numeratore**
    
- **vicinanza alla metà**
    

Ma nella vita reale i confronti tra frazioni sono quasi sempre così:

$$  
\frac{a}{b} \quad \text{e} \quad \frac{c}{d}  
$$

dove **b e d non sono uguali**.

Questo è il **caso generale**, e per risolverlo serve un’idea chiave:

> **Per confrontare frazioni con denominatori diversi, bisogna trasformarle in frazioni equivalenti con lo stesso denominatore.**

Per farlo serve il concetto di:

- **MCM** (Minimo Comune Multiplo) tra i denominatori,
    
- oppure un denominatore comune più semplice (multipli incrociati).
    

---

## **2. Perché bisogna rendere uguali i denominatori?**

Perché il denominatore rappresenta:

> **la dimensione delle parti** in cui l’intero è diviso.

Se le parti non sono uguali, NON posso confrontarle direttamente.

Esempio intuitivo:

- 3/10 = 3 “decimi”
    
- 2/7 = 2 “settimi”
    

Non posso dire chi è più grande se le parti sono diverse.  
Prima devo trasformarle in **parti della stessa grandezza**.

---

## **3. Metodo generale: portare entrambe le frazioni allo stesso denominatore**

### _(algoritmo passo per passo)_

## **Passo 1 — Calcolare l’MCM dei due denominatori**

Per confrontare:

$$  
\frac{a}{b} \quad \text{e} \quad \frac{c}{d}  
$$

calcolo:

$$  
\text{MCM}(b, d)  
$$

Questo sarà il **denominatore comune più conveniente**.

---

## **Passo 2 — Trasformare ciascuna frazione in un’equivalente con denominatore MCM**

### Formula per la prima frazione:

$$  
\frac{a}{b} = \frac{a \cdot \frac{\text{MCM}(b,d)}{b}}{\text{MCM}(b,d)}  
$$

### Formula per la seconda frazione:

$$  
\frac{c}{d} = \frac{c \cdot \frac{\text{MCM}(b,d)}{d}}{\text{MCM}(b,d)}  
$$

In altre parole, moltiplichiamo numeratore e denominatore per lo stesso numero per arrivare all’MCM.

---

## **Passo 3 — Una volta che i denominatori sono uguali, il confronto è FACILE**

Perché vale sempre:

> **A denominatore comune, vince il numeratore più grande.**

---

## **4. Esempi completi (con spiegazione algoritmica)**

---

## **Esempio 1 – Confronto semplice**

Chi è più grande?

$$  
\frac{3}{4} \quad \text{e} \quad \frac{5}{6}  
$$

### **Passo 1 — MCM dei denominatori**

- Multipli di 4: 4, 8, 12, 16…
    
- Multipli di 6: 6, 12, 18…
    

→ MCM(4,6) = **12**

---

### **Passo 2 — Porta entrambe al denominatore 12**

- $\frac{3}{4}$ → moltiplico per **3**  
    $$\frac{3\cdot 3}{4\cdot 3} = \frac{9}{12}$$
    
- $\frac{5}{6}$ → moltiplico per **2**  
    $$\frac{5\cdot 2}{6\cdot 2} = \frac{10}{12}$$
    

---

### **Passo 3 — Confronto**

9/12 < 10/12 → quindi:

$$  
\frac{3}{4} < \frac{5}{6}  
$$

---

## **Esempio 2 – Confronto con numeri più grandi**

$$  
\frac{7}{15} \quad \text{e} \quad \frac{4}{9}  
$$

### Passo 1 — MCM(15, 9)

- 15 = 3×5
    
- 9 = 3×3
    

MCM = $3 \cdot 3 \cdot 5 = 45$

---

### Passo 2 — Portiamo al denominatore 45

- $\frac{7}{15}$  
    moltiplico per 3 → $\frac{7\cdot 3}{15\cdot 3} = \frac{21}{45}$
    
- $\frac{4}{9}$  
    moltiplico per 5 → $\frac{4\cdot 5}{9\cdot 5} = \frac{20}{45}$
    

---

### Passo 3 — Confronto

21/45 > 20/45 → quindi:

$$  
\frac{7}{15} > \frac{4}{9}  
$$

---

## **Esempio 3 – Usare multipli incrociati (metodo alternativo, molto rapido)**

### Metodo “cross multiplication”

Non serve MCM, basta fare:

$$  
\frac{a}{b} \text{ ? } \frac{c}{d}  
$$

Confronto equivalente:

$$  
a \cdot d \quad \text{?} \quad b \cdot c  
$$

Perché:

$$  
\frac{a}{b} = \frac{a \cdot d}{b \cdot d}  
$$  
$$  
\frac{c}{d} = \frac{c \cdot b}{d \cdot b}  
$$

Entrambe diventano denominatore = **bd**  
(non è l’MCM, ma funziona comunque).

### Esempio rapido:

Confronta:

$$  
\frac{5}{12} \quad \text{e} \quad \frac{7}{18}  
$$

Calcolo:

- 5×18 = 90
    
- 7×12 = 84
    

→ 90 > 84 quindi:

$$  
\frac{5}{12} > \frac{7}{18}  
$$

Metodo potentissimo, usato anche alle superiori.

---

## **5. Cosa succede se una frazione è impropria e l’altra propria?**

Subito chiara:

$$  
\text{impropria} > \text{propria}  
$$

Esempio:

- 7/4 > 3/5  
    (perché 7/4 > 1 mentre 3/5 < 1)
    

Se una è >1 e l’altra <1, non serve fare calcoli.

---

## **6. Errori tipici degli studenti**

### **Errore 1 — Confrontare i denominatori e basta**

Molti credono che denominatore più grande → numero più grande.  
Non è vero!

### **Errore 2 — Fare il minimo comune multiplo sbagliato**

MCM deve essere il **più piccolo** multiplo comune.

### **Errore 3 — Trasformare solo il numeratore**

Mai cambiare solo metà della frazione:  
numeratore e denominatore si moltiplicano SEMPRE per lo stesso numero.

### **Errore 4 — Saltare i passi**

Nei confronti difficili, è meglio scrivere chiaramente:

1. MCM
    
2. Frazioni equivalenti
    
3. Confronto
    

---

## **7. Conclusione**

In questa lezione hai imparato il **procedimento completo** per confrontare **qualsiasi** coppia di frazioni:

1. calcolare l’MCM dei denominatori,
    
2. trasformare entrambe le frazioni in equivalenti con denominatore comune,
    
3. confrontare i numeratori.
    

Hai anche imparato il metodo alternativo dei **multipli incrociati**, molto utile quando i numeri sono grandi.

> Con questa lezione hai chiuso tutte le tecniche fondamentali del confronto tra frazioni in prima media — inclusa l’idea generale che regola i confronti anche in seconda, terza e persino alle superiori.