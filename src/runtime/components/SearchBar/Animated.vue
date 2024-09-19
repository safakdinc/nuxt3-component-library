<template>
  <div
    class="search-box"
    ref="search_box"
    :style="{
      '--background': props.background,
      '--background-hover': props.background_hover,
      '--text-color': props.text_color,
      '--search-btn-color': props.search_btn_color,
      '--cancel-btn-color': props.cancel_btn_color,
      '--cancel-btn-hover-color': props.cancel_btn_hover_color,
    }"
  >
    <input
      type="text"
      ref="search_input"
      class="input"
      v-model="inputValue"
      :placeholder="placeholder"
    />
    <div
      class="search-btn flex items-center justify-center"
      @click="searchBoxOpen"
      ref="search_btn"
    >
      <i class="fa-solid fa-search"></i>
    </div>
    <div class="cancel-btn" ref="cancel_btn" @click="searchBoxClose">
      <i class="fa-solid fa-xmark"></i>
    </div>
  </div>
</template>

<script setup>
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
    },
  ],
});
const emits = defineEmits(["handleInput"]);
const props = defineProps({
  placeholder: {
    type: String,
    default: "Type to Search..",
  },
  cancel_btn_color: {
    type: String,
    default: "white",
  },
  cancel_btn_hover_color: {
    type: String,
    default: "#9E9E9E",
  },
  search_btn_color: {
    type: String,
    default: "white",
  },
  background: {
    type: String,
    default: "#191919",
  },
  background_hover: {
    type: String,
    default: "#212121",
  },
  text_color: {
    type: String,
    default: "white",
  },
});

const inputValue = ref("");

const search_btn = ref();
const cancel_btn = ref();
const search_box = ref();
const search_input = ref();

function searchBoxOpen() {
  search_box.value.classList.add("active");
  search_input.value.classList.add("active");
  search_btn.value.classList.add("active");
  cancel_btn.value.classList.add("active");
}
function searchBoxClose() {
  search_box.value.classList.remove("active");
  search_input.value.classList.remove("active");
  search_btn.value.classList.remove("active");
  cancel_btn.value.classList.remove("active");
}
watchEffect(() => {
  emits("handleInput", inputValue.value);
});
</script>

<style lang="scss" scoped>
.input::placeholder {
  color: var(--placeholder-color);
  background-color: var(--background);
}

.search-box {
  --radius: 40px;
  height: var(--radius);
  width: var(--radius);
  position: relative;
  transition: all 0.5s cubic-bezier(0.68, -0.25, 0.265, 1.25);
  &.active {
    width: 300px;
  }
  input {
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    background: var(--background);
    font-size: 16px;
    border-radius: 50px;
    padding: 0 60px 0 20px;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.68, -0.25, 0.265, 1.25);
    &.active {
      opacity: 1;
    }
  }
  .search-btn {
    position: absolute;
    top: 50%;
    right: 0px;
    height: var(--radius);
    z-index: 1;
    width: var(--radius);
    color: var(--search-btn-color);
    background-color: var(--background);
    transform: translateY(-50%);
    line-height: 50px;
    font-size: 20px;
    text-align: center;
    border-radius: var(--radius);
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.68, -0.25, 0.265, 1.25),
      background-color ease-in-out 0.5s, color ease-in-out 0.5s;
    &:hover {
      background-color: var(--background-hover);
    }
    &.active {
      --search-btn-radius: 40px;
      height: var(--search-btn-radius);
      width: var(--search-btn-radius);
      right: 0px;
      color: var(--background);
      background: var(--text-color);
      line-height: 50px;
      font-size: 20px;
      transform: translateY(-50%) rotate(360deg);
      &:hover {
        background-color: var(--background_hover);
        color: var(--text-color);
      }
    }
  }
  .cancel-btn {
    position: absolute;
    top: 50%;
    right: 5%;
    transform: translateY(-50%);
    font-size: 25px;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.68, -0.25, 0.265, 1.25);
    color: var(--cancel-btn-color);
    &:hover {
      color: var(--cancel-btn-hover-color);
    }
    &.active {
      right: -25px;
      transform: translateY(-50%) rotate(360deg);
    }
  }
}

@media only screen and (max-width: 768px) {
  .search-box.active {
    width: 150px;
  }
  .search-box {
    width: 35px;
    height: 35px;
  }
  .search-box .search-btn {
    width: 35px;
    height: 35px;
    font-size: 17px;
  }
  .search-box .search-btn.active {
    --search-btn-radius: 32px;
    font-size: 17px;
  }
}
</style>
