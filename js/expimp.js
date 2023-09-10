function downloadJSON() {
    let generated_json = new Blob([generatedJSON], {type: "file/json"})
    let url = window.URL.createObjectURL(generated_json)
    window.open(url)
}

function exportGraph() {
    let archive = new Archive(createdObjects[0])
    let graphData = JSON.stringify(archive, null, 2)
    let workspace_save = new Blob([graphData], {type: "file/json"})
    let url = window.URL.createObjectURL(workspace_save)
    window.open(url)
}

function importGraph() {
    let confirmation = confirm("This will delete the existing graph")
    if (!confirmation) { return }
    document.querySelector("#importDialogBox").style.display = "block"
}

function importData() {
    let importBox = document.querySelector("#importBox")
    let importedData = importBox.value
    localStorage.saveData = importedData
    console.table(importedData)
    emptyState()
    loadState()
   cancelImport()
}

function cancelImport() {
    interactiveState.type = "select"
    interactiveState.target = "none"
    document.querySelector("#importDialogBox").style.display = "none"
}