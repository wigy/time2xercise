DATA.Rugby = {

    schedules: {
        "Beginner's Course": [[5*60, 0], [13*60, 1], [2*60, "Break"], [13*60, 2], [2*60, "Break"], [13*60, 3], [2*60, "Break"], [20*60, 4], [3*60, "Break"], [20*60, 5]],
        "XV Match": [[40*60, 0, {start_on_pause: true, reverse_count: true}], [10*60, "Half-time", {is_break: true}], [40*60, 1, {start_on_pause: true, reverse_count: true}]],
    },
    programs: {
        'Day 1': ['R1', 'H1', 'T1', 'T2', 'G1', 'G1'],
        'Day 2': ['R2', 'H3', 'K1', 'P1', 'G2', 'G2'],
        'Day 3': ['R3', 'H4', 'K2', 'P2', 'G3', 'G3'],
        'Day 4': ['R4', 'H2', 'P3', 'H5', 'G3', 'G3'],
        'Day 5': ['R5', 'H6', 'P4', 'T3', 'G3', 'G4'],
        'Match': [{match: true}, '1st Half', '2nd Half'],
    },
    suitable: {
        "Beginner's Course": ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
        "XV Match": ['Match'],
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
        H6: 'Handling 6',
        T1: 'Tactical 1',
        T2: 'Tactical 2',
        T3: 'Tactical 3',
        K1: 'Kicking 1',
        K2: 'Kicking 2',
        P1: 'Physical 1',
        P2: 'Physical 2',
        P3: 'Physical 3',
        P4: 'Physical 4',
        G1: 'Game 1',
        G2: 'Game 2',
        G3: 'Game 3',
        G4: 'Game 4',
    },
    info: {
        "Day 1": "Introduction and getting into basics of the game.",
        "Day 2": "Continue basics including kicking game and line-out.",
        "Day 3": "Get familiar with offsides and scrums.",
        "Day 4": "Introduce tackling and ruck.",
        "Day 5": "Complete the rugby studies by applying all the knowledge.",

        R1 : '<h4>Introduction and Basics of the Game</h4>' +
        '<ul>' +
        '<li>Introduction: trainer, mission, daily program' +
        '<li>Rugby: history, active areas, current local development, spirit of rugby' +
        '<li>Rules variants: 15-players, 7-players, touch rugby' +
        '<li>Time: durations of games, "the last play"' +
        '<li>Mode of play: kick-off, carrying, passing, kicking' +
        '<li>Scoring: try, penalty try, conversion goal, penalty goal, dropped goal' +
        '<li>Knock-on and throw forward: knock-on, throw forward, charge down, bounce forward' +
        '<li>Ball on the ground: player can play only when on their feet, when on the ground: get up, pass or release.' +
        '<li>Advantage.' +
        '</ul>',
        R2 : '<h4>Kicking and Touch</h4>' +
        '<ul>' +
        '<li>Playing field: playing area, goal line, in-goal area, 22-line, 10-line, 5 meter marks.' +
        '<li>Kick-off: kick-off and player positioning, kick into touch, kick into in-goal, drop-out and player positioning.' +
        '<li>Kicking and off-side.' +
        '<li>Penalty and free-kick: punt or drop kick or place, kick at goal, scrum or lineout alternative, kicker\'s team behind the ball and opponent 10m, charging after kicker moves' +
        '<li>Touch: carried to touch by stepping in the line or beyond, kicking directly into touch, gain in ground, penalty always gains in ground, free kick does not gain in ground, quick throw in.' +
        '<li>Lineout: thrower decides number of participants, participating players betwen 5m and 15m with 1m gap, optional receiver 2m behind own line, non-throwing hooker 2m behind and 2m from 5m line toward touch line, others 10m behind line of touch,' +
        ' not allowed: levering or holding or shoving or charging or blocking, lifting allowed after ball is thrown.' +
        '</ul>',
        R3 : '<h4>Offside and Scrum</h4>' +
        '<ul>' +
        '<li>Offside: offside in general play, being put onside by team-mate, being put onside by opponents, sanctions.' +
        '<li>Scrum: 5m from in-goal and touchline, 3 or 8 players, "crouch": lean forward, "bind": loose-head prop on the left puts left hand inside to grip jersey,' +
        ' "set": may start pushing (no charging), stationary until ball thrown in to the tunnel by the mark of referee, must touch ground before entering the tunnel and must not come out from either end of tunnel, restart or penalty kick on collapse or lifting in the air' +
        ' wheeling 90 degrees, ends when ball comes out (not from tunnel) or hindmost player picks the ball, offside line for scrum-halves is the ball and 5m behind the hindmost foot for others.' +
        '</ul>',
        R4 : '<h4>Tackle and In-Goal</h4>' +
        '<ul>' +
        '<li>Tackle: dangerous tackle, cannot tackle if team member bound to, brought to ground means a knee on the ground or sitting on the ground or on the player on the ground, tackled player must pass or release, tackler must release and not play the ball until getting up, can reach try on momentum.' +
        '<li>In-Goal: both defender and attacker can ground the ball, picking up is not grounding, penalty try always considered between goal posts,' +
        ' holding the ball up prevents try and awards scrum for attacker, dead ball or grounding by defender awards drop-out restart on 22m.' +
        '</ul>',
        R5 : '<h4>Maul and Ruck</h4>' +
        '<ul>' +
        '<li>Maul: when a team mate and opponent binds into ball carrier all on their feet, no intentional collapsing, offside line hindmost foot, join only behind, scrum ordered in 5 seconds if not moving.' +
        '<li>Ruck: one or more players in contact clost to the ball on the ground, join by binding properly opponent or team member, players in ruck can use only feet to gain ball, can use hands after tackle before ruck has formed if on feet,' +
        ' offside line is the hindmost foot of the same team player, ends succesfully when ball leaves ruck, unsuccessfully if ball becomes unplayeble it implies a scrum for the team that was moving forward or attcking, when clearly won referee yells "use it".' +
        '<li>Mark: in-goal or behind 22-line or foot at 22-line, must make clean catch and yell "mark", free kick rules apply.' +
        '</ul>',

        H1 : '<h4>Passing Essentials</h4><ol>' +
        'In groups of 3-4 players each:' +
        '<li>Form a line and pass sideways with two hands. Rotate positions and/or turn around.' +
        '<li>Increase distance.' +
        '<li>Lines can walk from one end to another in playing field. Rotate on the turning point.' +
        '<li>Increase the speed.' +
        '</ol>',
        H2 : '<h4>Passing around the Corner</h4>' +
        '<img class="img-thumbnail" src="pics/rugby/H2.png">' +
        'In square formation equal number of players in each corner. Two balls in two of the opposite corners.<ol>' +
        '<li>Apporoach from opposite diagonals to the center passing to the left after getting around the opposing player.' +
        '<li>Change side by passing to the right side instead.' +
        '</ol>Increase the speed while progressing closer to the end.',
        H3 : '<h4>Passing in Lines</h4>' +
        '<img class="img-thumbnail" src="pics/rugby/H3.png">' +
        'A square formation with six starting positions.<ol>' +
        '<li>One line at time from each side is passing from one player to the next. Short pass in the end switching to next line.' +
        '<li>Players in lines 1 and 2 do looping, i.e. switch positions and passing goes 1 to 2 to 1 to 3.' +
        '</ol>',
        H4 : '<h4>Tunnel Run</h4>' +
        '<img class="img-thumbnail" src="pics/rugby/H4.png">' +
        'Form a queue for runners and a tunnel of 3 gates formed by players each side so that all players on one side are each holding a ball.<ol>' +
        '<li>A runner runs through the tunnel receiving a ball at each gate and passing it back to the other end of the gate. Turn in the end and repeat the same in reverse direction.' +
        '<li>After all runners have done one round, rotate 2 runners from the front of the queue to the first gate, all gates moving to the next and the last gate moving to the tail of queue.' +
        '</ol>',
        H5 : '<h4>Passing in Line and Behind</h4>' +
        '<img class="img-thumbnail" src="pics/rugby/H5.png"><ol>' +
        '<li>Four lines runs passing from one side to another to the end of square.' +
        '<li>Runners continue running back with one side of square popping the ball back until the last player gets it.' +
        '<li>Last player pops it to the next runner.' +
        '</ol>',
        H6 : '<h4>Two Men Tunnel Run</h4>' +
        '<img class="img-thumbnail" src="pics/rugby/H6.png">' +
        'Form a two queues for runners and a tunnel of 3 gates formed by players each side so that all players on one side are each holding a ball.<ol>' +
        '<li>Runners runs through the tunnel receiving a ball at each gate and passing it to the fellow runner, which in turn passes it back to the other end of the gate. Turn in the end and repeat the same in reverse direction.' +
        '<li>After all runners have done one round, rotate 2 runners from the front of the queue to the first gate, all gates moving to the next and the last gate moving to the tail of queue.' +
        '</ol>',

        T1 : '<h4>Defending against attackers</h4><ol>' +
        '<img class="img-thumbnail" src="pics/rugby/T1-3.png"><img class="img-thumbnail" src="pics/rugby/T1-2.png"><img class="img-thumbnail" src="pics/rugby/T1-1.png">' +
        '<li>1 defender vs. 2 attackers.' +
        '<li>2 defenders vs. 3 attackers.' +
        '<li>3 defenders vs. 4 attackers.' +
        '</ol>',
        T2 : '<h4>Game Formation</h4><ol>' +
        '<li>Distribute all players to teams.' +
        '<li>Explain player positions and numbers in 15-rugby:<ul>' +
        '  <li>Choose one for each team (leave unused numbers if not enough players).' +
        '  <li>Give a shirt or a vest.' +
        '  </ul>' +
        '<li>Essentials of <a target="new" href="http://www.crfu.co.nz/crfuclubs/index.cfm/1,306,0,0,html">Touch rugby</a>: touch, rollball with 5m offside, dummy half, the tap with 10m offside.' +
        '<li>Study tactical attack and defence positioning by walking through the game.' +
        '</ol>',
        T3 : '<h4>Walking into Contact</h4>' +
        'Normal rugby 7-a-side rules except that running anywhere in the field is subject to the penalty kick. Especially attention is paid:<ul>' +
        '<li>Proper positioning of players during a ruck.' +
        '</ul>',

        K1 : '<h4>Kicking and Catching</h4>' +
        'Divide players to loose groups on the opposite sides of the playing fields. Take turnns in kicking and do the single pass to kicker if someone else catches the ball.<ol>' +
        '<li>Kick the ball from hand to other group direction and they catch the ball from the air.' +
        '<li>Switch to Grubber kick.' +
        '</ol>',
        K2 : '<h4>Kicking Zig-Zag</h4>' +
        '<img class="img-thumbnail" src="pics/rugby/K2.png">' +
        '<i>This needs an assistant or two.</i> Divide all players to the zig-zag line and all balls in one end.<ol>' +
        '<li>Players will kick directly the dropped ball from air aiming to give an easy to catch high ball the next player. In the end assistants deliver ball back to the beginning.' +
        '<li>Feed balls faster pace to the first kicker.' +
        '<li>Switch to Grubber kick.' +
        '<li>Feed balls faster pace to the first kicker.' +
        '</ol>',

        P1 : '<h4>Lineouts and Maul</h4>' +
        '<img class="img-thumbnail" src="pics/rugby/P1.png">' +
        'Form groups with two dedicated throwers, 3-5 men in line and 2 receivers.<ol>' +
        '<li>Make a normal thrown in and lines are trying to grap a ball to the receiver, which tosses it to the thrower on the thrower in the other end.' +
        '<li>Optionally: try also lifting.' +
        '</ol>',
        P2 : '<h4>Scrum</h4><ol>' +
        '<li>One-on-one scrum.' +
        '<li>Two-on-two scrum.' +
        '<li>Three-on-three scrum with correct binding.' +
        '<li>Three-on-three scrum with ball tossed in by scrum-half.' +
        '</ol>',
        P3 : '<h4>Tackle</h4>' +
        '<img class="img-thumbnail" src="pics/rugby/P3-2.png">' +
        '<img class="img-thumbnail" src="pics/rugby/P3-1.png"><ol>' +
        '<li>Tackle on walking opponent from kneeling position.' +
        '<li>Walk into tackler stopping the progress (not necessarily bringing to the ground), then offload the ball to the next.' +
        '<li>Tackle slowly approaching carrier, which offers ball to scrum-half passing it to next carrier.' +
        '</ol>',
        P4 : '<h4>Ruck Clearing</h4>' +
        '<img class="img-thumbnail" src="pics/rugby/P4-2.png">' +
        '<img class="img-thumbnail" src="pics/rugby/P4-1.png">' +
        'A line of tacklers with assistant "jackal". Groups of 2-3 players with one ball carrier taken down by the tackler and supported by the rest.' +
        ' Second assistant works as a scrum-half passing the ball from one group to the next.' +
        '<li>Repeat the tackle which after support players pushes the jackal out.' +
        '<li>Change tacklers after every group has been running three times.' +
        '<li>Move more players to "jackal" side and only one support, which parks on the defence position. Opponent tries to move the defense.' +
        '</ol>',

        G1 : '<h4>Touch Rugby</h4>' +
        '<a target="new" href="http://www.crfu.co.nz/crfuclubs/index.cfm/1,306,0,0,html">Basic rules</a> with some variations:<ol>' +
        '<li>Two-hand touch could be required.' +
        '<li>Optionally no limit on number of touches.' +
        '<li>Optionally no change on dropped ball.' +
        '</ol>',
        G2 : '<h4>Touch Rugby with Kicking and Lineouts</h4>' +
        'Same rules than <i>Game 1</i> with the following additions:<ul>' +
        '<li>Game is started with a kick-off (not necessarily dropped kick).' +
        '<li>Line-outs are handled normally (optionally no lifting).' +
        '<li>After the line-out touch does not count until the ball have been passed once or it is carried over the line of touch.' +
        '<li>Optionally mauls can be allowed immediately after the line-out. The touch rules are applied after the maul ends.' +
        '<li>Free kick from knock-on and throw forward and penalty kicks from other violations.' +
        '<li>Kicking a penalty or a free-kick into touch awards the team throw-in.' +
        '</ol>',
        G3 : '<h4>Touch Rugby with Kicking, Lineouts and Scrums</h4>' +
        'Same rules than <i>Game 2</i> with the following additions:<ul>' +
        '<li>Scrums are handled as in 7-a-side rules.' +
        '</ol>',
        G4 : '<h4>Full Contact 7-a-side Rugby</h4>' +
        'Normal rugby 7-a-side rules.',
    },
    sounds: {
        'R\\d+': {},
        '[HKTP]\\d+': {0: 'start'},
        'G\\d+': {0: 'whistle', '-1': 'buzzer'}
    }
};
