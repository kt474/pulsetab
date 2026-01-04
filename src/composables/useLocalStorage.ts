import { ref, watch, type Ref } from "vue";

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const stored = localStorage.getItem(key);
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue) as Ref<T>;

  watch(
    data,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    { deep: true }
  );

  return data;
}
