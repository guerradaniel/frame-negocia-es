System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function DomInject(seletor) {
        return function (target, key) {
            let elemento;
            const getter = () => {
                if (!elemento) {
                    console.log(`busquei ${seletor} para injetar em ${key}`);
                    elemento = $(seletor);
                }
                return elemento;
            };
            Object.defineProperty(target, key, {
                get: getter
            });
        };
    }
    exports_1("DomInject", DomInject);
    return {
        setters: [],
        execute: function () {
        }
    };
});
