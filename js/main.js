// -------------------------------- ModuleModel --------------------------------
var NewPaymentModel = Backbone.Model.extend({

    defaults: {
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
        var result = true;
        if (this.validate(attr)) {
            result = false;
        }
        if (this.validate(attr)) {
            this.set(attr);
            this.trigger('save');
            //this.clear();
            this.set(this.defaults, {reset: true}); // очистка инпутов
        }
    },

    insertValues: function (model) {
        _.each(model.changed, function (val, key) {
            this.$el.find('[name=' + key + ']').val(val);
        }, this);
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
                || !val
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
// --------------------------- Module Collection --------------------------------
var PaymentListCollection = Backbone.Collection.extend({

    url: '/PaymentListCollection',

    initialize: function () {
        this.getData();
        this.on('destroy addToLocalStorage', this.saveToLocalStorage, this);
        newPaymentModel.on('save', this.addOne, { collection: this, model: newPaymentModel });
    },

    getData: function () {
        var data = JSON.parse(localStorage.getItem('payments'));
        _.each(data, function (val) {
            this.add(val);
        }, this);
        console.time('time');
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
        var someData = _.pick(this.model.attributes, 'num', 'sum', 'recipient_account', 'recipient_nceo', 'recipient_name', 'recipient_ifi', 'details', 'rating');
        console.log('NewPaymentModel, someData', this.model.attributes, someData);
        if (
            this.collection.findWhere(someData) == undefined
            ) {
            this.collection
                .push(someData)
                .trigger('addToLocalStorage');
        } else {
            console.log('Введенные данные не уникальны!')
        }

    }
});
// --------------- Module View (newPaymentView для модели(платежки)) ----------------------
var PaymentView = Backbone.View.extend({
    tagName: 'tr',
    template: function () {
        return _.template(
            '<td class="sum"><%= sum %> UAH</td>' +
            '<td class="recipient_data"><%= recipient_account %>, <%= recipient_name %>, <%= recipient_nceo %> </td>' +
            '<td class="details"><%= details %></td>' +
            '<td align="center" class="rating"><%= rating %><a href="#" class="del"></a></td>'
            , this.model.attributes);
        this.payment_clone();
    },
    payment_clone: function () {
        $('.wrap-tcontent').html(PaymentView.$el);
    },

    events: {
        'click a.del': 'clear',
        'click td': 'setPaymentAttr',
        'keyup input.search': 'search'
    },

    initialize: function () {
        this.model.on('save', this.render, this);
        this.model.on('destroy', this.remove, this);
        this.model.on('saveSome', this.saveSomeDate, this);
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
        //TODO fix rating counter
        console.log('click', this.model.attributes);
        newPaymentView.fillInput( this.model );
    },
    //тестовый метод который добавит один платеж на страницу
    addOneModel: function (model){
        console.log('model in addOneModel (view)',model);
        var a = _.template(
                '<td class="sum"><%= sum %></td>' +
                '<td class="recipient_data"><%= recipient_account %>, <%= recipient_name %>, <%= recipient_nceo %> </td>' +
                '<td class="details"><%= details %></td>' +
                '<td align="center" class="rating"><%= rating %><a href="#" class="del"></a></td>'
            , model.attributes);
        console.log('data for the add in html', a);
        $('.wrap-tcontent').prepend(a);
    }
});
// ------- ModuleView wrapper(paymentList view)View для списка-------------------------------------------------

var PaymentCollectionView = Backbone.View.extend({

    tagName: 'table',
    className: 'table-pay',

    template: function () {
        console.log('template PaymentCollectionView', this.model.attributes);
        this.payment_clone();
    },

    payment_clone: function (ref) {
        $('.wrap-tcontent').html(paymentCollectionView.$el);
    },

    initialize: function () {
        this.collection.on('add', this.addModel, this);
    },

    render: function () {
        this.collection.each(function (payment) {
            var modelView = new PaymentView({ model: payment });
            this.$el.append(modelView.render().el);
        }, this);
        return this;
    },

    addModel: function (payment) {
        //console.log('PAYMENTATTR', payment);
        var modelView = new PaymentView({ model: payment });
        this.$el.append(modelView.el)
    },
    add: function (payment) {
        console.log('aaa', payment);
        var modelView = new PaymentView({ model: payment });
        this.$el.append(modelView.el)
    },

    search: function (data) {
        console.log('search', data);

        if (data == '') {
            // show all models
        }
        //$('.wrap-tcontent').find('div').remove();//.html(''); // ОЧИСТКА ШТМЛ контейнера для загрузки результатов поиска

        var request = data;
        var pattern = '.*' + request + '.*';
        var regexp = new RegExp(pattern);

        var search = this.collection.filter(function (model) {
            return regexp.test(model.values().join());
        });

        console.log('search res', search);
        search.forEach(function(item) {
            console.log(item.attributes);
            this.add(item);
        });
// метод построения результатов поиска
    }
});
// ---------------------- Module NewPaymentModelView ----------------------------

var NewPaymentView = Backbone.View.extend({

    tagName: 'table',
    className: 'new-pay',
    template: function (model) {
        return _.template($('#new-pay').html(), this.model.attributes)
    },
    events: {
        'click .save': 'sendData',
        'keyup input': 'saveData' // save data in to localStorage
    },

    initialize: function () {
        this.model.on('change', this.render, this);
        this.render();
    },
    //Save data in inputs
    /*     saveData: function() {
     console.log('1');
     this.model
     .set(
     {recipient_account: this.$el.find('input[name=recipient_account]').val(),
     recipient_nceo: this.$el.find('input[name=recipient_nceo]').val(),
     recipient_name: this.$el.find('input[name=recipient_name]').val(),
     recipient_ifi: this.$el.find('input[name=recipient_ifi]').val()}, {silent:true})
     .trigger('paymentView:saveSome');
     localStorage.setItem( 'onePayment', JSON.stringify( this.model ) );
     console.log('2', this.model.attributes);
     },*/
    render: function (model) {
        this.$el.html(this.template());
        return this;
    },

    sendData: function () {
        this.model.save(this.serialize());
        console.log('serialize', this.serialize());
    },

    serialize: function () {
        return {
            num: this.$el.find('input[name=num]').val(),
            sum: this.$el.find('input[name=sum]').val(),
            recipient_account: this.$el.find('input[name=recipient_account]').val(),
            recipient_nceo: this.$el.find('input[name=recipient_nceo]').val(),
            recipient_name: this.$el.find('input[name=recipient_name]').val(),
            recipient_ifi: this.$el.find('input[name=recipient_ifi]').val(),
            details: this.$el.find('textarea[name=details]').val()
        };
    },
    /* filling form create a new payment by data from model */
    fillInput: function( model ){
        _.each(model.attributes, function(val, key){this.$el.find('[name='+key+']').val(val)}, this);
    }
});

var newPaymentModel = new NewPaymentModel;

var paymentListCollection = new PaymentListCollection();

var paymentCollectionView = new PaymentCollectionView({collection: paymentListCollection});
$('.wrap-tcontent').append(paymentCollectionView.render().el);

var newPaymentView = new NewPaymentView({ model: newPaymentModel });
$('.form-new-pay').append(newPaymentView.render().el);