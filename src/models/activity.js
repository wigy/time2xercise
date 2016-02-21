(function() {

    /**
     * A description of an entry in the schedule.
     */
    function Activity(number, duration, title, description, options) {

        // Name of the event.
        this.title = title || '';
        // Description of the event.
        this.description = description || '';
        // Options for the event.
        this.options = options || {};
        // Order number of the event.
        this.number = number;
        // A TimeStr object having starting time of the event.
        this.time = null;
        // Length of the event in seconds.
        this.duration = duration || 0;
        // A sound mapping from offsets from the start to sound names.
        this.sounds = {};

        // Make some manipulation for the description.
        this.description = this.description.replace(/<img /g, '<img class="img-thumbnail"');
    }

    angular.module('t2x').factory('Activity', ['TimeStr', function(TimeStr) {

        Activity.prototype = {}; // TODO: Should be Data.

        /**
         * Calculate starting time of this event based on overall starting time and offset in seconds.
         */
        Activity.prototype.schedule = function(hhmmss, offset) {
            this.time = new TimeStr(hhmmss);
            this.time.add(0, 0, offset);
        };

        /**
         * Get the short time string for the event.
         */
        Activity.prototype.shortTime = function() {
            return this.time ? this.time.toString().substr(0, 5) : '     ';
        };

        /**
         * Return ending time of the event.
         */
        Activity.prototype.endTime = function() {

            if (!this.time) {
                return new TimeStr();
            }

            var ret = new TimeStr(this.time);
            ret.add(0, 0, this.duration);
            return ret;
        };

        /**
         * Return starting time of the event.
         */
        Activity.prototype.startTime = function() {

            if (!this.time) {
                return new TimeStr();
            }

            return new TimeStr(this.time);
        };

        /**
         * Check if this event is just a break.
         */
        Activity.prototype.isBreak = function() {
            return this.options.is_break || this.title === 'Break';
        };

        return Activity;
    }]);
})();
