(function() {

    function Team(data) {
        this.init(data);
    }

    angular.module('t2x').factory('Team', ['Data', 'TypeStr', function(Data, TypeStr) {

        Team.prototype = new Data('t2x', 'Team', [
            {name: {type: TypeStr}}
        ]);

        Team.prototype.toString = function() {
            return this.name;
        };

        return Team;
    }]);

})();

