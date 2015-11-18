(function(angular){

var TimerApp = angular.module('TimerApp', ['coa.input.keyboard']);

/**
 * Configure the application.
 */
TimerApp.config(['$sceProvider', function($sceProvider) {
  $sceProvider.enabled(false);
}]);

// TODO: Move to separate module.
/**
 * Service to load and play sounds.
 */
TimerApp.service('PlaySound', [function() {

    var audio = {};
    audio['buzzer'] = new Audio('sounds/buzzer.mp3');
    audio['whistle'] = new Audio('sounds/whistle.mp3');
    audio['start'] = new Audio('sounds/start.mp3');
    audio['done'] = new Audio('sounds/done.mp3');
    audio['1'] = new Audio('sounds/1.mp3');
    audio['2'] = new Audio('sounds/2.mp3');
    audio['3'] = new Audio('sounds/3.mp3');
    audio['4'] = new Audio('sounds/4.mp3');
    audio['5'] = new Audio('sounds/5.mp3');
    audio['lift'] = new Audio('sounds/lift.mp3');
    audio['relax'] = new Audio('sounds/relax.mp3');
    audio['back'] = new Audio('sounds/back.mp3');
    audio['get-ready'] = new Audio('sounds/get-ready.mp3');
    audio['1st-round'] = new Audio('sounds/1st-round.mp3');
    audio['2nd-round'] = new Audio('sounds/2nd-round.mp3');
    audio['3rd-round'] = new Audio('sounds/3rd-round.mp3');
    audio['4th-round'] = new Audio('sounds/4th-round.mp3');
    audio['5th-round'] = new Audio('sounds/5th-round.mp3');
    audio['6th-round'] = new Audio('sounds/6th-round.mp3');
    audio['7th-round'] = new Audio('sounds/7th-round.mp3');
    audio['8th-round'] = new Audio('sounds/8th-round.mp3');
    audio['9th-round'] = new Audio('sounds/9th-round.mp3');
    audio['last-round'] = new Audio('sounds/last-round.mp3');

    return function(name, timestamp) {
        if (name === 'list') {
            return Object.keys(audio);
        }
        if (!(name in audio)) {
            d("Invalid audio name:", name);
            return;
        }
        if (timestamp) {
            d((timestamp ? timestamp : '') + "   >>> " + name + " <<<");
        } else {
            audio[name].play();
        }
    };
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
 * <timing-schedule timing="TimingModel" />
 */
TimerApp.directive('timerSchedule', [function() {
    return {
        restrict: 'E',
        link: function($scope, $elem, $attrs) {
            var model = $scope.$eval($attrs.timing);
            $scope.timing = model;
        },
        template : '' +
            '<div class="row schedule" ng-if="timing.training.schedule.name">' +
            '  <div class="col-md-12"><h1>{{timing.training.schedule.name}}</h1></div>' +
            '  <div class="col-md-12 description" ng-bind-html="timing.training.schedule.description"></div>' +
            '  <div class="col-md-12"><h2>{{timing.training.schedule.program.name}}</h2></div>' +
            '  <div class="col-md-12 description" ng-bind-html="timing.training.schedule.program.description"></div>' +
            '  <div class="row" ng-repeat="event in timing.training.schedule.program.timetable.events track by $index">' +
            '    <div class="col-md-1 col-xs-3 time text-success h4"><strong>{{event.time.toString()}}</strong></div>' +
            '    <div class="col-md-1 col-xs-3 duration text-success h4"><strong>{{dur(event.duration)}}</strong></div>' +
            '    <div class="col-md-4 col-xs-6 title text-success h4"><strong>{{event.title}}</strong></div>' +
            '    <div class="col-md-6 col-xs-12 description" ng-bind-html="event.description"></div>' +
            '  </div>' +
            '  <div class="row">' +
            '    <div class="col-md-1 col-xs-3 time">{{timing.training.schedule.program.timetable.events[timing.training.schedule.program.timetable.events.length-1].endTime().toString()}}</div>' +
            '    <div class="col-md-1 col-xs-3 duration"></div>' +
            '    <div class="col-md-4 col-xs-6 title">Finished</div>' +
            '  </div>' +
            '</div>'
    };
}]);

/**
 * Actual controller of the application.
 */
TimerApp.controller('TimerController', ['$scope', '$interval', '$sce', '$timeout', 'PlaySound', function($scope, $interval, $sce, $timeout, PlaySound) {

    // Intialize application scope.
    $scope.DEBUG = DEBUG;
    $scope.VERSION = VERSION;
    $scope.CHANGELOG = CHANGELOG;
    $scope.YEAR = YEAR;
    $scope.page = DEBUG ? 'admin' : 'loading';
    $scope.timing = new TimingSystem();
    $scope.timing.load('Generic');
    $scope.timing.load('Rugby');
    $scope.timing.load('Fitness');
    $scope.timing.starting_time = '00:00:00';
    $scope.timing.selectTraining('Generic');
    $scope.match = new Match('Home', 'Visitor');
    $scope.testing = false;
    $scope.show_menu = true;
    $scope.PlaySound = PlaySound;
    $scope.add_home_score = 0;
    $scope.add_visitor_score = 0;

    // TODO: Connect to player.
    mapping = {
        'buzzer' : 'sounds/buzzer.mp3',
        'whistle' : 'sounds/whistle.mp3',
        'start' : 'sounds/start.mp3',
        'done' : 'sounds/done.mp3',
        '1' : 'sounds/1.mp3',
        '2' : 'sounds/2.mp3',
        '3' : 'sounds/3.mp3',
    };

    /**
     * Refresh function to update data.
     */
    var old_title = $scope.timing.getCurrentTitle();
    function refresh(clock) {
        if(DEBUG && old_title !== $scope.timing.getCurrentTitle()) {
            old_title = $scope.timing.getCurrentTitle();
            d($scope.timing.clock.toString() + ' ' + $scope.timing.getCurrentTitle());
        }
        var sound = $scope.timing.refresh(clock);
        if(sound) {
            $scope.PlaySound(sound, $scope.testing ? $scope.timing.clock.toString() : null);
        }
        if ($scope.timing.isOver()) {
            // TODO: Does not work correctly.
            // $scope.timing.stop();
            // TODO: Possibly go to admin page from here after few seconds.
        }
    }
    refresh();

    /**
     * Regular interval timer to update data every second.
     */
    $interval(function() {
        if (!$scope.testing) {
            refresh();
        }
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
        var clock = Time.now();
        clock.add(0,0,secs);
        $scope.timing.setStarting(clock);
        $scope.show_menu = false;
        $scope.page = 'clock';
        $scope.timing.start();
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
            clock.add(0,0,1);
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
         $scope.timing.selectTraining('Test');
//         $scope.goPage('options');
     }
}]);
})(angular);
