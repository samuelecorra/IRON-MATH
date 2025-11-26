# 📌 DOCUMENTO FUNZIONALE MVP – IRONMATH (VERSIONE BETA)

PREAVVISO: tutte le considerazioni fatte in questo documento sono nell'ottica di un pubblico al 95% minorenne, ergo tenere in considerazione che studenti maggiorenni non risentono minimamente delle restrizioni di cui parleremo...

L'MVP di IRONMATH ha lo scopo di snellire il carico progettuale a fronte di molteplici migliorie future.

E' per questo che la web app, almeno inizialmente, si rivolgerà unicamente agli studenti di scuola media, e quindi coprirà solo il programma di matematica, relegando i 5 anni di liceo e la fisica a una versione futura.

Cionostante si pone come main goal la certezza di essere totalmente funzionante sia nei confronti dello studente, che del/dei genitore/i, che del docente di matematica.

Ergo il punto di partenza è che sono previsti 3 ruoli/"account-level" distinti:

1. **Studente**
2. **Genitore**
3. **Docente**

Ogni ruolo accede tramite login e ha una dashboard dedicata. 

Partiamo chiaramente dal lato studente, snocciolando tutto quello che deve essere in grado di fare/vedere/...

## **LATO STUDENTE - ESSENTIALS:**

### **1) Effettuare la registrazione al sito (STUDENTE):

- Tale registrazione non parte mediante il classico bottone "Registrati/Accedi". iI flusso è molto più lineare e non prevede di "cercare" i bottoni per proseguire:

	1) L'utente "atterra" nella landing page e nel main di essa sceglie tramite bottoni enormi che fanno progredire espandendo dinamicamente verso il basso:

		a) classe di appartenenza (prima, seconda o terza media) che farà da tara per l'anno corrente e il/i precedente/i;

		b) la situazione scolastica/motivo di iscrizione: studente già eccelso che vuole consolidare/portarsi avanti/eccellere oppure più genericamente il classico studente in difficoltà che non vuole il debito (non importa se ambisce a passare con il 6 politico senza debiti estivi o se vuole migliorare oltre il 7 - per ora, poi su questo si ragionerà molto più in là per una profilazione avanzata).

		c) sotto a tali sezioni ci sarà un'altra coppia di bottoni "Sei docente/Sei genitore? Clicca qui... o simile" Ergo il default form è chiaramente quello dello studente

	Dopo aver selezionato tali due dati essenziali, la registrazione prosegue come usualmente dovrebbe in un qualsiasi altro sito:
		
	2) Campi richiesti

	- **Username** (visibile nell’app, quello che l'IA saluta, nessun nominativo in chiaro!)

	- Data di nascita che valida automaticamente la maggiore età dell'utente che vuole registrarsi:
			
		in caso di maggiore età disabilita il campo di email genitore/tutore e redireziona la mail di avvenuta registrazione alla mail personale; 
			
		in caso di utente minore, si attiva il campo di mail genitore/tutore e la mail di conferma registrazione viene redirezionata all'indirizzo del suddetto genitore/tutore;

	- Nome scuola (serve per linking con classe docente)

	- **Email studente** (*dovrebbe preferenzialmente essere la mail scolastica ufficiale dell'istituto, in vista di una virata verso il B2B, ma anche la personale va bene. Chiaramente se lo studente usa IronMath in seguito a un accordo di B2B tra scuola e IronMath, allora e solo allora la mail scolastica diventa tassativa!*)

	- **Email genitore/tutore** (OBBLIGATORIA per tutti gli utenti in quanto tutti tendenzialmente minorenni)
				
	- **Password**
	- **Conferma password**

	- ✅ “Ho letto e accetto Termini & Condizioni”
	- ✅ “Ho letto e accetto l'Informativa sulla Privacy”

	- ENORME TASTO REGISTRATI, alla cui pressione si attiva il flusso concreto di registrazione di seguito riportato...

	Quando si clicca su "REGISTRATI", il form scompare e viene rimpiazzato con un placeholder di attesa, del tipo "Registrazione completata. Controlla la casella di posta elettronica del tuo genitore/tutore che hai inserito poc'anzi, o chiedigli direttamente di approvare il completamento dell'iscrizione o tuffati in IronMath con un account limitato (ti manderemo reminder di completare la registrazione effettiva)".

	Lo studente è davanti a un bivio: può approvare/far approvare al genitore l'email di attivazione completa dell'account, o continuare con account limitato.
	
	Dopodiché, l'utente riceverà, a prescindere dall'età, una mail di attivazione account:

	- La mail per il genitore/tutore dovrà spiegare brevemente nel corpo stesso il principio etico per cui è nata la piattaforma IronMath, con possibile link a video youtube di presentazione ufficiale;
	- Dichiara esplicitamente i dati raccolti dell'utente con link a informativa privacy, termini e condizioni...;
	-  DUE BOTTONI LINK: APPROVO/DECLINO ISCRIZIONE DI MIO FIGLIO AD IRONMATH
		- Se il genitore clicca **APPROVO**:
			  - Account studente → **COMPLETO**
			  - Dati iniziano ad essere salvati
			  - Viene creato l’account genitore

		- Se il genitore clicca **NON APPROVO**:
			  - Account resta limitato
			  - Può essere cancellato dopo 15 giorni (*)

VEDIAMO I DUE SCENARI:

**SCENARIO 1: STATO INIZIALE LIMITATO**

- Può fare solo 2–3 esercizi demo
- Nessun salvataggio permanente
- Nessuna profilazione di alcun tipo
- Nessun accesso a progressi/statistiche

Lo sblocco richiede approvazione della suddetta mail arrivata al genitore

**SCENARIO 2: STATO INIZIALE COMPLETO**

- Se l'utente ha effettivamente ricevuto l'approvazione del genitore via mail, allora avrà il suo account totalmente completo, con tutta la profilazione attiva che ci prefissiamo per la beta e che sarà oggetto di trattamento specifico tra un po'.
- L'account genitore è del tutto parallelo a quello del figlio studente.

IN OGNI CASO, DOPO L'APPROVAZIONE VIA MAIL / DOPO IL BOTTONE "OPPURE ACCEDI CON ACCOUNT LIMITATO", LO STUDENTE VIENE RENDIRIZZATO AL FORM DI LOGIN STANDARD, PER POTER AVERE

1) Subito una seconda barriera di sicurezza post-registrazione;
2) Fargli prendere immediatamente dimestichezza con l'UI di login che si ritroverà di lì in avanti ad accoglierlo.


