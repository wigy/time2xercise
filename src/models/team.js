(function() {

    var Team;

    angular.module('t2x').factory('Team', ['Data', 'TypeStr', function(Data, TypeStr) {

        if (Team) {
            return Team;
        }

        Team = function(data) {
            this.init(data);
        };

        Team.prototype = new Data('t2x.Team', [
            {name: {type: TypeStr}}
        ]);

        Team.prototype.toString = function() {
            return this.name;
        };

        return Team;
    }]);

})();

