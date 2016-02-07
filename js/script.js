$(function(){

	$('table.new-pay').on('change keyup','.numberSum', function () {
    	$(this).val($(this).val().replace(/[^\d,]/g, ''));
	}).on('change keyup','.number', function () {
    	$(this).val($(this).val().replace(/[^\d]/g, ''));   
	});

    // обработчик навешен по средствам JQuery TODO - make it by Backbone
    $('.sort-type').on('change', function(){
        console.log('sort-type ', $(this).find('option:selected').data('attr'));
       var text = $(this).find('option:selected').data('attr');
        if(text && text == 'date-create'){
            paymentListCollection.sortDirection = -1; //сортировать в обратном порядке
            paymentListCollection.sortMovies('date_create');
        }else if(text && text == 'rating'){
            paymentListCollection.sortMovies('rating');
        }
    });

    checkAmountPayments();
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
        checkAmountPayments();
    });

    function checkAmountPayments(){
        if($('.table-pay tr.payment:visible').length > 0){
            $('.noPayments').hide();
        }else if($('.noPayments').length === 0) {
            $('.table-pay').append('<tr class="noPayments"><td>Нет платежей</td></tr>');
        }else{
            $('.noPayments').show();
        }
    }
});