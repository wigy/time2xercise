(function() {

    var Program;

    angular.module('t2x').factory('Program', ['TimeTable', 'Data', 'TypeDict', 'TypeList', 'TypeObj', 'TypeOptions', 'TypeStr', 'Options', function(TimeTable, Data, TypeDict, TypeList, TypeObj, TypeOptions, TypeStr, Options) {

        if (Program) {
            return Program;
        }

        /**
         * A program is a named list of event codes or names.
         */
        Program = function(data) {
            this.init(data);
        };

        Program.prototype = new Data([
            // Name of the program.
            {name: new TypeStr()},
            // A list of codes or event names.
            {list: new TypeList({default: [], type: new TypeStr()})},
            // Options for this program.
            {options: new TypeOptions({default: {}, options: new Options({
                match: {
                    text: "Option value for %n must be boolean.",
                    type: "boolean",
                    default: false,
                },
            })})},
            // Mapping from codes to their full names.
            {codes: new TypeDict({default: {}, type: new TypeStr()})},
            // Translation table from language abbreviatios to codes to their full names.
            {translations: new TypeDict({default: {}, type: new TypeDict({default: {}, type: new TypeStr()})})},
            // Mapping from regex matching to the codes to the mapping of offsets to sound names.
            {sounds: new TypeDict({default: {}, type: new TypeStr()})},
            // A time table applied to this program using the schedule this program belongs.
            {timetable: new TypeObj({class: 't2x.TimeTable'})},
            // Info texts for each code.
            {info: new TypeDict({default: {}, type: new TypeStr()})},
        ]);
        Program.prototype.__class = 't2x.Program';


        Program.prototype.load = function(name, data) {
            this.timetable = new TimeTable();
            this.name = name;
            this.list = data.programs[name];
            this.list = [];
            for (var i = 0; i < data.programs[name].length; i++) {
                if (typeof(data.programs[name][i]) === 'object') {
                    angular.extend(this.options,data.programs[name][i]);
                }
                else {
                    this.list.push(data.programs[name][i]);
                }
            }
            this.codes = data.codes || {};
            this.sounds = data.sounds || {};
            this.translations = data.translations || {};
            this.info = data.info || {};
            this.description = this.info[this.name] || '';
        };

        /**
         * Rebuild the time table based on the given schedule.
         */
        Program.prototype.apply = function(schedule) {
            this.timetable = new TimeTable();
            this.timetable.load(this, schedule);
            this.timetable.schedule('00:00:00');
        };

        /**
         * Recalculate everything.
         */
        Program.prototype.recalc = function(starting_time) {
            this.timetable.schedule(starting_time);
        };

        /**
         * Clear up everything.
         */
        Program.prototype.resetValues = function() {
            this.timetable.resetValues();
        };

        /**
         * Get the (possibly translated) text explanation for a code.
         */
        Program.prototype.getText = function(code) {
            if (this.translations[LANGUAGE] && this.translations[LANGUAGE][code]) {
                return this.translations[LANGUAGE][code];
            }
            if (this.codes[code]) {
                return this.codes[code];
            }
            return code;
        };

        return Program;
    }]);
})();
