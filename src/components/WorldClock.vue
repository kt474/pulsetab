<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useLocalStorage } from "../composables/useLocalStorage";
import { useClickOutside } from "../composables/useClickOutside";

interface ClockLocation {
  id: string;
  name: string;
  timeZone: string;
}

const isOpen = ref(false);
const showAdd = ref(false);
const searchQuery = ref("");
const worldClockRef = ref<HTMLElement | null>(null);
const currentTime = ref(new Date());
let timer: number;

const selectedLocations = useLocalStorage<ClockLocation[]>("worldClocks", [
  { id: "1", name: "London", timeZone: "Europe/London" },
  { id: "2", name: "New York", timeZone: "America/New_York" },
  { id: "3", name: "Tokyo", timeZone: "Asia/Tokyo" },
]);

const allTimeZones = (Intl as any).supportedValuesOf
  ? (Intl as any).supportedValuesOf("timeZone")
  : [];

const filteredTimeZones = computed(() => {
  if (!searchQuery.value) return [];
  return allTimeZones
    .filter((tz: string) =>
      tz.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .filter(
      (tz: string) =>
        !selectedLocations.value.some((loc) => loc.timeZone === tz)
    );
});

function addLocation(timeZone: string) {
  const name = timeZone.split("/").pop()?.replace(/_/g, " ") || timeZone;
  selectedLocations.value.push({
    id: crypto.randomUUID(),
    name,
    timeZone,
  });
  searchQuery.value = "";
  showAdd.value = false;
}

function removeLocation(id: string) {
  selectedLocations.value = selectedLocations.value.filter(
    (loc) => loc.id !== id
  );
}

onMounted(() => {
  timer = window.setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

useClickOutside(worldClockRef, () => {
  isOpen.value = false;
  showAdd.value = false;
});

function formatTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function getDayLabel(date: Date, timeZone: string) {
  try {
    const localDateStr = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);

    const zonedDateStr = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);

    if (localDateStr === zonedDateStr) return "Today";

    const localD = new Date(localDateStr);
    const zonedD = new Date(zonedDateStr);

    if (zonedD > localD) return "Tomorrow";
    if (zonedD < localD) return "Yesterday";
    return "Today";
  } catch (e) {
    return "Today";
  }
}
</script>

<template>
  <div ref="worldClockRef" class="relative">
    <button
      @click.stop="isOpen = !isOpen"
      class="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-xl border border-white/10 text-white transition-all cursor-pointer duration-200 hover:bg-black/50 hover:scale-110 shadow-lg"
      :class="{ 'bg-black/40': isOpen }"
      title="World Clock"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-5 h-5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </button>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute top-12 right-0 w-72 bg-black/60 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/10 z-50"
      >
        <div class="flex items-center justify-between mb-4">
          <h3
            class="text-white text-xs font-semibold uppercase tracking-wider opacity-60"
          >
            World Clock
          </h3>
          <button
            @click.stop="showAdd = !showAdd"
            class="text-white hover:text-green-400 transition-colors p-1 cursor-pointer rounded-full hover:bg-white/10"
          >
            <svg
              v-if="!showAdd"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Add New Location -->
        <div v-if="showAdd" class="mb-4 space-y-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search city or timezone..."
            class="w-full bg-white/10 border-none rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-white/30 outline-none placeholder:text-white/30"
            autofocus
          />
          <div
            v-if="filteredTimeZones.length > 0"
            class="max-h-40 overflow-y-auto rounded-lg bg-black/40 scrollbar-thin scrollbar-thumb-white/20"
          >
            <div
              v-for="tz in filteredTimeZones.slice(0, 50)"
              :key="tz"
              @click.stop="addLocation(tz)"
              class="px-3 py-2 text-sm text-white/80 hover:bg-white/10 cursor-pointer transition-colors"
            >
              {{ tz.replace(/_/g, " ") }}
            </div>
          </div>
          <div
            v-else-if="searchQuery && filteredTimeZones.length === 0"
            class="text-white/40 text-xs text-center py-2"
          >
            No matching timezones found
          </div>
        </div>

        <!-- Selected Locations List -->
        <div
          class="space-y-4 max-h-80 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20"
        >
          <div
            v-if="selectedLocations.length === 0"
            class="text-white/40 text-center py-4 text-sm"
          >
            No locations added
          </div>
          <div
            v-for="loc in selectedLocations"
            :key="loc.id"
            class="flex items-center justify-between group"
          >
            <div class="flex-1">
              <div class="text-white text-sm font-medium leading-none mb-1">
                {{ loc.name }}
              </div>
              <div class="text-white/40 text-[10px] uppercase tracking-wider">
                {{ getDayLabel(currentTime, loc.timeZone) }}
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="text-white font-semibold tabular-nums text-sm">
                {{ formatTime(currentTime, loc.timeZone) }}
              </div>
              <button
                @click.stop="removeLocation(loc.id)"
                class="opacity-0 cursor-pointer group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-3.5 h-3.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
