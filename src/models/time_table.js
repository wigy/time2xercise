(function() {

    /**
     * A list of events forming the time table to be executed in order.
     */
    function TimeTable(program) {

        // TODO: Refactor so that we don't need 2-directional linking (dumping JSON is circular).
        // The program this table table belongs to.
        this.program = program;
        // A list of events in the time table.
        this.events = [];
        // A map of sound names to play indexed by offsets in seconds from the start.
        this.sounds = {};
        // The previous event.
        this.previous = null;
        // The current event.
        this.current = null;
        // The next event.
        this.next = null;
        // Starting time of this table as seconds.
        this.starting_seconds = 0;
    }

    angular.module('t2x').factory('TimeTable', ['Activity', 'TimeStr', function(Activity, TimeStr) {

        TimeTable.prototype = {}; // TODO: Should be Data.

        /**
         * Fill in events based on the program and schedule.
         */
        TimeTable.prototype.load = function(program, schedule) {
            this.previous = new Activity();
            this.current = new Activity();
            this.next = new Activity();
            this.events = [];
            var event;
            for (var i=0; i < schedule.timing.length; i++) {

                var duration = schedule.timing[i][0];
                var index = schedule.timing[i][1];
                var options = schedule.timing[i][2];

                if(typeof(index) === 'string') {
                    event = new Activity({number: i+1, duration: duration, title: index, options: options || {}});
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
                    event = new Activity({number: i+1, duration: duration, title: program.getText(code), description: this.program.info[code] || '', options: options || {}});

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
        TimeTable.prototype.calculateSounds = function() {

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
        TimeTable.prototype.schedule = function(hhmmss) {
            var time = new TimeStr(hhmmss);
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
        TimeTable.prototype.addSeconds = function(num) {
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
        TimeTable.prototype.refresh = function(clock, old_clock_seconds) {

            if (this.events.length === 0) {
                return;
            }

            var last = this.events.length - 1;
            var old = this.current;

            if (clock.notYet(this.events[0].time)) {

                this.previous = new Activity();
                this.current = new Activity();
                this.next = this.events[0];

            } else if (clock.isAlready(this.events[last].endTime())) {

                this.previous = this.events[last];
                this.current = new Activity();
                this.next = new Activity();

            } else {
                this.previous = new Activity();
                this.next = new Activity();
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
        TimeTable.prototype.reset = function() {
            this.previous = new Activity();
            this.current = new Activity();
            this.next = new Activity();
        };

        /**
         * Get the time remaining in the current event as a hh:mm:ss.
         */
        TimeTable.prototype.getRemaining = function(clock) {

            if (this.current && this.current.time) {
                if (this.current.options.reverse_count) {
                    return clock.diff(this.current.startTime());
                }
                return this.current.endTime().diff(clock);
            }

            if (this.next && this.next.time && !this.current.time) {
                return this.next.time.diff(clock);
            }

            return new TimeStr();
        };

        TimeTable.prototype.isAtStart = function(clock) {
            if (this.current) {
                return clock.toString() === this.current.startTime().toString();
            }
        };

        /**
         * Check if the clock is past the finishing time of the table.
         */
        TimeTable.prototype.isOver = function(clock) {

            if (!this.events.length) {
                return false;
            }

            var a = clock.seconds();
            var b = this.events[this.events.length - 1].endTime().seconds();
            return a > b ? a - b : 0;
        };

        return TimeTable;
    }]);
})();
