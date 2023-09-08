function saveState() {
    graphDataSave = []

    createdObjects.forEach(node => {
        if (node.parent == null) { return }

        let nodeDataObject = {
            "parent_id": node.parent.id,
            "type":  node.type,
            "key":   node.key,
            "value": node.value,
            "x": node.x,
            "y": node.y
        }

        graphDataSave.push(nodeDataObject)
    })

    localStorage.graphDataSave = JSON.stringify(graphDataSave)
}

function loadState() {
    if (localStorage.graphDataSave == undefined) {
        return
    }

    let savedData = JSON.parse(localStorage.graphDataSave)
    savedData.forEach(nodeData => {
        let node = new DndNode(
            createdObjects[nodeData.parent_id],
            nodeData.type,
            nodeData.key,
            nodeData.value
        )

        node.x = nodeData.x
        node.y = nodeData.y
        node.update()
    })

    generateJSON()
}