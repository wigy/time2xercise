(function() {

    var Team;

    angular.module('t2x').factory('Team', ['Data', 'TypeStr', function(Data, TypeStr) {

        if (Team) {
            return Team;
        }

        Team = function(data) {
            this.init(data);
        };

        Team.prototype = new Data([
            {name: {type: TypeStr}}
        ]);
        Team.prototype.__class = 't2x.Team';

        Team.prototype.toString = function() {
            return this.name;
        };

        return Team;
    }]);

})();

