(function() {

    function Match(data) {
        this.init(data);
    }

    angular.module('t2x').factory('Match', ['Data', 'TypeObj', 'TypeInt', function(Data, TypeObj, TypeInt) {

        Match.prototype = new Data('t2x', 'Match', [
            {home_team: {type: TypeObj, options: {class: 't2x.Team'}}},
            {home_score: {type: TypeInt, default: 0}},
            {visitor_team: {type: TypeObj, options: {class: 't2x.Team'}}},
            {visitor_score: {type: TypeInt, default: 0}},
        ])

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
