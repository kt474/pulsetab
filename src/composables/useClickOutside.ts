import { onMounted, onUnmounted, type Ref } from "vue";

export function useClickOutside(
  target: Ref<HTMLElement | null>,
  callback: () => void
) {
  function handleClick(event: MouseEvent) {
    if (target.value) {
      const path = event.composedPath();
      if (!path.includes(target.value)) {
        callback();
      }
    }
  }

  onMounted(() => {
    document.addEventListener("click", handleClick);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleClick);
  });
}
