describe('class TimingSystem', function() {

    var TimingSystem, TimeStr;
    var timing;

    beforeEach(function() {
        module('t2x');
        module('coa.datetime');
        inject(function(_TimingSystem_, _TimeStr_){
            TimingSystem = _TimingSystem_;
            TimeStr = _TimeStr_;
        });

        timing = new TimingSystem();
    });

    it('loads Test data', function() {
        timing.load('Test');
        timing.selectTraining('Test');
        timing.selectSchedule('Test');
        timing.setStarting('12:30:00');

        expect(timing.training.schedule.program.timetable.events[0].title).toBe('Testing A');
        expect(timing.training.schedule.program.timetable.events[1].time.toString()).toBe('12:30:04');

        expect(timing.training.schedule.program.timetable.sounds['0']).toBe('start');
        expect(timing.training.schedule.program.name).toBe('Test');
        expect(timing.training.schedule.timing[1]).toEqual([1, "Break"]);
        expect(timing.training.schedule.name).toBe('Test');
        expect(timing.training.name).toBe('Test');
        expect(timing.starting_time).toBe('12:30:00');

        expect(timing.isInvalid()).toBe(false);
    });

    it('loads Fitness data', function() {
        timing.load('Fitness');
        timing.selectTraining('Fitness');
        timing.selectSchedule('Body Weight 40:20');

        expect(timing.training.schedule.program.timetable.events[1].title).toBe('Break');
        expect(timing.training.schedule.program.timetable.events[1].time.toString()).toBe('00:00:40');

        expect(timing.training.schedule.program.timetable.events[2].title).toBe('Lunge');
        expect(timing.training.schedule.program.timetable.events[2].time.toString()).toBe('00:01:00');
        expect(timing.training.schedule.program.timetable.events[2].duration).toBe(40);
        expect(timing.training.schedule.program.timetable.events[2].sounds).toEqual({ 0: 'start', '-1': 'done'});

        expect(timing.training.schedule.program.timetable.sounds['0']).toBe('start');
        expect(timing.training.schedule.program.name).toBe('1 Monday');
        expect(timing.training.schedule.timing[1]).toEqual([20, "Break"]);
        expect(timing.training.schedule.name).toBe('Body Weight 40:20');
        expect(timing.training.name).toBe('Fitness');
        expect(timing.starting_time).toBe('00:00:00');

        // TODO: Validate whole timing object once whole chain is converted to Data.
        expect(timing.training.isInvalid()).toBe(false);
    });

    it('loads Generic data', function() {
        timing.load('Generic');
        timing.selectTraining('Generic');
        timing.selectSchedule('4 x 7 min + 2 min breaks');

        expect(timing.training.schedule.program.timetable.events[1].title).toBe('Break');
        expect(timing.training.schedule.program.timetable.events[1].time.toString()).toBe('00:07:00');

        expect(timing.training.schedule.program.timetable.events[2].title).toBe('Exercise 2');
        expect(timing.training.schedule.program.timetable.events[2].time.toString()).toBe('00:09:00');
        expect(timing.training.schedule.program.timetable.events[2].duration).toBe(7*60);
        expect(timing.training.schedule.program.timetable.events[2].sounds).toEqual({ 0: 'whistle', '-1': 'buzzer'});
        expect(timing.training.schedule.program.timetable.events[2].duration).toBe(7*60);

        expect(timing.training.schedule.program.timetable.sounds['0']).toBe('whistle');
        expect(timing.training.schedule.program.name).toBe('Exercises');
        expect(timing.training.schedule.timing[1]).toEqual([120, "Break"]);
        expect(timing.training.schedule.name).toBe('4 x 7 min + 2 min breaks');
        expect(timing.training.name).toBe('Generic');
        expect(timing.starting_time).toBe('00:00:00');

        // TODO: Validate whole timing object once whole chain is converted to Data.
        expect(timing.training.isInvalid()).toBe(false);
    });

    it('loads Rugby data', function() {
        timing.load('Rugby');
        timing.selectTraining('Rugby');
        timing.selectSchedule('XV Match');

        expect(timing.training.schedule.program.timetable.events[0].title).toBe('1st Half');
        expect(timing.training.schedule.program.timetable.events[0].time.toString()).toBe('00:00:00');
        expect(timing.training.schedule.program.timetable.events[0].duration).toBe(40*60);
        expect(timing.training.schedule.program.timetable.events[0].options).toEqual({start_on_pause: true, reverse_count: true, is_break: false});

        expect(timing.training.schedule.program.timetable.events[1].title).toBe('Half-time');
        expect(timing.training.schedule.program.timetable.events[1].time.toString()).toBe('00:40:00');
        expect(timing.training.schedule.program.timetable.events[1].options).toEqual({start_on_pause: false, reverse_count: false, is_break: true});

        expect(timing.training.schedule.program.timetable.events[2].title).toBe('2nd Half');
        expect(timing.training.schedule.program.timetable.events[2].time.toString()).toBe('00:50:00');
        expect(timing.training.schedule.program.timetable.events[2].duration).toBe(40*60);
        expect(timing.training.schedule.program.timetable.events[2].options).toEqual({start_on_pause: true, reverse_count: true, is_break: false});

        expect(timing.training.schedule.program.timetable.sounds).toEqual({});
        expect(timing.training.schedule.program.name).toBe('Match');
        expect(timing.training.schedule.timing[1]).toEqual([600, "Half-time", {is_break: true}]);
        expect(timing.training.schedule.name).toBe('XV Match');
        expect(timing.training.name).toBe('Rugby');
        expect(timing.starting_time).toBe('00:00:00');

        // TODO: Validate whole timing object once whole chain is converted to Data.
        expect(timing.training.schedule.isInvalid()).toBe(false);
    });

    it('runs Test schedule correctly', function() {

        timing.load('Test');
        timing.selectTraining('Test');
        timing.selectSchedule('Test');

        var clock = new TimeStr('10:00:00');
        timing.setStarting(clock);
        timing.start();

        var marks = [];
        for (var i=0; i < 100; i++) {
            var sound = timing.refresh(clock);
            if (sound !== undefined) {
                marks.push([clock.toString(), sound, timing.getCurrentTitle()]);
            }
            if (timing.isOver()) {
                break;
            }
            clock.add(0,0,1);
        }
        timing.stop();

        expect(i).toBe(10);
        expect(marks).toEqual([
            [ '10:00:00', 'start', 'Testing A' ],
            [ '10:00:01', '1', 'Testing A' ],
            [ '10:00:03', '2', 'Testing A' ],
            [ '10:00:04', 'done', 'Break' ],
            [ '10:00:05', 'start', 'Testing B' ],
            [ '10:00:06', '1', 'Testing B' ],
            [ '10:00:08', '2', 'Testing B' ],
            [ '10:00:09', 'done', '' ]
        ]);
    });
});
