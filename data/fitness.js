DATA.Fitness = {

    schedules: {
        'Body Weight 30:30': [[30, 0], [30, "Break"], [30, 1], [30, "Break"], [30, 2], [30, "Break"], [30, 3], [30, "Break"], [30, 4], [60, "Break"],
                  [30, 0], [30, "Break"], [30, 1], [30, "Break"], [30, 2], [30, "Break"], [30, 3], [30, "Break"], [30, 4], [60, "Break"],
                  [30, 0], [30, "Break"], [30, 1], [30, "Break"], [30, 2], [30, "Break"], [30, 3], [30, "Break"], [30, 4]],
        'Body Weight 35:25': [[35, 0], [25, "Break"], [35, 1], [25, "Break"], [35, 2], [25, "Break"], [35, 3], [25, "Break"], [35, 4], [60, "Break"],
                  [35, 0], [25, "Break"], [35, 1], [25, "Break"], [35, 2], [25, "Break"], [35, 3], [25, "Break"], [35, 4], [60, "Break"],
                  [35, 0], [25, "Break"], [35, 1], [25, "Break"], [35, 2], [25, "Break"], [35, 3], [25, "Break"], [35, 4]],
        'Body Weight 40:20': [[40, 0], [20, "Break"], [40, 1], [20, "Break"], [40, 2], [20, "Break"], [40, 3], [20, "Break"], [40, 4], [60, "Break"],
                  [40, 0], [20, "Break"], [40, 1], [20, "Break"], [40, 2], [20, "Break"], [40, 3], [20, "Break"], [40, 4], [60, "Break"],
                  [40, 0], [20, "Break"], [40, 1], [20, "Break"], [40, 2], [20, "Break"], [40, 3], [20, "Break"], [40, 4]],
        'Body Weight 45:15': [[45, 0], [15, "Break"], [45, 1], [15, "Break"], [45, 2], [15, "Break"], [45, 3], [15, "Break"], [45, 4], [60, "Break"],
                  [45, 0], [15, "Break"], [45, 1], [15, "Break"], [45, 2], [15, "Break"], [45, 3], [15, "Break"], [45, 4], [60, "Break"],
                  [45, 0], [15, "Break"], [45, 1], [15, "Break"], [45, 2], [15, "Break"], [45, 3], [15, "Break"], [45, 4]],
        'Body Weight 50:10': [[50, 0], [10, "Break"], [50, 1], [10, "Break"], [50, 2], [10, "Break"], [50, 3], [10, "Break"], [50, 4], [60, "Break"],
                  [50, 0], [10, "Break"], [50, 1], [10, "Break"], [50, 2], [10, "Break"], [50, 3], [10, "Break"], [50, 4], [60, "Break"],
                  [50, 0], [10, "Break"], [50, 1], [10, "Break"], [50, 2], [10, "Break"], [50, 3], [10, "Break"], [50, 4]],
        'Body Weight 55:05': [[55, 0], [5, "Break"], [55, 1], [5, "Break"], [55, 2], [5, "Break"], [55, 3], [5, "Break"], [55, 4], [60, "Break"],
                  [55, 0], [5, "Break"], [55, 1], [5, "Break"], [55, 2], [5, "Break"], [55, 3], [5, "Break"], [55, 4], [60, "Break"],
                  [55, 0], [5, "Break"], [55, 1], [5, "Break"], [55, 2], [5, "Break"], [55, 3], [5, "Break"], [55, 4]],
        'Body Weight 60:00': [[60, 0], [60, 1], [60, 2], [60, 3], [50, 4], [60, "Break"],
                  [60, 0], [60, 1], [60, 2], [60, 3], [50, 4], [60, "Break"],
                  [60, 0], [60, 1], [60, 2], [60, 3], [50, 4]],

        'Weight Lift 10 x 10': [[15, 1, {is_break: true}], [50,0],
                                [60, 2, {is_break: true}], [50,0],
                                [60, 3, {is_break: true}], [50,0],
                                [60, 4, {is_break: true}], [50,0],
                                [60, 5, {is_break: true}], [50,0],
                                [60, 6, {is_break: true}], [50,0],
                                [60, 7, {is_break: true}], [50,0],
                                [60, 8, {is_break: true}], [50,0],
                                [60, 9, {is_break: true}], [50,0],
                                [60, 10, {is_break: true}], [50,0],
                               ]
    },
    programs: {
        '1 Monday': ['BW-P', 'BW-L', 'BW-PU', 'BW-SJ'],
        '2 Tuesday': ['LSP', 'RSP', 'SQJ', 'B'],
        '3 Wednesday': ['BW-MC', 'BW-LSS', 'BW-RSS', 'BW-EPU', 'BW-OTSR'],
        '4 Thursday': ['BW-PR', 'BW-S', 'BW-B'],
        '5 Friday': ['BW-BR', 'BW-PPU', 'BW-LJ', 'BW-MR'],
        'Session 1/Exercise 1': ['WL-DO', 'WL-R1', 'WL-R2', 'WL-R3', 'WL-R4', 'WL-R5', 'WL-R6', 'WL-R7', 'WL-R8', 'WL-R9', 'WL-RL'],
    },
    suitable: {
        'Body Weight 30:30': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        'Body Weight 35:25': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        'Body Weight 40:20': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        'Body Weight 45:15': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        'Body Weight 50:10': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        'Body Weight 55:05': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        'Body Weight 60:00': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],

        'Weight Lift 10 x 10': ['Session 1/Exercise 1'],
    },
    codes: {
        'BW-P': 'Plank',
        'BW-L': 'Lunge',
        'BW-PU': 'Push Up',
        'BW-SJ': 'Star Jump',
        'BW-LSP': 'Left Side Plank',
        'BW-RSP': 'Right Side Plank',
        'BW-SQJ': 'Squat Jump',
        'BW-B': 'Burpee',
        'BW-MC': 'Mountain Climber',
        'BW-LSS': 'Left Split Squat',
        'BW-RSS': 'Right Split Squat',
        'BW-EPU': 'Elevated Push Up',
        'BW-OTSR': 'On The Spot Run',
        'BW-PR': 'Plank Reach',
        'BW-S': 'Squat',
        'BW-BR': 'Body Rock',
        'BW-PPU': 'Pike Push Up',
        'BW-LJ': 'Lunge Jump',
        'BW-MR': 'Mountain Run',

        'WL-R1': 'Round 1',
        'WL-R2': 'Round 2',
        'WL-R3': 'Round 3',
        'WL-R4': 'Round 4',
        'WL-R5': 'Round 5',
        'WL-R6': 'Round 6',
        'WL-R7': 'Round 7',
        'WL-R8': 'Round 8',
        'WL-R9': 'Round 9',
        'WL-RL': 'Last Round',
        'WL-DO': 'Lifting',
    },
    info: {
        '1 Monday': 'This is Rugby Fitness Bodyweight Challenge Day 1. <br> See <a target="new" href="http://www.youtube.com/watch?v=mXOy5YYQEoY">http://www.youtube.com/watch?v=mXOy5YYQEoY</a>',
        '2 Tuesday': 'This is Rugby Fitness Bodyweight Challenge Day 2. <br> See <a target="new" href="http://www.youtube.com/watch?v=bQrdB05rN_w">http://www.youtube.com/watch?v=bQrdB05rN_w</a>',
        '3 Wednesday': 'This is Rugby Fitness Bodyweight Challenge Day 3. <br> See <a target="new" href="http://www.youtube.com/watch?v=9tdrDTjp6aY">http://www.youtube.com/watch?v=9tdrDTjp6aY</a>',
        '4 Thursday': 'This is Rugby Fitness Bodyweight Challenge Day 4. <br> See <a target="new" href="http://www.youtube.com/watch?v=b1S--lsQvPU">http://www.youtube.com/watch?v=b1S--lsQvPU</a>',
        '5 Friday': 'This is Rugby Fitness Bodyweight Challenge Day 5. <br> See <a target="new" href="http://www.youtube.com/watch?v=E6WEriUAw-A">http://www.youtube.com/watch?v=E6WEriUAw-A</a>',
    },
    sounds: {
        'BW-.*' : {0: 'start', '-1': 'done'},
        'WL-R1' : {'-7': '1st-round'},
        'WL-R2' : {'-7': '2nd-round'},
        'WL-R3' : {'-7': '3rd-round'},
        'WL-R4' : {'-7': '4th-round'},
        'WL-R5' : {'-7': '5th-round'},
        'WL-R6' : {'-7': '6th-round'},
        'WL-R7' : {'-7': '7th-round'},
        'WL-R8' : {'-7': '8th-round'},
        'WL-R9' : {'-7': '9th-round'},
        'WL-RL' : {'-7': 'last-round'},
        'WL-DO' : {0: 'lift', 5: 'lift', 10: 'lift', 15: 'lift', 20: 'lift', 25: 'lift', 30: 'lift', 35: '3', 40: '2', 45: '1', '-1': 'relax'},
    }
};
