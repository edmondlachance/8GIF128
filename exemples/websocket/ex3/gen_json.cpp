#include <stdio.h>
#include <windows.h>
#include <string.h>

//Exemple CGI + Websocketd
//Les variables d'environnement contiennent des infos également

int main() {
    // Disable output buffering.
    //setbuf(stdout, NULL);


//todo fix le json
char * json = 
"{"
"    \"nodes\": ["
"        \"Amphitryon\","
"        \"Alcmene\","
"        \"Iphicles\","
"        \"Heracles\""
"    ],"
"    \"edges\": ["
"        ["
"            \"Amphitryon\","
"            \"Alcmene\""
"        ],"
"        ["
"            \"Alcmene\","
"            \"Amphitryon\""
"        ],"
"        ["
"            \"Amphitryon\","
"            \"Iphicles\""
"        ],"
"        ["
"            \"Amphitryon\","
"            \"Heracles\""
"        ]"
"    ]"
"}";

    // Disable output buffering.
    //setbuf(stdout, NULL);

	int sommets = 0, densite = 0;
	//Lire les specs du graphe
	scanf("%d %d", &sommets, &densite);

	//Generer graphe
	//printf("%d %d\n", sommets, densite);
	puts(json);

    return 0;
	}