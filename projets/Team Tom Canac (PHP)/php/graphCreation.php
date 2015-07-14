<?php

$maxN = $_POST['numberOfNodes'];
$complexity = $_POST['complexity'];
$nodes = array();
$edges = array();

$isGenerating = true;
while ($isGenerating) {
    $nodes = array();
    $edges = array();
    for ($i = 1; $i <= $maxN; $i++) {
        $nodes[] = array('id' => $i);
        for ($j = 1; $j <= count($nodes); $j++) {
            if ($j != $i) {
                $choice = rand(0, 100);
                if ($choice < $complexity) {
                    $tempEdge['from'] = $j;
                    $tempEdge['to'] = $i;
                    $tempEdge['weight'] = rand(1, 10);
                    $edges[] = $tempEdge;
                }
            }
        }
    }

    $test = array();
    $test[] = 1;
    for ($k = 0; $k < count($edges); $k++) {
        if (in_array($edges[$k]['from'], $test)) {
            if (!in_array($edges[$k]['to'], $test)) {
                $test[] = $edges[$k]['to'];
            }
        }
    }

    if (count($test) == $maxN) {
        $isGenerating = false;
    }
}


$arr = array(
    'size' => $maxN,
    'nodes' => $nodes,
    'edges' => $edges
);

echo json_encode($arr);