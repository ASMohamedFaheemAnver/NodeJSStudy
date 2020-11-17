// Process is an event emitter
process.on("exit", (code) => {
  // do some final synchronous operation
  // before the node process terminates
  console.log("About to exit with code: " + code);
})

process.on("uncaughtException", (err) => {
  // Some exception that doesn't handled.
  console.log(err);
  process.exit(1);

  // The best prectice is to let the node exit when unhandled exception occured because,
  // It will do more damage if we let the node run.
})

process.stdin.resume();

// triggering a type error exception
console.dog();