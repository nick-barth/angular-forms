//TODO: a ton of quality of life adjustments, cursor moving, tab indexing, highlighting, scrolling on new survey, things of that nature
// a stylesheet would be nice

(function(angular) {
  'use strict';
  var app = angular.module('SurveyApp', []);


  //quickest way that came to mind was just to regex it as a string to make sure it's a positive integer, maybe a bit hacky
  //will have to be converted to int on backend? maybe? todo: do it on the frontend
  var INTEGER_REGEXP = /^\+?(0|[1-9]\d*)$/;
  app.directive("integer", function() {
    return {
      restrict: "A",
      require: "ngModel",
      link: function(scope, element, attributes, ngModel) {
        ngModel.$validators.integer = function(modelValue) {
          if (INTEGER_REGEXP.test(modelValue)) {
            return true;
          } else {
            return false;
          }
        }
      }
    };
  });


  app.controller('FormCtrl', function($scope) {
    $scope.questions = [{
      qID: 1,
      title: 'Example question 1'
    }];
    $scope.surveys = [{
      title: 'Survey 1',
      pointValue: 25,
      desc: 'A really great survey that does really great things',
      questions: $scope.questions,
      id: 1
    }];

    //todo: remove question
    $scope.addNewQuestion = function(id) {
      var newQuestionNum = $scope.surveys[id - 1].questions.length + 1;
      $scope.surveys[id - 1].questions.push({
        'qID': newQuestionNum,
        title: 'Example Question ' + newQuestionNum
      });
    };

    //todo: remove survey
    $scope.addNewSurvey = function() {
      var newSurveyID = $scope.surveys.length + 1;
      $scope.surveys.push({
        id: newSurveyID,
        title: 'Survey ' + newSurveyID,
        pointValue: 50,
        desc: 'Alright, another survey, you like that?',
        questions: [{
          qID: 1,
          title: 'Example Question 1',
        }],
      });
    };

    $scope.submit = function(form) {
      if (form.$valid) {
        //todo:actually have a post function
        var post = angular.toJson($scope.surveys);
        console.log(post);
      } else {
        //todo: better highlight of errors, running short on time.
        alert('fix your errors bud');
      }
    };
  });

})(window.angular);
