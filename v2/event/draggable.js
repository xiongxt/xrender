let draggingNode;

function mousedown (node) {
    if (node.attr.draggable) {
        draggingNode = node;
        draggingNode.dragging = true;
        draggingNode.lockOffset();
    }
}

function initRenderEvents (render) {
    render.on('mousemove', () => {
        if (draggingNode && draggingNode.dragging) {
            draggingNode._setDraggingPos();
        }
    });

    render.on('mouseup', () => {
        if (draggingNode && draggingNode.dragging) {
            draggingNode.dragging = false;
            draggingNode.unlockOffset();
        }
    });

    render.on('mouseleave', () => {
        if (draggingNode && draggingNode.dragging) {
            draggingNode.dragging = false;
            draggingNode.unlockOffset();
        }
    });
}

export default {
    init (node) {
        if (node.attr.draggable) {
            node.on('mousedown', mousedown);
        } else {
            node.off('mousedown', mousedown);
        }
    },

    setRender (render) {
        initRenderEvents(render);
    }
};
