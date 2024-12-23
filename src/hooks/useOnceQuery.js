import { useEffect, useRef } from "react";
import { useQuery } from "urql";

function useOnceQuery(params,key) {
  const callOnce = useRef(false);
  const result = useQuery({ pause:callOnce.current,...params });
  const [res,refetch] = result
  useEffect(()=>{
    if (key) {
      refetch();
    }
  },[key])
  console.log("jeeee", key, callOnce.current);
  callOnce.current = Boolean(res.data);
  return result;
}

export default useOnceQuery;
