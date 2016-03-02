(function() {

    var Match;

    angular.module('t2x').factory('Match', ['Data', 'TypeObj', 'TypeInt', function(Data, TypeObj, TypeInt) {

        if (Match) {
            return Match;
        }

        Match = function (data) {
            this.init(data);
        };

        Match.prototype = new Data([
            {home_team: new TypeObj({class: 't2x.Team'})},
            {home_score: new TypeInt({default: 0})},
            {visitor_team: new TypeObj({class: 't2x.Team'})},
            {visitor_score: new TypeInt({default: 0})},
        ]);
        Match.prototype.__class = 't2x.Match';

        Match.prototype.getScore = function() {
            return this.home_score + ' - ' + this.visitor_score;
        };

        Match.prototype.addScore = function(home, visitor) {
            if (home) {
                this.home_score += home;
            }
            if (visitor) {
                this.visitor_score += visitor;
            }
        };

        return Match;
    }]);

})();
