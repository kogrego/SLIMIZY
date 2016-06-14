var todoApp = angular.module('todoApp',[]);
var model = {
    user:"David"
};

todoApp.run(function($http){
    $http.get("http://localhost:3000/ws_todo/getActionsData").success(function(data){
        console.log(data);
        model.items = data;
    });
});
todoApp.controller('ToDoCtrl', function ($scope) {
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
    //$scope.first = 'Ragnar';
    //$scope.last = 'Lodbrok';
    //$scope.heading = "The king's message: ";
    //$scope.updateMsg = function() {
        //$scope.msg = "Hello, "+ $scope.first + " " + $scope.last;
    //};
});