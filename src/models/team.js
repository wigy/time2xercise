(function() {

    var module = angular.module('t2x');

    module.factory('Team', ['Data', 'TypeStr', function(Data, TypeStr) {

        function Team(data) {
            this.init(data);
        }

        Team.prototype = new Data('t2x', 'Team', [
            {name: {type: TypeStr}}
        ]);

        Team.prototype.toString = function() {
            return this.name;
        };

        return Team;
    }]);

})();

