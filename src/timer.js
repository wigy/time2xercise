(function(angular){

var TimerApp = angular.module('TimerApp', ['coa.input', 'coa.audio', 't2x']);

/**
 * Configure the application.
 */
TimerApp.config(['$sceProvider', function($sceProvider) {
  $sceProvider.enabled(false);
}]);

/**
 * Filter to cut hours away from a time string.
 */
TimerApp.filter("shortTime", [function() {
    return function(str) {
        if (str.substr(0,3) === '00:') {
            return str.substr(3);
        }
        return str;
    };
}]);

/**
 * Directive to display a time table for an event.
 *
 * <timer-schedule timing="TimingModel" />
 */
TimerApp.directive('timerSchedule', [function() {
    return {
        restrict: 'E',
        link: function($scope, $elem, $attrs) {
            var model = $scope.$eval($attrs.timing);
            $scope.timing = model;
        },
        templateUrl : 'src/templates/timer_schedule.html'
    };
}]);

/**
 * Actual controller of the application.
 */
TimerApp.controller('TimerController', ['$scope', '$interval', '$timeout', 'player', 'Match', 'TimingSystem', 'TimeStr', function($scope, $interval, $timeout, player, Match, TimingSystem, TimeStr) {

    // Intialize application scope.
    $scope.DEBUG = DEBUG;
    $scope.VERSION = VERSION;
    $scope.YEAR = YEAR;
    $scope.page = DEBUG ? 'admin' : 'loading';
    $scope.timing = new TimingSystem();
    $scope.timing.load('Generic');
    $scope.timing.load('Rugby');
    $scope.timing.load('Fitness');
    $scope.timing.starting_time = '00:00:00';
    $scope.timing.selectTraining('Generic');
    $scope.match = new Match({home_team: {name: 'Home'}, visitor_team: {name: 'Visitor'}});
    $scope.show_menu = true;
    $scope.player = player;
    $scope.add_home_score = 0;
    $scope.add_visitor_score = 0;

    player.load({
        'buzzer' : 'sounds/buzzer.mp3',
        'whistle' : 'sounds/whistle.mp3',
        'start' : 'sounds/start.mp3',
        'done' : 'sounds/done.mp3',
        '1' : 'sounds/1.mp3',
        '2' : 'sounds/2.mp3',
        '3' : 'sounds/3.mp3',
        '4': 'sounds/4.mp3',
        '5': 'sounds/5.mp3',
        'lift': 'sounds/lift.mp3',
        'relax': 'sounds/relax.mp3',
        'back': 'sounds/back.mp3',
        'get-ready': 'sounds/get-ready.mp3',
        '1st-round': 'sounds/1st-round.mp3',
        '2nd-round': 'sounds/2nd-round.mp3',
        '3rd-round': 'sounds/3rd-round.mp3',
        '4th-round': 'sounds/4th-round.mp3',
        '5th-round': 'sounds/5th-round.mp3',
        '6th-round': 'sounds/6th-round.mp3',
        '7th-round': 'sounds/7th-round.mp3',
        '8th-round': 'sounds/8th-round.mp3',
        '9th-round': 'sounds/9th-round.mp3',
        'last-round': 'sounds/last-round.mp3',
    });

    /**
     * Refresh function to update data.
     */
    var old_title = $scope.timing.getCurrentTitle();
    function refresh() {
        if(DEBUG && old_title !== $scope.timing.getCurrentTitle()) {
            old_title = $scope.timing.getCurrentTitle();
            d($scope.timing.clock.toString() + ' ' + $scope.timing.getCurrentTitle());
        }
        var sound = $scope.timing.refresh();
        if(sound) {
            $scope.player.play(sound);
        }
        var over = $scope.timing.isOver();
        if (over && over > 10) {
            $scope.timing.stop();
            $scope.goPage('admin');
        }
    }
    refresh();

    /**
     * Regular interval timer to update data every second.
     */
    $interval(function() {
        refresh();
    }, 1000);

    /**
     * Timer switch off the loading screen.
     */
    if (!DEBUG) {
        $timeout(function() {
            $scope.page = 'admin';
        }, 2000);
    }

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
        return n < 60 ? n + ' sec' : (n / 60) + ' min';
    };

    /**
     * Launch the program immediately after <i>sec</i> delay.
     */
    $scope.startNow = function(secs) {
        var clock = TimeStr.now();
        clock.add(0,0,secs);
        $scope.timing.setStarting(clock);
        $scope.show_menu = false;
        $scope.page = 'clock';
        $scope.timing.start();
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
             $('#image-viewer').remove();
             var src = $(event.currentTarget).attr('src');
             var viewer = '<div id="image-viewer" class="modal fade" role="dialog">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-body">' +
                '<img class="img-rounded" src="' + src + '" />' +
                '</div></div></div></div>';
             $(viewer).appendTo('body');
             $('#image-viewer').modal();
         });
     };

     /**
      * Change the training and update the screen.
      */
     $scope.selectTraining = function(name) {
         $scope.timing.selectTraining(name);
         $timeout(function() {$scope.updateHandlers();});
     };

     /**
      * Change the schedule and update the screen.
      */
     $scope.selectSchedule = function(name) {
         $scope.timing.selectSchedule(name);
         $timeout(function() {$scope.updateHandlers();});
     };

     /**
      * Change the program and update the screen.
      */
     $scope.selectProgram = function(name) {
         $scope.timing.selectProgram(name);
         $timeout(function() {$scope.updateHandlers();});
     };

     /**
      * Switch to the another page.
      */
     $scope.goPage = function(name) {
         $scope.page = name;
         $scope.show_menu = (name !== 'clock');
         $timeout(function() {$scope.updateHandlers();});
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
         $timeout(function() {$scope.updateHandlers();});
     };

     /**
      * Skip to the next event.
      */
     $scope.jumpToNext = function() {
         $scope.timing.jumpToNext();
         $timeout(function() {$scope.updateHandlers();});
     };

     /**
      * Keyboard handler.
      */
     $scope.keyPress = function(key) {

         if ($scope.page !== 'clock') {
             return;
         }

         if (key === 'M') {
             $scope.toggleMenu();
         } else if (key === 'P') {
             $scope.togglePause();
         } else if (key === 'H') {
             if ($scope.add_home_score) {
                 $scope.add_home_score = 0;
                 return;
             }
             $scope.add_home_score = 1;
             $scope.add_visitor_score = 0;
         } else if (key === 'V') {
             if ($scope.add_visitor_score) {
                 $scope.add_visitor_score = 0;
                 return;
             }
             $scope.add_visitor_score = 1;
             $scope.add_home_score = 0;
         } else if (key === '-') {
             $scope.add_home_score *= -1;
             $scope.add_visitor_score *= -1;
         } else if (key >= '0' && key <= '9') {
             var score = key === '0' ? 10 : parseInt(key);
             $scope.match.addScore($scope.add_home_score * score, $scope.add_visitor_score * score);
             $scope.add_visitor_score = 0;
             $scope.add_home_score = 0;
         }
     };

     // Debug activities.
     if (DEBUG) {
         $scope.timing.load('Test');
         $scope.timing.selectTraining('Fitness');
         $scope.timing.selectSchedule('Weight Lifting 10 x 10');
     }
}]);
})(angular);
