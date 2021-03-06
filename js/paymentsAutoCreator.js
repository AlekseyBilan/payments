// TEST functionals - fill localStorage by test payments
$(function () {
        //AUTO start filling localStorage
/*
        if(localStorage.getItem('payments').length < 1){
            fillLocalStorage();
        }
        setTimeout(function () {stopTimeOut()}, 1500);
*/
        $('.wrap-new-pay')
            .on('click', 'input.send', function () {
            fillLocalStorage();
            stop()
            })
            .on('click', 'button.stop', function () {
                stopTimeOut()
            });

        var setTime, num = 1;

        function fillLocalStorage() {
            setTime = setTimeout(function () {
                num++;
                var account = Math.floor((Math.random() * 9000000000000) + 260000000000000);
                var ifi = Math.floor((Math.random() * 900000) + 100000);
                var nseo = Math.floor((Math.random() * 90000000) + 10000000);
                var sum = Math.floor((Math.random() * 900) + 1000);
                newPaymentModel.save({
                    id: Date.now(),
                    date_create: Date.now(),
                    recipient_name: "Получатель №" + num,
                    recipient_nceo: nseo.toString(),
                    recipient_ifi: ifi.toString(),
                    recipient_account: account.toString(),
                    details: getDifferentDetailsText(Math.floor(Math.random() * 4)),
                    num: num,
                    sum: sum+' UAH'
                });
                fillLocalStorage();
            }, 0);
            return false;
        }

        function getDifferentDetailsText(num) {
            var res;
            if (num === 1) {
                res = 'Оплата услуг';
            } else if (num === 2) {
                res = 'Налоги';
            } else if (num === 3) {
                res = 'Привет Мир!';
            } else if (num === 4) {
                res = 'Оплата товаров';
            }else{
                res = 'Оплата услуг согласно договора';
            }
            return res;
        }

        function stop() {
            $('.wrap-new-pay').append('<button class="stop send">Stop to fill LS by tests payments</button>');
        }

        function stopTimeOut() {
            clearTimeout(setTime);
            $('.noPayments').hide();
            $('.wrap-new-pay .stop').remove();
        }
    }
);

 