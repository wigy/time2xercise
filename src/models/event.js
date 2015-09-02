/**
 * A description of an entry in the schedule.
 */
function Event(number, duration, title, description, options) {

    // Name of the event.
    this.title = title || '';
    // Description of the event.
    this.description = description || '';
    // Options for the event.
    this.options = options || {};
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
     * Return starting time of the event.
     */
    this.startTime = function() {

        if (!this.time) {
            return new Time();
        }

        return new Time(this.time);
    };

    /**
     * Check if this event is just a break.
     */
    this.isBreak = function() {
        return title === 'Break';
    };
}
