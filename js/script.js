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
    search.keyup(function(e){
      $('.table-pay tr td').each(function(){
        if($(this).text().indexOf(search.val()) === -1) {
        	console.log('1', $(this).parent());
          $(this).parent().hide();
        } else {
          $(this).parent().show();
        }
      });
    });

});