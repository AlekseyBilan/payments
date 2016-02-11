var app = app || {};
(function () {
    'use strict';
    // Router
    var PaymentsRouter = Backbone.Router.extend({
    });

    app.paymentsRouter = new PaymentsRouter();
    Backbone.history.start();
})();