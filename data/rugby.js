DATA.Rugby = {

    schedules: {
        'Two Hours Course': [[5*60, 0], [15*60, 1], [15*60, 2], [15*60, 3], [2*60, "Break"], [20*60, 4], [3*60, "Break"], [20*60, 5]],
    },
    programs: {
        'Day 1': ['R1', 'H1', 'T2', 'T1', 'G1', 'G1'],
        'Day 2': ['R2', 'H2', 'T2', 'H4', 'G2', 'G2'],
        'Day 3': ['R3', 'H3', 'K1', 'P1', 'G3', 'G3'],
        'Day 4': ['R4', 'H4', 'K2', 'P2', 'G3', 'G4'],
        'Day 5': ['R5', 'H5', '-',  'P3', 'G3', 'G5'],
    },
    suitable: {
        'Two Hours Course': ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5']
    },
    codes: {
        R1: 'Rules 1',
        R2: 'Rules 2',
        R3: 'Rules 3',
        R4: 'Rules 4',
        R5: 'Rules 5',
        H1: 'Handling 1',
        H2: 'Handling 2',
        H3: 'Handling 3',
        H4: 'Handling 4',
        H5: 'Handling 5',
        T1: 'Tactical 1',
        T2: 'Tactical 2',
        T3: 'Tactical 3',
        T4: 'Tactical 4',
        T5: 'Tactical 5',
        K1: 'Kicking 1',
        K2: 'Kicking 2',
        K3: 'Kicking 3',
        K4: 'Kicking 4',
        K5: 'Kicking 5',
        P1: 'Physical 1',
        P2: 'Physical 2',
        P3: 'Physical 3',
        P4: 'Physical 4',
        P5: 'Physical 5',
        G1: 'Game 1',
        G2: 'Game 2',
        G3: 'Game 3',
        G4: 'Game 4',
        G5: 'Game 5',
    },
    translations: {
        'fi': {
            R1: 'Säännöt 1',
            R2: 'Säännöt 2',
            R3: 'Säännöt 3',
            R4: 'Säännöt 4',
            R5: 'Säännöt 5',
            H1: 'Käsittely 1',
            H2: 'Käsittely 2',
            H3: 'Käsittely 3',
            H4: 'Käsittely 4',
            H5: 'Käsittely 5',
            T1: 'Taktinen 1',
            T2: 'Taktinen 2',
            T3: 'Taktinen 3',
            T4: 'Taktinen 4',
            T5: 'Taktinen 5',
            K1: 'Potkut 1',
            K2: 'Potkut 2',
            K3: 'Potkut 3',
            K4: 'Potkut 4',
            K5: 'Potkut 5',
            P1: 'Fyysinen 1',
            P2: 'Fyysinen 2',
            P3: 'Fyysinen 3',
            P4: 'Fyysinen 4',
            P5: 'Fyysinen 5',
            G1: 'Peliharjoitus 1',
            G2: 'Peliharjoitus 2',
            G3: 'Peliharjoitus 3',
            G4: 'Peliharjoitus 4',
            G5: 'Peliharjoitus 5',
        }
    },
    // TODO: Localized info?.
    info: {
        R1 : '<ol>' +
        '<li>Introduction: trainer, mission, daily program' +
        '<li>Rules variants: 15-players, 7-players, touch rugby' +
        '<li>Playing field: playing area, goal line, in-goal area, 22-line, 10-line, 5 meter marks' +
        '</ol>',
        R2 : '<ol>' +
        '</ol>',
        R3 : '<ol>' +
        '</ol>',
        R4 : '<ol>' +
        '</ol>',
        R5 : '<ol>' +
        '</ol>',
    },
    sounds: {
        'R\\d+': {},
        '[HKTP]\\d+': {0: 'start'},
        'G\\d+': {0: 'whistle', '-1': 'buzzer'}
    }
};
