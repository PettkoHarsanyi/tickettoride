# Ticket To Ride - magyar

Heló! Köszöntelek a Ticket To Ride társasjáték online megvalósított játékának projektkönyvtárában. Ezt a programot egyetemi tanulmányaim során készítettem el kliensoldali programozási tárgy keretein belül.

Az alkalmazást nem github használata mellett fejlesztettem, a kész alkalmazást importáltam be.

> A játék látványképei megtalálhatók a **"látvány"** mappában.

# Fájlrendszer

A projekt rendszer két főbb komponensből áll. A legfontosabb része a front-end programot tartalmazó **"tickettoride_frontend"** mappa, a socket logika megvalósítása pedig a **"tickettoride_socket"** útvonal alatt található. Egy harmadik "látvány" mappában a már említett látványképek láthatók.

## Függőségek telepítése

A két komponens npm csomagkezelő rendszert használ, a függőségeiket az **"npm i"** parancs segítségével lehet feltelepíteni, amennyiben valamelyik komponens mappájában állunk.

## Verziók

Node - v18.14.1 az általam használt, és ilyen beállításban az alkalmazás garantáltan helyes működéséhez szükséges csomagkezelő verziója.

További verziók az alkalmazásban:

- NPM - 9.3.1
- React - ^17.0.2
- React-dom - ^17.0.2
- React-redux - ^7.2.4

# Futtatás

A függőségek telepítését követően, ahhoz hasonlóan, az egyes főkomponensek mappájában állva az **"npm start"** parancsot kiadva elindul az alkalmazás.

> A React alkalmazás a 3000-es, a Socket alkalmazás pedig a 3030-as porton indul el alapértelmezetten.

# Ticket To Ride - english

Hello! Welcome to the project directory of the online version of the Ticket To Ride board game. I created this program as part of my university studies for a client-side programming course.

I didn't develop the application using Github, I imported the finished application.

> The game's visuals can be found in the **"látvány"** folder.

# Project directory

The project consists of two main components. The most important part is the **"tickettoride_frontend"** folder containing the front-end program, and the socket logic is implemented under the **"tickettoride_socket"** path. The previously mentioned visuals are located in a third "visuals" folder.

## Installing dependencies

Both components use the npm package manager, and their dependencies can be installed using the **"npm i"** command when in the directory of either component.

## Versions

Node - v18.14.1 is the version of the package manager I used, and it is garanteed that in this setting the application functions correctly.

Other versions used in the application are:

- NPM - 9.3.1
- React - ^17.0.2
- React-dom - ^17.0.2
- React-redux - ^7.2.4

# Running

After installing the dependencies, similarly, by being in the directory of the corresponding main component, issuing the **"npm start"** command will start the application.

> The React application runs on port 3000 and the Socket application on port 3030 by default.
