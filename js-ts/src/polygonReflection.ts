// the basic logic is to iterate through the points of the polygon and deriving a reflection vector for 
// the iterated points such that when the reflection vector is added to the vector represented by the iterated points 
// the resultant vector represents the location of the reflected point corresponding to the point currently being iterated.

// This is done by finding the line perpendicular to the passed line/axis around which the polygon is to be reflected such 
// that it also passes through the current point being iterated. Once we find the perpendicular line we  find the point where 
// it intersects the line/axis of reflection.  The point currently being iterated  and the intersection point can 
// be used to derive the reflection vector via subtraction as the x,y co-ordinates also represent the i,j unit vectors.

//naive matrix multiplication, can use karatsuba algorithm here.
function multiplyMatrices(mat1: Array<Array<number>>, mat2: Array<Array<number>>) {
    
    if(mat1[0].length != mat2.length) {
        throw "incompatible matrices for multiplication";
    }
        
    let product = new Array<Array<number>>(mat1.length);
    for(let i = 0; i<product.length; i++) {
        product[i] = new Array<number>(mat2[0].length);
        for(let j =0; j<product[i].length; j++) {
            product[i][j] = 0;
        }
    }

    for(let i = 0; i<mat1.length; i++) {
        for(let j = 0; j<mat2[0].length; j++) {
            let sum = 0;
            for(let k = 0; k<mat1[0].length; k++) {
                sum += mat1[i][k] * mat2[k][j];
            }
            product[i][j] = sum;
        }
    }

    return product;
}

// derives the reflection vector which can be added to the points being iterated through.
function getReflectionVector(point:[number, number], line: [[number, number], [number, number]]) {

    let coeffMatrix: Array<Array<number>> = [[0,0],[0,0]];
    let constMatrix : Array<Array<number>> = [[0],[0]];
    
    // if line/axis of reflection is X axis
    if( line[1][1] - line[0][1] === 0) {

        coeffMatrix[0][0] = 1;
        constMatrix[0][0] = point[0];

        coeffMatrix[1][1] = 1;

    // if line/axis of reflection is Y axis
    } else if(line[1][0] - line[0][0] === 0) {

        coeffMatrix[0][1] = 1;
        constMatrix[0][0] = point[1];

        coeffMatrix[1][0] = 1;

    } else {

        // algorithm for the general case

        let lineSlope = (line[1][1] - line[0][1]) / (line[1][0] - line[0][0]);
        let perpendicularSlope = -1 * Math.floor(1/lineSlope);

        let perpendicularConst = point[1] - (perpendicularSlope * point[0]);
        
        coeffMatrix[0][0] = -1* perpendicularSlope;
        coeffMatrix[0][1] = 1;
        constMatrix[0][0] = perpendicularConst;

        let lineConstant = line[1][1] - lineSlope*line[1][0];
        coeffMatrix[1][0] = -1 * lineSlope;
        coeffMatrix[1][1] = 1;
        constMatrix[1][0] = lineConstant;
    }

    // find inverse of matrice, det stands for determinant
    let det = (coeffMatrix[0][0] * coeffMatrix[1][1]) - (coeffMatrix[0][1] * coeffMatrix[1][0]);
    if(det === 0) {
        throw "no way";
    }
    let inverse : Array<Array<number>> = [[0,0],[0,0]];

    inverse[0][0] = coeffMatrix[1][1] / det;
    inverse[1][1] = coeffMatrix[0][0] / det;
    inverse[0][1] = -1 * (coeffMatrix[0][1] / det);
    inverse[1][0] = -1 * (coeffMatrix[1][0] / det);

    let projectionMatrix = multiplyMatrices(inverse, constMatrix);
    let projectionPoint = [projectionMatrix[0][0], projectionMatrix[1][0]];

    let reflectionVector = [2*(projectionPoint[0]-point[0]), 2*(projectionPoint[1]-point[1])];
    return reflectionVector;
}

let polygon = [ [1,2], [2,5], [5,6], [3,2] ];
let line = [[0,0], [5,0]];


export function reflectPoints(polygon: [number, number][], line: [[number, number], [number, number]]) {
    let reflectedPolygon: any[] = [];

    // here we add the reflection vector derived from the points under iteration to those very points to get the reflected points
    for(let point of polygon) {
        let reflectionVector = getReflectionVector(point as [number, number], line as [[number, number], [number, number]]);
        let reflectedPoint = [point[0] + reflectionVector[0], point[1] + reflectionVector[1]];
        reflectedPolygon.push(reflectedPoint);
    }

    return reflectedPolygon;
}

