
var NewPaymentView = Backbone.View.extend({

    tagName: 'table',
    className: 'new-pay',
    template: function (model) {
        return _.template($('#new-pay').html(), this.model.attributes)
    },
    events: {
        'click .save': 'sendData',
        'change .sort-type': 'sortCollection',
        'keyup input': 'saveData' // save data in localStorage
    },

    initialize: function () {
        this.model.on('change', this.render, this);
        this.render();
    },

    render: function (model) {
        this.$el.html(this.template());
        return this;
    },

    sendData: function () {
        this.model.save(this.serialize());
    },

    serialize: function () {
        return {
            num: this.$el.find('input[name=num]').val(),
            sum: this.$el.find('input[name=sum]').val(),
            recipient_account: this.$el.find('input[name=recipient_account]').val(),
            recipient_nceo: this.$el.find('input[name=recipient_nceo]').val(),
            recipient_name: this.$el.find('input[name=recipient_name]').val(),
            recipient_ifi: this.$el.find('input[name=recipient_ifi]').val(),
            details: this.$el.find('textarea[name=details]').val(),
            id: Date.now()
        };
    },
    /* filling form create a new payment by data from model */
    fillInput: function( model ){
        _.each(model.attributes, function(val, key){this.$el.find('[name='+key+']').val(val)}, this);
    },
    sortCollection: function() {
        console.log('sortCollection',this);
        paymentListCollection.sortMovies()
    }
});

