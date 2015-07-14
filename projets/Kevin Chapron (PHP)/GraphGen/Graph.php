<?php
	require_once('Sommet.php');
	require_once('Arc.php');
	require_once('JSON.php');
	
	class Graph implements JSON
	{
		private $listSommet;
		private $listArc;
		
		public function __construct($nbSommet, $densite)
		{
			while(!$this->isConnected())
			{
				Sommet::reset();
				$this->listSommet = array();
				$this->listArc 	  = array();
				if($densite<0 || $densite>100) exit("Erreur : La densité doit être entre 0 et 100");
				
				for($i=0;$i<$nbSommet;$i++)	$this->listSommet[] = new Sommet();
				
				foreach($this->listSommet as $s1)
					foreach($this->listSommet as $s2)
						if($s1!=$s2 && rand(0,100)<$densite)
							$this->listArc[] = new Arc($s1,$s2);
				
				$this->clean($this->listArc);
			}
		}
		
		private function confParse($sommet, $done = array())
		{
			$done[] = $sommet;
			foreach($sommet->getArcs() as $arc)
			{
				if(!in_array($arc->getSommet1(),$done)) $done = $this->confParse($arc->getSommet1(),$done);
				if(!in_array($arc->getSommet2(),$done))	$done = $this->confParse($arc->getSommet2(),$done);
			}
			return $done;
		}
		private function isConnected()
		{
			// On déclare le tableau des sommets parcourus
			$tot = array();
			// On teste s'il y a au moins un sommet
			if(count($this->listSommet)<=1) return false;
			// On déclare la fonction qui permet de parcourir le graphe point par point,
			// pour être sur que celui-ci est connexe.
			$tot = $this->confParse($this->listSommet[0]);
			// On vérifie que le nombre parcouru correspond au nombre initial
			if(count($tot)==count($this->listSommet)) return true;
			return false;
		}
		
		
		private function clean(&$array)
		{
			$tmp = array();
			foreach($array as $t)
			{
				$b = true;
				foreach($tmp as $s)
					if($t->equals($s)) $b = false;
				if($b)
				{
					$tmp[] = $t;
					$t->confArc();
				}
			}
			$array = $tmp;
		}
		
		public function getJSON()
		{
			$json = '{';
				$json.='"listSommet":[';
					foreach($this->listSommet as $sommet)
						$json.=$sommet->getJSON().',';
				$json = substr($json,0,strlen($json)-1).'],';
				
				$json.='"listArc":[';
					foreach($this->listArc as $arc)
						$json.=$arc->getJSON().',';
				$json = substr($json,0,strlen($json)-1).']';
			$json.='}';
			return $json;
		}
		
		public function toString()
		{
			$res = "";
				$res.="Sommets : "."<br />";
				foreach($this->listSommet as $sommet) $res.="    ".$sommet->toString()." ; ";
				$res = substr($res,0, strlen($res)-2)."<br />";
				$res.="<br />";
				$res.="Arcs : "."<br />";
				foreach($this->listArc as $arc) $res.="    ".$arc->toString()." ; ";
				$res = substr($res,0, strlen($res)-2)."<br />";
			return $res;
		}
	}