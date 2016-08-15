(function() {

    var Training;

    angular.module('t2x').factory('Training', ['Schedule', 'Data', 'TypeStr', 'TypeObj', 'TypeDict', function(Schedule, Data, TypeStr, TypeObj, TypeDict) {

        if (Training) {
            return Training;
        }

        /**
         * A single training target with own schedules and time tables.
         */
        Training = function(data) {
            this.init(data);
        };

        Training.prototype = new Data([
            // Name of the training system.
            {name: new TypeStr()},
            // A mapping of available schedule names to Schedule instances.
            {schedules: new TypeDict({type: new TypeObj({class: 't2x.Schedule'})})},
            // The currently selected schedule.
            {schedule: new TypeObj({class: 't2x.Schedule'})},
        ]);
        Training.prototype.__class = 't2x.Training';

        /**
         * Initialize data for this training program.
         */
        Training.prototype.load = function(name, data) {
            this.schedule = new Schedule();
            this.name = name;
            this.schedules = {};
            var names = Object.keys(data.schedules);
            for (var i in names) {
                this.schedules[names[i]] = new Schedule();
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
        Training.prototype.resetValues = function() {
            this.schedule.resetValues();
        };

        /**
         * Change the schedule.
         */
        Training.prototype.selectSchedule = function(name) {
            if (!name) {
                this.schedule = new Schedule();
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
