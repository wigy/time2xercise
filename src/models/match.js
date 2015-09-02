/**
 * A match book-keeping object.
 */
function Match(home, visitor) {
    // A home team.
    this.home_team = home;
    // A visitor team.
    this.visitor_team = visitor;
    // Home team score.
    this.home_score = 0;
    // Visitor team score.
    this.visitor_score = 0;

    /**
     * Forma the score to the string.
     */
    this.getScore = function() {
        return this.home_score + ' - ' + this.visitor_score;
    };
}
