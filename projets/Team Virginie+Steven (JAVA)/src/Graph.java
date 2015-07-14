package graph;

import java.util.*;

public class Graph {
    private int densite;
    
    private boolean[] sommetsMarques;
    private int nbSommetsConnectes;
    
    private HashMap<Integer, ArrayList<Integer>> adjlist;
    private ArrayList<Arete> alArete;
    
    //Constructeur utilisé dans le premier service, il permet de generer un graphe aleatoire
    //en fonction du nombre de sommet et de la densite
    public Graph(int nbSommets, int densiteAretes) {
        densite = densiteAretes;
        
        //Tableau permettant de savoir si tous les sommets sont connectés entre eux
        sommetsMarques = new boolean[nbSommets];
        nbSommetsConnectes = 0;
        
        //adjlist permet de connaitre quelles sont les aretes reliées au sommet n°0, n°1, etc...
        adjlist = new HashMap<Integer, ArrayList<Integer>>(nbSommets);
        for(int i=0; i<nbSommets; i++)
        	adjlist.put(i, new ArrayList<Integer>());
        
        //alArete contient toutes les aretes du Graphe
        alArete = new ArrayList<>();
        
        generate();
    }
    
    //Constructeur utilisé dans les services 2 et 3, il permet de reconstruire un graphe a partir de
    //sa representation sous forme de JSON
    public Graph(String json) {
    	json = json.replaceAll("\"", "");
    	
    	//On recupere la partie correspond au nodes du graphe et celle correspondant aux aretes
		String nodes = json.split(",edges")[0].substring(0, json.split(",edges")[0].length()-1);
		String edges = json.split(",edges")[1].substring(2, json.split(",edges")[1].length()-2);
				
		//On recupere le dernier caractere de la String nodes et on le convertie en int afin 
		//d'avoir le nombre de sommet du graphe
		int nbSommets = Integer.parseInt(nodes.charAt(nodes.length()-1) + "") + 1;
		
		//On recupere chaques paires de sommets pour pouvoir reconstruire les aretes du graphe
		String[] aretes = edges.split("(\\D,\\D)|\\[|\\]");
		
		adjlist = new HashMap<Integer, ArrayList<Integer>>(nbSommets);
        for(int i=0; i<nbSommets; i++)
        	adjlist.put(i, new ArrayList<Integer>());
        
        alArete = new ArrayList<>();
        
        //On ajoute des aretes grace aux paires de sommets recuperer plus tot
        for(String arete : aretes) {
        	if(arete.length() != 0) {
        		int sommet1 = Integer.parseInt(arete.charAt(0) + "");
        		int sommet2 = Integer.parseInt(arete.charAt(arete.length()-1) + "");
        		
        		ajouterArete(sommet1, sommet2);
        	}
        }
    }
    
    private void dfs(int sommet) {
    	nbSommetsConnectes++;
        sommetsMarques[sommet] = true;
        
        for (int i : adjlist.get(sommet)) {
            if (!sommetsMarques[i]) {
                dfs(i);
            }
        }
    }
    
    private void generate() {
		boolean isConnected = false;
		
		//On continue tant que le graphe n'est pas connecté
		while(!isConnected) {
			for(int i=0; i<adjlist.size(); i++) {
				for(int j=0; j<adjlist.size(); j++) {
					//Nombre prit au hasard afin de savoir si 
					//il y aura une arete entre les noeuds i et j
					double d = Math.random();
					
					if((d*100) < densite) {
						if(i != j) {
							ajouterArete(i, j);
						}
					}
				}
			}
			//On cherche si tous les sommets sont connecte au numero 0
			dfs(0);
			if(nbSommetsConnectes != adjlist.size()) {
				nbSommetsConnectes = 0;
				for(int k=0; k<sommetsMarques.length; k++) {
					sommetsMarques[k] = false;
				}
				
				isConnected = false;
			}
			else{
				isConnected = true; 
			}
		}
	}

    private void ajouterArete(int sommet1, int sommet2) {
    	boolean ajouterArete = true;
    	
    	for(int i : adjlist.get(sommet1))
    		if(i == sommet2)
    			ajouterArete = false;
    	
    	for(int i : adjlist.get(sommet2))
    		if(i == sommet1)
    			ajouterArete = false;
    	
    	if(ajouterArete) {
    	     adjlist.get(sommet1).add(sommet2);
    	     adjlist.get(sommet2).add(sommet1);
    	     
    	     alArete.add(new Arete(sommet1, sommet2));
    	}
    }
    
    public int getNbSommets() {
    	return adjlist.size();
    }
    
    public ArrayList<Arete> getAretes() {
    	return alArete;
    }

    public String afficher() {
    	String s = adjlist.size() + " " + alArete.size() + "\n";
    	
    	for(Arete arete : alArete) {
    		s+=arete.getSommet1() + "->" + arete.getSommet2() + " : " + arete.getPoids() + "\n";
    	}
        
        return s;
    }
    
    public String toString() {
    	String s = "{";
    	
    	s += "\"nodes\": [";
    	for(int i=0; i<adjlist.size(); i++) {
    		s += "\"" + i +"\"";
    		if(i<adjlist.size()-1) {
    			s += ",";
    		}
    		s += "";
    	}
    	s += "],";
    	s += "\"edges\": [";
    	for(int i=0; i<alArete.size(); i++) {
    		s += "[";
    		s += "\"" + alArete.get(i).getSommet1() + "\",";
    		s += "\"" + alArete.get(i).getSommet2() + "\"";
    		s += "]";
    		if(i<alArete.size()-1) {
    			s += ",";
    		}
    		s += "";
    	}
    	s += "]";
    	s += "}";
    		
    	return s;
    }

    /*public static void main(String[] args) {
    	int nbSommets = 0;
    	int densite = 0;
    	
    	Scanner sc = new Scanner(System.in);
    	nbSommets = sc.nextInt();
    	densite = sc.nextInt();
    	
    	Graph graph = new Graph(nbSommets, densite);
    	System.out.println(graph);
    }*/

}