### **2) Login (STUDENTE)**

Campi del form:

- Ambivalente:
	a) email, sia essa scolastica o personale, ma l'importante è che sia quella dello studente, non del genitore;
	b) oppure direttamente l'username che lo studente ha scelto e con cui sarà salutato in-app;
	
- Password

Da capire se da implementare subito o in un futuro prossimo (io proporrei subito per questioni meramente di accessibilità - i giovani non si segnano le password in cartaceo/sono diffidenti a lasciarle su portafogli ICloud o simili):

- Hyperlink "Hai dimenticato la password?" - con procedura recupero standardizzata;
- CheckBox "Ricordami" ✅ per login rapido dalla sessione corrente in avanti fino a esplicito un-check della medesima;

Dopo tale compilazione, lo studente finalmente accede e ri-atterra in una landing page post-autenticazione.

Da qui lo studente sarà in grado di usufruire di tutti i servizi della web application.

---

### **3) DASHBOARD STUDENTE (ACCOUNT COMPLETO)**

Dalla Dashboard principale, l'utente può effettivamente usufruire dei suddetti.

In base all'anno di scuola inserito in fase di autenticazione, mi preme ricordare che si avrà accesso all'**ANNO CORRENTE** dello studente, ergo la dashboard può essere intelligentemente indicizzata a partire da quello.

La dashboard dà accesso diretto a funzionalità come:

- Messaggio di benvenuto che avvisa di quanto tempo lo studente dispone entro la prima verifica inserita in calendario;

- Pulsante "Riprendi l'ultima lezione consultata" che fa da shortcut per condurre all'ultimo argomento consultato, direttamente, alla sua sottosezione di lezione teorica;

- Pulsante "Rivedi le tue lacune recenti" che fa da shortcut per aprire una sezione apposita che classifica le lacune individuate in base a quanto sono "indietro" rispetto all'anno corrente dello studente (es. se uno studente di terza media ha problemi con l'aritmetica di prima media, sicuramente tale lacuna diagnosticata in fase di esercizi/risposte a domande dell'utente sarà in prima posizione);

