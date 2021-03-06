(function (angular, $) {
  var module = angular.module('civicase');

  module.directive('civicaseDashboard', function () {
    return {
      restrict: 'E',
      controller: 'civicaseDashboardController',
      templateUrl: '~/civicase/dashboard/directives/dashboard.directive.html'
    };
  });

  module.controller('civicaseDashboardController', civicaseDashboardController);

  function civicaseDashboardController ($scope, crmApi, formatActivity, $timeout, ts) {
    $scope.checkPerm = CRM.checkPerm;
    $scope.url = CRM.url;
    $scope.filters = {};
    $scope.activityFilters = {
      case_filter: {'case_type_id.is_active': 1, contact_is_deleted: 0}
    };
    $scope.newCaseWebformUrl = CRM.civicase.newCaseWebformUrl;

    (function init () {
      bindRouteParamsToScope();
      initWatchers();
      prepareCaseFilterOption();
      $scope.caseTypeCategoryName = getCaseTypeCategoryName();
      $scope.defaultCaseCategory = CRM.civicase.defaultCaseCategory;
      $scope.ts = ts;
    }());

    $scope.caseListLink = function (type, status) {
      var cf = {};
      if (type) {
        cf.case_type_id = [type];
      }
      if (status) {
        cf.status_id = [status];
      }
      if ($scope.myCasesOnly) {
        cf.case_manager = CRM.config.user_contact_id;
      }
      return '#/case/list?' + $.param({cf: JSON.stringify(cf)});
    };

    /**
     * Bind route paramaters to scope variables
     */
    function bindRouteParamsToScope () {
      $scope.$bindToRoute({ param: 'dtab', expr: 'activeTab', format: 'int', default: 0 });
      $scope.$bindToRoute({ param: 'drel', expr: 'filters.caseRelationshipType', format: 'raw', default: 'is_involved' });
      $scope.$bindToRoute({ param: 'case_type_category', expr: 'activityFilters.case_filter["case_type_id.case_type_category"]', format: 'raw', default: null });
    }

    /**
     * Gets the case type category label.
     */
    function getCaseTypeCategoryName () {
      return $scope.activityFilters.case_filter['case_type_id.case_type_category'];
    }

    /**
     * Watcher for caseRelationshipType
     *
     * @param {String} newValue
     */
    function caseRelationshipTypeWatcher (newValue) {
      newValue === 'is_case_manager'
        ? $scope.activityFilters.case_filter.case_manager = CRM.config.user_contact_id
        : delete ($scope.activityFilters.case_filter.case_manager);

      newValue === 'is_involved'
        ? $scope.activityFilters.case_filter.contact_involved = {'IN': [CRM.config.user_contact_id]}
        : delete ($scope.activityFilters.case_filter.contact_involved);
    }

    /**
     * Initialise watchers
     */
    function initWatchers () {
      $scope.$watch('filters.caseRelationshipType', caseRelationshipTypeWatcher);
    }

    /**
     * Prepare case filter options for crmUiSelect
     */
    function prepareCaseFilterOption () {
      var options = [
        {'text': ts('My cases'), 'id': 'is_case_manager'},
        {'text': ts('Cases I am involved in'), 'id': 'is_involved'}
      ];

      if (CRM.checkPerm('access all cases and activities')) {
        options.push({'text': ts('All Cases'), 'id': 'all'});
      }

      $scope.caseRelationshipOptions = options;
    }
  }
})(angular, CRM.$);
