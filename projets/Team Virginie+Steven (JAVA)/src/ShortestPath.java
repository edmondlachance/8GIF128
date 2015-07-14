package shortestPath;

import graph.Arete;
import graph.Graph;

import java.util.*;

public class ShortestPath {
	private Graph graph;
	private int sommetSource;
	
	private List<Integer> alSommet;
	private List<Arete> alArete;
	
	private Set<Integer> sommetsTraites;
	private Set<Integer> sommetsNonTraites;
	private Map<Integer, Integer> predecesseurs;
	private Map<Integer, Integer> distance;
	
	public ShortestPath(Graph g) {
		graph = g;
		sommetSource = 0;
		
		alArete = new ArrayList<Arete>(graph.getAretes());
		alSommet = new ArrayList<Integer>(graph.getNbSommets());
		for(int i=0; i<graph.getNbSommets(); i++) {
			alSommet.add(i);
		}
		
		execute(sommetSource);
	}
	
	private void execute(int source) {
		sommetsTraites    = new HashSet<Integer>();
	    sommetsNonTraites = new HashSet<Integer>();
	    predecesseurs     = new HashMap<Integer, Integer>();
	    distance          = new HashMap<Integer, Integer>();
	    
	    distance.put(source, 0);
	    sommetsNonTraites.add(source);
	    while(sommetsNonTraites.size() > 0) {
	    	int sommet = getMinimum(sommetsNonTraites);
	    	sommetsTraites.add(sommet);
	    	sommetsNonTraites.remove(sommet);
	    	findMinimalDistances(sommet);
	    }
	}
	
	private void findMinimalDistances(int sommet) {
	    List<Integer> sommetAdjacent = getVoisins(sommet);
	    for (int sommetCible : sommetAdjacent) {
	    	if (getShortestDistance(sommetCible) > getShortestDistance(sommet) + getDistance(sommet, sommetCible)) {
	    		distance.put(sommetCible, getShortestDistance(sommet) + getDistance(sommet, sommetCible));
	    		predecesseurs.put(sommetCible, sommet);
	    		sommetsNonTraites.add(sommetCible);
	    	}
	    }
	}
	
	private int getDistance(int sommet, int sommetCible) {
		for (Arete arete : alArete) {
			if (arete.getSommet1() == sommet && arete.getSommet2() == sommetCible) {
				return arete.getPoids();
			}
			if(arete.getSommet2() == sommet && arete.getSommet1() == sommetCible) {
				return arete.getPoids();
			}
		}
		
		return 0;
	}
	
	private List<Integer> getVoisins(int sommet) {
	    List<Integer> voisins = new ArrayList<Integer>();
	    for (Arete arete : alArete) {
	    	if (arete.getSommet1() == sommet && !estTraite(arete.getSommet2())) {
	    		voisins.add(arete.getSommet2());
	    	}
	    	if(arete.getSommet2() == sommet && !estTraite(arete.getSommet1())) {
	    		voisins.add(arete.getSommet1());
	    	}
	    }
	    return voisins;
	}
	
	private boolean estTraite(Integer sommet) {
		return sommetsTraites.contains(sommet);
	}
	
	private int getMinimum(Set<Integer> sommets) {
		int minimum = -1;
		for (int sommet : sommets) {
			if (minimum == -1) {
				minimum = sommet;
			} else {
				if (getShortestDistance(sommet) < getShortestDistance(minimum)) {
					minimum = sommet;
				}
			}
		}
		return minimum;
	}
	
	private int getShortestDistance(int destination) {
		Integer d = distance.get(destination);
		if (d == null) {
			return Integer.MAX_VALUE;
	    } else {
	    	return d;
	    }
	}
	
	public LinkedList<Integer> getPath(Integer target) {
	    LinkedList<Integer> path = new LinkedList<Integer>();
	    Integer step = target;
	    
	    //Verifie que le chemin existe
	    if (predecesseurs.get(step) == null) {
	    	return null;
	    }
	    path.add(step);
	    while (predecesseurs.get(step) != null) {
	    	step = predecesseurs.get(step);
	    	path.add(step);
	    }
	    //On l'inverse pour avoir l'ordre correct
	    Collections.reverse(path);
	    return path;
	}
	
	public String toString() {
		String sRetour = "";
		
		int poidsTotal = 0;
		int sommet = sommetSource;
		for(int i=1; i<graph.getNbSommets(); i++) {
			LinkedList<Integer> path = getPath(i);
			
			for(int j=0; j<path.size(); j++) {
				sRetour += path.get(j);
				if(j < path.size() - 1) sRetour += "->";
				
				poidsTotal += getDistance(sommet, path.get(j));
				sommet = path.get(j);
			}
			
			sRetour += " : " + poidsTotal + "\n";
			sommet = sommetSource;
			poidsTotal = 0;
		}
		
		return sRetour;
	}
	
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String json = sc.nextLine();
		
		Graph g = new Graph(json);
		ShortestPath sp = new ShortestPath(g);
		System.out.println(sp);
	}
}
