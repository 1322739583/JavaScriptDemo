var name="Tom"
exports.name=name

setTimeout(() => {
    exports.name="Mike"
}, 2000);