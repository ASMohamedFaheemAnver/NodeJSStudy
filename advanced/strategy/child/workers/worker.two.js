process.on("message", () => {
  console.log(`child with pid : ${process.pid} is executing`);
  for (let i = 0; i < 1e9; i++) {}
  process.send("ok");
});
