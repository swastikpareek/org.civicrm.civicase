(function (angular, $, _) {
  var module = angular.module('civicase');

  module.directive('civicaseActivityFiltersContact', function () {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: '~/civicase/activity/filters/directives/activity-filters-contact.directive.html',
      scope: {
        filters: '=civicaseActivityFiltersContact'
      },
      link: civicaseActivityFiltersContactLink
    };

    /**
     * Link function for civicaseActivityFiltersContact
     *
     * @param {Object} $scope
     */
    function civicaseActivityFiltersContactLink ($scope) {
      $scope.ts = CRM.ts('civicase');

      (function init () {
        $scope.$watch('filters', filtersWatcher);
        $scope.$on('civicaseActivityFeed.query', feedQueryListener);
      }());

      /**
       * Watch listener for filters
       */
      function filtersWatcher () {
        // Ensure "All" checkbox renders.
        if ($scope.filters['@involvingContact'] === undefined) {
          $scope.filters['@involvingContact'] = '';
        }
      }

      /**
       * Subscribe listener for civicaseActivityFeed.query
       *
       * @param {Object} event
       * @param {Object} feedQueryParams
       */
      function feedQueryListener (event, feedQueryParams) {
        if (feedQueryParams.reset) {
          delete feedQueryParams.apiParams.contact_id;
          delete feedQueryParams.apiParams.assignee_contact_id;
          delete feedQueryParams.apiParams.source_contact_id;
        }

        switch (feedQueryParams.filters['@involvingContact']) {
          case 'myActivities':
            feedQueryParams.apiParams.contact_id = 'user_contact_id';
            break;

          case 'delegated':
            if (_.isEmpty(feedQueryParams.apiParams.assignee_contact_id)) {
              feedQueryParams.apiParams.assignee_contact_id = {'!=': 'user_contact_id'};
            }
            if (_.isEmpty(feedQueryParams.apiParams.source_contact_id)) {
              feedQueryParams.apiParams.source_contact_id = 'user_contact_id';
            }
            break;

          default:
            break;
        }
      }
    }
  });
})(angular, CRM.$, CRM._);
