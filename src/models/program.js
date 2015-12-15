(function() {

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
        // Options for this program.
        this.options = {};
        // Mapping from codes to their full names.
        this.codes = {};
        // Translation table from language abbreviatios to codes to their full names.
        this.translations = {};
        // Mapping from regex matching to the codes to the mapping of offsets to sound names.
        this.sounds = {};
        // A time table applied to this program using the schedule this program belongs.
        this.timetable = null;
        // Info texts for each code.
        this.info = {};
    }

    angular.module('t2x').factory('Program', [function() {

        Program.prototype = {}; // TODO: Should be Data.

        Program.prototype.load = function(name, data) {
            this.timetable = new TimeTable(this);
            this.name = name;
            this.list = data.programs[name];
            this.list = [];
            for (var i = 0; i < data.programs[name].length; i++) {
                if (typeof(data.programs[name][i]) === 'object') {
                    angular.extend(this.options,data.programs[name][i]);
                }
                else {
                    this.list.push(data.programs[name][i]);
                }
            }
            this.codes = data.codes || {};
            this.sounds = data.sounds || {};
            this.translations = data.translations || {};
            this.info = data.info || {};
            this.description = this.info[this.name] || '';
        };

        /**
         * Rebuild the time table based on the given schedule.
         */
        Program.prototype.apply = function(schedule) {
            var starting_time = this.schedule.training.timing.starting_time;
            this.timetable = new TimeTable(this);
            this.timetable.load(this, schedule);
            this.timetable.schedule(starting_time);
        };

        /**
         * Recalculate everything.
         */
        Program.prototype.recalc = function() {
            this.timetable.schedule(this.schedule.training.timing.starting_time);
        };

        /**
         * Clear up everything.
         */
        Program.prototype.reset = function() {
            this.timetable.reset();
        };

        /**
         * Get the (possibly translated) text explanation for a code.
         */
        Program.prototype.getText = function(code) {
            if (this.translations[LANGUAGE] && this.translations[LANGUAGE][code]) {
                return this.translations[LANGUAGE][code];
            }
            if (this.codes[code]) {
                return this.codes[code];
            }
            return code;
        };

        return Program;
    }]);
})();
