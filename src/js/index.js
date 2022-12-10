// Monitoring process
const os = require('os');

/**
 * User inform time update
 */

// REQUIREMENTS
const { freemem, totalmem, platform, arch } = os;

function monitoringSystem(time) {
  setInterval(() => {
    const totalRam = totalmem();
    const freeRam = freemem();

    const inUse = ((freeRam / totalRam) * 100).toFixed(2);

    // Other stats OS
    let stats = {
      OS: platform(),
      Arch: arch(),
      freeRAM: `FreeRAM - ${parseInt(freeRam)}GB`,
      totalRAM: `TotalRAM - ${parseInt(totalRam)}GB`,
      inUse: `RAM used ${inUse}%`
    }

    console.clear()
    console.log(stats);
  }, 3000)
}

monitoringSystem();