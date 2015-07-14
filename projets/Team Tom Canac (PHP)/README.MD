Prérequis
=========

* nodejs et bower (pour les dépendances frontend)
* php

Procédure d'installation :

* cloner le dépot
* dans le répertoire, `bower install`

Fonctionnement
==============

L'application est divisée en quatre parties différentes :

* Un portail en Javascript qui sert d'interface à l'utilisateur
* 3 scripts php de manipulation de graphes  (création, single shortest source path, spaning tree)

Les trois blocs communiquent via des requètes POST en envoyant du JSON.

Format de données
=================

Le [format JSON de description des arbres](http://visjs.org/docs/network.html#Data_format) est le même que la librairie de visualisation vis.js.
