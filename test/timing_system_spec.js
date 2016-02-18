describe('class TimingSystem', function() {

    var TimingSystem;

    beforeEach(function() {
        module('t2x');
        inject(function(_TimingSystem_){
            TimingSystem = _TimingSystem_;
        });
    });

    it('loads data and calculates timetable', function() {
        var timing = new TimingSystem();
        timing.load('Test');
        timing.selectTraining('Test');
        timing.selectSchedule('Test');
        timing.setStarting('12:30:00');
        expect(timing.training.schedule.program.timetable.events[0].title).toBe('Testing A');
        expect(timing.training.schedule.program.timetable.events[1].time.toString()).toBe('12:30:04');
    });
});
