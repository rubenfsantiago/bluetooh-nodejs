const noble = require('@abandonware/noble');

const ACCELEROMETERSERVICE_SERVICE_UUID = 'e95d0753251d470aa062fa1922dfa9a8';
const ACCELEROMETERDATA_CHARACTERISTIC_UUID = 'e95dca4b251d470aa062fa1922dfa9a8';
const ACCELEROMETERPERIOD_CHARACTERISTIC_UUID = 'e95dfb24251d470aa062fa1922dfa9';


noble.on('stateChange', (state) => {
  console.log(`State changed: ${state}`);
  if (state === 'poweredOn') {
    noble.startScanning();
  }
});




noble.on('discover', peripheral => {
  console.log(
    `Found device, name: ${peripheral.advertisement.localName}, uuid: ${periphe$
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

        service.discoverCharacteristics(ACCELEROMETERDATA_CHARACTERISTIC_UUID, $
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
        //const period = service.discoverCharacteristics(ACCELEROMETERPERIOD_CH$


        });
//      console.log(peripheral.discoverAllServicesAndCharacteristics());
      



//        service.discoverCharacteristics(null, (error, characteristics) => {
  //        characteristics.forEach(characteristic => {
    //        console.log(`Found characteristic, name: ${characteristic.name}, $
      //    }) //characteristics.foreach

          //characteristics.forEach(characteristic => {
          //  if (characteristic.name === 'System ID' || characteristic.name ==$
          //    characteristic.read((error, data) => console.log(`${characteris$
          //  } else {
          //    characteristic.read((error, data) => console.log(`${characteris$
          //  }
         // })//characteristics.forEach
//        })
   //   })
    }) //peripheral.connect
  } //peripheral.uuid
}) //noble.on discover




