<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from "vue";

// Constants
const WORK_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

// State
const isOpen = ref(false);
const timerState = ref<"idle" | "running" | "paused">("idle");
const timeLeft = ref(WORK_TIME);
const currentMode = ref<"work" | "short-break" | "long-break">("work");

let intervalId: number | null = null;

// Derived
const formattedTime = computed(() => {
  const m = Math.floor(timeLeft.value / 60);
  const s = timeLeft.value % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
});

// Update document title when timer is running
watch(timeLeft, (newValue) => {
  if (timerState.value === "running") {
    document.title = `${formattedTime.value} - Focus`;
  } else if (timerState.value === "idle" && newValue !== WORK_TIME) {
    document.title = "Browser Tab";
  }
});
// Reset title on unmount or idle
watch(timerState, (newState) => {
  if (newState === "idle") {
    document.title = "Browser Tab";
  }
});

function toggleTimer() {
  if (timerState.value === "running") {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  timerState.value = "running";
  intervalId = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      // Timer finished
      pauseTimer();
      timerState.value = "idle";
      // Auto-reset for next session? keeping it simple for now, maybe just stop at 0
      // Actually standard behavior is to stop.
    }
  }, 1000);
}

function pauseTimer() {
  timerState.value = "paused";
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function resetTimer() {
  pauseTimer();
  timerState.value = "idle";
  setMode(currentMode.value);
}

function setMode(mode: "work" | "short-break" | "long-break") {
  currentMode.value = mode;
  pauseTimer();
  timerState.value = "idle";
  switch (mode) {
    case "work":
      timeLeft.value = WORK_TIME;
      break;
    case "short-break":
      timeLeft.value = SHORT_BREAK;
      break;
    case "long-break":
      timeLeft.value = LONG_BREAK;
      break;
  }
}

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
  document.title = "Browser Tab"; // Restore title
});
</script>

<template>
  <div class="relative font-inter">
    <!-- Toggle Button -->
    <button
      @click="isOpen = !isOpen"
      class="relative w-10 h-10 rounded-full bg-black/30 backdrop-blur-lg border-none text-white cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-black/50 hover:scale-105"
      :class="{ 'bg-black/50 ring-2 ring-white/20': isOpen }"
    >
      <span class="text-xl">🎯</span>
      <!-- Mini Timer Badge -->
      <span
        v-if="timerState === 'running' || timerState === 'paused'"
        class="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold bg-black/60 text-white px-1.5 py-0.5 rounded-full whitespace-nowrap"
      >
        {{ formattedTime }}
      </span>
    </button>

    <!-- Timer Panel -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="absolute top-16 right-0 w-72 bg-black/60 backdrop-blur-xl rounded-2xl p-6 shadow-2xl origin-top-right border border-white/10"
      >
        <!-- Mode Toggles -->
        <div
          class="flex justify-center gap-1.5 mb-6 bg-white/10 p-1 rounded-xl"
        >
          <button
            @click="setMode('work')"
            class="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
            :class="
              currentMode === 'work'
                ? 'bg-white/20 text-white shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            "
          >
            Work
          </button>
          <button
            @click="setMode('short-break')"
            class="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
            :class="
              currentMode === 'short-break'
                ? 'bg-white/20 text-white shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            "
          >
            Short Break
          </button>
          <button
            @click="setMode('long-break')"
            class="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
            :class="
              currentMode === 'long-break'
                ? 'bg-white/20 text-white shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            "
          >
            Long Break
          </button>
        </div>

        <!-- Timer Display -->
        <div class="text-center mb-6 relative group">
          <!-- Circular Progress (Simple CSS for now, maybe SVG later if needed) -->
          <div
            class="text-6xl font-mono font-bold tracking-wider drop-shadow-lg tabular-nums"
          >
            {{ formattedTime }}
          </div>
          <div
            class="text-sm text-white/50 mt-1 uppercase tracking-widest font-medium"
          >
            {{
              timerState === "running"
                ? "Focusing"
                : timerState === "paused"
                ? "Paused"
                : "Ready"
            }}
          </div>
        </div>

        <!-- Controls -->
        <div class="flex items-center justify-center gap-4">
          <button
            @click="toggleTimer"
            class="group w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all shadow-lg active:scale-95"
            :class="
              timerState === 'running'
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-white text-black hover:bg-white/90'
            "
          >
            <span v-if="timerState === 'running'">⏸</span>
            <span v-else class="ml-1">▶️</span>
          </button>

          <button
            @click="resetTimer"
            class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center text-lg transition-all active:scale-95"
            title="Reset Timer"
          >
            🔄
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
