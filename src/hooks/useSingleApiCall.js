import { useState, useEffect, useRef } from 'react';

export const useSingleApiCall = apiFunction => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);
  const hasCalledApi = useRef(false);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!hasCalledApi.current) {
      hasCalledApi.current = true;
      const fetchData = async () => {
        try {
          const result = await apiFunction();
          if (isMounted.current) {
            setData(result);
            setLoading(false);
          }
        } catch (error) {
          if (isMounted.current) {
            setError(error);
            setLoading(false);
          }
        }
      };
      fetchData();
    }
  }, [apiFunction]);

  return { data, error, loading };
};
