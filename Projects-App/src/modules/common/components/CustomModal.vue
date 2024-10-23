<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <div class="border-b border-blue-500">
        <slot name="headerSlot" />
      </div>

      <div class="my-5">
        <slot name="bodySlot" />
      </div>

      <div class="border-t border-t-blue-500 pt-2">
        <slot name="actionsSlot" />
      </div>
    </div>
  </dialog>
</template>

<script lang="ts" setup>
interface Props {
  open?: boolean;
}

withDefaults(defineProps<Props>(), {
  open: false,
});
</script>
