package minimumSpanningTree;

import graph.Arete;
import graph.Graph;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class MinimumSpanningTree {
	private Graph graph;
	
	private boolean[] sommetsAtteints;
	
	private ArrayList<Arete> alAretes;
	private ArrayList<Arete> alMst;
	
	public MinimumSpanningTree(Graph g) {
		graph = g;
		
		execute();
	}
	
	private void execute() {
		int sommetSource = 0;
		
		sommetsAtteints = new boolean[graph.getNbSommets()];
		sommetsAtteints[sommetSource] = true;
		
		alMst = new ArrayList<Arete>();
		alAretes = graph.getAretes();
		Collections.sort(alAretes);

		while(!estComplet()) {
			Arete minimumArete = getMinimumArete();
			
			alMst.add(minimumArete);
			
			sommetsAtteints[minimumArete.getSommet1()] = true;
			sommetsAtteints[minimumArete.getSommet2()] = true;
		}
	}
	
	private Arete getMinimumArete() {
		Arete minimum = null;
		
		for(int i=0; i<sommetsAtteints.length; i++) {
			if(sommetsAtteints[i]) {
				for(Arete a : alAretes) {
					if(minimum == null) {
						if(a.getSommet1() == i || a.getSommet2() == i) {
							minimum = a;
						}
					} else if(minimum != null) {
						if(a.getPoids() < minimum.getPoids()) {
							if(a.getSommet1() == i && !sommetsAtteints[a.getSommet2()] ||
							   a.getSommet2() == i && !sommetsAtteints[a.getSommet1()]) {
								minimum = a;
							}
						}
					}
				}
			}
		}
		
		alAretes.remove(minimum);
		return minimum;
	}
	
	private boolean estComplet() {
		for(Boolean b : sommetsAtteints) {
			if(b == false) 
				return false;
		}
		
		return true;
	}
	
	public int getPoidsTotal() {
		int poidsTotal = 0;
		
		for(Arete arete : alMst) {
			poidsTotal += arete.getPoids();
		}
		
		return poidsTotal;
	}
	
	public String afficher() {
		String s = "";
		for(Arete a : alMst) {
			s += a.getSommet1() + "->" + a.getSommet2() + " : " + a.getPoids() + "\n";
		}
		
		return s;
	}
	
	public String toString() {
		String s = "{";
    	
    	s += "\"nodes\": [";
    	for(int i=0; i<graph.getNbSommets(); i++) {
    		s += "\"" + i +"\"";
    		if(i<graph.getNbSommets()-1) {
    			s += ",";
    		}
    		s += "";
    	}
    	s += "],";
    	s += "\"edges\": [";
    	for(int i=0; i<alMst.size(); i++) {
    		s += "[";
    		s += "\"" + alMst.get(i).getSommet1() + "\",";
    		s += "\"" + alMst.get(i).getSommet2() + "\"";
    		s += "]";
    		if(i<alMst.size()-1) {
    			s += ",";
    		}
    		s += "";
    	}
    	s += "]";
    	s += "}";
    	
    	return s;
	}
	
	/*public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String json = sc.nextLine();
		
		Graph g = new Graph(json);
		MinimumSpanningTree mst = new MinimumSpanningTree(g);
		System.out.println(mst);
		
		System.out.println("Poids total : " + mst.getPoidsTotal());
	}*/
}
