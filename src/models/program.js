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
