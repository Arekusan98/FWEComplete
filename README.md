# Fortgeschrittene Webentwicklung Hausaufgabe 01 & 02

Diese Hausaufgabe umfasst eine Webapplikation, die es ermöglicht, Rezepte darzustellen und auf einem Server zu speichern und zu bearbeiten

### Installation Hausaufgabe 01 (Backend)
Zuerst muss eine mysql-Datenbank bereitgestellt werden. Diese sollte über eine Verbindung für die in .env konfigurierten Parameter enthalten sowie die notwendigen Berechtigungen für den Appuser bereitstellen (CRUD auf Tabellen).

Um die Datenbank mit Daten und Tabellen zu füllen, können die beigefügten sql-Dateien importiert werden. Falls die Datenbank leer starten soll, kann man diesen Schritt überspringen. 

Für die nächsten Schritte wird [Node.js](https://nodejs.org/) v4+ benötigt.

Zunächst müssen alle dependencies installiert werden.

```sh
$ cd ./Backend
$ npm install -d
```

Datenbankschema und TypeOrm synchronisieren`
```sh
$ npm run typeorm schema:sync
```

Backend starten

```sh
npm start
```

Die Konsole wird daraufhin Rückmeldung geben, wenn der Server läuft und auf Port 3000 erreichbar ist.

Man kann das Backend aber auch zunächst mit 
```sh
$ npm run build
```
bauen und dann den entstandenen "dist" Ordner entweder öffnen oder verschieben und an einem anderen Ort verwenden. Hierbei sollte beachtet werden, dass sich das Frontend auf localhost verbindet und der Server daher auf der gleichen Maschine laufen muss wie das Frontend.
In diesem Ordner kann dann mit 
```sh
$ node index
```
der Server gestartet werden. Hierbei verhält er sich genauso wie über den vorigen Befehl.

### Installation Hausaufgabe 02 (Frontend)
Zunächst müssen alle dependencies installiert werden.

```sh
$ cd ./Frontend
$ npm install -d
```

Danach kann die Applikation auf zwei Arten gestartet werden.
##### Variante 1
Im Unterordner Frontend des Projekts diese Kommandozeile ausführen 
```sh
$ npm start
```

Falls der Server bereits läuft, kann es passieren, dass dieser bereits den Port belegt, auf dem das Frontend gestartet werden soll. Das Terminal wird daraufhin fragen, ob man einen anderen Port benutzen möchte. Um an dieser Stelle fortzufahren, muss man "Y" zum bestätigen eingeben.

##### Variante 2
Hierfür muss serve installiert sein
```sh
$ npm install -g serve
```
Im Ordner "build" unter "Frontend" kann dann folgender Aufruf ausgeführt werden
```sh
npx serve
```
Dadurch wird das Frontend standardmäßig auf Port 5000 gestartet.

### Test
Das Backend kann mittels der beigefügten Postman API Aufrufe umfangreich getestet werden. Diese können nacheinander ausgeführt werden und die Ergebnisse sind in der Response erkennbar.
Fälle, die noch nicht von den API-Aufrufen an sich abgedeckt sind:
- Rezept/Zutat mit Namen eines bereits existierenden Elements hinzufügen. Dafür muss ein Element erstellt werden und dessen Name beim Erstellen des nächsten Elements wiederverwendet werden. Dies soll vom Server abgelehnt werden. 
- Rezept/Zutat aktualisieren und Namen auf den eines bereits existierenden Elements ändern. Dafür müssen zwei Elemente bestehen. Beim aktualisieren eines Elements muss dann der Name in der Anfrage dem des anderen Elements entsprechen. Dies soll vom Server abgelehnt werden. 
- ein leeres Rezept löschen.
- ein Rezept mit Zutaten löschen. Dafür muss mindestens ein Rezept und eine Zutat bestehen. Mindestens eine Zutat muss dem Rezept zugefügt worden sein. Bei der Aktion wird die Zutat aus dem Rezept entfernt, die Zutat an sich bleibt aber bestehen. Der Server gibt Status OK.
Das Frontend nicht. Sorry.