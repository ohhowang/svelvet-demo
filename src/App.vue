<script setup>
import { reactive } from "vue";
import Svelvet from "./components/Svelvet.vue";

const initialNodes = reactive([
  {
    id: 1,
    position: { x: 200, y: 50 },
    data: { label: "Input Node" },
    width: 175,
    height: 40,
    bgColor: "white",
  },
  {
    id: 2,
    position: { x: 10, y: 150 },
    data: { label: "Drag me!" },
    width: 175,
    height: 40,
    bgColor: "white",
  },
  {
    id: 3,
    position: { x: 400, y: 150 },
    data: { label: "Default Node" },
    width: 175,
    height: 40,
    bgColor: "white",
  },
  {
    id: 4,
    position: { x: 220, y: 250 },
    data: { label: "Output Node" },
    width: 175,
    height: 40,
    bgColor: "white",
  },
  {
    id: 5,
    position: { x: 10, y: 350 },
    data: { label: "Output Node" },
    width: 175,
    height: 40,
    bgColor: "white",
  },
  {
    id: 6,
    position: { x: 420, y: 350 },
    data: { label: "Output Node" },
    width: 175,
    height: 40,
    bgColor: "white",
  },
]);

const initialEdges = reactive([
  { id: "e1-2", source: 1, target: 2, label: "edge label" },
  { id: "e1-3", source: 1, target: 3 },
  { id: "e2-5", source: 2, target: 5 },
  { id: "e3-4", source: 3, target: 4 },
  { id: "e3-6", source: 3, target: 6, label: "animated edge" },
  { id: "e4-5", source: 4, target: 5 },
]);

const handleChange = (id, pos) => {
  const node = initialNodes.find((node) => node.id === id);
  node.position = {
    x: pos.left,
    y: pos.top,
  };
};
</script>

<template>
  <div class="wrapper">
    <Svelvet
      @change="handleChange"
      :nodes="initialNodes"
      :edges="initialEdges"
    />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.wrapper {
  width: 700px;
  height: 700px;
  border: 1px solid orangered;
  border-radius: 4px;
  background: radial-gradient(10px, rgb(204, 204, 204), rgb(240, 242, 244) 2px)
    center center/22px 22px repeat;
  overflow: hidden;
}
</style>
