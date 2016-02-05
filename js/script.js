$(function(){

	$('table.new-pay').on('change keyup','.numberSum', function () {
    	$(this).val($(this).val().replace(/[^\d,]/g, ''));
	}).on('change keyup','.number', function () {
    	$(this).val($(this).val().replace(/[^\d]/g, ''));   
	});

    /*  $('input.search').on('keyup', function(search){
      var data = $(this).val();
      paymentCollectionView.search(data);
  });*/
    checkAmmountPayments();
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
        checkAmmountPayments();
    });

    function checkAmmountPayments(){
        if($('.table-pay tr.payment:visible').length > 0){
            $('.noPayments').hide();
        }else if($('.noPayments').length === 0) {
            $('.table-pay').append('<tr class="noPayments"><td>Нет платежей</td></tr>');
        }else{
            $('.noPayments').show();
        }

    }
});
