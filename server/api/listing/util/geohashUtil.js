var geohashUtil = {

     RANGE: 0.014, // Number of degrees (approximates to 1 mile)
    /**
     * Each degree of latitude is approximately 69 miles (111 kilometers) apart.
     *
     * A degree of longitude is widest at the equator at 69.172 miles (111.321) and gradually shrinks
     * to zero at the poles. At 40° north or south the distance between a degree of longitude is 53 miles (85 km).
     */

    //NOTE 0.014 degrees of lat/long is roughly equal to a 1 square mile area

    /**
     * Hashes geocode to a 1 mile hash
     * @param {{lat: number, long: number}} geocode
     * @return {number}
     */
    hashGeocode: function(geocode) {
        return geohashUtil.rangeFloor(geocode.lat, geohashUtil.RANGE).toFixed(3) + ":" +
            geohashUtil.rangeFloor(geocode.long, geohashUtil.RANGE).toFixed(3);
        /*var hash = 0;
        if (key.length == 0) {
            return hash;
        }
        for (var i = 0; i < key.length; i++) {
            var char = key.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;*/
    },

    /**
     * Each block is roughly 1 miles
     * @param {{lat: number, long: number}} geocode
     * @param {number} radius (0 for single block search, 1 for a single block and every block next to it including diagonally, etc)
     * @return {Array.<string>}
     */
    getHashesFromGeocodeInBlockRadius: function(geocode, numberBlockRadius) {
        var geohashes = [];

        for (var i = -numberBlockRadius; i <= numberBlockRadius; i++) {
            for (var j = -numberBlockRadius; j <= numberBlockRadius; j++) {
                var targetGeocode = {
                    lat: (geocode.lat + (geohashUtil.RANGE * i)),
                    long: (geocode.long + (geohashUtil.RANGE * j))
                };
                geohashes.push(geohashUtil.hashGeocode(targetGeocode));
            }
        }

        return geohashes;
    },

    /**
     * @param {number} number
     * @param {number} range
     * @return {number}
     */
    rangeFloor: function(number, range) {
        var divide = number / range;
        var rounded = Math.floor(divide);
        return rounded * range;
    }
};

module.exports = geohashUtil;
