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

        'Weight Lifting 10 x 10': [[15, 0, {is_break: true}], [50,10],
                                   [60, 1, {is_break: true}], [50,10],
                                   [60, 2, {is_break: true}], [50,10],
                                   [60, 3, {is_break: true}], [50,10],
                                   [60, 4, {is_break: true}], [50,10],
                                   [60, 5, {is_break: true}], [50,10],
                                   [60, 6, {is_break: true}], [50,10],
                                   [60, 7, {is_break: true}], [50,10],
                                   [60, 8, {is_break: true}], [50,10],
                                   [60, 9, {is_break: true}], [50,10]],
        'Weight Lifting 4 x 10': [[15, 0, {is_break: true}],  [50,10],
                                  [120, 1, {is_break: true}], [50,10],
                                  [120, 2, {is_break: true}], [50,10],
                                  [120, 3, {is_break: true}], [50,10]],
        'Weight Lifting 5 x 5': [[15, 0, {is_break: true}],  [25,11],
                                 [120, 1, {is_break: true}], [25,11],
                                 [120, 2, {is_break: true}], [25,11],
                                 [120, 3, {is_break: true}], [25,11],
                                 [120, 4, {is_break: true}], [25,11]],
    },
    programs: {
        '1 Monday': ['BW-P', 'BW-L', 'BW-PU', 'BW-SJ'],
        '2 Tuesday': ['BW-LSP', 'BW-RSP', 'BW-SQJ', 'BW-B'],
        '3 Wednesday': ['BW-MC', 'BW-LSS', 'BW-RSS', 'BW-EPU', 'BW-OTSR'],
        '4 Thursday': ['BW-PR', 'BW-S', 'BW-B'],
        '5 Friday': ['BW-BR', 'BW-PPU', 'BW-LJ', 'BW-MR'],
        'Generic Session': ['WL-10x10-R1', 'WL-10x10-R2', 'WL-10x10-R3', 'WL-10x10-R4', 'WL-10x10-R5',
                            'WL-10x10-R6', 'WL-10x10-R7', 'WL-10x10-R8', 'WL-10x10-R9', 'WL-10x10-RL',
                            'WL-10x10-DO', 'WL-5x5-DO'],
    },
    suitable: {
        'Body Weight 30:30': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        'Body Weight 35:25': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        'Body Weight 40:20': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        'Body Weight 45:15': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        'Body Weight 50:10': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        'Body Weight 55:05': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        'Body Weight 60:00': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],

        'Weight Lifting 10 x 10': ['Generic Session'],
        'Weight Lifting 4 x 10': ['Generic Session'],
        'Weight Lifting 5 x 5': ['Generic Session'],
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

        'WL-10x10-R1': 'Round 1',
        'WL-10x10-R2': 'Round 2',
        'WL-10x10-R3': 'Round 3',
        'WL-10x10-R4': 'Round 4',
        'WL-10x10-R5': 'Round 5',
        'WL-10x10-R6': 'Round 6',
        'WL-10x10-R7': 'Round 7',
        'WL-10x10-R8': 'Round 8',
        'WL-10x10-R9': 'Round 9',
        'WL-10x10-RL': 'Last Round',
        'WL-10x10-DO': 'Lifting',
        'WL-5x5-DO': 'Lifting',
    },
    info: {
        '1 Monday': 'This is Rugby Fitness Bodyweight Challenge Day 1. <br> See <a target="new" href="http://www.youtube.com/watch?v=mXOy5YYQEoY">http://www.youtube.com/watch?v=mXOy5YYQEoY</a>',
        '2 Tuesday': 'This is Rugby Fitness Bodyweight Challenge Day 2. <br> See <a target="new" href="http://www.youtube.com/watch?v=bQrdB05rN_w">http://www.youtube.com/watch?v=bQrdB05rN_w</a>',
        '3 Wednesday': 'This is Rugby Fitness Bodyweight Challenge Day 3. <br> See <a target="new" href="http://www.youtube.com/watch?v=9tdrDTjp6aY">http://www.youtube.com/watch?v=9tdrDTjp6aY</a>',
        '4 Thursday': 'This is Rugby Fitness Bodyweight Challenge Day 4. <br> See <a target="new" href="http://www.youtube.com/watch?v=b1S--lsQvPU">http://www.youtube.com/watch?v=b1S--lsQvPU</a>',
        '5 Friday': 'This is Rugby Fitness Bodyweight Challenge Day 5. <br> See <a target="new" href="http://www.youtube.com/watch?v=E6WEriUAw-A">http://www.youtube.com/watch?v=E6WEriUAw-A</a>',
        'Weight Lifting 10 x 10': 'In this exercise you do 10 series of 10 repeats. Each repeat takes 5 seconds. Recommended weight is 60% of your maximum performance.',
        'Weight Lifting 4 x 10': 'In this exercise you do 4 series of 10 repeats. Each repeat takes 5 seconds. Recommended weight is 80% of your maximum performance.',
        'Weight Lifting 5 x 5': 'In this exercise you do 5 series of 5 repeats. Each repeat takes 5 seconds. Recommended weight is 85% of your maximum performance.',
    },
    sounds: {
        'BW-.*' : {0: 'start', '-1': 'done'},
        'WL-10x10-R1' : {'-7': '1st-round'},
        'WL-10x10-R2' : {'-7': '2nd-round'},
        'WL-10x10-R3' : {'-7': '3rd-round'},
        'WL-10x10-R4' : {'-7': '4th-round'},
        'WL-10x10-R5' : {'-7': '5th-round'},
        'WL-10x10-R6' : {'-7': '6th-round'},
        'WL-10x10-R7' : {'-7': '7th-round'},
        'WL-10x10-R8' : {'-7': '8th-round'},
        'WL-10x10-R9' : {'-7': '9th-round'},
        'WL-10x10-RL' : {'-7': 'last-round'},
        'WL-10x10-DO' : {0: 'lift', 5: 'lift', 10: 'lift', 15: 'lift', 20: 'lift', 25: 'lift',
                         30: 'lift', 35: '3', 40: '2', 45: '1', '-1': 'relax'},
        'WL-5x5-DO' : {0: '5', 5: '4', 10: '3', 15: '2', 20: '1', '-1': 'relax'},
    }
};
