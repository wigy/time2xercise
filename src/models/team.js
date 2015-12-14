(function() {

    var module = angular.module('time2xercise');

    module.factory('Team', ['Data', 'TypeStr', function(Data, TypeStr) {

        function Team(data) {
            this.init(data);
        }

        Team.prototype = new Data('time2xercise', 'Team', [
            {name: {type: TypeStr}}
        ]);

        Team.prototype.toString = function() {
            return this.name;
        };

        return Team;
    }]);

})();

