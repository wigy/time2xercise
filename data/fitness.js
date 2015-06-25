DATA.Fitness = {

    schedules: {
        '30:30': [[30, 0], [30, "Break"], [30, 1], [30, "Break"], [30, 2], [30, "Break"], [30, 3], [30, "Break"], [30, 4], [60, "Break"],
                  [30, 0], [30, "Break"], [30, 1], [30, "Break"], [30, 2], [30, "Break"], [30, 3], [30, "Break"], [30, 4], [60, "Break"],
                  [30, 0], [30, "Break"], [30, 1], [30, "Break"], [30, 2], [30, "Break"], [30, 3], [30, "Break"], [30, 4]],
        '35:25': [[35, 0], [25, "Break"], [35, 1], [25, "Break"], [35, 2], [25, "Break"], [35, 3], [25, "Break"], [35, 4], [60, "Break"],
                  [35, 0], [25, "Break"], [35, 1], [25, "Break"], [35, 2], [25, "Break"], [35, 3], [25, "Break"], [35, 4], [60, "Break"],
                  [35, 0], [25, "Break"], [35, 1], [25, "Break"], [35, 2], [25, "Break"], [35, 3], [25, "Break"], [35, 4]],
        '40:20': [[40, 0], [20, "Break"], [40, 1], [20, "Break"], [40, 2], [20, "Break"], [40, 3], [20, "Break"], [40, 4], [60, "Break"],
                  [40, 0], [20, "Break"], [40, 1], [20, "Break"], [40, 2], [20, "Break"], [40, 3], [20, "Break"], [40, 4], [60, "Break"],
                  [40, 0], [20, "Break"], [40, 1], [20, "Break"], [40, 2], [20, "Break"], [40, 3], [20, "Break"], [40, 4]],
        '45:15': [[45, 0], [15, "Break"], [45, 1], [15, "Break"], [45, 2], [15, "Break"], [45, 3], [15, "Break"], [45, 4], [60, "Break"],
                  [45, 0], [15, "Break"], [45, 1], [15, "Break"], [45, 2], [15, "Break"], [45, 3], [15, "Break"], [45, 4], [60, "Break"],
                  [45, 0], [15, "Break"], [45, 1], [15, "Break"], [45, 2], [15, "Break"], [45, 3], [15, "Break"], [45, 4]]
    },
    programs: {
        '1 Monday': ['P', 'L', 'PU', 'SJ'],
        '2 Tuesday': ['LSP', 'RSP', 'SQJ', 'B'],
        '3 Wednesday': ['MC', 'LSS', 'RSS', 'EPU', 'OTSR'],
        '4 Thursday': ['PR', 'S', 'B'],
        '5 Friday': ['BR', 'PPU', 'LJ', 'MR'],
    },
    suitable: {
        '30:30': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        '35:25': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        '40:20': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday'],
        '45:15': ['1 Monday', '2 Tuesday', '3 Wednesday', '4 Thursday', '5 Friday']
    },
    codes: {
        'P': 'Plank',
        'L': 'Lunge',
        'PU': 'Push Up',
        'SJ': 'Star Jump',
        'LSP': 'Left Side Plank',
        'RSP': 'Right Side Plank',
        'SQJ': 'Squat Jump',
        'B': 'Burpee',
        'MC': 'Mountain Climber',
        'LSS': 'Left Split Squat',
        'RSS': 'Right Split Squat',
        'EPU': 'Elevated Push Up',
        'OTSR': 'On The Spot Run',
        'PR': 'Plank Reach',
        'S': 'Squat',
        'BR': 'Body Rock',
        'PPU': 'Pike Push Up',
        'LJ': 'Lunge Jump',
        'MR': 'Mountain Run',
    },
    info: {
        '1 Monday': 'This is Rugby Fitness Bodyweight Challenge Day 1. <br> See <a target="new" href="http://www.youtube.com/watch?v=mXOy5YYQEoY">http://www.youtube.com/watch?v=mXOy5YYQEoY</a>',
        '2 Tuesday': 'This is Rugby Fitness Bodyweight Challenge Day 2. <br> See <a target="new" href="http://www.youtube.com/watch?v=bQrdB05rN_w">http://www.youtube.com/watch?v=bQrdB05rN_w</a>',
        '3 Wednesday': 'This is Rugby Fitness Bodyweight Challenge Day 3. <br> See <a target="new" href="http://www.youtube.com/watch?v=9tdrDTjp6aY">http://www.youtube.com/watch?v=9tdrDTjp6aY</a>',
        '4 Thursday': 'This is Rugby Fitness Bodyweight Challenge Day 4. <br> See <a target="new" href="http://www.youtube.com/watch?v=b1S--lsQvPU">http://www.youtube.com/watch?v=b1S--lsQvPU</a>',
        '5 Friday': 'This is Rugby Fitness Bodyweight Challenge Day 5. <br> See <a target="new" href="http://www.youtube.com/watch?v=E6WEriUAw-A">http://www.youtube.com/watch?v=E6WEriUAw-A</a>',
    },
    sounds: {
        '.*' : {0: 'start', '-1': 'done'}
    }
};
