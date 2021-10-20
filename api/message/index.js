module.exports = function (context, myQueueItem) {
    context.log('Node.js tablelookup', myQueueItem);
    context.log('Printer IP: ' + context.bindings.printers.Name);
    context.done();
};

