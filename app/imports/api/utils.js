function validBounds(bounds) {
  /*
    Return true/false on lat/lng min/max values

    Args:
    - bounds: an objects with lat/lng min/max fields:
        * bounds = {
                    lat:{min:<>, max:<>},
                    lng:{min:<>, max:<>}
                  }
  */
  const {lat,lng} = {...bounds};
  const checkLat = (val) => {return (-90 <= val && val <= +90)}
  const checkLon = (val) => {return (-180 <= val && val <= +180)}
  if (!(checkLat(lat.min) &&
        checkLat(lat.max) &&
        checkLon(lng.min) &&
        checkLon(lng.max))
      ){return false}
  return (lat.min < lat.max && lng.min < lng.max);
}

function capitalize(string, what) {
  /*
    Return a lower-/upper-/title-case version or 'string'

    Args:
    - 'string': a string
    - 'what': a number, can have three values {-1,0,1}:
        * '-1': nothing (lower-case),
        * '0': just the first character (title),
        * '1': whole string (upper-case)
  */
  what = what || 0;
  if (what == -1) {
    return string.toLowerCase();
  }
  if (what == 1) {
    return string.toUpperCase();
  }
  return string.charAt(0) + string.slice(1);
}

function stringify(obj, indent) {
  return JSON.stringify(obj, null, indent)
}

export {stringify, capitalize, validBounds};
