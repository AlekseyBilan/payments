$(document).ready(function () {
    var minlen = 3; // минимальная длина слова
    var keyint = 500; // интервал между нажатиями клавиш
    var term = '';
    var time_keyup = 0;
    var time_search = 0;

    $('#spterm').keyup(function () {
        var d1 = new Date(), sptermVal = $('#spterm').val();
        time_keyup = d1.getTime();
        if (sptermVal != term) // проверяем, изменилась ли строка
            clean();
        if (sptermVal.length >= minlen) { // проверяем длину строки
            setTimeout(function () { // ждем следующего нажатия
                var d2 = new Date();
                time_search = d2.getTime();
                if (time_search - time_keyup >= keyint) // проверяем интервал между нажатиями
                    dosearch(); // если все в порядке, приступаем к поиску
            }, keyint);
        }
    });

    function dosearch() {
        term = $('#spterm').val();
        clean();
        $('#content').each(function () { // в селекторе задаем область поиска
            $(this).html($(this).html().replace(new RegExp(term, 'ig'), '<span class="highlight">$&</span>')); // выделяем найденные фрагменты
        })
    }

    function clean(){
        $('span.highlight').each(function () { //удаляем старую подсветку
            $(this).after($(this).html()).remove();
        });
    }

});