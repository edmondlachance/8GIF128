package graph;

public class Arete implements Comparable {
	private int sommet1;
	private int sommet2;
	private int poids;
	
	public Arete(int sommet1, int sommet2) {
		this.sommet1 = sommet1;
		this.sommet2 = sommet2;
		
		//Poids genere aleatoirement entre 1 et 10
		poids = (int) (Math.random() * 10) + 1;
	}
	
	public int getSommet1() {
		return sommet1;
	}
	
	public int getSommet2() {
		return sommet2;
	}
	
	public int getPoids() {
		return poids;
	}
	
	//Methode permettant de comparer deux aretes selon leurs poids
	public int compareTo(Object o) {
		Arete a = (Arete) o;
		
		if (this.poids == a.poids)
            return 0;
        else if (this.poids > a.poids)
            return 1;
        else
            return -1;
	}
	
	public String toString() {
		return sommet1 + "->" + sommet2 + " : " + poids;
	}
}
