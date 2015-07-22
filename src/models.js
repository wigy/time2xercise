/**
 * A class storing local time as a string in <i>hh:mm:ss</i> format.
 *
 * @param hhmmss Initial time (defaults to '00:00:00').
 */
function Time(hhmmss) {

    this.negative = false;
    this.time = hhmmss instanceof Time ? hhmmss.time : (hhmmss || '00:00:00');

    this.toString = function() {
        return this.time;
    };

    this.short = function() {
        return this.toString().substr(0, 5);
    };

    /**
     * Add to this time.
     */
    this.add = function(h, m, s) {
        var parts = this.time.split(':');
        s = s + parseInt(parts[2]);
        m += Math.floor(s/60);
        s = s % 60;
        m = m + parseInt(parts[1]);
        h += Math.floor(m/60);
        m = m % 60;
        h = h + parseInt(parts[0]);
        h = h % 24;

        this.time = ('0' + h).substr(-2,2) + ':' + ('0' + m).substr(-2,2) + ':' + ('0' + s).substr(-2,2);
    };

    /**
     * Add or subtract seconds.
     */
    this.addSeconds = function(num) {
        if (num > 0) {
            this.add(0, 0, num);
        }
        else {
            var zero = new Time('00:00:00');
            zero.addSeconds(this.seconds() + num);
            this.time = zero.time;
        }
    };

    /**
     * Set the time to the current time.
     */
    this.setNow = function() {
        this.time = (new Date()).toJSON().substr(11, 8);
        var hours = (-(new Date()).getTimezoneOffset() / 60);
        if (hours > 0) {
            this.add(hours, 0, 0);
        }
        if (hours < 0) {
            this.add(24 + hours, 0, 0);
        }
    };

    /**
     * Check if this time is not already as much as the given time.
     */
    this.notYet = function(time) {
        return this.time.toString() < time.toString();
    };

    /**
     * Check if this time is already past the given time.
     */
    this.isPast = function(time) {
        return this.time.toString() > time.toString();
    };

    /**
     * Check if this time is at least the given time.
     */
    this.isAlready = function(time) {
        return this.time.toString() >= time.toString();
    };

    /**
     * Convert time to seconds.
     */
    this.seconds = function() {
        var h, m, s;
        var parts = this.time.split(':');
        h = parseInt(parts[0]);
        m = parseInt(parts[1]);
        s = parseInt(parts[2]);
        return h*60*60 + m*60 + s;
    };

    /**
     * Subtract another time from this time and return new time instance.
     */
    this.diff = function(time) {
        var a = this.seconds(), b = time.seconds();
        var ret = new Time();

        if (a < b) {
            ret.add(0, 0, b-a);
            ret.negative = true;
        } else {
            ret.add(0, 0, a-b);
        }

        return ret;
    };
}

Time.now = function() {
    var clock = new Time();
    clock.setNow();
    return clock;
};

/**
 * A description of an entry in the schedule.
 */
function Event(number, duration, title, description) {

    // Name of the event.
    this.title = title || '';
    // Description of the event.
    this.description = description || '';
    // Order number of the event.
    this.number = number;
    // A Time object having starting time of the event.
    this.time = null;
    // Length of the event in seconds.
    this.duration = duration || 0;
    // A sound mapping from offsets fromt the start to sound names.
    this.sounds = {};

    // Make some manipulation for the description.
    this.description = this.description.replace(/<img /g, '<img class="img-thumbnail"');

    /**
     * Calculate starting time of this event based on overall starting time and offset in seconds.
     */
    this.schedule = function(hhmmss, offset) {
        this.time = new Time(hhmmss);
        this.time.add(0, 0, offset);
    };

    /**
     * Get the short time string for the event.
     */
    this.shortTime = function() {
        return this.time ? this.time.toString().substr(0, 5) : '     ';
    };

    /**
     * Return ending time of the event.
     */
    this.endTime = function() {

        if (!this.time) {
            return new Time();
        }

        var ret = new Time(this.time);
        ret.add(0, 0, duration);
        return ret;
    };

    /**
     * Check if this event is just a break.
     */
    this.isBreak = function() {
        return title === 'Break';
    };
}

/**
 * A list of events forming the time table to be executed in order.
 */
