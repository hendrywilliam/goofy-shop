import * as React from "react";

export const useIsMounted = function () {
  const [mounted, setMounted] = React.useState(false);

  //ensure the component is hydrated/mounted (client side)
  React.useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return mounted;
};
