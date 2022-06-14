<template>
  <div v-drag="move" class="node-item" :style="nodeStyle">
    {{ props.node.data.label }}
  </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from "vue";

const props = defineProps({
  node: {
    type: Object,
  },
});

const emit = defineEmits(["change"]);
const move = ({ left, top }) => {
  emit("change", props.node.id, { left, top });
};

const nodeStyle = reactive({
  top: props.node.position.y + "px",
  left: props.node.position.x + "px",
  width: props.node.width + "px",
  height: props.node.height + "px",
  backgroundColor: props.node.bgColor,
  border: "1px solid #000",
  borderRadius: "4px",
});
</script>

<style>
.node-item {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move;
  user-select: none;
}
</style>