- Pulsante "Metti alla prova le tue debolezze" (FORSE) - Shortcut che genera una chat con LLM in cui il suddetto LLM pone qualche domanda teorica alla quale l'utente risponde con un prompt; e poi fa qualche domanda pratica ma che non richiede particolari calcoli e per la cui risposta basta un prompt. Solo a fine conversazione la LLM restituisce l'esito della chiacchierata come fosse una verifica.


---


Sezioni consultabili mediante DashBoard:


---

#### **3.1) CALENDARIO INTERATTIVO

Il calendario permette di aggiungere in una certa data:

- Un evento tra interrogazione/test/verifica scritta
	Di tale evento si possono aggiungere gli argomenti:
		Gli argomenti sono link diretti all' "header" dell'argomento, quindi il test prerequisiti/lezione vera e propria;


---

#### **3.2) STRUTTURA DELL'ANNO SCOLASTICO STATICA

In seguito sarà configurabile, ma per ora lo teniamo hardcodato in base ai nuclei di argomenti che dettiamo noi.

La struttura sarà graficamente appetibile per uno studente con la soglia dell'attenzione ai minimi storici: il modo migliore per farlo è implementare una UI simile ai livelli di Candy Crash Saga

![[Pasted image 20251125214042.png]]

Ogni livello corrisponde al modulo da affrontare, e banalmente potrebbe avere la circonferenza che si riempie fino a 360gradi coerentemente con il tasso di completamento.


---

#### **3.3) NUCLEI/MODULI DI STUDIO

Ogni nucleo è suddiviso in unità didattiche, le quali a loro volta sono suddivise in argomenti atomici veri e propri.

![[Pasted image 20251125214709.png]]

E' una struttura molto basilare filesystem-alike.

Ogni L*, ovvero ogni argomento, se consultato, si espande rivelando tutte le funzionalità ad esso associate:

1) Test Prerequisiti

2) Lezioni in MarkDown Renderizzato per massima chiarezza (hardcoded);

3) Formulario con commentini sintetici su ogni formula (hardcoded);

4) Esercizi svolti e commentati (hardcoded);

5) Esercizi step-by-step con possibilità di hint/soluzioni parziali (LLM-assisted);

6) Esercizi step-by-step standard (hardcoded);

7) Verifiche a tempo finali (hardcoded);

8) Consultazione report di tale argomento alla fine del quale l'argomento viene marcato come completato;

L'MVP, per semplicità, darà l'opportunità di fare esercizi LLM-assisted solo per i Nuclei di Prima Media.

Schema sintetico sul singolo esercizio, ovvero le sezioni più dinamiche:

Elementi main: Enunciato & Campo risposta

Pulsanti disponibili:

- **Conferma risposta**
- **Riprova**
- **Chiedi un indizio**
- **Mostra soluzione** (*limitata o disattivata nella beta*)
- **Salta esercizio e generane uno nuovo**

Feedback post-compilazione risposta:

- Corretto → Messaggio (di incoraggiamento) + **Prossimo esercizio**
- Sbagliato → Messaggio (perchè hai sbagliato, a seconda dell'errore viene indicata una lacuna e ti viene suggerito un modulo da rivedere dall'llm) + Riprova


---


#### **3.4) SEZIONE DI REPORT/DIAGNOSTICA

Tale sezione è totalmente dipendente dai dati collezionati su ogni singolo argomento:

Sul singolo argomento, vengono registrati:

- Tempo globale speso nell'argomento;

- Test prerequisiti: passato/fallito

- Totale esercizi giusti/errati

- Totale indizi richiesti durante gli esercizi guidati sul singolo argomento 

- Totale esercizi saltati sul singolo argomento

- Sommariamente, sia nel test dei prerequisiti, sia nei vari esercizi, sia nella verifica finale vengono identificate le lacune tramite LLM. Per ora vorremmo che l'LLM sia in grado di categorizzare:
	1) Errori aritmetici (precedenza operatori sbagliata)
	2) Errori di logica (non elevare alla seconda i cateti sotto radice nel teorema di pitagora)
	3) Errori di ottimizzazione (non si sceglie l'approccio migliore pur arrivando al risultato)
	4) Errori algebrici (non si sanno invertire le formule dei perimetri secondo i principi di equivalenza delle equazioni di primo grado e si cerca la strada meccanico-mnemonica)

