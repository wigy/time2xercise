DATA.Generic = {

    schedules: {
        '2 x 15 min + 2 min breaks': [[15*60, 0], [2*60, "Break"], [15*60, 1]],
        '3 x 15 min + 2 min breaks': [[15*60, 0], [2*60, "Break"], [15*60, 1], [2*60, "Break"], [15*60, 2]],
        '4 x 15 min + 2 min breaks': [[15*60, 0], [2*60, "Break"], [15*60, 1], [2*60, "Break"], [15*60, 2], [2*60, "Break"], [15*60, 3]],
        '2 x 7 min + 2 min breaks': [[7*60, 0], [2*60, "Break"], [7*60, 1]],
        '3 x 7 min + 2 min breaks': [[7*60, 0], [2*60, "Break"], [7*60, 1], [2*60, "Break"], [7*60, 2]],
        '4 x 7 min + 2 min breaks': [[7*60, 0], [2*60, "Break"], [7*60, 1], [2*60, "Break"], [7*60, 2], [2*60, "Break"], [7*60, 3]],
        '5 x 7 min + 2 min breaks': [[7*60, 0], [2*60, "Break"], [7*60, 1], [2*60, "Break"], [7*60, 2], [2*60, "Break"], [7*60, 3], [2*60, "Break"], [7*60, 4]],
    },
    programs: {
        'Exercises' : ['Exercise 1', 'Exercise 2', 'Exercise 3', 'Exercise 4', 'Exercise 5', 'Exercise 6', 'Exercise 7'],
    },
    suitable: {
        '2 x 15 min + 2 min breaks': ['Exercises'],
        '3 x 15 min + 2 min breaks': ['Exercises'],
        '4 x 15 min + 2 min breaks': ['Exercises'],
        '2 x 7 min + 2 min breaks': ['Exercises'],
        '3 x 7 min + 2 min breaks': ['Exercises'],
        '4 x 7 min + 2 min breaks': ['Exercises'],
        '5 x 7 min + 2 min breaks': ['Exercises'],
    },
    sounds: {
        '.*' : {0: 'whistle', '-1': 'buzzer'}
    }
};
