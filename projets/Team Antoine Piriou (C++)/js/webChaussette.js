var x; //window.x
var stringresult="";
var n ="\n";
var service = "-1";
var graph1="";
var graph2="";
var graph3="";

//Binds x to a websocket object
function creerSocket(){
    //Clear old results
    stringresult="";
    x = new webchaussette();
}
function webchaussette(){
    //Création d'un lien vers un websocket qui écoute sur le port 8080
    this.ws = new WebSocket('ws://localhost:8080/');

    //We have to wait for the socket to be opened to use SEND
    this.ws.onopen = function(){
        console.log("Opening connection");
    };
    this.ws.onclose = function(){
        console.log("Closing connection");
    };
    this.ws.onmessage = function(event){
        var json = (event.data);
        if(json[0]=="#"){
            stringresult+=json;
            console.log(stringresult);
            if(service=="1"){
                graph1 = stringresult;
                load_graph(graph1);
            }
            else if(service=="2"){
                graph2=stringresult;
                update_path(graph2);
                
            }
            else if(service=="3"){
                graph3=stringresult;
                update_arc(graph3);
            }
        }
        else{
            stringresult+=json+n;
        }
    }

    this.send_data = function(s){
        this.ws.send(s);
    }
    this.envoyer =  function(){
        creerSocket();
        var s = "1" + n + document.getElementById("vertices").value + n +
            document.getElementById("density").value + n +
            document.getElementById("weight-min").value + n +
            document.getElementById("weight-max").value + n;
        this.send_data(s);
        service="1";
    }
    
    this.envoyer2 =  function(){
        if(service!="-1"){
            var s = "2" + n + graph1 + n + n +
                document.getElementById("first-node").value + n +
                document.getElementById("last-node").value + n;
                creerSocket();
            this.send_data(s);
            service="2";
        }
        else{
            console.log("Pas de graph pour travailler\n");
        }
    }
    this.envoyer3 =  function(){
        creerSocket();
        if(service!="-1"){
            var s = "3" + n + graph1 + n;
            this.send_data(s);
            service="3";
        }
        else{
            console.log("Pas de graph pour travailler\n");
        }
    }
    
    this.fermer = function(){
        this.ws.close();
    }
}
creerSocket();