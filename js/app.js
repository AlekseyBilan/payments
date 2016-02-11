var app = app || {};
//(function () {})();
var idFromChangeRating;

var newPaymentModel = new NewPaymentModel;

var newPaymentView = new NewPaymentView({ model: newPaymentModel });
$('.form-new-pay').append(newPaymentView.render().el);
console.log('newPaymentView.render().el ',newPaymentView.render().el);

var paymentListCollection = new PaymentListCollection();

var paymentCollectionView = new PaymentCollectionView({collection: paymentListCollection});
$('.wrap-tcontent').append(paymentCollectionView.render().el);
console.log('paymentCollectionView.render().el', paymentCollectionView.render().el);
