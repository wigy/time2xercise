(function() {

    var module = angular.module('time2xercise');

    module.factory('Match', ['Data', 'TypeObj', 'TypeInt', function(Data, TypeObj, TypeInt) {

        function Match(data) {
            this.init(data);
        }

        Match.prototype = new Data('time2xercise', 'Match', [
            {home_team: {type: TypeObj, options: {class: 'time2xercise.Team'}}},
            {home_score: {type: TypeInt, default: 0}},
            {visitor_team: {type: TypeObj, options: {class: 'time2xercise.Team'}}},
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
