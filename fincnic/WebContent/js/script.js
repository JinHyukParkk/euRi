'use strict';

var current_email = '';
var give_me_the_money_friend_email = "";
var give_me_the_money_friend_name = "";

function addClassName(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClassName(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

function ajaxFailed(data) {
	var errorMessage = "Error making Ajax request:\n\n";
	errorMessage += "Exception: " + data;
	console.log(errorMessage);
}

function give_me_the_money_friend_email_function(object) {
    give_me_the_money_friend_name = object.innerText;
    give_me_the_money_friend_email = object.getAttribute("value");
}

function Fincnic() {

    this.mainNav = document.getElementById('mainNav');

    this.add_friend_menu = document.getElementById('add_friend_menu');
    this.add_friend_menu.addEventListener('click',this.show_friend_list.bind(this));

    this.footer_add_friend_menu = document.getElementById('footer_add_friend_menu');
    this.footer_add_friend_menu.addEventListener('click',this.show_friend_list.bind(this));

    this.borrow_loan_state_menu = document.getElementById('borrow_loan_state_menu');
    this.borrow_loan_state_menu.addEventListener('click',this.show_main.bind(this));

    this.footer_borrow_loan_state_menu = document.getElementById('footer_borrow_loan_state_menu');
    this.footer_borrow_loan_state_menu.addEventListener('click',this.show_main.bind(this));

    this.account_enroll_menu = document.getElementById('account_enroll_menu');
    this.account_enroll_menu.addEventListener("click",this.show_add_account.bind(this));

    this.footer_account_enroll_menu = document.getElementById('footer_account_enroll_menu');
    this.footer_account_enroll_menu.addEventListener("click",this.show_add_account.bind(this));

    this.show_me_the_money_menu = document.getElementById('show_me_the_money_menu');
    this.show_me_the_money_menu.addEventListener('click',this.show_me_the_money_content.bind(this));

    this.footer_show_me_the_money_menu = document.getElementById('footer_show_me_the_money_menu');
    this.footer_show_me_the_money_menu.addEventListener('click',this.show_me_the_money_content.bind(this));

    this.login = document.getElementById('login');
    this.login_email = document.getElementById('login_email');
    this.login_pwd = document.getElementById('login_pwd');
    this.login_button = document.getElementById('login_button');
    this.login_button.addEventListener('click',this.login_function.bind(this));

    this.borrow_money = document.getElementById('borrow_money_content');
    this.loan_money = document.getElementById('loan_money_content');

    this.receiver_to_sender_money_current = document.getElementById('receiver_to_sender_money_current');
    this.receiver_to_sender_money_all = document.getElementById('receiver_to_sender_money_all');

    this.add_account = document.getElementById('add_account');

    this.add_friend = document.getElementById('add_friend');

    this.show_me_the_money = document.getElementById('show_me_the_money');

    this.borrow_content = document.getElementById('borrow_content');
    this.loan_content = document.getElementById('loan_content');
    // loan content

    this.add_friend_input = document.getElementById('add_friend_input');
    // 친구 이메일
    this.add_friend_button = document.getElementById('add_friend_button');
    this.add_friend_button.addEventListener('click',this.add_friend_function.bind(this));
    // 친구 추가

    this.add_account_input = document.getElementById('add_account_input');
    // 계정 번호
    this.add_account_button = document.getElementById('add_account_button');
    this.add_account_button.addEventListener('click',this.add_account_function.bind(this));
    // 계정 추가

    this.send_money_button = document.getElementById('send_money_button');
    this.send_money_button.addEventListener('click',this.send_money_function.bind(this));
    // 갚기 버튼

    this.real_send = document.getElementById('real_send');
    this.send_money_input = document.getElementById('send_money_input');
    this.real_send_money_button = document.getElementById('real_send_money_button');
    this.real_send_money_button.addEventListener('click',this.send_real_money_function.bind(this));
    // 리얼 갚기 버튼

    this.friend_list = document.getElementById('friend_list');
    this.friend_list_cell = document.getElementById('friend_list_cell');
    // 친구 리스트

    this.account_list = document.getElementById('account_list');
    this.account_list_cell = document.getElementById('account_list_cell');
    // 계좌 리스트

    this.footer_menu = document.getElementById('footer_menu');
    // footer_menu

    this.logout_menu = document.getElementById('logout_menu');
    this.logout_menu.addEventListener('click',this.logout_function.bind(this));
    this.footer_logout_menu = document.getElementById('footer_logout_menu');
    this.footer_logout_menu.addEventListener('click',this.logout_function.bind(this));
    // logout

    this.my_friend_list = document.getElementById('my_friend_list');
    // show_me_the_money 친구 목록
    this.friend_check = document.querySelectorAll('#friend_check');

    this.give_me_the_money = document.getElementById('give_me_the_money');
    this.give_me_the_money.addEventListener('click',this.give_me_the_money_function.bind(this));

    this.moneymoney = document.getElementById('moneymoney');

    this.delete_loan = document.getElementById('delete_loan');
    this.delete_loan.addEventListener("click",this.delete_loan_function.bind(this));
}

Fincnic.prototype.logout_function = function() {

    removeClassName(this.login,'disable');
    addClassName(this.mainNav,'disable');
    addClassName(this.borrow_money,"disable");
    addClassName(this.loan_money,'disable');
    addClassName(this.add_account,'disable');
    addClassName(this.add_friend,'disable');
    addClassName(this.show_me_the_money,'disable');
    addClassName(this.footer_menu,'disable');

    current_email = "";
}

Fincnic.prototype.login_function = function(object) {

    addClassName(this.login,'disable');
    removeClassName(this.mainNav,'disable');
    removeClassName(this.borrow_money,"disable");
    removeClassName(this.loan_money,'disable');
    removeClassName(this.footer_menu,'disable');

    // while (this.borrow_content.hasChildNodes()){
    //     this.borrow_content.removeChild(this.borrow_content.firstChild);
    // }
    // while (this.loan_content.hasChildNodes()){
    //     this.loan_content.removeChild(this.loan_content.firstChild);
    // }

    var email = this.login_email.value;
    var pwd = this.login_pwd.value;

    if (email == '' || email == null ||
        pwd == '' || pwd == null) {
            alert("이메일과 패스워드를 정확히 입력해주세요.");
        }
    else {

        $("#login_email").val('');
        $("#login_pwd").val('');

        $.ajax({
            type: 'POST',
            url: '',
            data: {
                what : 0, // 0 : login
                id : email,
                pwd : pwd
            },
            success: function(data) {
                if (data == '1') {
                    current_email = email;

                    $.ajax({
                        type: 'POST',
                        url: '',
                        data: {
                            what: 1, // 1 : give loans info
                            id: current_email
                        },
                        success: function(data) {

                            var data = JSON.parse(data);

                            for (var i = 0; i < data.info[0].credit_info.length; i ++) {

                                var div = document.createElement("div");
                                var content = '';
                                content += '<div id="' + data.info[0].credit_info[i].loans_id + '" class="col-md-12 borrow_money_info"';
                                content += '<h4><span id="receiver">' + data.info[0].credit_info[i].debtor_name + '</span> 에게 빌려준 돈</h4>';
                                content += '<span id="limit_date">' + data.info[0].credit_info[i].finish_date + '</span> &nbsp;까지<br>';
                                content += '<span id="receiver_to_sender_money_current">' + data.info[0].credit_info[i].balance_money + '</span>&nbsp; 원&nbsp;&nbsp;/&nbsp;&nbsp;<span id="receiver_to_sender_money_all">' + data.info[0].credit_info[i].total_money + '</span> &nbsp;원<br>';
                                content += '<div class="progress">';
                                var percent = parseInt(data.info[0].credit_info[i].balance_money)/parseInt(data.info[0].credit_info[i].total_money)*100;
                                content += '<div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%"></div></div><button id="delete_loan" name="' + data.info[0].credit_info[i].loans_id + '" type="button" class="btn btn-danger">&nbsp;<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;</button></div>';

                                div.innerHTML = content;
                                document.getElementById('borrow_content').appendChild(div);
                            }
                            // borrow_content 빌려준 돈


                            for (var i = 0; i < data.info[1].debt_info.length; i ++) {
                                var div = document.createElement("div");
                                var content = '';
                                content += '<div id="' + data.info[1].debt_info[i].loans_id + '" class="col-md-12 loan_money_info">';
                                content += '<h4><span id="sender">' + data.info[1].debt_info[i].creditor_name + '</span> 에게 갚을 돈</h4>';
                                content += '<span id="limit_date">' + data.info[1].debt_info[i].finish_date + '</span> &nbsp;까지<br>';
                                content += '<span id="receiver_to_sender_money_current">' + data.info[1].debt_info[i].balance_money + '</span>&nbsp; 원&nbsp;&nbsp;/&nbsp;&nbsp;<span id="receiver_to_sender_money_all">' + data.info[0].credit_info[i].total_money + '</span> &nbsp;원<br>';
                                content += '<div class="progress">';
                                var percent = parseInt(data.info[1].debt_info[i].balance_money)/parseInt(data.info[1].debt_info[i].total_money)*100;
                                content += '<div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%"></div></div></div>';
                                content += '<button id="send_money_button" name="' + data.info[1].debt_info[i].loans_id + '" type="button" class="btn btn-danger send_money_button">갚기</button>';
                                content += '<div id="real_send" class="input-group disable">';
                                content += '<input id="send_money_input" type="text" class="form-control" placeholder="갚을 금액">';
                                content += '<span class="input-group-btn"><button id="real_send_money_button" name="' + data.info[1].debt_info[i].loans_id + '" class="btn btn-danger" type="button">보내기!</button></span>';
                                content += '</div></div>';
                                div.innerHTML = content;
                                document.getElementById('loan_content').appendChild(div);
                            }
                            // loan_content 빌린 돈
                        },
                        error: function(data) {
                            return ajaxFailed(data);
                        }
                    });
                    // send email / receive loan data
                }
                else if (data == '0') {
                    console.log("loging fail - email pwd wrong");
                }
            },
            error: function(data) {
                return ajaxFailed(data)
            }
        });
    }
    // this.initFirebase();
}

Fincnic.prototype.show_friend_list = function() {
    addClassName(this.borrow_money,"disable");
    addClassName(this.loan_money,'disable');
    addClassName(this.add_account,'disable');
    removeClassName(this.add_friend,'disable');
    addClassName(this.show_me_the_money,'disable');

    while (this.friend_list.hasChildNodes()){
        this.friend_list.removeChild(this.friend_list.firstChild);
    }

    $.ajax({
        type: 'POST',
        url: '',
        data: {
            what: 2, // 2 : give me a friend list
            id: current_email
        },
        success: function(data) {

            var div = document.createElement('div');
            var content = '<ul id="friend_list_cell"><ul>';
            div.innerHTML = content;

            var data = JSON.parse(data);

            for (var i = 0; i < data.friend_info.length; i ++) {
                var li = document.createElement('li');
                var content = data.friend_info[i].name + ' ( ' + data.friend_info[i].id + ' )';
                li.innerHTML = content;
                div.appendChild(li);
            }
            document.getElementById('friend_list').appendChild(div);
        },
        error: function(data) {
            return ajaxFailed(data);
        }
    });
    // send email / receive friend list data

}

Fincnic.prototype.show_main = function() {

    removeClassName(this.borrow_money,"disable");
    removeClassName(this.loan_money,'disable');
    addClassName(this.add_account,'disable');
    addClassName(this.add_friend,'disable');
    addClassName(this.show_me_the_money,'disable');

    while (this.borrow_content.hasChildNodes()){
        this.borrow_content.removeChild(this.borrow_content.firstChild);
    }
    while (this.loan_content.hasChildNodes()){
        this.loan_content.removeChild(this.loan_content.firstChild);
    }

    $.ajax({
        type: 'POST',
        url: '',
        data: {
            what: 1, // 1 : give loans info
            id: current_email
        },
        success: function(data) {
            var data = JSON.parse(data);

            for (var i = 0; i < data.info[0].credit_info.length; i ++) {

                var div = document.createElement("div");
                var content = '';
                content += '<div id="' + data.info[0].credit_info[i].loans_id + '" class="col-md-12 borrow_money_info"';
                content += '<h4><span id="receiver">' + data.info[0].credit_info[i].debtor_name + '</span> 에게 빌려준 돈</h4>';
                content += '<span id="limit_date">' + data.info[0].credit_info[i].finish_date + '</span> &nbsp;까지<br>';
                content += '<span id="receiver_to_sender_money_current">' + data.info[0].credit_info[i].balance_money + '</span>&nbsp; 원&nbsp;&nbsp;/&nbsp;&nbsp;<span id="receiver_to_sender_money_all">' + data.info[0].credit_info[i].total_money + '</span> &nbsp;원<br>';
                content += '<div class="progress">';
                var percent = parseInt(data.info[0].credit_info[i].balance_money)/parseInt(data.info[0].credit_info[i].total_money)*100;
                content += '<div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%"></div></div><button id="delete_loan" name="' + data.info[0].credit_info[i].loans_id + '" type="button" class="btn btn-danger">&nbsp;<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;</button></div>';
                div.innerHTML = content;
                document.getElementById('borrow_content').appendChild(div);
            }
            // borrow_content 빌려준 돈


            for (var i = 0; i < data.info[1].debt_info.length; i ++) {
                var div = document.createElement("div");
                var content = '';
                content += '<div id="' + data.info[1].debt_info[i].loans_id + '" class="col-md-12 loan_money_info">';
                content += '<h4><span id="sender">' + data.info[1].debt_info[i].creditor_name + '</span> 에게 갚을 돈</h4>';
                content += '<span id="limit_date">' + data.info[1].debt_info[i].finish_date + '</span> &nbsp;까지<br>';
                content += '<span id="receiver_to_sender_money_current">' + data.info[1].debt_info[i].balance_money + '</span>&nbsp; 원&nbsp;&nbsp;/&nbsp;&nbsp;<span id="receiver_to_sender_money_all">' + data.info[0].credit_info[i].total_money + '</span> &nbsp;원<br>';
                content += '<div class="progress">';
                var percent = parseInt(data.info[1].debt_info[i].balance_money)/parseInt(data.info[1].debt_info[i].total_money)*100;
                content += '<div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%"></div></div></div>';
                content += '<button id="send_money_button" name="' + data.info[1].debt_info[i].loans_id + '" type="button" class="btn btn-danger send_money_button">갚기</button>';
                content += '<div id="real_send" class="input-group disable">';
                content += '<input id="send_money_input" type="text" class="form-control" placeholder="갚을 금액">';
                content += '<span class="input-group-btn"><button id="real_send_money_button" name="' + data.info[1].debt_info[i].loans_id + '" class="btn btn-danger" type="button">보내기!</button></span>';
                content += '</div></div>';
                div.innerHTML = content;
                document.getElementById('loan_content').appendChild(div);
            }
            // loan_content 빌린 돈
        },
        error: function(data) {
            return ajaxFailed(data);
        }
    });
    // send email / receive loan data

}

Fincnic.prototype.show_add_account = function() {
    addClassName(this.borrow_money,"disable");
    addClassName(this.loan_money,'disable');
    addClassName(this.add_friend,'disable');
    removeClassName(this.add_account,'disable');
    addClassName(this.show_me_the_money,'disable');

    while(this.account_list.hasChildNodes()){
        this.account_list.removeChild(this.account_list.firstChild);
    }

    $.ajax({
        type: 'POST',
        url: '',
        data: {
            what: 3, // 3 : give me a my account list
            id: current_email
        },
        success: function(data) {

            var div = document.createElement('div');
            var content = '<ul id="account_list_cell" style="list-style:decimal;"><ul>';
            div.innerHTML = content;

            var data = JSON.parse(data);

            for (var i = 0; i < data.account_info.length; i ++) {
                var li = document.createElement('li');
                var content = data.account_info[i].account_number;
                li.innerHTML = content;
                div.appendChild(li);
            }
            document.getElementById('account_list').appendChild(div);
        },
        error: function(data) {
            return ajaxFailed(data);
        }
    });
    // send email / receive my account list data

}

Fincnic.prototype.show_me_the_money_content = function() {
    addClassName(this.borrow_money,"disable");
    addClassName(this.loan_money,'disable');
    addClassName(this.add_account,'disable');
    addClassName(this.add_friend,'disable');
    removeClassName(this.show_me_the_money,'disable');

    while (this.my_friend_list.hasChildNodes()){
        this.my_friend_list.removeChild(this.my_friend_list.firstChild);
    }

    $.ajax({
        type: 'POST',
        url: '',
        data: {
            what: 2, // 2 : give me a friend list
            id: current_email
        },
        success: function(data) {

            var data = JSON.parse(data);
            for (var i = 0; i < data.friend_info.length; i ++) {
                var div = document.createElement('div');
                var content = '<a class="list-group-item abutton" onclick="give_me_the_money_friend_email_function(this)" value="' + data.friend_info[i].id + '">' + data.friend_info[i].name + '</a>';
                div.innerHTML = content;
                document.getElementById('my_friend_list').appendChild(div);
            }

        },
        error: function(data) {
            return ajaxFailed(data);
        }
    });
}

Fincnic.prototype.give_me_the_money_function = function() {
    var money = this.moneymoney.value;

    $.ajax({
        type: 'POST',
        url: '',
        data: {
            what: 8, // 8 : give me the money
            id: current_email,
            friend_id : give_me_the_money_friend_email,
            money : money
        },
        success: function(data) {
            alert(give_me_the_money_friend_name + " 에게 " + money + " 원을 빌려달라 하였습니다.");
        },
        error: function(data) {
            return ajaxFailed(data);
        }
    });

}

Fincnic.prototype.add_friend_function = function() {
    var friend_email = this.add_friend_input.value;
    if (friend_email == '' || friend_email == null) {
        alert("친구 이메일을 입력하세용");
    }
    else {
        while (this.friend_list.hasChildNodes()){
            this.friend_list.removeChild(this.friend_list.firstChild);
        }

        $("#add_friend_input").val('');

        $.ajax({
            type: 'POST',
            url: '',
            data: {
                what: 4, // 4 : add friend
                id: current_email,
                friend_id : friend_email
            },
            success: function(data) {

                var div = document.createElement('div');
                var content = '<ul id="friend_list_cell"><ul>';
                div.innerHTML = content;

                var data = JSON.parse(data);

                for (var i = 0; i < data.friend_info.length; i ++) {
                    var li = document.createElement('li');
                    var content = data.friend_info[i].name + ' ( ' + data.friend_info[i].id + ' )';
                    li.innerHTML = content;
                    div.appendChild(li);
                }
                document.getElementById('friend_list').appendChild(div);
            },
            error: function(data) {
                return ajaxFailed(data);
            }
        });
        // send email, friend_email / receive my friend list data
    }
}

Fincnic.prototype.add_account_function = function() {
    var new_account = this.add_account_input.value;

    if (new_account == '' || new_account == null) {
        alert("계좌 번호를 입력하세용");
    }
    else {
        while(this.account_list.hasChildNodes()){
            this.account_list.removeChild(this.account_list.firstChild);
        }

        $("#add_account_input").val('');

        $.ajax({
            type: 'POST',
            url: '',
            data: {
                what: 5, // 5 : add account
                id: current_email,
                new_account : new_account
            },
            success: function(data) {

                var div = document.createElement('div');
                var content = '<ul id="account_list_cell" style="list-style:decimal;"><ul>';
                div.innerHTML = content;

                var data = JSON.parse(data);

                for (var i = 0; i < data.account_info.length; i ++) {
                    var li = document.createElement('li');
                    var content = data.account_info[i].account_number;
                    li.innerHTML = content;
                    div.appendChild(li);
                }
                document.getElementById('account_list').appendChild(div);
            },
            error: function(data) {
                return ajaxFailed(data);
            }
        });
        // send email, new_account / receive my account list data
    }
}

Fincnic.prototype.send_money_function = function(object) {
    addClassName(this.send_money_button,"disable");
    removeClassName(this.real_send,"disable");
}

Fincnic.prototype.send_real_money_function = function(object) {
    // object.target.name -> loans_id
    var loans_id = object.target.name;
    var money = this.send_money_input.value;

    if (money == '' || money == null) {
        alert("갚으실 돈을 입력하세용");
    }
    else {
        while (this.borrow_content.hasChildNodes()){
            this.borrow_content.removeChild(this.borrow_content.firstChild);
        }
        while (this.loan_content.hasChildNodes()){
            this.loan_content.removeChild(this.loan_content.firstChild);
        }

        $("#send_money_input").val('');

        $.ajax({
            type: 'POST',
            url: '',
            data: {
                what: 6, // 6 : send money to loans_id
                id : current_email,
                loans_id: loans_id,
                money : money
            },
            success: function(data) {
                var data = JSON.parse(data);

                for (var i = 0; i < data.info[0].credit_info.length; i ++) {

                    var div = document.createElement("div");
                    var content = '';
                    content += '<div id="' + data.info[0].credit_info[i].loans_id + '" class="col-md-12 borrow_money_info"';
                    content += '<h4><span id="receiver">' + data.info[0].credit_info[i].debtor_name + '</span> 에게 빌려준 돈</h4>';
                    content += '<span id="limit_date">' + data.info[0].credit_info[i].finish_date + '</span> &nbsp;까지<br>';
                    content += '<span id="receiver_to_sender_money_current">' + data.info[0].credit_info[i].balance_money + '</span>&nbsp; 원&nbsp;&nbsp;/&nbsp;&nbsp;<span id="receiver_to_sender_money_all">' + data.info[0].credit_info[i].total_money + '</span> &nbsp;원<br>';
                    content += '<div class="progress">';
                    var percent = parseInt(data.info[0].credit_info[i].balance_money)/parseInt(data.info[0].credit_info[i].total_money)*100;
                    content += '<div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%"></div></div><button id="delete_loan" name="' + data.info[0].credit_info[i].loans_id + '" type="button" class="btn btn-danger">&nbsp;<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;</button></div>';
                    div.innerHTML = content;
                    document.getElementById('borrow_content').appendChild(div);
                }
                // borrow_content 빌려준 돈


                for (var i = 0; i < data.info[1].debt_info.length; i ++) {
                    var div = document.createElement("div");
                    var content = '';
                    content += '<div id="' + data.info[1].debt_info[i].loans_id + '" class="col-md-12 loan_money_info">';
                    content += '<h4><span id="sender">' + data.info[1].debt_info[i].creditor_name + '</span> 에게 갚을 돈</h4>';
                    content += '<span id="limit_date">' + data.info[1].debt_info[i].finish_date + '</span> &nbsp;까지<br>';
                    content += '<span id="receiver_to_sender_money_current">' + data.info[1].debt_info[i].balance_money + '</span>&nbsp; 원&nbsp;&nbsp;/&nbsp;&nbsp;<span id="receiver_to_sender_money_all">' + data.info[0].credit_info[i].total_money + '</span> &nbsp;원<br>';
                    content += '<div class="progress">';
                    var percent = parseInt(data.info[1].debt_info[i].balance_money)/parseInt(data.info[1].debt_info[i].total_money)*100;
                    content += '<div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%"></div></div></div>';
                    content += '<button id="send_money_button" name="' + data.info[1].debt_info[i].loans_id + '" type="button" class="btn btn-danger send_money_button">갚기</button>';
                    content += '<div id="real_send" class="input-group disable">';
                    content += '<input id="send_money_input" type="text" class="form-control" placeholder="갚을 금액">';
                    content += '<span class="input-group-btn"><button id="real_send_money_button" name="' + data.info[1].debt_info[i].loans_id + '" class="btn btn-danger" type="button">보내기!</button></span>';
                    content += '</div></div>';
                    div.innerHTML = content;
                    document.getElementById('loan_content').appendChild(div);
                }
                // loan_content 빌린 돈
            },
            error: function(data) {
                return ajaxFailed(data);
            }
        });
        // send loans_id, money / receive loan data
    }
}

Fincnic.prototype.delete_loan_function = function() {

    var load_id = this.delete_loan.name;

    while (this.borrow_content.hasChildNodes()){
        this.borrow_content.removeChild(this.borrow_content.firstChild);
    }
    while (this.loan_content.hasChildNodes()){
        this.loan_content.removeChild(this.loan_content.firstChild);
    }

    $.ajax({
        type: 'POST',
        url: '',
        data: {
            what: 7, // 5 : add account
            loans_id :load_id
        },
        success: function(data) {
            var data = JSON.parse(data);

            for (var i = 0; i < data.info[0].credit_info.length; i ++) {

                var div = document.createElement("div");
                var content = '';
                content += '<div id="' + data.info[0].credit_info[i].loans_id + '" class="col-md-12 borrow_money_info"';
                content += '<h4><span id="receiver">' + data.info[0].credit_info[i].debtor_name + '</span> 에게 빌려준 돈</h4>';
                content += '<span id="limit_date">' + data.info[0].credit_info[i].finish_date + '</span> &nbsp;까지<br>';
                content += '<span id="receiver_to_sender_money_current">' + data.info[0].credit_info[i].balance_money + '</span>&nbsp; 원&nbsp;&nbsp;/&nbsp;&nbsp;<span id="receiver_to_sender_money_all">' + data.info[0].credit_info[i].total_money + '</span> &nbsp;원<br>';
                content += '<div class="progress">';
                var percent = parseInt(data.info[0].credit_info[i].balance_money)/parseInt(data.info[0].credit_info[i].total_money)*100;
                content += '<div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%"></div></div><button id="delete_loan" name="' + data.info[0].credit_info[i].loans_id + '" type="button" class="btn btn-danger">&nbsp;<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>&nbsp;</button></div>';
                div.innerHTML = content;
                document.getElementById('borrow_content').appendChild(div);
            }
            // borrow_content 빌려준 돈


            for (var i = 0; i < data.info[1].debt_info.length; i ++) {
                var div = document.createElement("div");
                var content = '';
                content += '<div id="' + data.info[1].debt_info[i].loans_id + '" class="col-md-12 loan_money_info">';
                content += '<h4><span id="sender">' + data.info[1].debt_info[i].creditor_name + '</span> 에게 갚을 돈</h4>';
                content += '<span id="limit_date">' + data.info[1].debt_info[i].finish_date + '</span> &nbsp;까지<br>';
                content += '<span id="receiver_to_sender_money_current">' + data.info[1].debt_info[i].balance_money + '</span>&nbsp; 원&nbsp;&nbsp;/&nbsp;&nbsp;<span id="receiver_to_sender_money_all">' + data.info[0].credit_info[i].total_money + '</span> &nbsp;원<br>';
                content += '<div class="progress">';
                var percent = parseInt(data.info[1].debt_info[i].balance_money)/parseInt(data.info[1].debt_info[i].total_money)*100;
                content += '<div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:' + percent + '%"></div></div></div>';
                content += '<button id="send_money_button" name="' + data.info[1].debt_info[i].loans_id + '" type="button" class="btn btn-danger send_money_button">갚기</button>';
                content += '<div id="real_send" class="input-group disable">';
                content += '<input id="send_money_input" type="text" class="form-control" placeholder="갚을 금액">';
                content += '<span class="input-group-btn"><button id="real_send_money_button" name="' + data.info[1].debt_info[i].loans_id + '" class="btn btn-danger" type="button">보내기!</button></span>';
                content += '</div></div>';
                div.innerHTML = content;
                document.getElementById('loan_content').appendChild(div);
            }
            // loan_content 빌린 돈
        },
        error: function(data) {
            return ajaxFailed(data);
        }
    });
}

window.onload = function() {
    window.fincnic = new Fincnic();
};
