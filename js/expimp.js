const importFileReader = new FileReader()

importFileReader.addEventListener("load", function () {
    localStorage.saveData = importFileReader.result
    emptyState()
    loadState()
    cancelImport()
})

function downloadJSON() {
    let generated_json = new Blob([generatedJSON], {type: "file/json"})
    let url = window.URL.createObjectURL(generated_json)
    let fname = prompt("Enter a name for the output (no extension required):")
    if (fname == null) { fname = "graph" }
    document.querySelector("#secret").innerHTML = `
        <a id="hidden_downloader" download="${fname}.json" 
           href="${url}">
            this
        </a>
    `
    document.querySelector("#hidden_downloader").click()
    document.querySelector("#secret").innerHTML = ""
}

function exportGraph() {
    let archive = new Archive(createdObjects[0])
    let graphData = JSON.stringify(archive, null, 2)
    let workspace_save = new Blob([graphData], {type: "file/json"})
    let url = window.URL.createObjectURL(workspace_save)
    
    let fname = prompt("Enter a name for the output (no extension required):")
    if (fname == null) { fname = "graph" }
    document.querySelector("#secret").innerHTML = `
        <a id="hidden_downloader" download="${fname}.graph" 
           href="${url}">
            this
        </a>
    `
    document.querySelector("#hidden_downloader").click()
    document.querySelector("#secret").innerHTML = ""
}

function importGraph() {
    let confirmation = confirm("This will delete the existing graph")
    if (!confirmation) { return }
    document.getElementById("importFile").click()
}

function importData() {
    let file = document.getElementById("importFile")
    importFileReader.readAsText(file.files[0])
    // The rest is handled by Import File Reader's promise resolution
    // This is asynchronous, DO NOT try to implement it here.    
}

function cancelImport() {
    interactiveState.type = "select"
    interactiveState.target = "none"
    document.querySelector("#importDialogBox").style.display = "none"
}