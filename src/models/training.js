(function() {

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
        this.schedule = null;
    }

    angular.module('t2x').factory('Training', ['Schedule', function(Schedule) {

        Training.prototype = {}; // TODO: Should be Data.

        /**
         * Initialize data for this training program.
         */
        Training.prototype.load = function(name, data) {
            this.schedule = new Schedule(this);
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
        Training.prototype.recalc = function(starting_time) {
            this.schedule.recalc(starting_time);
        };

        /**
         * Clear up everything.
         */
        Training.prototype.reset = function() {
            this.schedule.reset();
        };

        /**
         * Change the schedule.
         */
        Training.prototype.selectSchedule = function(name) {
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
        Training.prototype.getSchedules = function() {
            return Object.keys(this.schedules);
        };

        return Training;
    }]);
})();
