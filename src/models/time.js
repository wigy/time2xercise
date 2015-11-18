/**
 * A class storing local time as a string in <i>hh:mm:ss</i> format.
 *
 * @param hhmmss Initial time (defaults to '00:00:00').
 */
function Time(hhmmss) {

    this.negative = false;
    this.time = hhmmss instanceof Time ? hhmmss.time : (hhmmss || '00:00:00');

    // TODO: All functions belongs to the prototype rather.

    this.toString = function() {
        return this.time;
    };

    this.short = function() {
        return this.toString().substr(0, 5);
    };

    /**
     * Add to this time.
     */
    this.add = function(h, m, s) {
        var parts = this.time.split(':');
        s = s + parseInt(parts[2]);
        m += Math.floor(s/60);
        s = s % 60;
        m = m + parseInt(parts[1]);
        h += Math.floor(m/60);
        m = m % 60;
        h = h + parseInt(parts[0]);
        h = h % 24;

        this.time = ('0' + h).substr(-2,2) + ':' + ('0' + m).substr(-2,2) + ':' + ('0' + s).substr(-2,2);
    };

    /**
     * Add or subtract seconds.
     */
    this.addSeconds = function(num) {
        if (num > 0) {
            this.add(0, 0, num);
        }
        else {
            var zero = new Time('00:00:00');
            zero.addSeconds(this.seconds() + num);
            this.time = zero.time;
        }
    };

    /**
     * Set the time to the current time.
     */
    this.setNow = function() {
        this.time = (new Date()).toJSON().substr(11, 8);
        var hours = (-(new Date()).getTimezoneOffset() / 60);
        if (hours > 0) {
            this.add(hours, 0, 0);
        }
        if (hours < 0) {
            this.add(24 + hours, 0, 0);
        }
    };

    /**
     * Check if this time is not already as much as the given time.
     */
    this.notYet = function(time) {
        return this.time.toString() < time.toString();
    };

    /**
     * Check if this time is already past the given time.
     */
    this.isPast = function(time) {
        return this.time.toString() > time.toString();
    };

    /**
     * Check if this time is at least the given time.
     */
    this.isAlready = function(time) {
        return this.time.toString() >= time.toString();
    };

    /**
     * Convert time to seconds.
     */
    this.seconds = function() {
        var h, m, s;
        var parts = this.time.split(':');
        h = parseInt(parts[0]);
        m = parseInt(parts[1]);
        s = parseInt(parts[2]);
        return h*60*60 + m*60 + s;
    };

    /**
     * Subtract another time from this time and return new time instance.
     */
    this.diff = function(time) {
        var a = this.seconds(), b = time.seconds();
        var ret = new Time();

        if (a < b) {
            ret.add(0, 0, b-a);
            ret.negative = true;
        } else {
            ret.add(0, 0, a-b);
        }

        return ret;
    };
}

Time.now = function() {
    var clock = new Time();
    clock.setNow();
    return clock;
};
