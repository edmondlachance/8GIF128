//Globals
var lastServerTime = 0;
//Pas besoin de créer un objet avec des fonctions, donc aucun prototype nécessaire
var shownTalks = Object.create(null); //lookup table pour savoir si le talk est deja present ou pas

//Exemple de showntalks
//{
//    "p1" : (Dom Node);
//}

//Ne supporte pas les doublons!!! Inserer un talk avec le meme title va overwriter le precedent

function request(options, callback) {
    var req = new XMLHttpRequest();
    req.open(options.method || "GET", options.pathname, true);
    req.addEventListener("load", function() {
        //Ca marche
        if (req.status < 400)
            callback(null, req.responseText); //Quand aucune erreur, on utilise 2 arguments
        else
            //Erreur
            callback(new Error("Request failed: " + req.statusText)); //Lorsqu'il y a une erreur, on utilise juste 1 argument
    });
    req.addEventListener("error", function() {
        callback(new Error("Network error"));
    });
    req.send(options.body || null);
}

//Utilisée par de nombreuses requetes AJAX pour afficher une erreur au cas ou
//Generalement, il n'y a jamais d'erreur
function reportError(error) {
    if (error) //if error
        alert(error.toString());
}


//Gere l'affichage des talks dans le DOM
//L'objet talks est donné par le serveur
function manageTalks(talks) {
    talks.forEach(function(talk) { //Utiisation de foreach sur un objet
        var shown = shownTalks[talk.title];
        if (talk.deleted) { //Le serveur set la propriété deleted sur les objets JSON
            if (shown) {
                talkDiv.removeChild(shown);
                delete shownTalks[talk.title];
            }
        } else {
            var node = drawTalk(talk);
            if (shown)
                talkDiv.replaceChild(node, shown);
            else
                talkDiv.appendChild(node);
            shownTalks[talk.title] = node;
        }
    });
}


function instantiateTemplate(name, values) {

    //Trouve le placeholder du template, et remplace par le title. Marche pour templates, et talks
    function instantiateText(text) {
        return text.replace(/\{\{(\w+)\}\}/g, function(_, name) {
            return values[name];
        });
    }
    function instantiate(node) {
        if (node.nodeType == document.ELEMENT_NODE) {
            var copy = node.cloneNode();  //Would deep copy work???
            for (var i = 0; i < node.childNodes.length; i++)
                copy.appendChild(instantiate(node.childNodes[i]));
            return copy;
        } else if (node.nodeType == document.TEXT_NODE) {
            return document.createTextNode(
                instantiateText(node.nodeValue));
        }
    }

    var template = document.querySelector("#template ." + name);//lien vers le node du template
    return instantiate(template); //on copie TOUT le template recursivement dans une nouvelle node
}

function drawTalk(talk) {
    var node = instantiateTemplate("talk", talk);
    var comments = node.querySelector(".comments");
    talk.comments.forEach(function(comment) {
        comments.appendChild(
            instantiateTemplate("comment", comment));
    });

    node.querySelector("button.del").addEventListener(
        "click", deleteTalk.bind(null, talk.title));         //On bind le bouton delete a deleteTalk + un argument optionel talk.Title

    //Même chose que document.QuerySelector mais cherche a partir de node comme racine
    var form = node.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        addComment(talk.title, form.elements.comment.value);
        form.reset();
    });
    return node;
}

//Rajoute talks/ avant le string title pour faire l'URL + url encode
function talkURL(title) {
    return "talks/" + encodeURIComponent(title);
}

function deleteTalk(title) {
    request({pathname: talkURL(title), method: "DELETE"},
        reportError);
}

function addComment(title, comment) {
    var comment = {author: nameField.value, message: comment};
    request({pathname: talkURL(title) + "/comments",
            body: JSON.stringify(comment),
            method: "POST"},
        reportError);
}

function waitForChanges() {
    //Cette requete est traitee de facon speciale coté serveur. Le serveur va faire attendre le client un max de 90 secondes
    request({pathname: "talks?changesSince=" + lastServerTime},
        function(error, response) {
            if (error) {
                setTimeout(waitForChanges, 2500); //Si il y a une erreur, on recommence dans 2.5 secondes
                console.error(error.stack);
            } else {
                response = JSON.parse(response);
                manageTalks(response.talks);
                lastServerTime = response.serverTime;
                waitForChanges();
            }
        });
}
//POINT D'ENTRÉE DU JAVASCRIPT

//Première requête faite quand la page cherche (faite une seule fois seulement)
//Load les talks
//WaitForChanges() permet d'avoir du long polling


//Asynchrone
request({pathname: "talks"}, function(error, response) {
    if (error) {
        reportError(error);
    } else {
        response = JSON.parse(response);
        manageTalks(response.talks);
        lastServerTime = response.serverTime;
        waitForChanges();
    }
});


//synchrone
var talkDiv = document.querySelector("#talks");

//Pour le local storage. Remplacer par session storage si on veut que le nom se perde avec le browser
var nameField = document.querySelector("#name");
nameField.value = localStorage.getItem("name") || "";
nameField.addEventListener("change", function() {
    localStorage.setItem("name", nameField.value);
});

var talkForm = document.querySelector("#newtalk"); //Le node du formulaire form. getElementById fait la meme chose

//Au lieu de faire ça, le form pourrait disaparaitre et le event serait sur le bouton
//Il serait surement plus facile de mettre des IDs aux inputs et utiliser des sélecteurs
talkForm.addEventListener("submit", function(event) {
    event.preventDefault();   //désactive le behavior normal de submit (qui changerait la page!)
    request( //arguments : options (objet) et callback(fonction)
        {
            pathname: talkURL(talkForm.elements.title.value),
            method: "PUT",
            body: JSON.stringify({presenter: nameField.value, summary: talkForm.elements.summary.value})
        }, reportError);
    talkForm.reset();
});

