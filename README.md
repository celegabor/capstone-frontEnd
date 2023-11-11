JobWork

Link: https://main--fantastic-florentine-b750a4.netlify.app

* Gli utenti accedono a una landing page (da perfezionare) dove possono accedere alla pag di Login o direttamente alla pag per creare un profilo.

* Nella pag login si può inoltre fare il login guest dove viene fatta l'autenticazione o con GitHub o con Google. All'interno del sito però non si può interagire in alcun modo si possono solo visualizzare i post e gli utenti.


---- Modelli

* Il modello dell'utente è il seguente:

-name:{type: String,required: true},
-lastName:{type: String,required: true},
-email:{type: String,required: true},
-dob:{type: Date,required: true},
-address:{type: String,required: true},
-provincia:{type: String,required: false},
-cap:{type: String,required: false},
-doc:{type: String,required: false},
-avatar:{type: String,},
-password:{type: String,required: true,},
-gender:{type: String,required: false},
-work:{type: String,required: false},

* Una volta fatto l'accesso viene visualizzata la home dove ci saranno i vari post contenenti:

-autore del post+img 
-video
-titolo del video
-categoria lavoro
-contenuto 
-commenti legati al singolo post

* Solo l'autore del post avrà la possibilità di cancellare e di andare a modificare il post che, come nella creazione, avrà il seguente modello da seguire:

-title:{type: String,required: true},
-categoryWork:{type: String,required: true,},
-video:{type: String,required: false,},
-content:{type: String,required: false}, 
-author:{type: mongoose.Schema.Types.ObjectId,ref:'Users2Model',required: true},

* Ogni utente può scrivere un commento sotto ogni post che poi potrà andare a modificare o a cancellare. Il modello del commento è:

-comment:{type: String,required: true},
-videoId:{type: String,required: true},
-author: { 
-type: mongoose.Schema.Types.ObjectId, ref: 'Users2Model',required: true}

---- Pages

Il sito è formato dalle seguenti pagine:

* LandingPage : dove viene publicizzato e spiegato il sito 

* Login : dove l'utente può andare a fare l'accesso 

* AddUser : dove si va a creare un nuovo profilo

* Error : dove si viene mandati quando c'è un errore 404(page not found)

* Contacts : dove si possono trovare i contatti dell'azienda

* GetUserId : dove si può andare a vedere il profilo di un utente e i suoi video

* User : dove si può andare a modificare il proprio profilo

* Home : pag che contiene i bottoni delle sidebar e il componente GetVideos che renderizza i video 

----- Funzionamenti

* Nella pag Home oltre alle card dei video si possono intravedere 3 bottoni semitrasparenti che aprono 3 sidebar:

 -Button 'cogs'(a destra): apre la sidebar di sinistra che contiene un filtro dove si possono andare a nascondere tutti i video tranne quelli che rispettano la categoria di lavoro selezionato.

 -Button 'user/message'(a sinistra): apre la sidebar di destra dove troviamo:

  1)in alto il nostro nome con la nostra foto. Cliccandoci sopra veniamo mandati alla pag 'USER' che ci permetterà di modificare tutti i dati comprese le credenziali.

  2) tutti gli utenti con affianco l'icona 'message'.
  Come nei post, cliccando sulla foto o sul nome dell'utente veniamo mandati sulla pag 'GetUserId' dove possiamo vedere il profilo. Cliccando sull'icona del messaggio si aprirà un popup dove possiamo mandare un messaggio in privato all'utente scelto.

  -Button 'search' (al centro): apre dall'alto una sidebar-top che ci permette di andare a usare un campo di ricerca che filtra tutti i contenuti sia degli utenti sia dei post.

-----

Nelle card dei video è presente il bottone per il like che però in questa demo non è collegata ad alcuna funzione, quindi andrà a cambiare colore. Al refresh della pagina il like andà perso. 


    

