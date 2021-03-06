import { Shape, Point } from "./types";
import { getRandom } from "./util";
import { SquareGroup } from "./SquareGroup";

export class TShape extends SquareGroup{
    constructor(
        _centerPoint:Point,
        _color:string
    ){
        super(
            [{ x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }],
            _centerPoint,
            _color
        )
    }
}


export class LShape extends SquareGroup{
    constructor(
        _centerPoint:Point,
        _color:string
    ){
        super(
            [{ x: -2, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }],
            _centerPoint,
            _color
        )
    }
}

export class LMirrorShape extends SquareGroup{
    constructor(
        _centerPoint:Point,
        _color:string
    ){
        super(
            [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }, { x: 0, y: -1 }],
            _centerPoint,
            _color
        )
    }
}

export class SShape extends SquareGroup{
    constructor(
        _centerPoint:Point,
        _color:string
    ){
        super(
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 1 }],
            _centerPoint,
            _color
        )
    }

    rotate(){
        super.rotate();
        this.isClock = !this.isClock;
    }
}

export class SMirrorShape extends SquareGroup{
    constructor(
        _centerPoint:Point,
        _color:string
    ){
        super(
            [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
            _centerPoint,
            _color
        )
    }

    rotate(){
        super.rotate();
        this.isClock = !this.isClock;
    }
}

export class SquareShape extends SquareGroup{
    constructor(
        _centerPoint:Point,
        _color:string
    ){
        super(
            [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
            _centerPoint,
            _color
        )
    }

    afterRotatePoint(){
        return this.shape;
    }
}

export class LineShape extends SquareGroup{
    constructor(
        _centerPoint:Point,
        _color:string
    ){
        super(
            [ { x: -1, y: 0 }, { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
            _centerPoint,
            _color
        )
    }

    rotate(){
        super.rotate();
        this.isClock = !this.isClock;
    }
}


export const shapes = [
    TShape,
    LShape,
    LMirrorShape,
    SShape,
    SMirrorShape,
    SquareShape,
    LineShape
]

export const colors = [
    "red",
    "#fff",
    "green",
    "blue",
    "orange"
]

/**
 * ??????????????????????????????????????????????????????????????????
 * @param centerPoint 
 */
export function createTeris(centerPoint: Point) {
    let shape = shapes[getRandom(0,shapes.length)];
    let color = colors[getRandom(0,colors.length)];
    return new shape(centerPoint,color);
}