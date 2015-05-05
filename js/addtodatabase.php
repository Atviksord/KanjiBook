<?php
$url = 'http://kanjibook.tk/js/sqltenging.php?id=1';
$obj = json_decode(file_get_contents($url), true);
echo $obj['translation'];
echo $obj['word'];

>