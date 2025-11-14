Mini lecteur Audio : réalisé par YASSMINE GHARIENI MI2A 

-Description du projet: 
un lecteur audio web interactif permettant de lire une playliste de fichiers
audio a partir d'un fichier JSON , avec controle du volume , lecture-pause , navigation entre pistes
et design responsive.

-languages utilisés :
  -HTML
  -CSS
  -JavaScript 
  -JSON

fonctionnalites principaless du projet :
-lecture - pause 
-suivant - precedant
-controle du volume 
-playlist chargée depuis un fichier JSON(que j'ai choisi , contenant les chansons en mp3 et leurs "covers")
-une interface animee et responsive

Lien vers la démo en ligne : 

méthodes et nouveautés : 
-API audio de javascript
-gestion dynamique de DOM
-chatgement asynchrone (fetch JSON)
-design avec effet de flou et dégradé (glassmorphism)

    (honete)difficultés rencontrées
    Pourquoi il faut utiliser un serveur local

        Quand on ouvre le fichier index.html directement avec file:///, le navigateur bloque le chargement de tracks.json et des fichiers audio pour des raisons de sécurité (Same-Origin Policy).
        Du coup, la playlist ne peut pas être lue et le lecteur affiche “Erreur de chargement”.

      Pour que le lecteur fonctionne, il faut lancer le projet via un serveur local, par exemple avec Live Server dans VSCode ou avec :
      python3 -m http.server
