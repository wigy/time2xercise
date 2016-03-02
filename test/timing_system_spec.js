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
        timing.load('Test');
        timing.selectTraining('Test');
        timing.selectSchedule('Test');
        timing.setStarting('12:30:00');
    });

    it('loads data and calculates timetable', function() {
        expect(timing.training.schedule.program.timetable.events[0].title).toBe('Testing A');
        expect(timing.training.schedule.program.timetable.events[1].time.toString()).toBe('12:30:04');
    });

    it('runs schedule correctly', function() {
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
