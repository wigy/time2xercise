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
     * Format the score to the string.
     */
    this.getScore = function() {
        return this.home_score + ' - ' + this.visitor_score;
    };

    /**
     * Add to the score of the both teams.
     */
    this.addScore = function(home, visitor) {
        if (home) {
            this.home_score += home;
        }
        if (visitor) {
            this.visitor_score += visitor;
        }
    };
}
