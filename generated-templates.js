/**
 * This is automatically generated template cache filler.
 */
(function() {

    angular.module('templates', []).run(['$templateCache', function($templateCache) {

$templateCache.put("src/templates/timer_schedule.html","<div class=\"row schedule\" ng-if=\"timing.training.schedule.name\">\n  <div class=\"col-md-12\"><h1>{{timing.training.schedule.name}}</h1></div>\n  <div class=\"col-md-12 description\" ng-bind-html=\"timing.training.schedule.description\"></div>\n  <div class=\"col-md-12\"><h2>{{timing.training.schedule.program.name}}</h2></div>\n  <div class=\"col-md-12 description\" ng-bind-html=\"timing.training.schedule.program.description\"></div>\n  <div class=\"row\" ng-repeat=\"event in timing.training.schedule.program.timetable.events track by $index\">\n    <div class=\"col-md-1 col-xs-3 time text-success h4\"><strong>{{event.time.toString()}}</strong></div>\n    <div class=\"col-md-1 col-xs-3 duration text-success h4\"><strong>{{dur(event.duration)}}</strong></div>\n    <div class=\"col-md-4 col-xs-6 title text-success h4\"><strong>{{event.title}}</strong></div>\n    <div class=\"col-md-6 col-xs-12 description\" ng-bind-html=\"event.description\"></div>\n  </div>\n  <div class=\"row\">\n    <div class=\"col-md-1 col-xs-3 time\">{{timing.training.schedule.program.timetable.events[timing.training.schedule.program.timetable.events.length-1].endTime().toString()}}</div>\n    <div class=\"col-md-1 col-xs-3 duration\"></div>\n    <div class=\"col-md-4 col-xs-6 title\">Finished</div>\n  </div>\n</div>");

}]);
})();