Ergo, nella sezione globale di report bisogna poter incapsulare:

- Statistiche globali sull'anno attuale di scuola;
- Statistiche sul nucleo;
- Statistiche sulle unità del nucleo;
- Statistiche sui singoli argomenti;
- Riassunto ad opera di LLM che fornisce giudizio socratico ed imparziale sui nuclei che fa da "gestore progressi";

Fornire un toggle comodo per interscambiare statistiche a diagrammi o statistiche meramente tabellari e numeriche. Per l'MVP niente diagrammi o grafici, solo tabelle hardcoded.

---

#### **3.6) TROFEI (consultabile anche da navbar)

Semplice sistema di pop up trophies base che per ora saranno relativi semplicemente al tasso di completamento dell'anno globalmente in corso.

---

#### **3.7) DOWNLOADS (consultabile da navbar)

Semplice sistema di downloading che fa scaricare pdf identici ai nuclei interi di studio, così da minimizzare i click (sarebbe scomodo scaricare un argomento alla volta)

---

## **LATO GENITORE - ESSENTIALS:**

L'account genitore è creabile manualmente dalla landing page (vedere sopra), oppure creato automaticamente quando si approva per il figlio (ovviamente previo avviso)

Il genitore può accedere al sito proprio come il figlio, e avere la propria dashboard:
Essa mostra esattamente la stessa sezione di report/diagnostica implementata per lo studente

---

## **LATO DOCENTE - ESSENTIALS:**

Il docente si registra manualmente inserendo:

- Nome
- Cognome
- Email
- Password
- Nome scuola (*)

Avrà anche lui una dashboard identica a quella dello studente, così da poter mostrare agli studenti come funziona per bene... E così da non dover più toccare un gessetto o una apple pencil per scrivere la lezione da 0.

In più, la sua dashboard conterrà
- Le sue classi
- Report sui suoi studenti per ora identici a quelli che vedono gli studenti medesimi!

Il docente può:

- Creare classe
- Generare **codice classe**
- Condividerlo agli studenti

---

# ✅ ELEMENTI COMUNI

- Logo IRONMATH
- Layout responsive
- Logout
- Password criptate (obbligatorio)
- Accessi basati su ruoli

NON ESISTERA' LA LIGHT MODE: LA LAVAGNA E' NERA, IL BIANCO FA PERDER DIOTTRIE!
*In futuro*: Mobile App, Gamification avanzata...

---

# ✅ COSA È OBBLIGATORIO NELLA BETA

- Registrazione con nickname + email genitore
- Account limitato senza approvazione
- Consenso genitore via email
- Tracciamento base risultati
- Dashboard studente semplice
- Dashboard genitore solo report identici a quella del figlio
- Dashboard docente base - identica a quella dello studente + semplice sistema di ui-db con sue classi e suoi studenti di cui può accedere ai report identici che vedono loro stessi
- Ruoli separati

---

# ✅ COSA PUÒ ESSERE OMESSO (*) NELLA BETA

- Reset password (*) (sarebbe meglio includere...)
- Profilo avanzato studente (*)
- Grafici complessi (*)
- Mostra soluzione completa (*)
- Report dettagliati (*)
- Data di nascita automatica (*)
- Notifiche (*)
- Più moduli didattici (*)
- Gamification (*)
- Pagamenti/piani premium (*)
- Chat AI (*)
- Creazione esercizi da parte docente (*)

---

# ✅ VISIONE TECNICA (ALTO LIVELLO)

### Backend

- Gestione ruoli
- Collegamento studente–genitore–docente
- Tracciamento prestazioni
- Stato account limitato/completo

### Frontend

- UI dashboard
- UI esercizi
- UI registrazione/login

### Database (tabelle minime)

- Utenti
- Relazione studente–genitore
- Relazione studente–classe–docente
- Relazione docente-classe-studente
- Esercizi
- Risultati esercizi

---

# ✅ TONO DELL’APP

- Positivo
- Motivante
- Semplice
- Non giudicante