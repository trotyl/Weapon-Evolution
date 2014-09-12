function Shield (defence) {
	this.defence = defence;
}

Shield.none = function() {
    return new Shield(0);
};
