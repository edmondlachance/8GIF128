#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char transformLine(char *oldline, char *newline)
{
	char * oldp = oldline;
	char * newp = newline;
	
	//Check for null ptrs
	if (oldline == NULL || newline == NULL) return -1;

	//Check to see if the line is valid
	*newp++ = '"';
	while (1) 
	{

		if (*oldp == 13 || *oldp == 10 || *oldp == 0) {
			*newp++ = '"';
			*newp++ = '\n'; //comment this line to have single line json
			break;
		}

		if (*oldp == '"') {
			*newp++ = '\\';
			*newp++ = '"';
			oldp++;
			continue;
		}

		*newp++ = *oldp++;
	}
}


int main(void)
{

	//Read string from STDIN
	static char line[500];
	static char buffer[500];
	// Disable output buffering.
    setbuf(stdout, NULL);

	while (fgets(line, 500, stdin) != NULL) {
			memset(buffer,0, 500);
			transformLine(line, buffer);
			printf(buffer);
	}

	return 0;


}

