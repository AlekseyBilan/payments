$(function(){

	$('table.new-pay').on('change keyup','.numberSum', function (input) {
    	$(this).val($(this).val().replace(/[^\d,]/g, ''));
	});

	$('table.new-pay').on('change keyup','.number', function (input) {
    	$(this).val($(this).val().replace(/[^\d]/g, ''));   
	});

    /*  $('input.search').on('keyup', function(search){
      var data = $(this).val();
      paymentCollectionView.search(data);
  });*/

	// поиск на JQuery TODO - make search by Backbone
	 var search = $(".search");
    search.keyup(function(){
      $('.table-pay tr').each(function(){
        if($(this).text().indexOf(search.val()) === -1) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    });

});
