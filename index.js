// // Instructs Node.JS not to behave differently if called from a TTY
// // WARNING:  this will make Ctrl+C not work; you will have to send SIGTERM from somewhere else
// if (typeof process.stdin.setRawMode === 'function')
//     process.stdin.setRawMode(true)
// ;

import xstreamPackage from 'xstream' ;
const { default: xs } = xstreamPackage ;

import cycleRunPackage from '@cycle/run' ;
const { run } = cycleRunPackage ;

import cycleRunLibAdaptPackage from '@cycle/run/lib/adapt.js';
const { adapt } = cycleRunLibAdaptPackage ;

function main(sources) {
    const stdinStream = sources.OSStandardStreams ;
    const outgoingStream = stdinStream
        .map(data => data.toString().toUpperCase())
    ;
    return {
        OSStandardStreams: outgoingStream
    } ;
}

run(main, { OSStandardStreams: makeOSStandardStreamDriver() }) ;

function makeOSStandardStreamDriver() {

    function OSStandardStreamDriver(outgoingStream) {
    
        outgoingStream.addListener({
            next: outgoing => process.stdout.write(outgoing)
            , error: () => {}
            , complete: () => {}
        }) ;
    
        const incomingStream = xs.create({
            start: listener => {
                process.stdin.on('data', data => listener.next(data)) ;
            }
            , stop: () => {}
        }) ;
    
        return adapt(incomingStream) ;

    }
    
    return OSStandardStreamDriver ;

}