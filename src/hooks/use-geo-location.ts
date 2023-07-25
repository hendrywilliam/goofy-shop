import * as React from "react";

export function useGeoLocation() {
  //make sure browser location is activated.
  //coordinate latitude and longitude are numbers.
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coordinate = position.coords;
        setLatitude(coordinate.latitude);
        setLongitude(coordinate.longitude);
      });
    }
    //cleanup
    return () => {};
  }, []);

  //return object collection of datas, and setter fn
  return { latitude, setLatitude, longitude, setLongitude };
}
