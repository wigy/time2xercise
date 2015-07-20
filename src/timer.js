(function(angular){

var TimerApp = angular.module('TimerApp', ['ngAudio']);

/**
 * Configure the application.
 */
TimerApp.config(function($sceProvider) {
  $sceProvider.enabled(false);
});

/**
 * Service to load and play sounds.
 */
TimerApp.service('PlaySound', ['ngAudio', function(ngAudio) {

    var audio = {};
    audio['buzzer'] = ngAudio.load('sounds/buzzer.mp3');
    audio['whistle'] = ngAudio.load('sounds/whistle.mp3');
    audio['start'] = ngAudio.load('sounds/start.mp3');
    audio['done'] = ngAudio.load('sounds/done.mp3');
    audio['1'] = ngAudio.load('sounds/1.mp3');
    audio['2'] = ngAudio.load('sounds/2.mp3');
    audio['3'] = ngAudio.load('sounds/3.mp3');

    return function(name, timestamp) {
        if (name == 'list')
            return Object.keys(audio);
        if (!(name in audio)) {
            d("Invalid audio name:", name);
            return;
        }
        if (DEBUG)
            d((timestamp ? timestamp : '') + "   >>> " + name + " <<<");
        else
            audio[name].play();
    };
}]);

/**
 * Directive to display a time table for an event.
 *
 * <timing-schedule timing="TimingModel" />
 */
TimerApp.directive('timerSchedule', [function() {
    return {
        restrict: 'E',
        link: function($scope, $elem, $attrs) {
            var model = $scope.$eval($attrs.timing);
            $scope.timing = model;
        },
        template :
            '<table class="table table-bordered" ng-if="timing.training.schedule.name">' +
            '<tr><th class="schedule" colspan=4>{{timing.training.schedule.name}}</th></tr>' +
            '<tr><th class="program" colspan=4>{{timing.training.schedule.program.name}}</th></tr>' +
            '<tr><td class="description" colspan=4 ng-bind-html="timing.training.schedule.program.description"></td></tr>' +
            '<tr ng-repeat="event in timing.training.schedule.program.timetable.events track by $index">' +
            '    <td>{{event.time.toString()}}</td>' +
            '    <td>{{event.title}}</td>' +
            '    <td>{{dur(event.duration)}}</td>' +
            '    <td class="description" ng-bind-html="event.description"></td>' +
            '</tr>' +
            '<tr><td>{{timing.training.schedule.program.timetable.events[timing.training.schedule.program.timetable.events.length-1].endTime().toString()}}</td>' +
            '    <td></td>' +
            '    <td></td>' +
            '    <td></td>' +
            '</tr>' +
            '</table>'
    };
}]);

/**
 * Actual controller of the application.
 */
TimerApp.controller('TimerController', ['$scope', '$interval', '$sce', '$timeout', 'PlaySound', function($scope, $interval, $sce, $timeout, PlaySound) {

    $scope.DEBUG = DEBUG;
    $scope.VERSION = VERSION;
    $scope.CHANGELOG = CHANGELOG;
    $scope.page = 'admin';
    $scope.timing = new TimingSystem();
    $scope.timing.load('Generic');
    $scope.timing.load('Rugby');
    $scope.timing.load('Fitness');
    $scope.timing.starting_time = '00:00:00';
    $scope.timing.selectTraining('Generic');
    $scope.testing = false;
    $scope.show_menu = true;
    $scope.PlaySound = PlaySound;

    var old_title = $scope.timing.getCurrentTitle();
    function refresh(clock) {
        if(DEBUG && old_title != $scope.timing.getCurrentTitle()) {
            old_title = $scope.timing.getCurrentTitle();
            d($scope.timing.clock.toString() + ' ' + $scope.timing.getCurrentTitle())
        }
        var sound = $scope.timing.refresh(clock);
        if(sound)
            PlaySound(sound, $scope.timing.clock.toString());
    }
    refresh();

    $interval(function() {
        if (!$scope.testing)
            refresh();
    }, 1000);

    /**
     * Set up clickable elements.
     */
    angular.element(document).ready(function () {
        $scope.updateHandlers();
    });

    /**
     * Convert seconds to human readable duration.
     */
    $scope.dur = function(n) {
        if(n < 60)
            return n + ' sec';
        return (n / 60) + ' min';
    };

    /**
     * Launch the program immediately after <i>sec</i> delay.
     */
    $scope.startNow = function(secs) {
        var clock = Time.now();
        clock.add(0,0,secs);
        $scope.timing.setStarting(clock);
        $scope.show_menu = false;
        $scope.page = 'clock';
    };

    /**
     * Run the program fast forward in debug mode and just print event changes and sounds.
     */
    $scope.testIt = function() {
        var old = $scope.timing.starting_time;
        var clock = Time.now();
        $scope.testing = true;
        $scope.timing.setStarting(clock);
        refresh(clock);
        while (!$scope.timing.isOver()) {
            refresh(clock);
            clock.add(0,0,1)
        }
        $scope.timing.reset(old);
        refresh();
        $scope.testing = false;
    };

    /**
     * Toggle visibility of the menu.
     */
     $scope.toggleMenu = function() {
         $scope.show_menu = !$scope.show_menu;
     };

     /**
      * Refresh click handlers on the screen.
      */
     $scope.updateHandlers = function() {
         // Simple image viewer.
         $('.description img').unbind('click');
         $('.description img').on('click', function(event) {
             $('.image-viewer').remove();
             var src = $(event.currentTarget).attr('src');
             $('<div class="image-viewer" style="display: none"><img src="' + src + '" /></div>').appendTo('body');
             $('.image-viewer').fadeIn();
             $('.image-viewer').on('click', function() {
                 $('.image-viewer').fadeOut();
             });
         });
     };

     /**
      * Change the training and update the screen.
      */
     $scope.selectTraining = function(name) {
         $scope.timing.selectTraining(name);
         $timeout(function() {$scope.updateHandlers()});
     };

     /**
      * Change the schedule and update the screen.
      */
     $scope.selectSchedule = function(name) {
         $scope.timing.selectSchedule(name);
         $timeout(function() {$scope.updateHandlers()});
     };

     /**
      * Change the program and update the screen.
      */
     $scope.selectProgram = function(name) {
         $scope.timing.selectProgram(name);
         $timeout(function() {$scope.updateHandlers()});
     };

     /**
      * Switch to the another page.
      */
     $scope.goPage = function(name) {
         $scope.page = name;
         $scope.show_menu = (name != 'clock');
         $timeout(function() {$scope.updateHandlers()});
     };

     /**
      * Turn pause on and off.
      */
     $scope.togglePause = function() {
         $scope.timing.togglePause();
     };

     /**
      * Go back to the previous event.
      */
     $scope.jumpToPrevious = function() {
         $scope.timing.jumpToPrevious();
         $timeout(function() {$scope.updateHandlers()});
     };

     /**
      * Skip to the next event.
      */
     $scope.jumpToNext = function() {
         $scope.timing.jumpToNext();
         $timeout(function() {$scope.updateHandlers()});
     };

     // Debug activities.
     if (DEBUG) {
         $scope.timing.load('Test');
         $scope.timing.selectTraining('Rugby');
     }
}]);
})(angular);
