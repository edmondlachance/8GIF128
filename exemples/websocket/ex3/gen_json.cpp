#include <stdio.h>
#include <windows.h>
#include <string.h>

//Exemple CGI + Websocketd
//Les variables d'environnement contiennent des infos également

int main() {

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

	puts(json);
    return 0;
	}