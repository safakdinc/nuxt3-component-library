<template>
  <div
    class="bg-black h-fit dark:border-[1px] dark:border-gray_border dark:bg-gray_800 rounded-lg
      shadow-lg p-[16px]"
  >
    <div class="flex justify-between space-x-2 py-3 items-center rounded-lg overflow-hidden">
      <button
        type="button"
        class="-my-1.5 flex flex-none items-center justify-center p-1.5"
        @click="toPreviousMonth"
      >
        <span class="sr-only">Previous month</span>
        <i class="fa fa-chevron-left icon"></i>
      </button>
      <Transition name="slide-left" mode="default">
        <div :key="currentMonth" class="flex items-center justify-center gap-[8px]">
          <Popover arrow-color="black" arrowBorderColor="#212121">
            <template #trigger>
              <div class="flex gap-[8px]">
                <div>{{ currentMonth }}</div>
                <div>{{ currentYear }}</div>
              </div>
            </template>
            <Glass
              class="w-52 rounded-lg bg-black border border-[#212121] flex flex-col gap-[8px]
                items-center p-[8px]"
            >
              <span
                contenteditable
                type="number"
                @input="changeYear"
                class="text-white rounded bg-transparent flex"
                >{{ currentYear }}</span
              >
              <div class="w-full grid grid-cols-3 gap-[8px]">
                <div></div>
              </div>
            </Glass>
          </Popover>
        </div>
      </Transition>
      <button
        type="button"
        class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-white"
        @click="toNextMonth"
      >
        <i class="fa fa-chevron-right icon"></i>
      </button>
    </div>
    <div class="mt-2 grid grid-cols-7 text-center text-sm">
      <div v-for="day in localizedDayNames" class="days">
        {{ day }}
      </div>
    </div>
    <div class="mt-2 grid grid-cols-7 text-sm font-inter">
      <button
        v-for="(day, index) in days"
        :key="`day-${index}`"
        type="button"
        class="mx-auto flex h-8 w-8 items-center justify-center rounded-lg button"
        @click="currentDate = day.date"
        :class="{
          'bg-blue_400 justify-center rounded-lg': day.isCurrent,
          'cursor-not-allowed opacity-50': !day.isCurrentMonth,
        }"
        :disabled="!day.isCurrentMonth"
      >
        <time
          :class="{
            'text-number_calendar': !day.isCurrentMonth,
            'text-gray_800 dark:text-white': day.isCurrentMonth,
          }"
        >
          {{ format(day.date, "d", { locale: trLocale }) }}
        </time>
      </button>
    </div>
  </div>
</template>

<script setup>
import {
  subDays,
  addDays,
  eachDayOfInterval,
  format,
  startOfMonth,
  compareAsc,
  startOfDay,
  addMonths,
  subMonths,
  getDay,
  setYear,
} from "date-fns";
import { computed, ref, watch } from "vue";
import { tr as trLocale } from "date-fns/locale";

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
    },
  ],
});

const today = new Date();

const localizedDayNames = getLocalizedDayNames(today, trLocale);

function getLocalizedDayNames(date, locale) {
  const weekdays = [];
  // Adjust the start date to the Monday of the current week
  const startDate = new Date(date);
  const dayOfWeek = startDate.getDay(); // 0 (Sunday) to 6 (Saturday)
  const diff = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // Adjust to get Monday
  startDate.setDate(startDate.getDate() + diff);

  // Loop through each day of the week starting from Monday
  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startDate);
    currentDay.setDate(startDate.getDate() + i);
    const day = format(currentDay, "EEEE", { locale });
    weekdays.push(getFirstTwoLetters(day));
  }

  return weekdays;
}

const currentMonth = computed(() => {
  return format(currentDate.value, "MMMM", { locale: trLocale });
});

function getFirstTwoLetters(word) {
  if (word.length < 2) {
    return word;
  }
  return word.slice(0, 2);
}

const currentDate = ref(startOfDay(new Date()));
const currentYear = ref(currentDate.value.getFullYear());

watch(currentYear, (newYear) => {
  currentDate.value = setYear(currentDate.value, newYear);
});

const days = computed(() => {
  const monthStart = startOfMonth(currentDate.value);
  const dayNumInWeek = getDay(monthStart);

  const calendarStart = subDays(monthStart, dayNumInWeek !== 0 ? dayNumInWeek - 1 : 6);

  return eachDayOfInterval({
    start: calendarStart,
    end: addDays(calendarStart, 41),
  }).map((date) => {
    return {
      isCurrent: compareAsc(currentDate.value, date) === 0,
      isCurrentMonth: date.getMonth() === currentDate.value.getMonth(),
      date: date,
    };
  });
});

function toNextMonth() {
  currentDate.value = addMonths(startOfMonth(currentDate.value), 1);
  currentYear.value = currentDate.value.getFullYear();
}

function toPreviousMonth() {
  currentDate.value = subMonths(startOfMonth(currentDate.value), 1);
  currentYear.value = currentDate.value.getFullYear();
}

function changeYear() {
  currentDate.value = setYear(currentDate.value, currentYear.value);
}
</script>
<style lang="scss" scoped>
.button {
  transition: all 0.2s ease-in;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
}
.icon {
  transition: all 0.2s ease;
  &:hover {
    color: rgb(173, 173, 173);
  }
}

.days {
  color: rgb(165, 165, 165);
  font-weight: 700;
}

span:focus {
  outline: none;
}

span::-webkit-inner-spin-button,
span::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-enter-to {
  transform: translateX(0);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}
.slide-left-leave-from {
  transform: translateX(0);
}
</style>
