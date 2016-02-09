var PaymentView = Backbone.View.extend({
    tagName: 'tr',
    className: 'payment',
    template: function () {
        return _.template(
                '<td class="sum"><%= sum %></td>' +
                '<td class="recipient_data"><%= recipient_account %>, <%= recipient_name %>, <%= recipient_nceo %> </td>' +
                '<td class="details"><%= details %></td>' +
                '<td align="center" class="rating date_create" data-date-create="<%- date_create %>"><%= rating %><a href="#" class="del"></a></td>'
            , this.model.attributes);
        this.payment_clone();
    },
    payment_clone: function () {
        $('.wrap-tcontent').html(PaymentView.$el);
    },

    events: {
        'click a.del': 'clear',
        'click td': 'setPaymentAttr'/*,
         'keyup input.search': 'search'*/
    },

    initialize: function () {
        this.model.on('save', this.render, this);
        this.model.on('destroy', this.remove, this);
        this.listenTo(this.model,'change', this.render);
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    clear: function (e) {
        this.model.destroy();
        this.remove();
        e.preventDefault();
        e.stopPropagation();
    },

    remove: function () {
        this.$el.remove();
    },

    setPaymentAttr: function () {
        idFromChangeRating = this.model.cid;
        newPaymentView.fillInput( this.model );
    }
});
