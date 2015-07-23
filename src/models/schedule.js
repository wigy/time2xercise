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
