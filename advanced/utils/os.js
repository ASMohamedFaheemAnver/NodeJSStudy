const os = require("os");

// model, speed, times
console.log(os.cpus());

// network interface info
console.log(os.networkInterfaces());

// fee memory
console.log(os.freemem());

// os type
console.log(os.type());

// os release
console.log(os.release());

// os info
console.log(os.userInfo());

// all process signals available in the underlying os
console.log(os.constants);
