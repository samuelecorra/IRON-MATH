// Definisce e condivide lo stato globale dell'applicazione.
export const stato = {
  livelloScolastico: null, // classe scolastica selezionata
  profilo: null, // profilo "forte" oppure "difficolta"
  vistaCorrente: "home", // vista attuale renderizzata
  passoCorrente: 0, // passo corrente nel percorso demo esercizi
  registrazioneStudente: creaStatoRegistrazioneStudente(), // snapshot della procedura di registrazione
};

// Chiavi care alla persistenza locale/sessione.
export const CHIAVI_STORAGE = {
  USERS: "ironmathUsers",
  CURRENT_USER: "ironmathCurrentUserId",
  REMEMBER_ME: "ironmathRememberMe",
  REMEMBERED_LOGIN: "ironmathRememberedLogin",
};

// Factory per riportare allo stato iniziale il flusso di registrazione.
export function creaStatoRegistrazioneStudente() {
  return {
    classeSelezionata: null,
    motivazioneSelezionata: null,
    passo: 1,
    vista: "wizard",
    eMinorenne: null,
    valoriForm: {
      nomeUtente: "",
      dataNascita: "",
      scuola: "",
      emailStudente: "",
      emailGenitore: "",
      password: "",
      confermaPassword: "",
      termini: false,
      privacy: false,
    },
  };
}

// Sequenza utilizzata dalla demo esercizio passo-passo.
export const passaggiEsercizio = [
  {
    title: "Step 1 – Capire il testo",
    body: `Un ragazzo dice: "Sto pensando a un numero. Se lo raddoppio e aggiungo 3, ottengo 11".
Come trasformi questa frase in una equazione?
Suggerimento: chiama il numero sconosciuto "x" e scrivi cosa succede ad x.`,
  },
  {
    title: "Step 2 – Scrivere l’equazione",
    body: `Hai identificato che:
- prendi x
- lo raddoppi
- aggiungi 3
- tutto questo risultato deve essere uguale a 11

L’equazione deve avere la forma: 2x + 3 = 11.
Se non ti viene naturale, è qui che IronMath lavorerà con te.`,
  },
  {
    title: "Step 3 – Risolvere usando il bilanciamento",
    body: `Per trovare x:
- togli 3 da entrambi i membri → 2x = 8
- dividi entrambi i membri per 2 → x = 4

Quello che conta non è il numero 4 in sé, ma il metodo di "bilanciare" sempre
tutti i passaggi. Questo è il cuore delle equazioni.`,
  },
  {
    title: "Step 4 – La filosofia IronMath",
    body: `Se qui hai avuto difficoltà, IronMath non ti porterà subito a sistemi, 
parabole e robe universitarie buttate a caso. Ti fermerà, ti farà rinforzare
questi passaggi finché non ti vengono naturali.

Questo è il motivo per cui, se non passi il test preliminare, ti blocchiamo:
così quando arriverai al quinto superiore, potrai guardare un integrale e dire
"ok, non mi fa paura".`,
  },
];
