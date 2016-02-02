// TEST functionals - fill localStorage by test payments
$(function () {
        $('.wrap-new-pay').on('click', 'input.send', function () {
            Recurs();
            Stop()
        });
        var setTime, num = 1;

        function Recurs() {
            setTime = setTimeout(function () {
                num++;
                var account = Math.floor((Math.random() * 9000000000000) + 260000000000000);
                var ifi = Math.floor((Math.random() * 900000) + 100000);
                var nseo = Math.floor((Math.random() * 90000000) + 10000000);
                var sum = Math.floor((Math.random() * 900) + 1000);
                newPaymentModel.save({
                    recipient_name: "Получатель №" + Math.floor(Math.random() * 100),
                    recipient_nceo: nseo.toString(),
                    recipient_ifi: ifi.toString(),
                    recipient_account: account.toString(),
                    details: getDiferentDetailseText(Math.floor(Math.random() * 4)),
                    num: num,
                    sum: sum+' UAH',
                    id: num
                });
                Recurs();
            }, 0);
            return false;
        }

        function getDiferentDetailseText(num) {
            var res;
            if (num === 1) {
                res = 'На услуг';
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

        function Stop() {
            $('.wrap-new-pay').append('<button class="stop send">StopTimeOut</button>');
        }

        $('.wrap-new-pay').on('click', 'button.stop', function () {
            StopTimeOut()
        });
        function StopTimeOut() {
            clearTimeout(setTime);
            $('.wrap-new-pay .stop').remove();
        }
    }
)
;

 