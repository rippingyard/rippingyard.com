export const useDefaultValue = <T>() => {
  return {
    isLoading: ref(false),
    isError: ref(false),
    error: ref(''),
    data: ref<T>(),
    hasNextPage: ref(false),
    fetchNextPage: () => undefined,
  }
}