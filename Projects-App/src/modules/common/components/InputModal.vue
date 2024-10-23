<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-lg font-bold">{{ title }}</h3>
      <p class="py-4" v-if="subtitle">{{ subtitle }}</p>

      <div class="modal-action flex flex-col">
        <form method="dialog" @submit.prevent="submitValue">
          <input
            ref="inputRef"
            type="text"
            class="input input-bordered input-primary w-full flex-1"
            :placeholder="placeholder ?? 'Project name'"
            v-model="inputValue"
          />
          <div class="flex justify-end mt-5">
            <button class="btn mr-4" @click="closeModal">Close</button>
            <button class="btn btn-primary" type="submit">Accept</button>
          </div>
        </form>
      </div>
    </div>
  </dialog>

  <div
    v-if="open"
    class="modal-backgrop fixed top-5 left-0 z-10 bg-black opacity-50 w-screen h-screen"
  ></div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

interface Props {
  open: boolean;
  title: string;
  subtitle?: string;
  placeholder?: string;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  close: [void];
  value: [text: string];
}>();

const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

watch(props, ({ open }) => {
  if (open) inputRef.value?.focus();
});

const submitValue = () => {
  if (!inputValue.value) {
    inputRef.value?.focus();
    return;
  }

  emits('value', inputValue.value.trim());
  emits('close');

  inputValue.value = '';
};

const closeModal = () => {
  emits('close');
};
</script>
