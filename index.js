var Service = require('node-windows').Service
const stdio = require('stdio')

const defaults = {
  serviceName: 'WatsonServiceNode',
  install: false,
  uninstall: false
}

let flags = stdio.getopt({
  'serviceName': {
    key: 's',
    description: 'The name for the service',
    default: defaults.serviceName
  },
  'install': {
    key: 'i',
    description: 'Install the service',
    default: defaults.install
  },
  'uninstall': {
    key: 'u',
    description: 'Uninstall the service',
    default: defaults.uninstall   
  }
})

// Create a new service object
var svc = new Service({
  name: flags.serviceName,
  description: 'The service that communicates with the watson API.',
  script: __dirname + '\\dist\\main.js',
  abortOnError: true,
  maxRetries: 0.1,
  env: [{
    name: "APPDATA",
    value: process.env["APPDATA"]
  }]
});

if (flags.install) {

  svc.on('install',function () {
    console.log('Installed service, starting!')
    svc.start();
  });

  svc.install();

} else if (flags.uninstall) {

  svc.on('uninstall',function () {
    console.log('Uninstalled service!')
  });

  svc.uninstall();
  
} else {
  console.log('Invalid usage! Use option --help for more info')
}

