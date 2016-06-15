var loginMain = '<div class="form-container">'+
                '<h2>Login</h2>'+
                '<form method="post">'+
                    '<div class="form-group">'+
                        '<label for="username">ID</label>'+
                        '<input type="text" name="username" id="username" value="" class="form-control">'+
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

var todoApp = angular.module('slizimyApp',[]);
var model = {
    user:"David"
};

slizimyApp.run(function($http){
    $http.get("http://localhost:3000/ws_todo/getActionsData").success(function(data){
        console.log(data);
        model.items = data;
    });
});
slizimyApp.controller('loginCtrl', function ($scope) {
    $scope.todo= model;
    $scope.incompletCounter = function(){
        var count=0;
        angular.forEach($scope.todo.items, function(item){
            if(!item.done) {count++};
        });
        return count;
    };
    $scope.warningSuccess = function(){
        return $scope.incompletCounter() < 3 ? "label-success" : "label-warning";
    };  
    $scope.addNewItem = function(actionText){
        $scope.todo.items.push({action: actionText, done: false});

    };
});