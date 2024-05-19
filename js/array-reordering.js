/** ARRAY REORDERING
 * 
 * Adds all relevant Javascript for the functionality of reordering the child 
 * elements of an array block
 * 
 * Granted, some of the functionality in this script should probably be 
 * positioned elsewhere in the codebase, but I created this script long after I
 * was done with all the other scripts in this codebase. I have frankly 
 * forgotten the relevant purpose I had assigned nine months ago to each of the
 * daintily crafted categories of methods, and right now I am not sure I agree
 * with my own rationale at the time.
 * 
 * The entire codebase is in for some massive reordering, and I have neither the
 * time nor the energy to carry it out now. The array reordering feature is a
 * pending feature, and has been so for a very long time. So I am going to add
 * that feature with the least amount of effort possible.
 */

const dialogVars = {
    "parentArray": null,
    "childCount":  null,
    "sourceIndex": {
        "field": null,
        "menu":  null,
        "value": null
    },
    "targetIndex": {
        "field": null,
        "menu":  null,
        "value": null
    },
    "orderMethod": {
        "field": null,
        "menu":  null,
        "value": null
    },

    "setDisplay": function(sourceDisplay, targetDisplay, methodDisplay) {
        dialogVars.sourceIndex.field.style.setProperty("display", sourceDisplay)
        dialogVars.targetIndex.field.style.setProperty("display", targetDisplay)
        dialogVars.orderMethod.field.style.setProperty("display", methodDisplay)
    },

    "noChangeRequired": function() {
        return dialogVars.sourceIndex.value == dialogVars.targetIndex.value
    }
}


function initializeReorderingDialog() {
    dialogVars.sourceIndex.field = document.getElementById("sourceIndexField")
    dialogVars.sourceIndex.menu = dialogVars.sourceIndex.field.querySelector(
        "select"
    )
    
    dialogVars.targetIndex.field = document.getElementById("targetIndexField")
    dialogVars.targetIndex.menu = dialogVars.targetIndex.field.querySelector(
        "select"
    )

    dialogVars.orderMethod.field = document.getElementById("orderMethodField")
    dialogVars.orderMethod.menu = dialogVars.orderMethod.field.querySelector(
        "select"
    )
}


function readDialogState() {
    dialogVars.parentArray = createdObjects[interactiveState.target.id]
    dialogVars.childCount = dialogVars.parentArray.value.length

    dialogVars.sourceIndex.value = dialogVars.sourceIndex.menu.value    
    dialogVars.targetIndex.value = dialogVars.targetIndex.menu.value
    dialogVars.orderMethod.value = dialogVars.orderMethod.menu.value
}


function openArrayOrderingDialogBox() {
    if (interactiveState.target.type != "array") {
        alert("Please select an array block to reorder its children")
        return
    }
    
    // Make the dialog box visible
    document.querySelector("#arrayOrder").style.setProperty("display", "block")
    readDialogState()
    
    // Setup the options in the source index field
    dialogVars.sourceIndex.menu.innerHTML = ""
    for (let pos = 0; pos < dialogVars.childCount; pos++) {
        dialogVars.sourceIndex.menu.innerHTML += `
            <option value="${pos}">
                ${pos}
            </option>
        `
    }

    // Disable the options in the target index field
    dialogVars.targetIndex.menu.innerHTML = `
        <option value="none">
            Enter Source Index first
        </option>
    `
}


function setupTargetIndex() {
    readDialogState()
    
    dialogVars.targetIndex.menu.innerHTML = ""

    for (let pos = 0; pos < dialogVars.childCount; pos++) {
        if (pos == dialogVars.sourceIndex.value) {
            continue
        }
        dialogVars.targetIndex.menu.innerHTML += `
            <option value="${pos}">
                ${pos}
            </option>
        `
    }

}


function closeReordering() {
    document.querySelector("#arrayOrder").style.setProperty("display", "none")
}


function closeReorderingWithChanges() {
    readDialogState()
    if (dialogVars.noChangeRequired()) {
        console.log("No change required")
        return
    }

    if (dialogVars.orderMethod.value == "replace") {
        let array = dialogVars.parentArray
        let targetPos = dialogVars.targetIndex.value
        let sourcePos = dialogVars.sourceIndex.value
        
        let temp = array.value[targetPos]
        array.value[targetPos] = array.value[sourcePos]
        array.value[sourcePos] = temp

        console.log("Replace")
    }

    if (dialogVars.orderMethod.value == "insert") {
        alert("Not Implemented!")
    }

    for (let pos = 0; pos < dialogVars.childCount; pos++) {
        dialogVars.parentArray.value[pos].key = pos
    }
    
    generateJSON()
    saveState()
    loadState()
    closeReordering()
}