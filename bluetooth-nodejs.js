const DEVICE_INFORMATION_SERVICE_UUID = '38ba5b48baa14b08b72525c0e8a1e51b';

const noble = require('@abandonware/noble');

noble.on('stateChange', (state) => {
  console.log(`State changed: ${state}`);
  if (state === 'poweredOn') {
    noble.startScanning();
  }
});

noble.on('discover', (peripheral) => {
  console.log(
    `Found device, name: ${peripheral.advertisement.localName}, uuid: ${peripheral.uuid}`
  );

  if (peripheral.advertisement.localName === 'GVH5075_A509') {
    console.log('yes');
    noble.stopScanning();
    peripheral.on('connect', () => console.log('Device connected'));
    peripheral.on('disconnect', () => console.log('Device disconnected'));

    peripheral.connect((error) => {
      if (error) console.log(error);

      peripheral.discoverServices(
        [DEVICE_INFORMATION_SERVICE_UUID],
        (error, services) => {
          if (error) console.log(error);
          console.log('services array', services);
        }
      );
    });
  }
});
