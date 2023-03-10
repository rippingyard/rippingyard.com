export const useDefaultValue = <T>() => {
  return {
    isLoading: ref(true),
    isError: ref(false),
    error: ref(''),
    data: ref<T>(),
    fetchNextPage: () => undefined,
  }
}