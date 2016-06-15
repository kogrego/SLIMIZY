var loginMain = '<div class="form-container" ng-controller="loginCTRL">'+
                '<h2>Login</h2>'+
                '<form method="post" action="http://localhost:3000/loginAuth">'+
                    '<div class="form-group">'+
                        '<label for="username">ID</label>'+
                        '<input type="text" name="id" id="id" value="" class="form-control">'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<label for="username">Username</label>'+
                        '<input type="text" name="username" id="username" value="" class="form-control">'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<label for="password">Password</label>'+
                        '<input type="password" name="password" id="password" class="form-control">'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<button type="submit" class="btn btn-primary">Login</button>'+
                    '</div>'+
                '</form>'+
            '</div>';
$('#login').click(function(){
    $('main').html(loginMain);  
});
/**********Angular************

//***controller***
var slimizyApp = angular.module('slizimyApp',[]);
var model = {
    user:"David"
};

slizimyApp.run(function($http){
    $http.get("http://localhost:3000/login").success(function(data){
        model.items = data;
    });
});
slimizyApp.controller('loginCTRL', function ($scope) {
    $scope.todo = model;
    $scope.addNewItem = function(actionText){
        $scope.todo.items.push({action: actionText, done: false});

    };
});
***************************/