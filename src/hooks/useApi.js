// ============================================================
// XSTN DATA HOOKS
// ============================================================
import { useState, useEffect, useCallback } from "react";
import { api } from "../services/api";

export function useFetch(fetchFn, deps = []) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const execute = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const result = await fetchFn();
      if (result.success) setData(result.data);
      else setError(result.error || "Something went wrong.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => { execute(); }, [execute]);
  return { data, loading, error, refetch: execute };
}

export function useMutation(mutateFn) {
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [success,  setSuccess]  = useState(false);
  const [response, setResponse] = useState(null);

  const mutate = async (payload) => {
    setLoading(true); setError(null); setSuccess(false);
    try {
      const result = await mutateFn(payload);
      if (result.success) { setSuccess(true); setResponse(result); }
      else setError(result.error || "Something went wrong.");
    } catch {
      setError("Network error. Please try again.");
    } finally { setLoading(false); }
  };

  const reset = () => { setError(null); setSuccess(false); setResponse(null); };
  return { mutate, loading, error, success, response, reset };
}

// Data hooks
export const useStats        = () => useFetch(() => api.getStats());
export const useServices     = () => useFetch(() => api.getServices());
export const useProjects     = () => useFetch(() => api.getProjects());
export const useTeam         = () => useFetch(() => api.getTeam());
export const useTestimonials = () => useFetch(() => api.getTestimonials());

// Mutation hooks
export const useContactInquiry  = () => useMutation(api.submitContactInquiry);
export const useDeveloperApp    = () => useMutation(api.submitDeveloperApplication);
export const usePartnerRequest  = () => useMutation(api.submitPartnershipRequest);
