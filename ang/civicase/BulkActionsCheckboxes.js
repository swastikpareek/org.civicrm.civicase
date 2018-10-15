(function (angular, $, _) {
  var module = angular.module('civicase');

  module.directive('civicaseBulkActionsCheckboxes', function () {
    return {
      restrict: 'EA',
      controller: 'civicaseBulkActionsController',
      templateUrl: '~/civicase/BulkActionsCheckboxes.html',
      scope: {
        showCheckboxes: '=?',
        selectedItems: '=',
        isSelectAllAvailable: '=',
        everythingCount: '=',
        displayedCount: '='
      }
    };
  });

  module.controller('civicaseBulkActionsController', function ($scope, $rootScope) {
    $scope.showCheckboxes = false;

    (function init () {
      initWatchers();
    }());

    /**
     * Toggle checkbox states
     */
    $scope.toggleCheckbox = function () {
      $scope.showCheckboxes = !$scope.showCheckboxes;
    };

    /**
     * Emits event for bulk selections
     * Available event
     * - 'all' : Select all that matches the search
     * - 'visible' :  Selects all visible selections
     * - 'none' : Deselects all
     *
     * @params {String} condition
     */
    $scope.select = function ($event, condition) {
      $scope.$emit('civicase::bulk-actions::bulk-selections', condition);
      $event.stopPropagation();
      $event.preventDefault();
    };

    /**
     * Intiate watchers for this controller
     */
    function initWatchers () {
      $scope.$watch('selectedItems', selectedItemsWatcher);
    }

    /**
     * selectedItems variable watcher
     */
    function selectedItemsWatcher () {
      $rootScope.$broadcast('civicase::case-list::header-position-changed');
    }
  });
})(angular, CRM.$, CRM._);
