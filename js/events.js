function selectNode(id) {
    let selectMode = interactiveState.type == "select" 
    let changeMode = interactiveState.type == "change"
    if (selectMode || changeMode) {
        if (interactiveState.type == "change") {
            deselectAll()
        }
        interactiveState.type = "change"
        interactiveState.target = createdObjects[id]
        createdObjects[id].selected = true
        createdObjects[id].update()
    }
}

function deselectAll() {
    createdObjects.forEach(node => {
        node.selected = false
        node.update()
    })
    
    if (interactiveState.type == "change") {
        interactiveState.type = "select"
        interactiveState.target = "none"
    }
}


function place(type) {
    if (interactiveState.type == "place") {
        return
    }

    if (interactiveState.type == "select") {
        alert("Please select a parent node first")
        return
    }

    let selectedItem  = interactiveState.target
    let promptedKey   = null
    let promptedValue = null

    let arraySelected  = selectedItem.type == "array"
    let objectSelected = selectedItem.type == "object"
    if (!arraySelected && !objectSelected) {
        alert(`${selectedItem.type} object is not a valid parent. `
            + `Please select either an Array or an Object`)
        return
    }

    if (selectedItem.type == "object") {
        promptedKey = prompt("Enter the KEY to which this child will be mapped")
    }
    
    if (type == "boolean") {
        let t_or_f = prompt("Enter T for true, F for false")
        if (t_or_f.toLowerCase() == "t") {
            promptedValue = true
        }
        else {
            promptedValue = false
        }
    }

    if (type == "int") {
        promptedValue = parseInt(prompt("Enter the integer value"))
    }

    if (type == "float") {
        promptedValue = parseFloat(prompt("Enter the float value"))
    }

    if (type == "string") {
        promptedValue = prompt("Enter the string value")
    }
    
    interactiveState.type = "place"
    interactiveState.target = {
        "parent": selectedItem,
        "type":   type,
        "key":    promptedKey,
        "value":  promptedValue
    }
    
    deselectAll()
}

function createNode() {
    if (interactiveState.type == "place") {
        let parent = interactiveState.target.parent
        let type   = interactiveState.target.type
        let key    = interactiveState.target.key
        let value  = interactiveState.target.value

        interactiveState.type   = "select"
        interactiveState.target = "none"

        let newNode = new DndNode(parent, type, key, value)
        createdObjects.push(newNode)
        generateJSON()
    }
}
