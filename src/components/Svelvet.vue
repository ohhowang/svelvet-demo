<script setup>
import { defineProps, defineEmits } from "vue";
import Node from "./Node.vue";

const props = defineProps({
  nodes: {
    type: Array,
  },
  edges: {
    type: Array,
  },
});
const emit = defineEmits(["change"]);

const sourceNodes = [
  ...new Set(
    props.edges.map((edge) => {
      return edge.source;
    })
  ),
].map((id) => {
  return props.nodes.find((node) => node.id === id);
});

const targetNodes = [
  ...new Set(
    props.edges.map((edge) => {
      return edge.target;
    })
  ),
].map((id) => {
  return props.nodes.find((node) => node.id === id);
});

const sourcePoints = {};
const downPointX = (node) => {
  const {
    position: { x },
    width,
  } = node;
  const left = x + width / 2;
  (sourcePoints[node.id] = {}), (sourcePoints[node.id].x = left);

  return left;
};
const downPointY = (node) => {
  const {
    position: { y },
    height,
  } = node;
  const top = y + height + 2;
  sourcePoints[node.id].y = top;

  return top;
};
const targetPoints = {};
const upPointX = (node) => {
  const {
    position: { x },
    width,
  } = node;
  const left = x + width / 2;
  (targetPoints[node.id] = {}), (targetPoints[node.id].x = left);

  return left;
};
const upPointY = (node) => {
  const {
    position: { y },
  } = node;
  targetPoints[node.id].y = y;

  return y;
};

const drawLine = (edge) => {
  const { source, target } = edge;

  return `M ${sourcePoints[source].x} ${sourcePoints[source].y} C ${
    sourcePoints[source].x
  } ${sourcePoints[source].y + 30} ${targetPoints[target].x} ${
    targetPoints[target].y - 30
  } ${targetPoints[target].x} ${targetPoints[target].y}`;
};

const handleChange = (id, pos) => {
  emit("change", id, pos);
};
</script>

<template>
  <div class="node-wrapper">
    <div class="nodes">
      <Node
        @change="handleChange"
        v-for="node in props.nodes"
        :key="node.id"
        :node="node"
      ></Node>
    </div>
    <svg style="width: 100%; height: 100%">
      <circle
        v-for="node in sourceNodes"
        :cx="downPointX(node)"
        :cy="downPointY(node)"
        r="5"
        stroke="white"
        fill="black"
      ></circle>
      <circle
        v-for="node in targetNodes"
        :cx="upPointX(node)"
        :cy="upPointY(node)"
        r="5"
        stroke="white"
        fill="black"
      ></circle>
      <path
        v-for="edge in edges"
        :d="drawLine(edge)"
        style="stroke-width: 3; stroke: purple; fill: none"
      ></path>
    </svg>
  </div>
</template>

<style>
.node-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.nodes {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
}
</style>
