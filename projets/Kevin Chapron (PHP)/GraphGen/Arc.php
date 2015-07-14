<?php
	require_once('JSON.php');
	
	class Arc implements JSON
	{
		private static $MINIMUM = 0;
		private static $MAXIMUM = 10;
		private $sommet1;
		private $sommet2;
		private $poids;
		
		public function __construct($sommet1, $sommet2)
		{
			$this->sommet1 = $sommet1;
			$this->sommet2 = $sommet2;
			$this->poids = rand($this::$MINIMUM, $this::$MAXIMUM);
		}
		
		public function equals(Arc $arc)
		{
			return ($this->sommet1==$arc->sommet1 && $this->sommet2==$arc->sommet2) || ($this->sommet1 == $arc->sommet2 && $this->sommet2 == $arc->sommet1);
		}
		public function confArc()
		{
			$this->sommet1->addArc($this);
			$this->sommet2->addArc($this);
		}
		public function getJSON()
		{
			return '{"sommet1":'.$this->sommet1->getJSON().',"sommet2":'.$this->sommet2->getJSON().',"poids":'.$this->poids.'}';
		}
		
		public function getSommet1(){	return $this->sommet1;	}
		public function getSommet2(){	return $this->sommet2;	}
		public function getPoids(){		return $this->poids;	}
		
		public function toString()
		{
			return "[".$this->sommet1->toString().":".$this->sommet2->toString()." (".$this->poids.")]";
		}
	}