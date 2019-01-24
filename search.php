<?php

require 'vendor/autoload.php';

$ICU = new MongoDB\Client();
$collection = $ICU->ICU->Information;
$term = $_GET["json"];




if(!empty($term)){
    $term = json_decode($term);
    if($term->page == "last"){
        $count = $collection->count();
        $term->page = (int)($count/$term->pagesize);
    }
    $paging = ['skip' => (int)$term->page * (int)$term->pagesize,'limit' => (int)$term->pagesize];
    try{
        $condition = ['_id' => new MongoDB\BSON\ObjectId($term->id)];
    }
    catch(exception $e){
        $condition = ['$or' => [["Num" => ['$regex' => new \MongoDB\BSON\Regex('^'.$term->id)]],["First Name" => ['$regex' => new \MongoDB\BSON\Regex('^'.$term->id)]], ["Last Name" => ['$regex' => new \MongoDB\BSON\Regex('^'.$term->id)]], ["Position" => ['$regex' => new \MongoDB\BSON\Regex('^'.$term->id)]]]];
    };
    $member = $collection->find($condition,$paging);
}
else{
    $member = $collection->find( 
        [],
        ['limit' => 8]
    );
}


//$data = '{"data":'.json_encode(iterator_to_array($member)).',"page":"'.$term->page.'"}';
$data = json_encode(iterator_to_array($member));
echo $data;


?>
