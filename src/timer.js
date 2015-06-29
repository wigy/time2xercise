var TimerApp = angular.module('TimerApp', ['ngAudio']);

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
 * Actual controller of the application.
 */
TimerApp.controller('TimerController', ['$scope', '$interval', '$sce', 'PlaySound', function($scope, $interval, $sce, PlaySound) {

    $scope.DEBUG = DEBUG;
    $scope.VERSION = VERSION;
    $scope.page = 'admin';
    $scope.timing = new TimingSystem();
    if (DEBUG)
        $scope.timing.load('Test');
    $scope.timing.load('Generic');
    $scope.timing.load('Rugby');
    $scope.timing.load('Fitness');
    $scope.timing.starting_time = '00:00:00';
    if (DEBUG)
        $scope.timing.selectTraining('Test');
    else
        $scope.timing.selectTraining('Generic');
    $scope.testing = false;
    $scope.show_menu = true;
    $scope.PlaySound = PlaySound;

    // TODO: Drop debug
    if (DEBUG) {
        $scope.timing.selectTraining('Rugby');
        $scope.timing.selectProgram('Day 1');
    }

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
        // TODO: How to avoid extra sound here?
        $scope.testing = false;
    };

    /**
     * Toggle visibility of the menu.
     */
     $scope.toggleMenu = function(event) {
         $scope.show_menu = !$scope.show_menu;
     };

     $scope.getEventDescription = function(event) {
         return $sce.trustAsHtml($scope.timing.getEventDescription(event));
     };
}]);
