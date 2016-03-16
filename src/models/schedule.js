(function() {

    var Schedule;

    angular.module('t2x').factory('Schedule', ['Program', 'Data', 'TypeStr', 'TypeInt', 'TypeObj', 'TypeList', 'TypeDict', 'TypePair', function(Program, Data, TypeStr, TypeInt, TypeObj, TypeList, TypeDict, TypePair) {

        if (Schedule) {
            return Schedule;
        }

        /**
         * A list of pairs containing <i>duration, offset</i> of event timings.
         * The offset refers to the index in the program list paired with the schedule.
         * In addition programs suitable for the schedule are stored here.
         */
        Schedule = function(data) {
            this.init(data);
        }

        Schedule.prototype = new Data([
            // Name of this schedule.
            {name: new TypeStr()},
            // Description of the schedule.
            {description: new TypeStr()},
           // A list of (duration, offset) triplets.
            {timing: new TypeList({type: new TypePair({types: [new TypeInt(), new TypeInt()]})})},
            // A mapping from program names available to this schedule to the program instances.
            {programs: new TypeDict({type: new TypeObj({class: 't2x.Program'})})},
            // Currently selected program.
            {program: new TypeObj({class: 't2x.Program'})},
        ]);
        Schedule.prototype.__class = 't2x.Schedule';

        /**
        * Initialize.
        */
        Schedule.prototype.load = function(name, data) {
            this.program = new Program();
            this.name = name;
            this.programs = {};
            this.timing = data.schedules[name];
            if (data.info && data.info[name]) {
                this.description = data.info[name];
            }
            for (var i in data.suitable[name]) {
                var program = data.suitable[name][i];
                this.programs[program] = new Program();
                this.programs[program].load(program, data);
            }
        };

        /**
        * Recalculate everything.
        */
        Schedule.prototype.recalc = function(starting_time) {
            this.program.apply(this);
            this.program.recalc(starting_time);
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
        Schedule.prototype.resetValues = function() {
            this.program.resetValues();
        };

        /**
        * Change the program.
        */
        Schedule.prototype.selectProgram = function(name) {
            if (!name) {
                this.program = new Program();
            } else {
                this.program = this.programs[name];
            }

            this.program.apply(this);
        };

        return Schedule;
    }]);
})();
