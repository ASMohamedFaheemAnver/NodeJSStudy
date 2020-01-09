exports.lineTracer = function thisLine() {
    const e = new Error();
    const regex = /\((.*):(\d+):(\d+)\)$/
    const match = regex.exec(e.stack.split("\n")[2]);
    return {
      filepath: match[1],
      line: match[2],
      // column: match[3]
    };
  }