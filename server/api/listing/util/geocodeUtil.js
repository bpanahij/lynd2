var geocodeUtil = {

    /**
     * Hashes geocode to a 1 mile hash
     * @param {{lat: number, long: number}} geocode1
     * @param {{lat: number, long: number}} geocode2
     * @return {string}
     */
    distanceBetweenTwoGeocodes: function(geocode1, geocode2) {
        var lat1 = geocode1.lat;
        var lat2 = geocode2.lat;
        var lon1 = geocode1.long;
        var lon2 = geocode2.long;

        var R = 3959; // miles
        var dLat = geocodeUtil.toRad(lat2-lat1);
        var dLon = geocodeUtil.toRad(lon2-lon1);
        var radLat1 = geocodeUtil.toRad(lat1);
        var radLat2 = geocodeUtil.toRad(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(radLat1) * Math.cos(radLat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d;
    },

    toRad: function(number) {
        return number * Math.PI / 180;
    }
};

module.exports = geocodeUtil;


