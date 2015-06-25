/**
Data table has a key for every training system.
Each system contains the following data elements:

    schedules: {
        'Schedule Name' : [[2,0], [2,1], [3,2]],
    },
    programs: {
        'Program Name': ['A', 'Break', 'B'],
    },
    suitable: {
        'Schedule Name': ['Program Name'],
    },
    codes: {
        'A': 'Testing A',
        'B': 'Testing B',
    },
    sounds: {
        '.*' : {0: 'start', '-1': 'done'}
    }

*/
DATA = {};
