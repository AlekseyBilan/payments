var NewPaymentModel = Backbone.Model.extend({

    defaults: {
        id: Date.now(),
        date_create: Date.now(),
        num: '',
        sum: '',
        recipient_account: '',
        recipient_nceo: '',
        recipient_name: '',
        recipient_ifi: '',
        details: '',
        rating: 1
    },

    url: '/NewPaymentModel',

    save: function (attr) {
        if (this.validate(attr)) {
            if(idFromChangeRating){
                paymentListCollection.changeModel(idFromChangeRating);//не лучшее решение...
                this.set(attr);
            }else{
                this.set(attr);
            }
            this.trigger('save');
            this.set(this.defaults, {reset: true});
            $('.noPayments').hide();
        }
    },

    validate: function (attr) {
        var arr = _.compact(_.map(attr, function (val, name) {
            var error_name = '';
            if (
                (name == 'recipient_account' && (val.length < 5 || val.length > 19 || /^0/.test(val)))
                ||
                (name == 'details' && val.length < 3)
                ||
                (name == 'recipient_ifi' && val.length != 6)
                ||
                (name == 'recipient_name' && val.length < 3)
            //|| !val
                ) {
                error_name = name;
                console.log('Validate Error name = ', error_name);
            }
            return error_name;
        }));
        var result = true;
        if (arr.length !== 0) {
            result = false;
        }
        return  result;
    }
});