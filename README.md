# Time2Xercise

Pure HTML-based application for timing various workouts and games.
Just load the `index.html` and go!

## Using the Match Timer (for rugby)

1. Click *Options* and fill in both home and visitor team names.
2. Click *Admin*.
3. Select *Subject* as *Rugby* and *Schedule* as *XV Match*.
4. Click *Start Now* and you are switched to the Match Timer screen.

### Controls for the Match Timer

- `P` Start and stop timer.
- `H` Add next numeric key press to home team score.
- `V` Add next numeric key press to visitor team score.
- `0`..`9` Add numeric score (`0` adds 10) to the selected team score.
- `-` Negate next addition, i.e. substract next numeric key press from score.
- `M` Display menu.

## Release History

* v1.13
    - Change now the running system so that it is not always on.
    - Weight lifting schedules 4 x 5 and 4 x 10.
    - Go back to the admin screen after program has finished.
* v1.12
    - Added training for weight lifting 10 times 10 repeats.
    - Weight lifting program 10x10 for Fitness.
    - Allow proper sounds in DEBUG mode.
    - Info texts for schedules.
* v1.11
    - Switch to new build system.
* v1.10
    - Support for calculating score and displaying remaining time in new match timer screen.
    - Keyboard support.
    - New match-mode allowing to display score as well.
    - Counting up instead of down as an option.
    - Options screen for changing home and visitor team names.
* v1.9
    - Implemented new build system able to build compressed application.
    - Show breaks in different color.
* v1.8
    - Fully rewritten CSS using now Bootstrap v3.3.5.
    - New 50:10, 55:05 and 60:00 schedules for fitness.
    - Use less CPU.
    - Code clean up in various places.
    - Loading screen with nice logo.
* v1.7
    - New comprehensive summary table.,
    - Pictures added into descriptions.
    - Complete Rugby Beginner's Course.
* v1.6
    - Basic features implemented with some sample training programs.

## Next Version

### Done

- Remove changelog from the application.

### Not Yet Done

- Move instructions from README to seprate Help-page in the application itself.
- Convert all data models to use dependency injection.

## Future Ideas

- Data modeling using CoA (types, fixed JSON loading, saving to storage).
- Ability to count from N minutes onwards in time display.
- Quit button to reset clock and go admin.
- Back to beginning or to the end buttons.
- Language selector.
- Random shuffle option.
- Clean up index.html to the smaller directives so that there is eventually only one left.
- Deploy in Heroku.
- Template builder, which collects html files and converts them to javascript strings.
- Study how to implement (most of) CSS as Bootstrap theme add-on.
- Proper API-documentation using CoG.
- Proper stopping mechanism and disable starting when running.
