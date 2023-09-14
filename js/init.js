function readyDndArea() {
    area = document.querySelector("#constructionArea")
    output = document.querySelector("#jsonCode")

    view.w = area.width.baseVal.value
    view.h = area.height.baseVal.value

    area.setAttribute("viewBox", `${view.x} ${view.y} ${view.w} ${view.h}`)

    area.addEventListener("mousemove", function (event) {
        mouse.x = event.offsetX
        mouse.y = event.offsetY
        
        let hoverNode = document.querySelector("#hoverNode")
        if (interactiveState.type == "place") {
            if (hoverNode.style.visibility != "visible") {
                hoverNode.style.visibility = "visible"
            }
            hoverNode.x.baseVal.value  = mouse.x
            hoverNode.y.baseVal.value  = mouse.y
        }
        else {
            hoverNode.style.visibility = "hidden"
        }

        if (interactiveState.type == "move") {
            let target = interactiveState.target
            target.node.x = mouse.x + target.xoff
            target.node.y = mouse.y + target.yoff
            target.node.update()
        }

        if (interactiveState.type == "scrolling") {
            let state = interactiveState.target
            view.x = state.view_x - mouse.x + state.x
            view.y = state.view_y - mouse.y + state.y
            let viewBox = `${view.x} ${view.y} ${view.w} ${view.h}`
            area.setAttribute("viewBox", viewBox)
        }
    } )
    
    if (localStorage.saveData == undefined) {
        openHelp()
    }
    loadState()
}