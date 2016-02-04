jQuery(document).ready(function(){
    //TODO - remove unused!
    var minlen = 3; // минимальная длина слова
    var paddingtop = 30; // отступ сверху при прокрутке
    var scrollspeed = 200; // время прокрутки
    var keyint = 500; // интервал между нажатиями клавиш
    var term = '';
    var n = 0;
    var time_keyup = 0;
    var time_search = 0;

    jQuery('body').delegate('#spgo', 'click', function(){
        jQuery('body,html').animate({scrollTop: jQuery('span.highlight:first').offset().top-paddingtop}, scrollspeed); // переход к первому фрагменту
    });

    function dosearch() {
        term = jQuery('#spterm').val();
        jQuery('span.highlight').each(function(){ //удаляем старую подсветку
            jQuery(this).after(jQuery(this).html()).remove();
        });
        var t = '';
        jQuery('div#content').each(function(){ // в селекторе задаем область поиска
            jQuery(this).html(jQuery(this).html().replace(new RegExp(term, 'ig'), '<span class="highlight">$&</span>')); // выделяем найденные фрагменты
            n = jQuery('span.highlight').length; // количество найденных фрагментов
//            console.log('n = '+n);
            if (n==0)
                jQuery('#spresult').html('Ничего не найдено');
            else
                jQuery('#spresult').html('Результатов: '+n+'. <span class="splink" id="spgo">Перейти</span>');
        });
    }

    jQuery('#spterm').keyup(function(){
        var d1 = new Date();
        time_keyup = d1.getTime();
        if (jQuery('#spterm').val()!=term) // проверяем, изменилась ли строка
            if (jQuery('#spterm').val().length>=minlen) { // проверяем длину строки
                setTimeout(function(){ // ждем следующего нажатия
                    var d2 = new Date();
                    time_search = d2.getTime();
                    if (time_search-time_keyup>=keyint) // проверяем интервал между нажатиями
                        dosearch(); // если все в порядке, приступаем к поиску
                }, keyint);
            }
            else
                jQuery('#spresult').html('&nbsp'); // если строка короткая, убираем текст из DIVа с результатом
    });

});