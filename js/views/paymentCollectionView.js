
var PaymentCollectionView = Backbone.View.extend({

    tagName: 'table',
    className: 'table-pay',

    template: function () {
        this.payment_clone();
    },

    payment_clone: function (ref) {
        $('.wrap-tcontent').html(paymentCollectionView.$el);
    },

    initialize: function () {
        this.collection.on('add', this.addModel, this);
        this.listenTo(this.collection, "sort", this.clearViewCollection, this);
    },

    render: function () {
        this.collection.each(function (payment) {
            var modelView = new PaymentView({ model: payment });
            this.$el.append(modelView.render().el);
        }, this);
        return this;
    },
    clearViewCollection: function(){
        $('.payment').remove();
        this.collection.each(function (payment) {
            var modelView = new PaymentView({ model: payment });
            this.$el.append(modelView.render().el);
        }, this);
    },

    addModel: function (payment) {
        var modelView = new PaymentView({ model: payment });
        this.$el.append(modelView.el)
    }

});