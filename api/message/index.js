module.exports = function (context, printers) {
    context.log('Node.js tablelookup', printers);
    context.log('Printer IP: ' + context.bindings.printers.IP);
    context.done();
};