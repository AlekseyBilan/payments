
var PaymentCollectionView = Backbone.View.extend({
    tagName: 'table',
    className: 'table-pay',

    template: function () {
        this.payment_clone();
    },

    payment_clone: function (ref) {
        console.log('paymentCollectionView.$el =', paymentCollectionView.$el);
        $('.wrap-tcontent').html(paymentCollectionView.$el);
    },

    initialize: function () {
        this.collection.on('add', this.addModel, this);
        this.listenTo(this.collection, "sort", this.renderViewCollection, this);
        $('.search').on('keyup', this.search).on('keyup', this.checkAmountPayments);
        $('.sort-type').on('change', this.sortType);
    },

    render: function () {
        this.collection.each(function (payment) {
            var modelView = new PaymentView({ model: payment });
            this.$el.append(modelView.render().el);
        }, this);
        return this;
    },

    renderViewCollection: function(){
        $('.payment').remove();//not good idea - how to add all collection
        this.collection.each(function (payment) {
            var modelView = new PaymentView({ model: payment });
            this.$el.append(modelView.render().el);
        }, this);
    },

    addModel: function (payment) {
        var modelView = new PaymentView({ model: payment });
        this.$el.append(modelView.el)
    },

    search: function(){
        var searchText = $(this).val();
        $('.table-pay .payment').each(function(){ //.table-pay tr.payment
            if($(this).text().indexOf(searchText) === -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    },

    checkAmountPayments: function() {
        if($('.table-pay .payment:visible').length > 0){
            $('.noPayments').hide();
        }else if($('.noPayments').length === 0) {
            $('.table-pay').append('<tr class="noPayments"><td>Нет платежей</td></tr>');
        }else{
            $('.noPayments').show();
        }
    },

    sortType: function(){
        var text = $(this).find('option:selected').data('attr');
        if(text && text == 'date-create'){
            paymentListCollection.sortDirection = -1; //сортировать в обратном порядке
            paymentListCollection.sortPayments('date_create');
        }else if(text && text == 'rating'){
            paymentListCollection.sortPayments('rating');
        }
    }

});