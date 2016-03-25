var app = angular.module('SurveyApp', []);

var INTEGER_REGEXP = /^\-?\d+$/;
app.directive('integer', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.integer = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
});


app.controller('FormCtrl', function($scope) {

  $scope.questions = [{
    num: 1,
    q: 'Example question 1'
  }];
  $scope.surveys = [{
    name: 'Survey 1',
    points: 25,
    desc: 'A really great survey that does really great things',
    qs: $scope.questions,
    id: 1
  }];

  $scope.addNewQuestion = function(id) {
    var newQuestionNum = $scope.surveys[id - 1].qs.length + 1;
    $scope.surveys[id - 1].qs.push({
      'num': newQuestionNum,
      q: 'Example Question ' + newQuestionNum
    });
  };

  $scope.addNewSurvey = function() {
    var newSurveyID = $scope.surveys.length + 1;
    $scope.surveys.push({
      id: newSurveyID,
      name: 'Survey ' + newSurveyID,
      points: 50,
      desc: 'Alright, another survey, you like that?',
      qs: [{
        num: 1,
        q: 'Example Question 1',
      }],
    });
  };

});
