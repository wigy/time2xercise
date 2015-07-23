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
