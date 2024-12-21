import { useRef } from "react";
import { useQuery } from "urql";

function useOnceQuery(params) {
  const callOnce = useRef(false);
  const result = useQuery({ ...params,pause:callOnce.current });
  const [res] = result
  callOnce.current = Boolean(res.data);
  return result;
}

export default useOnceQuery;
