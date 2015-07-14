<?php
	require_once('JSON.php');
	
	class Sommet implements JSON
	{
		private static $numActual = 1;
		private $id;
		private $listArc;
		
		public function __construct()
		{
			$this->id = $this::$numActual++;
			$this->listArc = array();
		}
		
		public function addArc(Arc $arc)
		{
			$this->listArc[] = $arc;
		}
		public function getArcs()
		{
			return $this->listArc;
		}
		public function getJSON()
		{
			return '"'.$this->id.'"';
		}
		
		public function getId(){	return $this->id;	}
		
		public function toString()
		{
			return $this->id;
		}
		public static function reset()
		{
			Sommet::$numActual = 1;
		}
	}