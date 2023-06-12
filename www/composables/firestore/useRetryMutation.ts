import { MutationFunction, useMutation } from '@tanstack/vue-query';
import { isClient } from '@vueuse/core';

const retryCount = 3;
const retryDelay = 1000;

export const useRetryMutation = <TData, TVariables>(
  mutationFn: MutationFunction<TData, TVariables>
) => {
  if (!isClient) return null;
  return useMutation(mutationFn, {
    retry: (failureCount: number) => failureCount <= retryCount,
    retryDelay,
  });
}
