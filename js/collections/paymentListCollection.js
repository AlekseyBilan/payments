var PaymentListCollection = Backbone.Collection.extend({

    url: '/PaymentListCollection',
    sortAttribute: "rating",
    sortDirection: '-1',

    initialize: function () {
        this.getData();
        this.on('destroy addToLocalStorage', this.saveToLocalStorage, this);
        newPaymentModel.on('save', this.addOne, { collection: this, model: newPaymentModel });
    },

    getData: function () {
        if(localStorage.getItem('payments') && localStorage.getItem('payments').length > 0){
            var data = JSON.parse(localStorage.getItem('payments'));
            _.each(data, function (val) {
                this.add(val);
            }, this);
        }else{
            console.log(' localStorage is empty ');
        }
    },

    saveToLocalStorage: function () {
        try {
            localStorage.setItem('payments', JSON.stringify(this.models));
        } catch (e) {
            if (e.name.eq("QuotaExceededError")) {
                alert('Хранилище платежей переполнено, Вам необходимо удалить невостребованые платежки.');
            } else {
                alert("not saved");
            }
        }

    },

    addOne: function () {
        this.collection.push(this.model.attributes).trigger('addToLocalStorage');
    },

    changeModel: function (id){
        try {
            var r = '' || paymentListCollection.get(id).attributes.rating;
            paymentListCollection.get(id).set('rating', r+1);
        } catch (err) {
            console.log('error = ', err);
        }
    },

    sortMovies: function (attr) {
        this.sortAttribute = attr;
        this.sort();
    },

    comparator: function(a, b) {
        var a = a.get(this.sortAttribute),
            b = b.get(this.sortAttribute);

        if (a == b) return 0;

        if (this.sortDirection == 1) {
            return a > b ? 1 : -1;
        } else {
            return a < b ? 1 : -1;
        }
    }
});
