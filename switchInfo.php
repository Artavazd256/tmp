<?php
	
   $dbh = new PDO('mysql:host=localhost;dbname=SNMP', 'root', 'AvaG');

   if(isset($_POST['mac']))
   {
      getSwitchInfo();	    
   }
   if(isset($_POST['routerMac']))
   {
      getSwitchInfoByRouterMAC();   
   }
   if(isset($_POST['connectionMac']))
   {
      $data = getConnectionSwitchInfo($_POST['connectionMac'], array());
      echo json_encode($data);
   }
   if(isset($_POST['getSwitchInfoByMac'])) 
   {
      foreach($dbh->query("SELECT * FROM `tb_devices`  
                INNER JOIN tb_interfaces 
                ON tb_interfaces.device_id = tb_devices.id 
                INNER JOIN tb_mac 
                ON tb_mac.interface_id = tb_interfaces.id
                WHERE tb_devices.MAC = '$mac'") as $row) {
         echo "<tr style='border-bottom:1px solid black;'>";
         echo "<td>" . $counter . "</td>"; 
         echo "<td>" . $row['link'] . "</td>"; 
         echo "<td>" . $row['ifspeed'] . "</td>"; 
         echo "<td>" . $row['byte_sent'] . "</td>"; 
         echo "<td>" . $row['byte_received'] . "</td>"; 
         echo "</tr>";
         $counter++;
      }
    
   }
   
	


function getSwitchInfo() {
global $dbh;
$mac = $_POST['mac']; 
//$mac = '00:26:5A:39:6E:80';

echo "<table>";
echo "<thead>";
echo "<tr>";
echo "<th>#</th>";
echo "<th>Link</th>";
echo "<th>Speed</th>";
echo "<th>Up</th>";
echo "<th>Down</th>";
echo "</tr>";
echo "</thead>";
echo "<tbody>";
$counter = 1;	
foreach($dbh->query("SELECT * FROM `tb_devices`  
		    INNER JOIN tb_interfaces 
		    ON tb_interfaces.device_id = tb_devices.id 
		    INNER JOIN tb_mac 
		    ON tb_mac.interface_id = tb_interfaces.id
		    WHERE tb_devices.MAC = '$mac'") as $row) {
	echo "<tr style='border-bottom:1px solid black;'>";
	echo "<td>" . $counter . "</td>"; 
	echo "<td>" . $row['link'] . "</td>"; 
	echo "<td>" . $row['ifspeed'] . "</td>"; 
	echo "<td>" . $row['byte_sent'] . "</td>"; 
	echo "<td>" . $row['byte_received'] . "</td>"; 
	echo "</tr>";
	$counter++;
}
echo "</tbody>";
echo "</table>";
}

function getConnectionSwitchInfo($mac, $data) 
{
   global $dbh;
   $connection = $dbh->query("SELECT * FROM `tb_connections` WHERE mac_to = '$mac'", PDO::FETCH_ASSOC);
   $conData = $connection->fetch();
   $index = count($data);
   if(empty($conData)) 
   {
      return $data;
   }
   $data[$index]['connection'] = $conData;
   $portNumber = $conData['port_to'];
   $device = $dbh->query("SELECT * FROM `tb_devices` 
                	INNER JOIN tb_interfaces 
                	ON tb_interfaces.device_id = tb_devices.id 
	   		WHERE MAC = '$mac' and tb_interfaces.number = '$portNumber'", PDO::FETCH_ASSOC);
   $devData = $device->fetch();
   $data[$index]['device'] = $devData;
   return getConnectionSwitchInfo($conData['mac_from'], $data);
}


function getSwitchInfoByRouterMAC() 
{
global $dbh;
$mac = $_POST['routerMac']; 
foreach($dbh->query("SELECT * FROM `tb_devices`  
                    INNER JOIN tb_interfaces 
                    ON tb_interfaces.device_id = tb_devices.id 
                    INNER JOIN tb_mac 
                    ON tb_mac.interface_id = tb_interfaces.id
                    WHERE tb_mac.mac = '$mac'") as $row) {
		    echo json_encode($row);

}
	
}
	

?>