function TimeTable(program) {

    // The program this table table belongs to.
    this.program = program;
    // A list of events in the time table.
    this.events = [];
    // A map of sound names to play indexed by offsets in seconds from the start.
    this.sounds = {};
    // The previous event.
    this.previous = new Event();
    // The current event.
    this.current = new Event();
    // The next event.
    this.next = new Event();
    // Starting time of this table as seconds.
    this.starting_seconds = 0;

    /**
     * Fill in events based on the program and schedule.
     */
    this.load = function(program, schedule) {
        this.events = [];
        var event;
        for (var i=0; i < schedule.timing.length; i++) {

            var duration = schedule.timing[i][0];
            var index = schedule.timing[i][1];

            if(typeof(index) === 'string') {
                event = new Event(i+1, duration, index);
            } else {
                // Find the code.
                var code = program.list[index];

                // Check if finished and remove end break.
                if (index >= program.list.length || code === '-') {
                    if (this.events.length && this.events[this.events.length - 1].isBreak()) {
                        this.events.pop();
                    }
                    continue;
                }

                // Create event
                event = new Event(i+1, duration, program.getText(code), this.program.info[code]);

                // Find out the sound.
                for (var regex in program.sounds) {
                    var re = new RegExp('^' + regex + '$');
                    if (re.test(code)) {
                        event.sounds = program.sounds[regex];
                        break;
                    }
                }
            }
            this.events.push(event);
        }
        this.calculateSounds();
    };

    /**
     * Helper to calculate sound schedule from the current list of events.
     */
    this.calculateSounds = function() {

        var offset = 0;
        var n, pos;

        this.sounds = {};
        for (var i=0; i < this.events.length; i++) {
            var offsets = Object.keys(this.events[i].sounds);
            for (var j=0; j < offsets.length; j++) {
                // Negative offsets counts from the first second of the next event.
                n = parseInt(offsets[j]);
                pos = (n >= 0 ? offset + n : pos = offset + this.events[i].duration + n + 1);
                // Note that start signal overrides the end signal of the previous if overlapping.
                this.sounds[pos] = this.events[i].sounds[offsets[j]];
            }
            offset += this.events[i].duration;
        }
    };

    /**
     * Set the time stamps for each event in the program based on the starting time given.
     */
    this.schedule = function(hhmmss) {
        var time = new Time(hhmmss);
        this.starting_seconds = time.seconds();
        var offset = 0;
        for(var i = 0; i < this.events.length; i++) {
            this.events[i].schedule(hhmmss, offset);
            offset += this.events[i].duration;
        }
    };

    /**
     * Add seconds to the every event in the time table scheduling time.
     */
    this.addSeconds = function(num) {
        this.starting_seconds += num;
        for(var i = 0; i < this.events.length; i++) {
            this.events[i].time.addSeconds(num);
        }
    };

    /**
     * Update previous, current and next events according to the current clock.
     *
     * @return Sound name to play if any.
     */
    this.refresh = function(clock, old_clock_seconds) {

        if (this.events.length === 0) {
            return;
        }

        var last = this.events.length - 1;
        var old = this.current;

        if (clock.notYet(this.events[0].time)) {

            this.previous = new Event();
            this.current = new Event();
            this.next = this.events[0];

        } else if (clock.isAlready(this.events[last].endTime())) {

            this.previous = this.events[last];
            this.current = new Event();
            this.next = new Event();

        } else {
            this.previous = new Event();
            this.next = new Event();
            var current = 0;
            for(var i = 0; i < this.events.length; i++) {
                if (clock.isAlready(this.events[i].time)) {
                    current = i;
                }
            }
            this.current = this.events[current];
            if (current > 0) {
                this.previous = this.events[current - 1];
            }
            if (current < last) {
                this.next = this.events[current + 1];
            }
        }

        var ret;
        var t0 = old_clock_seconds;
        var t1 = clock.seconds();
        if (t1 < t0 || t1 - t0 > 10) {
            return;
        }

        for (var t = t0 + 1; t <= t1; t++) {
            if (this.sounds[t - this.starting_seconds]) {
                if (ret) {
                    d("Too slow to play all sounds...");
                }
                ret = this.sounds[t - this.starting_seconds];
            }
        }
        return ret;
    };

    /**
     * Clear up everything.
     */
    this.reset = function() {
        this.previous = new Event();
        this.current = new Event();
        this.next = new Event();
    };

    /**
     * Get the time remaining in the current event as a hh:mm:ss.
     */
    this.getRemaining = function(clock) {

        if (this.current && this.current.time) {
            return this.current.endTime().diff(clock);
        }

        if (this.next && this.next.time && !this.current.time) {
            return this.next.time.diff(clock);
        }

        return new Time();
    };
}

