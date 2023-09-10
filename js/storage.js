class Archive {
    constructor(node) {
        if (node.isLeaf()) {
            this.x     = node.x
            this.y     = node.y
            this.key   = node.key
            this.type  = node.type
            this.leaf  = true
            this.value = node.value
        }

        if (node.type == "array") {
            this.x     = node.x
            this.y     = node.y
            this.key   = node.key
            this.type  = node.type
            this.value = node.value.map(item => (new Archive(item)))
            this.leaf  = false
        }

        if (node.type == "object") {
            this.x     = node.x
            this.y     = node.y
            this.key   = node.key
            this.type  = node.type
            this.value = {}
            this.leaf  = false

            for (let key in node.value) {
                this.value[key] = new Archive(node.value[key])
            }
        }
    }
}

function loadArchive(archive, parent) {
    if (archive.leaf) {
        let node = new DndNode(parent, archive.type, archive.key, archive.value)
        node.x = archive.x
        node.y = archive.y
        node.update()
        return node
    }

    if (archive.type == "array") {
        let node = new DndNode(parent, archive.type, archive.key, [])
        node.x = archive.x
        node.y = archive.y
        node.update()
        archive.value.forEach(child => {loadArchive(child, node)})
        return node
    }

    if (archive.type == "object") {
        let node = new DndNode(parent, archive.type, archive.key, {})
        node.x = archive.x
        node.y = archive.y
        node.update()
        for (let key in archive.value) {
            loadArchive(archive.value[key], node)
        }
        return node
    }
}

function saveState() {
    let archive = new Archive(createdObjects[0])
    let saveString = JSON.stringify(archive)
    localStorage.saveData = saveString
}

function emptyState() {
    // First, remove all the "created objects"
    while (createdObjects.length > 0) {
        createdObjects.pop()
    }

    // Then wipe out the entire 'area' of rendered components
    area.innerHTML = `
        <!-- This is the graphical drag-and-drop interface -->

        <rect id="hoverNode" style="visibility: hidden;"
              x="0" y="0" width="128" height="64"
              fill="#ccc9" stroke="#0009" stroke-width="1px" />
    `
}

function loadState() {
    if (localStorage.saveData == undefined) {
        let rootObject = new DndNode(null, "object", null, {})
        rootObject.x = area.width.baseVal.value  / 2
        rootObject.y = area.height.baseVal.value / 2
        rootObject.update()
    }

    else {
        let archive = JSON.parse(localStorage.saveData)
        loadArchive(archive, null)
    }

    generateJSON()
}