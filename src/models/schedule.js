(function() {

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
        // Description of the schedule.
        this.description = null;
        // A list of (duration, offset) pairs.
        this.timing = [];
        // A mapping from program names available to this schedule to the program instances.
        this.programs = {};
        // Currently selected program.
        this.program = new Program(this);
    }

    angular.module('t2x').factory('Schedule', [function() {

        Schedule.prototype = {};

        /**
        * Initialize.
        */
        Schedule.prototype.load = function(name, data) {
            this.name = name;
            this.programs = {};
            this.timing = data.schedules[name];
            if (data.info && data.info[name]) {
                this.description = data.info[name];
            }
            for (var i in data.suitable[name]) {
                var program = data.suitable[name][i];
                this.programs[program] = new Program(this);
                this.programs[program].load(program, data);
            }
        };

        /**
        * Recalculate everything.
        */
        Schedule.prototype.recalc = function() {
            this.program.apply(this);
            this.program.recalc();
        };

        /**
        * Get the list of program names.
        */
        Schedule.prototype.getPrograms = function() {
            return Object.keys(this.programs);
        };

        /**
        * Clear up everything.
        */
        Schedule.prototype.reset = function() {
            this.program.reset();
        };

        /**
        * Change the program.
        */
        Schedule.prototype.selectProgram = function(name) {
            if (!name) {
                this.program = new Program(this);
            } else {
                this.program = this.programs[name];
            }

            this.program.apply(this);
        };

        return Schedule;
    }]);
})();
