export default {
  install(app, options) {
    app.directive("drag", dragDirective);
  },
};

const dragDirective = {
  mounted(el, binding, vnode, prevVnode) {
    let isDrag = false;
    const prevPos = { x: 0, y: 0 };

    el.addEventListener("mousedown", (event) => {
      isDrag = true;
      prevPos.x = event.clientX;
      prevPos.y = event.clientY;
    });

    document.addEventListener("mousemove", (event) => {
      if (isDrag) {
        const currentMouseX = event.clientX;
        const currentMouseY = event.clientY;
        const moveX = currentMouseX - prevPos.x;
        const moveY = currentMouseY - prevPos.y;

        const left = parseInt(el.style.left || 0) + moveX;
        const top = parseInt(el.style.top || 0) + moveY;

        binding.value({ left, top });
        el.style.left = left + "px";
        el.style.top = top + "px";

        prevPos.x = currentMouseX;
        prevPos.y = currentMouseY;
      }
    });

    document.addEventListener("mouseup", (event) => {
      isDrag = false;
    });
  },
};
