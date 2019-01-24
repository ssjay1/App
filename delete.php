<?php

require 'vendor/autoload.php';

$ICU = new MongoDB\Client();
$collection = $ICU->ICU->Information;
$term = $_GET["json"];
$term = json_decode($term);

if(!empty($term)){
    $id = $term->id;
    $condition = ['_id' => new MongoDB\BSON\ObjectID($id)];
    $collection->deleteOne($condition);
    $member = $collection->find();
    
     $data = json_encode(iterator_to_array($member));
    echo $data;
}
else{
    echo 'No Inputs';
}



?>
