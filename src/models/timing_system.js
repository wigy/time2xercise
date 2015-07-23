/**
 * The state of the system managing a scheduled program.
 */
function TimingSystem() {

    // Official time.
    this.clock = new Time();
    this.clock.setNow();
    // Boolean to pause the whole system.
    this.pause = false;
    // The starting time of the scheduling.
    this.starting_time = '00:00:00';
    // A mapping of available training names to Training instances.
    this.trainings = {};
    // Currently selected training.
    this.training = new Training(this);
    // Name of the currently selected training.
    this.training_name = null;
    // Name of the currently selected schedule.
    this.schedule_name = null;
    // Name of the currently selected program.
    this.program_name = null;

    /**
     * Load data for the named training system.
     */
    this.load = function(name) {
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
    this.recalc = function() {
        this.training.recalc();
    };

    /**
     * Change the current training system.
     */
     this.selectTraining = function(name) {
         this.training = this.trainings[name];
         var schedules = this.training.getSchedules();
         this.selectSchedule(schedules.length ? schedules[0] : null);
         this.training_name = name;
     };

     /**
      * Change the current training schedule.
      */
     this.selectSchedule = function(name) {
         this.training.selectSchedule(name);
         this.schedule_name = name;
         var programs = this.training.schedule.getPrograms();
         this.selectProgram(programs.length ? programs[0] : null);
     };

     /**
      * Change the current training program.
      */
     this.selectProgram = function(name) {
         this.training.schedule.selectProgram(name);
         this.program_name = name;
     };

     /**
      * Set the starting time.
      * @param clock {Clock} The starting time.
      */
     this.setStarting = function(clock) {
        this.starting_time = clock.toString();
        this.recalc();
     };

    /**
     * Perform update of the time system according to its schedule.
     *
     * This function should be executed once a second.
     */
    this.refresh = function(clock) {

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

        // On pause just move all events forward accordingly.
        if (this.pause) {
            this.addSeconds(this.clock.seconds() - old);
            return null;
        }

        return this.training.schedule.program.timetable.refresh(this.clock, old);
    };

    /**
     * Clear up everything.
     *
     * @param old {string} The clock time to be restored if any.
     */
    this.reset = function(old) {
        this.training.reset();
        if (old) {
            this.setStarting(new Time(old));
        }
    };

    /**
     * Add the given amount of seconds to the starting time and schedule.
     */
    this.addSeconds = function(num) {
        this.training.schedule.program.timetable.addSeconds(num);
        var clock = new Time(this.starting_time);
        clock.addSeconds(num);
        this.starting_time = clock.toString();
    };

    /**
     * Set pause on and off.
     */
    this.togglePause = function() {
        this.pause = !this.pause;
        // Set clock to one second before current time to ensure we get signals played.
        if (!this.pause) {
            this.clock.addSeconds(-1);
        }
    };

    /**
     * Go to the previous and put pause on.
     */
    this.jumpToPrevious = function() {
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
    this.jumpToNext = function() {
        if (this.training.schedule.program.timetable.next && this.training.schedule.program.timetable.next.time) {
            this.addSeconds(this.clock.seconds() - this.training.schedule.program.timetable.next.time.seconds());
            if (!this.pause) {
                this.togglePause();
            }
            this.training.schedule.program.timetable.refresh(this.clock);
        }
    };

    /**
     * Check if the whole schedule is finished.
     */
    this.isOver = function() {
        return !this.training.schedule.program.timetable.current || !this.training.schedule.program.timetable.current.time;
    };

    /**
     * Get the next event time and title.
     */
    this.getNext = function() {
        return this.training.schedule.program.timetable.next.shortTime() + ' ' + this.training.schedule.program.timetable.next.title;
    };

    /**
     * Get the previous event time and title.
     */
    this.getPrevious = function() {
        return this.training.schedule.program.timetable.previous.shortTime() + ' ' + this.training.schedule.program.timetable.previous.title;
    };

    /**
     * Get the time remaining in the current event.
     */
    this.getRemaining = function() {
        return this.training.schedule.program.timetable.getRemaining(this.clock).toString();
    };

    /**
     * Get the time remaining in the current event in seconds.
     */
    this.getRemainingSeconds = function(clock) {
        return this.training.schedule.program.timetable.getRemaining(this.clock).seconds();
    };

    /**
     * Get the current time.
     */
    this.getClock = function() {
        return this.clock.toString();
    };

    /**
     * Get the name of the current event if any.
     */
    this.getCurrentTitle = function() {
        return this.training.schedule.program.timetable.current.title;
    };
}
