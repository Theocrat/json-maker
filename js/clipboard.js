const clipboard = {
    item: null,
    parent: { x: 0, y: 0 },
    offset: { x: 0, y: 0 }
}

function loadArchiveWithOffset(archive, parent) {
    if (archive.leaf) {
        let node = new DndNode(parent, archive.type, archive.key, archive.value)
        node.x = archive.x + clipboard.offset.x
        node.y = archive.y + clipboard.offset.y
        node.update()
        return node
    }

    if (archive.type == "array") {
        let node = new DndNode(parent, archive.type, archive.key, [])
        node.x = archive.x + clipboard.offset.x
        node.y = archive.y + clipboard.offset.y
        node.update()
        archive.value.forEach(child => {loadArchiveWithOffset(child, node)})
        return node
    }

    if (archive.type == "object") {
        let node = new DndNode(parent, archive.type, archive.key, {})
        node.x = archive.x + clipboard.offset.x
        node.y = archive.y + clipboard.offset.y
        node.update()
        for (let key in archive.value) {
            loadArchiveWithOffset(archive.value[key], node)
        }
        return node
    }
}

function copyBranch() {
    let target = interactiveState.target
    if (interactiveState.type == "change" && target.parent != null) {
        let archive = new Archive(target)
        clipboard.item = archive
        clipboard.parent.x = target.parent.x
        clipboard.parent.y = target.parent.y
    }
}

function pasteBranch() {
    let target = interactiveState.target

    if (interactiveState.type == "change") {
        if (target.type == "object") {
            let key = prompt("Enter the key for mapping pasted object:")
            clipboard.item.key = key
        } 

        clipboard.offset.x = target.x - clipboard.parent.x
        clipboard.offset.y = target.y - clipboard.parent.y    
        let node = loadArchiveWithOffset(clipboard.item, target)
        
        generateJSON()
    }
}