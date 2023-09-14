// The following code is based on super complicated coordinate geometry
// calculations that I did untidily on the back of an exercise book. No,
// I cannot show you the calculations. I can try to summarize them in a
// separate notebook.

const ARROW_SIZE = 5

function getTriangleABC(x1, y1, x2, y2) {
    // Midpoint between two endpoints
    let xm = 0.5 * (x1 + x2)
    let ym = 0.5 * (y1 + y2)
    
    // We shift coordinates, and use parametric representation for mathematical
    // simplicity: (x1, y1) is now (0, 0) and (xm, ym) is now (h, mh)
    let h = xm - x1
    let m = (ym - y1) / h

    // Point A is the point (xA, yA) in the normal coordinate system which 
    // represents the vertex of the arrow pointing at the child object. In this
    // new reference, this point shall be (a, ma)
    let a = 0
    if (x1 < x2) {
        a = h + ARROW_SIZE/Math.sqrt(1 + m*m)
    } else {
        a = h - ARROW_SIZE/Math.sqrt(1 + m*m)
    }
    

    // Points B and C are related to one another by a quadratic equation, which
    // yields the points of intersection between the circle of radius 5 with
    // center at the midpoint (h, mh), and the line perpendicular to the line
    // joining (0, 0) and (h, mh) which passes through (h, mh)
    let b_x = h - ARROW_SIZE*(m / Math.sqrt(1 + m*m))
    let c_x = h + ARROW_SIZE*(m / Math.sqrt(1 + m*m))

    let b_y = h*m + ARROW_SIZE/Math.sqrt(1 + m*m)
    let c_y = h*m - ARROW_SIZE/Math.sqrt(1 + m*m)

    // Finally, we return them in a proper format
    return {
        xA: x1 + a,       yA: y1 + a*m,
        xB: x1 + b_x,     yB: y1 + b_y,
        xC: x1 + c_x,     yC: y1 + c_y
    }
}