<?php

$received = $_POST["graph"];

$graph = array();
$graph = json_decode($received, true);
$nb_noeud = $graph["size"];

$_distArr = array();
foreach ($graph["edges"] as $edge) {
    $_distArr[$edge['from']][$edge['to']] = $edge['value'];
    $_distArr[$edge['to']][$edge['from']] = $edge['value'];
}

for ($i = 2; $i <= $nb_noeud; $i++) {
    //the start and the end
    $a = 1;
    $b = $i;

    //initialize the array for storing
    $S = array();//the nearest path with its parent and weight
    $Q = array();//the left nodes without the nearest path
    foreach (array_keys($_distArr) as $val) $Q[$val] = 99999;
    $Q[$a] = 0;

    //start calculating
    while (!empty($Q)) {
        $min = array_search(min($Q), $Q);//the most min weight
        if ($min == $b) break;
        foreach ($_distArr[$min] as $key => $val) if (!empty($Q[$key]) && $Q[$min] + $val < $Q[$key]) {
            $Q[$key] = $Q[$min] + $val;
            $S[$key] = array($min, $Q[$key]);
        }
        unset($Q[$min]);
    }


    $path = array();
    $pos = $b;
    while ($pos != $a) {
        $path[] = $pos;
        $pos = $S[$pos][0];
    }
    $path[] = $a;
    $path = array_reverse($path);

    $tmp = array();
    $tmp['weight'] = $S[$b][1];
    $tmp['from'] = $a;
    $tmp['to'] = $b;

    $d[] = $tmp;
}
echo json_encode($d);