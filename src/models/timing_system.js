(function() {

    /**
     * The state of the system managing a scheduled program.
     */
    function TimingSystem() {

        // Official time.
        this.clock = null;
        // Boolean to indicate if the system is running.
        this.running = false;
        // Boolean to pause the whole system.
        this.pause = false;
        // The starting time of the scheduling.
        this.starting_time = '00:00:00';
        // A mapping of available training names to Training instances.
        this.trainings = {};
        // Currently selected training.
        this.training = null;
        // Name of the currently selected training.
        this.training_name = null;
        // Name of the currently selected schedule.
        this.schedule_name = null;
        // Name of the currently selected program.
        this.program_name = null;
    }

    angular.module('t2x').factory('TimingSystem', ['Training', 'TimeStr', function(Training, TimeStr) {

        TimingSystem.prototype = {}; // TODO: Should be Data.

        /**
        * Load data for the named training system.
        */
        TimingSystem.prototype.load = function(name) {

            this.clock = new TimeStr();
            this.clock.setNow();
            this.training = new Training(this);

            if (!DATA[name]) {
                d("Cannot load training data for '" + name + "'.");
            }
            else {
                var training = new Training(this);
                training.load(name, DATA[name]);
                this.trainings[name] = training;
            }
        };

        /**
        * Recalculate everything.
        */
        TimingSystem.prototype.recalc = function() {
            this.training.recalc(this.starting_time);
        };

        /**
        * Change the current training system.
        */
        TimingSystem.prototype.selectTraining = function(name) {
            this.training = this.trainings[name];
            var schedules = this.training.getSchedules();
            this.selectSchedule(schedules.length ? schedules[0] : null);
            this.training_name = name;
            this.recalc();
        };

        /**
        * Change the current training schedule.
        */
        TimingSystem.prototype.selectSchedule = function(name) {
            this.training.selectSchedule(name);
            this.schedule_name = name;
            var programs = this.training.schedule.getPrograms();
            this.selectProgram(programs.length ? programs[0] : null);
            this.recalc();
        };

        /**
        * Change the current training program.
        */
        TimingSystem.prototype.selectProgram = function(name) {
            this.training.schedule.selectProgram(name);
            this.program_name = name;
            this.recalc();
        };

        /**
        * Set the starting time.
        * @param clock {Clock} The starting time.
        */
        TimingSystem.prototype.setStarting = function(clock) {
            this.starting_time = clock.toString();
            this.recalc();
        };

        /**
        * Start the clock.
        */
        TimingSystem.prototype.start = function() {
            this.running = true;
        };

        /**
        * Stop the clock.
        */
        TimingSystem.prototype.stop = function() {
            this.running = false;
        };

        /**
        * Perform update of the time system according to its schedule.
        *
        * This function should be executed once a second.
        */
        TimingSystem.prototype.refresh = function(clock) {

            var old;

            if (clock) {
                // Test mode.
                this.clock = clock;
                old = clock.seconds() - 1;
            }
            else {
                // Real mode.
                old = this.clock.seconds();
                this.clock.setNow();
            }

            if (!this.running) {
                return;
            }

            // On pause just move all events forward accordingly.
            if (this.pause) {
                this.addSeconds(this.clock.seconds() - old);
                return null;
            }

            var ret = this.training.schedule.program.timetable.refresh(this.clock, old);

            // Check if we are about to start new event.
            if (this.training.schedule.program.timetable.isAtStart(this.clock)) {
                if (this.training.schedule.program.timetable.current.options.start_on_pause) {
                    this.pause = true;
                    ret = null;
                }
            }

            return ret;
        };

        /**
        * Clear up everything.
        *
        * @param old {string} The clock time to be restored if any.
        */
        TimingSystem.prototype.reset = function(old) {
            this.training.reset();
            if (old) {
                this.setStarting(new TimeStr(old));
            }
        };

        /**
        * Add the given amount of seconds to the starting time and schedule.
        */
        TimingSystem.prototype.addSeconds = function(num) {
            this.training.schedule.program.timetable.addSeconds(num);
            var clock = new TimeStr(this.starting_time);
            clock.addSeconds(num);
            this.starting_time = clock.toString();
        };

        /**
        * Set pause on and off.
        */
        TimingSystem.prototype.togglePause = function() {
            this.pause = !this.pause;
            // Set clock to one second before current time to ensure we get signals played.
            if (!this.pause && !this.isMatch()) {
                this.clock.addSeconds(-1);
            }
        };

        /**
        * Go to the previous and put pause on.
        */
        TimingSystem.prototype.jumpToPrevious = function() {
            if (this.training.schedule.program.timetable.previous && this.training.schedule.program.timetable.previous.time) {
                this.addSeconds(this.clock.seconds() - this.training.schedule.program.timetable.previous.time.seconds());
                if (!this.pause) {
                    this.togglePause();
                }
                this.training.schedule.program.timetable.refresh(this.clock);
            }
        };

        /**
        * Go to the next and put pause on.
        */
        TimingSystem.prototype.jumpToNext = function() {
            if (this.training.schedule.program.timetable.next && this.training.schedule.program.timetable.next.time) {
                this.addSeconds(this.clock.seconds() - this.training.schedule.program.timetable.next.time.seconds());
                if (!this.pause) {
                    this.togglePause();
                }
                this.training.schedule.program.timetable.refresh(this.clock);
            }
        };

        /**
        * Check if the whole schedule is finished and how many seconds ago if it is.
        */
        TimingSystem.prototype.isOver = function() {
            if (!this.running) {
                return false;
            }
            return this.training.schedule.program.timetable.isOver(this.clock);
        };

        /**
        * Get the next event time and title.
        */
        TimingSystem.prototype.getNext = function() {
            return this.training.schedule.program.timetable.next.shortTime() + ' ' + this.training.schedule.program.timetable.next.title;
        };

        /**
        * Get the previous event time and title.
        */
        TimingSystem.prototype.getPrevious = function() {
            return this.training.schedule.program.timetable.previous.shortTime() + ' ' + this.training.schedule.program.timetable.previous.title;
        };

        /**
        * Get the time remaining in the current event.
        */
        TimingSystem.prototype.getRemaining = function() {
            return this.training.schedule.program.timetable.getRemaining(this.clock).toString();
        };

        /**
        * Get the time remaining in the current event in seconds.
        */
        TimingSystem.prototype.getRemainingSeconds = function(clock) {
            return this.training.schedule.program.timetable.getRemaining(this.clock).seconds();
        };

        /**
        * Check if we are on the break.
        */
        TimingSystem.prototype.onBreak = function() {
            return this.training.schedule.program.timetable.current && this.training.schedule.program.timetable.current.isBreak();
        };

        /**
        * Get the current time.
        */
        TimingSystem.prototype.getClock = function() {
            return this.clock.toString();
        };

        /**
        * Get the name of the current event if any.
        */
        TimingSystem.prototype.getCurrentTitle = function() {
            return this.training.schedule.program.timetable.current.title;
        };

        /**
        * Check if the timing system is actual game.
        */
        TimingSystem.prototype.isMatch = function() {
            return !!this.training.schedule.program.options.match;
        };

        return TimingSystem;
    }]);
})();
