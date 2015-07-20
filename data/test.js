DATA.Test = {
        schedules: {
            'Test' : [[4,0], [1,'Break'], [4,1]],
        },
        programs: {
            'Test': ['A', 'B'],
        },
        suitable: {
            'Test': ['Test'],
        },
        codes: {
            'A': 'Testing A',
            'B': 'Testing B',
        },
        info: {
            'Test': 'This is a generic description of the <u>program</u>.',
            'A': 'This is a test called <i>A</i> in our test set up.',
            'B': 'This is a test called <i>B</i> in our test set up.',
        },
        sounds: {
            '.*' : {0: 'start', 1: '1', '-2': '2', '-1': 'done'}
        }
};
