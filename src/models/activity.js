(function() {

    var Activity;

    angular.module('t2x').factory('Activity', ['TimeStr', 'Data', 'Options', 'TypeOptions', 'TypeStr', 'TypeInt', 'TypeObj', 'TypeDict', function(TimeStr, Data, Options, TypeOptions, TypeStr, TypeInt, TypeObj, TypeDict) {

        if (Activity) {
            return Activity;
        }

        /**
         * A description of an entry in the schedule.
         */
        Activity = function(data) {

            this.init(data);
            // Make some manipulation for the description. TODO: Maybe move this to the data itself.
            this.description = this.description.replace(/<img /g, '<img class="img-thumbnail"');
        }

        Activity.prototype = new Data([
            // Name of the event.
            {title: new TypeStr({default: ''})},
            // Description of the event.
            {description: new TypeStr({default: ''})},
            // Options for the event.
            {options: new TypeOptions({default: {}, options: new Options({
                start_on_pause: {
                    // TODO: Here we could have %n and replace it automatically by name of the option.
                    text: "Option value for start_on_pause must be boolean.",
                    type: "boolean",
                    default: false,

                },
                reverse_count: {
                    text: "Option value for reverse_count must be boolean.",
                    type: "boolean",
                    default: false,
                },
                is_break: {
                    text: "Option value for is_break must be boolean.",
                    type: "boolean",
                    default: false,
                },
            })})},
            // Order number of the event.
            {number: new TypeInt()},
            // A TimeStr object having starting time of the event.
            {time: new TypeObj({class: 'coa.datetime.TimeStr'})},
            // Length of the event in seconds.
            {duration: new TypeInt()},
            // A sound mapping from offsets from the start (or end if negative) to sound names.
            {sounds: new TypeDict({default: {}})}, // TODO: Default could be always {} for dict. // TODO: Does not work anwyay.
        ]);
        Activity.prototype.__class = 't2x.Activity';

d(new Activity())
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
