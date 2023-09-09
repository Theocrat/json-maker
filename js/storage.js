var store = {}

function dumpLeaf(id) {
    let node = createdObjects[id]
    return {
        "id": node.id,
        "parent_id": node.parent.id,
        "key": node.key,
        "value": node.value,
        "x": node.x,
        "y": node.y,
        "type": node.type
    }
}

function dumpArray(id) {
    let node = createdObjects[id]
    return {
        "id": node.id,
        "parent_id": node.parent.id,
        "key": node.key,
        "values": node.value.map(child => dumpNode(child)),
        "x": node.x,
        "y": node.y,
        "type": node.type
    }
}

function dumpObject(id) {
    let node = createdObjects[id]

    let values = {}
    for (key in node.value) {
        key = dumpNode(node.value[key])
    }

    return {
        "id": node.id,
        "parent_id": node.parent.id,
        "key": node.key,
        "values": values,
        "x": node.x,
        "y": node.y,
        "type": node.type
    }
}

function dumpNode(id) {
    let node = createdObjects[id]
    if (node.isLeaf()) { dumpLeaf(node) }
    if (node.type == "array")  { dumpArray(node)  }
    if (node.type == "object") { dumpObject(node) }
}

function saveState() {
    let rootObject = createdObjects[0]
    store = dumpNode(rootObject)
}

function loadNodesRecursively(root, parent) {
    if (root.type == "array") {
        let tentativeArrayNode = new DndNode(
            parent,
            root.type,
            root.key,
            []
        )
        tentativeArrayNode.value = root.values.map(
            child => loadNodesRecursively(child, tentativeArrayNode)
        )
        return tentativeArrayNode
    }

    if (root.type == "object") {
        let tentativeObjectNode = new DndNode(
            parent,
            root.type,
            root.key,
            {}
        )
        for (key in root.values) {
            tentativeObjectNode.value[key] = loadNodesRecursively(
                root.values[key],
                tentativeObjectNode
            )
        }
        return tentativeObjectNode
    }

    return new DndNode(
        parent,
        root.type,
        root.key,
        root.value
    )
}

function loadState() {
    loadNodesRecursively(store, null)
}