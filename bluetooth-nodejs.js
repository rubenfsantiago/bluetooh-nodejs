const noble = require('@abandonware/noble');

const ACCELEROMETERSERVICE_SERVICE_UUID = 'e95d0753251d470aa062fa1922dfa9a8';
const ACCELEROMETERDATA_CHARACTERISTIC_UUID = 'e95dca4b251d470aa062fa1922dfa9a8';
const ACCELEROMETERPERIOD_CHARACTERISTIC_UUID = 'e95dfb24251d470aa062fa1922dfa9a8';


noble.on('stateChange', (state) => {
  console.log(`State changed: ${state}`);
  if (state === 'poweredOn') {
    noble.startScanning();
  }
});




noble.on('discover', peripheral => {
  console.log(
    `Found device, name: ${peripheral.advertisement.localName}, uuid: ${peripheral.uuid}`
  );

  if (peripheral.uuid === 'eb9ddad7861f') {
    console.log('yes');
    noble.stopScanning();
    peripheral.on('connect', () => console.log('Device connected'));
    peripheral.on('disconnect', () => console.log('Device disconnected'));



    peripheral.connect(error => {
        console.log("ENTRO");
        var serviceUUIDs = [ACCELEROMETERSERVICE_SERVICE_UUID];
        
        peripheral.discoverServices(serviceUUIDs, (error, services) =>{
        console.log(`Found service name: ${services[0].uuid}`); 
        const service =services[0];

        service.discoverCharacteristics(ACCELEROMETERDATA_CHARACTERISTIC_UUID, (error, characteristics)=>{
                const datos=characteristics[0];
                datos.on('data', (data)=>{
                        datos.read((err,readData) =>{
                                const buffer = readData;
                                const x =  buffer.readInt16LE(0);
                                const y = buffer.readInt16LE(2);
//                              const z="1";
                                const z = buffer.readInt16LE(4);
                                console.log(" x: "+x+ " y: "+y+" z:"+z);
                        });
                });
                datos.subscribe(() =>{
                        console.log("SUSCRITO A LA CARACTERISTICA");
                });
        });
        //const period = service.discoverCharacteristics(ACCELEROMETERPERIOD_CHARACTERISTIC_UUID);


        });
//      console.log(peripheral.discoverAllServicesAndCharacteristics());
      
//        service.discoverCharacteristics(null, (error, characteristics) => {
  //        characteristics.forEach(characteristic => {
    //        console.log(`Found characteristic, name: ${characteristic.name}, uuid: ${characteristic.uuid}, type: ${characteristic.type}, properties: ${characteristic.properties.join(',')}`)
      //    }) //characteristics.foreach

          //characteristics.forEach(characteristic => {
          //  if (characteristic.name === 'System ID' || characteristic.name === 'PnP ID') {
          //    characteristic.read((error, data) => console.log(`${characteristic.name}: 0x${arrayBufferToHex(data)}`))
          //  } else {
          //    characteristic.read((error, data) => console.log(`${characteristic.name}: ${data.toString('ascii')}`))
          //  }
         // })//characteristics.forEach
//        })
   //   })
    }) //peripheral.connect
  } //peripheral.uuid
}) //noble.on discover