/**
 * A program is a named list of event codes or names.
 */
function Program(schedule) {

    // The schedule this program belongs to.
    this.schedule = schedule;
    // Name of the program.
    this.name = null;
    // A list of codes or event names.
    this.list = [];
    // Mapping from codes to their full names.
    this.codes = {};
    // Translation table from language abbreviatios to codes to their full names.
    this.translations = {};
    // Mapping from regex matching to the codes to the mapping of offsets to sound names.
    this.sounds = {};
    // A time table applied to this program using the schedule this program belongs.
    this.timetable = new TimeTable(this);
    // Info texts for each code.
    this.info = {};

    this.load = function(name, data) {
        this.name = name;
        this.list = data.programs[name];
        this.codes = data.codes || {};
        this.sounds = data.sounds || {};
        this.translations = data.translations || {};
        this.info = data.info || {};
        this.description = this.info[this.name] || '';
    };

    /**
     * Rebuild the time table based on the given schedule.
     */
    this.apply = function(schedule) {
        var starting_time = this.schedule.training.timing.starting_time;
        this.timetable = new TimeTable(this);
        this.timetable.load(this, schedule);
        this.timetable.schedule(starting_time);
    };

    /**
     * Recalculate everything.
     */
    this.recalc = function() {
        this.timetable.schedule(this.schedule.training.timing.starting_time);
    };

    /**
     * Clear up everything.
     */
    this.reset = function() {
        this.timetable.reset();
    };

    /**
     * Get the (possibly translated) text explanation for a code.
     */
    this.getText = function(code) {
        if (this.translations[LANGUAGE] && this.translations[LANGUAGE][code]) {
            return this.translations[LANGUAGE][code];
        }
        if (this.codes[code]) {
            return this.codes[code];
        }
        return code;
    };
}

/**
 * A list of pairs containing <i>duration, offset</i> of event timings.
 * The offset refers to the index in the program list paired with the schedule.
 * In addition programs suitable for the schedule are stored here.
 */
function Schedule(training) {

    // The training system this schedule belongs to.
    this.training = training;
    // Name of this schedule.
    this.name = null;
    // A list of (duration, offset) pairs.
    this.timing = [];
    // A mapping from program names available to this schedule to the program instances.
    this.programs = {};
    // Currently selected program.
    this.program = new Program(this);

    /**
     * Initialize.
     */
    this.load = function(name, data) {
        this.name = name;
        this.programs = {};
        this.timing = data.schedules[name];
        for (var i in data.suitable[name]) {
            var program = data.suitable[name][i];
            this.programs[program] = new Program(this);
            this.programs[program].load(program, data);
        }
    };

    /**
     * Recalculate everything.
     */
    this.recalc = function() {
        this.program.apply(this);
        this.program.recalc();
    };

    /**
     * Get the list of program names.
     */
    this.getPrograms = function() {
        return Object.keys(this.programs);
    };

    /**
     * Clear up everything.
     */
    this.reset = function() {
        this.program.reset();
    };

    /**
     * Change the program.
     */
    this.selectProgram = function(name) {
        if (!name) {
            this.program = new Program(this);
        } else {
            this.program = this.programs[name];
        }

        this.program.apply(this);
    };
}

/**
 * A single training target with own schedules and time tables.
 */
function Training(timing) {

    // Timing system where this training belongs to.
    this.timing = timing;
    // Name of the training system.
    this.name = null;
    // A mapping of available schedule names to Schedule instances.
    this.schedules = {};
    // The currently selected schedule.
    this.schedule = new Schedule(this);

    /**
     * Initialize data for this training program.
     */
    this.load = function(name, data) {
        this.name = name;
        this.schedules = {};
        var names = Object.keys(data.schedules);
        for (var i in names) {
            this.schedules[names[i]] = new Schedule(this);
            this.schedules[names[i]].load(names[i], data);
        }
    };

    /**
     * Recalculate everything.
     */
    this.recalc = function() {
        this.schedule.recalc();
    };

    /**
     * Clear up everything.
     */
    this.reset = function() {
        this.schedule.reset();
    };

    /**
     * Change the schedule.
     */
    this.selectSchedule = function(name) {
        if (!name) {
            this.schedule = new Schedule(this);
        }
        else {
            this.schedule = this.schedules[name];
        }
    };

    /**
     * Get the list of schedule names.
     */
    this.getSchedules = function() {
        return Object.keys(this.schedules);
    };
}

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
