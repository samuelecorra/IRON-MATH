## **1. Cos’è la probabilità (senza formule)**

La probabilità è il modo matematico per parlare di **quanto è probabile che accada qualcosa**.

Tutti, anche i bambini, la usano senza accorgersene quando dicono:

- “è difficile”,
    
- “forse”,
    
- “probabilmente”,
    
- “non succederà mai”,
    
- “di sicuro succede”,
    
- “è raro”.
    

La matematica non inventa niente:  
si limita a _mettere ordine_ in queste idee.

---

# **2. Partiamo da tre concetti fondamentali**

In probabilità, ogni situazione in cui può accadere qualcosa si chiama **esperimento casuale**.

Esempi:

- lanciare una moneta,
    
- lanciare un dado,
    
- estrarre una carta,
    
- pescare una pallina da un sacchetto,
    
- vedere che meteo farà domani.
    

Ogni possibile risultato si chiama **evento**.

Gli eventi si dividono in tre categorie:

---

# **A. Evento certo**

### **Accade sempre. È inevitabile. Non può andare diversamente.**

Esempi:

- Quando lanci una moneta, _uscià o testa o croce_ → certo.
    
- Se prendi una carta da un mazzo, _sarà una carta_ → certo.
    
- Dopo il tramonto, _arriva la notte_ → certo.
    
- Se sei sulla Terra, _hai peso_ → certo.
    

Un evento certo ha probabilità “massima”.  
In linguaggio semplice: **succede al 100%**.

---

# **B. Evento impossibile**

### **Non può accadere. Mai. Nemmeno per errore.**

Esempi:

- Lanciare un dado a 6 facce ed esce 9 → impossibile.
    
- Estrarre un cubo da un sacchetto che contiene solo palline → impossibile.
    
- Un gatto che parla in italiano → impossibile.
    
- Una moneta che resta appesa a mezza tra testa e croce → impossibile.
    

In linguaggio semplice: **probabilità 0%**.

---

# **C. Evento possibile**

### **Può accadere, ma non sempre. A volte sì, a volte no.**

È tutta la zona “in mezzo” tra certo e impossibile.

Esempi:

- Lanciare una moneta ed esce testa → possibile.
    
- Estrarre una pallina rossa tra palline di vari colori → possibile.
    
- Domani piove → possibile.
    
- Esce il numero 6 quando lanci un dado → possibile.
    
- Trovare parcheggio vicino a scuola → dipende, ma possibile.
    

Il concetto chiave è:

> **Un evento possibile può accadere, ma non è garantito.**

---

# **3. Perché questa classificazione è fondamentale?**

Perché è la radice dell’intera probabilità.

Ogni volta che farai:

- calcoli di probabilità alle medie,
    
- frazioni di casi favorevoli / casi possibili in seconda,
    
- probabilità composte alle superiori,
    
- probabilità condizionata in quarta/quinta,
    
- distribuzioni statistiche e variabili aleatorie all’università,
    
- modelli probabilistici nel machine learning,
    

tutto, TUTTO, deriva da:

- cosa è certo
    
- cosa è impossibile
    
- cosa è possibile e “quanto” lo è
    

Questa lezione accende la luce.

---

# **4. La domanda più importante della probabilità**

Quando analizzi un evento devi chiederti:

## **“Può accadere?”**

Se **sì**, l’evento è possibile.  
Se **no**, è impossibile.  
Se **non solo può accadere, ma deve accadere per forza**, è certo.

Tutto qui.

---

# **5. Esempi di classificazione (esercizi ragionati)**

### **Esempio 1: lancio di una moneta**

- esce “testa” → possibile
    
- esce “croce” → possibile
    
- esce un numero → impossibile
    
- esce _qualcosa_ → certo
    

---

### **Esempio 2: sacchetto con 5 palline rosse e 3 blu**

- estrarre una pallina → certo
    
- estrarre una pallina rossa → possibile
    
- estrarre una pallina blu → possibile
    
- estrarre una pallina verde → impossibile
    

---

### **Esempio 3: dado a 6 facce**

- esce un numero tra 1 e 6 → certo
    
- esce un numero pari → possibile
    
- esce 10 → impossibile
    
- esce un numero > 20 → impossibile
    
- esce un numero → certo
    

---

# **6. Errori tipici delle prime volte**

1. **Confondere “possibile” con “probabile”**  
    → Possibile = _può accadere_  
    → Probabile = _accade spesso_  
    Non sono sinonimi.
    
2. **Pensare che “possibile” significhi 50%**  
    → No: possibile può significare 1%, 20%, 70%, 99%.
    
3. **Credere che “impossibile” significhi “difficile”**  
    → No: impossibile = non può accadere.
    
4. **Dire “evento certo” quando è solo molto probabile**  
    → Es: “vincere una partita perché siamo forti” → NON è certo.
    

---

# **7. Collegamento con il resto della probabilità**

Dopo questa lezione costruiremo:

- la differenza tra eventi possibili “equicasi” (tutti ugualmente probabili),
    
- il modello della moneta e del dado,
    
- la probabilità come rapporto:  
    [  
    \text{probabilità} = \frac{\text{casi favorevoli}}{\text{casi possibili}}  
    ]
    
- gli esperimenti ripetuti,
    
- l’idea di “tendenza” quando si ripete un esperimento molte volte.
    

Questa è la base.