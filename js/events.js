function selectNode(id) {
    if (interactiveState.type == "move") {
        if (interactiveState.type == "change") {
            deselectAll()
        }
        interactiveState.type = "change"
        interactiveState.target = createdObjects[id]
        createdObjects[id].selected = true
        createdObjects[id].update()
        saveState()
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


function moveNode(id) {
    let selectMode = interactiveState.type == "select" 
    let changeMode = interactiveState.type == "change"
    deselectAll()
    
    if (selectMode || changeMode) {
        interactiveState.type   = "move"
        interactiveState.target = {
            "node": createdObjects[id],
            "xoff": createdObjects[id].x - mouse.x,
            "yoff": createdObjects[id].y - mouse.y
        }
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
        if (promptedKey == null) { return }
    }
    
    if (type == "boolean") {
        let t_or_f = prompt("Enter T for true, F for false")
        if (t_or_f.toLowerCase() == "t") {
            promptedValue = true
        }
        else {
            promptedValue = false
        }
        if (promptedValue == null) { return }
    }

    if (type == "int") {
        promptedValue = parseInt(prompt("Enter the integer value"))
        if (promptedValue == null) { return }
    }

    if (type == "float") {
        promptedValue = parseFloat(prompt("Enter the float value"))
        if (promptedValue == null) { return }
    }

    if (type == "string") {
        promptedValue = prompt("Enter the string value")
        if (promptedValue == null) { return }
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
        generateJSON()
    }
}


function changeSettings(id) {
    interactiveState.type = "config"
    interactiveState.target = createdObjects[id]

    document.querySelector("#config").style.display = "block"
    
    let setKey = document.querySelector("#setKey")
    setKey.value = interactiveState.target.key
    if (createdObjects[id].key == null) { setKey.disabled = true }
    else if (createdObjects[id].parent.type != "object") { 
        setKey.disabled = true 
    } 
    else { setKey.disabled = false }

    let setValue = document.querySelector("#setValue")
    let type = interactiveState.target.type
    if (type != "object" && type != "array"){
        setValue.value = interactiveState.target.value
        if (createdObjects[id].type == "null") { setValue.disabled = true }
        else { setValue.disabled = false }
    }
    else {
        setValue.value = "[parent object]"
        setValue.disabled = true
    }
}

function cancelChanges() {
    interactiveState.type = "select"
    interactiveState.target = "none"
    
    document.querySelector("#config").style.display = "none"
    deselectAll()
}

function parseAppropriately(type, value) {
    // Helper function for changing values in graph nodes
    if (type == "string")  { return value }
    if (type == "int")     { return parseInt(value) }
    if (type == "float")   { return parseFloat(value) }
    if (type == "boolean") {
        if (value.length == 0) { return false }
        if (value.toLowerCase()[0] == 't') { return true }
        return false
    }
}

function makeChanges() {
    let setKey = document.querySelector("#setKey")
    let setValue = document.querySelector("#setValue")

    if (!setKey.disabled) {
        let parent = interactiveState.target.parent
        delete parent.value[interactiveState.target.key]
        interactiveState.target.key = setKey.value
        parent.value[interactiveState.target.key] = interactiveState.target
    }

    if (!setValue.disabled) {
        interactiveState.target.value = parseAppropriately(
            interactiveState.target.type,
            setValue.value
        )
    }

    interactiveState.target.update()
    generateJSON()

    // The below line is a poor choice of coding standards, but pardon the
    // lack of taste here. It can be changed later.
    cancelChanges()
}

function deleteGraph() {
    let confirmation = confirm("This will delete the entire graph")
    if (!confirmation) { return }
    
    delete localStorage.saveData
    emptyState()
    loadState()
}


function openHelp() {
    document.querySelector("#help").style.display = "block"
}

function closeHelp() {
    document.querySelector("#help").style.display = "none"
}

function deleteNode() {
    let node = interactiveState.target
    if (node.id != 0) {
        if (!node.isLeaf()) {
            let confirmation = confirm(
                "Deleting this block will delete all its children."
            )
            if (!confirmation) { return }
        }
        node.deleted = true
        saveState()
        emptyState()
        loadState()
        generateJSON()
    } else {
        alert("You cannot delete the root node.")
    }
    cancelChanges()
}