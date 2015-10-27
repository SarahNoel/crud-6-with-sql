angular.module('nodeOutfits', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.outfitData = {};

    // Get all outfits
    $http.get('/outfits')
        .success(function(data) {
            $scope.outfitData = data;
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

    // Create a new outfit
    $scope.createOutfit = function() {
        $http.post('/outfits', $scope.formData)
        .success(function(data) {
            $scope.formData = {};
            $scope.outfitData = data;
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });
    };


    // get an outift
    $scope.getOutfit = function(outfitID){
        $scope.editing = true;
        $http.get('/outfit/' + outfitID)
        .success(function(data) {
            $scope.formData = data[0];
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

   // update an outift
    $scope.updateOutfit = function(outfitID){
        $scope.editing = false;
        $http.put('/outfit/' + outfitID, $scope.formData)
        .success(function(data) {
            $scope.formData = {};
            $scope.outfitData = data;

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // Delete an outfit
    $scope.deleteOutfit = function(outfitID){
        $http.delete('/outfit/' + outfitID)
        .success(function(data) {
            $scope.outfitData = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };







});
