var registerMain = '<div class="form-container" ng-controller="registerCTRL">'+
                    '<h2>Register</h2>'+
                    '<form method="post" action="https://slimizy.herokuapp.com/register">'+
                    '<form method="post" action="http://localhost:3000/register">'+
                        '<div class="form-group">'+
                            '<label for="firstName">First name</label>'+
                            '<input type="text" name="firstName" id="firstName" class="form-control" value="" required="">'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label for="lastName">Last name</label>'+
                            '<input type="text" name="lastName" id="lastName" class="form-control" value="" required="">'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label for="username">Username</label>'+
                            '<input type="text" name="username" id="username" class="form-control" value="" required="">'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label for="password">Password</label>'+
                            '<input type="password" name="password" id="password" class="form-control" required="">'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<label for="password">ReEnter Password</label>'+
                            '<input type="password" name="rePassword" id="rePassword" class="form-control" required="">'+
                        '</div>'+
                        '<div class="form-group">'+
                            '<button type="submit" class="btn btn-primary">Register</button>'+
                            '<a href="#" class="btn btn-link">Cancel</a>'+
                       ' </div>'+
                    '</form>'+
                '</div>';
$('#register').click(function(){
    $('main').html(registerMain);  
});

/**********Angular************

//***controller***
var slimizyApp = angular.module('slimizyApp',[]);
var model = {
    
};

slizimyApp.run(function($http){
    $http.get("http://localhost:3000/register").success(function(data){
        console.log(data);
        model.items = data;
    });
});
slizimyApp.controller('registerCTRL', function ($scope) {
    $scope.todo = model;
    $scope.addNewItem = function(actionText){
        $scope.todo.items.push({username: actionText, done: false});

    };
});
**********/