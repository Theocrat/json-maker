function generateRecursively(root) {
    if (root.type == "null") { return null }
    if (root.type == "boolean") { return root.value }
    if (root.type == "int")     { return root.value }
    if (root.type == "float")   { return root.value }    
    if (root.type == "string")  { return root.value }

    if (root.type == "array") { 
        return root.value.map(item => generateRecursively(item)) 
    }

    if (root.type == "object") { 
        let values = {}
        for (let key in root.value) {
            values[key] = generateRecursively(root.value[key])
        } 
        return values
    }
}

function generateJSON() {
    let rootNode = createdObjects[0]
    let outputJSON = generateRecursively(rootNode)
    output.innerHTML = JSON.stringify(outputJSON, null, 2)
}
