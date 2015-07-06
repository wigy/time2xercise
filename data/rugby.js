DATA.Rugby = {

    schedules: {
        "Beginner's Course": [[5*60, 0], [15*60, 1], [15*60, 2], [15*60, 3], [2*60, "Break"], [20*60, 4], [3*60, "Break"], [20*60, 5]],
    },
    programs: {
        // TODO: Here we could actually have notation ['R1', 10*60] to override longer time for session R1.
        'Day 1': ['R1', 'H1', 'T1', 'T2', 'G1', 'G1'],
        'Day 2': ['R2', 'H2', 'T3', 'H4', 'G2', 'G2'], // TODO: Plan
        'Day 3': ['R3', 'H3', 'K1', 'P1', 'G3', 'G3'], // TODO: Plan
        'Day 4': ['R4', 'H4', 'K2', 'P2', 'G4', 'G4'], // TODO: Plan
        'Day 5': ['R5', 'P3', 'H5', 'T3', 'G4', 'G5'], // TODO: Plan
    },
    suitable: {
        "Beginner's Course": ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5']
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
        R1 : '<h1>Introduction and Basics of the Game</h1><ol>' +
        '<li>Introduction: trainer, mission, daily program' +
        '<li>Rugby: history, active areas, current local development, spirit of rugby' +
        '<li>Rules variants: 15-players, 7-players, touch rugby' +
        '<li>Mode of play: kick-off, carrying, passing, kicking' +
        '<li>Scoring: try, penalty try, conversion goal, penalty goal, dropped goal' +
        '<li>Knock-on and throw forward: knock-on, throw forward, charge down, bounce forward' +
        '</ol>',
        H1 : '<h1>Passing Essentials</h1><ol>' +
        'In groups of 3-4 players each:' +
        '<li>Form a line and pass sideways with two hands. Rotate positions.' +
        '<li>Lines can walk from one end to another in playing field. Rotate on the turning point.' +
        '<li>Increase the speed.' +
        '</ol>',
        T1 : '<h1>Defending against attackers</h1><ol>' +
        '<img src="pics/rugby/T1-3.png"><img src="pics/rugby/T1-2.png"><img src="pics/rugby/T1-1.png">' +
        '<li>1 defender vs. 2 attackers.' +
        '<li>2 defenders vs. 3 attackers.' +
        '<li>3 defenders vs. 4 attackers.' +
        '</ol>',
        T2 : '<h1>Game Formation</h1><ol>' +
        '<li>Distribute all players to teams.' +
        '<li>Explain player positions and numbers in 15-rugby<ul>' +
        '  <li>choose one for each team (leave unused numbers if not enough players)' +
        '  <li>give a shirt or vest' +
        '  </ul>' +
        '<li>Essentials of <a target="new" href="http://www.crfu.co.nz/crfuclubs/index.cfm/1,306,0,0,html">Touch rugby</a>: touch, rollball with 5m offside, dummy half, the tap with 10m offside' +
        '<li>Study tactical attack and defence positioning by walking through the game' +
        '</ol>',
        G1 : '<h1>Touch Rugby</h1><ol>' +
        '<a target="new" href="http://www.crfu.co.nz/crfuclubs/index.cfm/1,306,0,0,html">Basic rules</a> with some variations:' +
        '<li>Two-hand touch could be required' +
        '<li>Optionally no limit on number of touches' +
        '<li>Optionally no change on dropped ball' +
        '</ol>',

        R2 : '<ul>' +
        '<li>Playing field: playing area, goal line, in-goal area, 22-line, 10-line, 5 meter marks' +
        '<li>Advantage' +
        '<li>Kick-off: kick-off and positioning, kick into touch, kick into in-goal, drop-out and positioning' +
        '<li>Penalty and free-kick:' +
        '<li>Ball on the ground: definition about being on the ground' +
        '</ul>',
        R3 : '<ul>' +
        '<li>Offside: offside in general play, being put onside by team-mate, being put onside by opponents, sanctions' +
        '<li>Touch and lineout:' +
        '<li>Maul:' +
        '<li>Mark:' +
        '</ul>',
        R4 : '<ul>' +
        '<li>Scrum:' +
        '<li>In-Goal:' +
        '</ul>',
        R5 : '<ul>' +
        '<li>Tackle: ' +
        '<li>Ruck: ' +
        '</ul>',

        T3 : '<h1>Walking into Contact</h1>' +
        'Normal rugby 7-a-side rules except that running anywhere in the field is subject to the penalty kick. Especially attention is paid:<ul>' +
        '<li>Proper positioning of players during a ruck' +
        '</ul>',
        G5 : '<h1>Full Contact 7-a-side Rugby</h1><ol>' +
        'Normal rugby 7 rules',
    },
    sounds: {
        'R\\d+': {},
        '[HKTP]\\d+': {0: 'start'},
        'G\\d+': {0: 'whistle', '-1': 'buzzer'}
    }
};
