function Team(name) {
    // Name of the team.
    this.name = name;

    // TODO: All functions belongs to the prototype rather.

    this.toString = function() {
        return this.name;
    };
}
