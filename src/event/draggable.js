let draggingNode;

function mousedown(node) {
    if (node.attr.draggable) {
        draggingNode = node;
        draggingNode.dragging = true;
        draggingNode.lockOffset();
        draggingNode.fireEvent('startDrag');
    }
}

function cancelDrag() {
    if (draggingNode && draggingNode.dragging) {
        draggingNode.dragging = false;
        draggingNode.unlockOffset();
        draggingNode.fireEvent('stopDrag');
    }
}

function initRenderEvents(render) {
    render.on('mousemove', () => {
        if (draggingNode && draggingNode.dragging) {
            draggingNode._setDraggingPos();
            draggingNode.fireEvent('duringDrag');
        }
    });

    render.on('mouseup', () => {
        cancelDrag();
    });

    render.on('mouseleave', () => {
        cancelDrag();
    });
}

export default {
    init(node) {
        if (node.attr.draggable) {
            node.on('mousedown', mousedown);
            // node.on('mouseleave', cancelDrag);
        } else {
            node.off('mousedown', mousedown);
            // node.off('mouseleave', cancelDrag);
        }
    },

    setRender(render) {
        initRenderEvents(render);
    }
};