
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
        this.listenTo(this.collection, "sort", this.renderViewCollection, this);
        this.search(this);
        this.srt(this);
        this.checkAmountPayments();
    },

    render: function () {
        this.collection.each(function (payment) {
            var modelView = new PaymentView({ model: payment });
            this.$el.append(modelView.render().el);
        }, this);
        return this;
    },

    renderViewCollection: function(){
        $('.payment').remove();
        this.collection.each(function (payment) {
            var modelView = new PaymentView({ model: payment });
            this.$el.append(modelView.render().el);
        }, this);
    },

    addModel: function (payment) {
        var modelView = new PaymentView({ model: payment });
        this.$el.append(modelView.el)
    },

    search: function(that){
        // поиск на JQuery TODO - make search by Backbone
        var search = $(".search"), searchText;
        search.keyup(function(){
            searchText = search.val();
            $('.table-pay tr.payment').each(function(){
                if($(this).text().indexOf(searchText) === -1) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
            that.checkAmountPayments();
        });
    },

    checkAmountPayments: function() {
        if($('.table-pay tr.payment:visible').length > 0){
            $('.noPayments').hide();
        }else if($('.noPayments').length === 0) {
            $('.table-pay').append('<tr class="noPayments"><td>Нет платежей</td></tr>');
        }else{
            $('.noPayments').show();
        }
    },

    srt: function(that){
        // обработчик навешен по средствам JQuery TODO - make it by Backbone
        $('.sort-type').on('change', function(){
            var text = $(this).find('option:selected').data('attr');
            if(text && text == 'date-create'){
                that.collection.sortDirection = -1; //сортировать в обратном порядке
                that.collection.sortPayments('date_create');
            }else if(text && text == 'rating'){
                that.collection.sortPayments('rating');
            }
        });
    }

});