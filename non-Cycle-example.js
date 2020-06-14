// // WARNING:  this will make Ctrl+C not work; you will have to send SIGTERM from somewhere else
// if (typeof process.stdin.setRawMode === 'function') process.stdin.setRawMode(true) ;
process.stdin.on('data', data => process.stdout.write(data.toString().toUpperCase())) ;