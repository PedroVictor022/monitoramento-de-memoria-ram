// Monitoring process
const os = require('os');

// REQUIREMENTS
const { freemem, totalmem, platform, arch } = os;


// Get HTML elements
const elPlataform = document.getElementById('os');
const elFreeRAM = document.getElementById('freeRAM');
const elMemoryUsed = document.getElementById('memoryUsed');

function monitoringSystem(time) {
  setInterval(() => {
    const totalRam = totalmem();
    const freeRam = freemem();
    const usoM = (((totalRam / totalRam) * 100) - ((freeRam / totalRam) * 100)).toFixed(2);

    // Other stats OS
    let stats = {
      OS: platform(),
      Arch: arch(),
      freeRAM: `${(parseInt(freeRam) / 1024 /1024 / 1024 ).toFixed(2)} GB`,
      totalRAM: `${(parseInt(totalRam) / 1024 / 1024/ 1024).toFixed(0)} GB`,
      inUse: `${usoM}%`
    }

    elPlataform.innerText = `${stats.OS} ${stats.Arch}`;
    elFreeRAM.innerText = stats.freeRAM;
    elMemoryUsed.innerText = stats.inUse;


  }, 3000)
}

monitoringSystem();