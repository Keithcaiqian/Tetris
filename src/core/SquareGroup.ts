import { Square } from "./Square";
import { Point, Shape } from "./types";

export class SquareGroup {
    private readonly _squareGroup: Square[]; //小方块数组

    public get squareGroup(){
        return this._squareGroup;
    }

    public get shape(){
        return this._shape
    }

    public get centerPoint(){
        return this._centerPoint;
    }

    public set centerPoint(val: Point){
        this._centerPoint = val;
        // 改变每个方块的坐标
        this.changeEachSquarePoint();
    }

    // 改变每个小方块的坐标
    private changeEachSquarePoint(){
        this._squareGroup.forEach((s,i) => {
            s.point = {
                x: this._shape[i].x + this._centerPoint.x,
                y: this._shape[i].y + this._centerPoint.y
            }
        })
    }

    constructor(
        private _shape: Shape,
        private _centerPoint: Point,
        private _color: string
    ){
        const arr:Square[] = [];
        this._shape.forEach(p => {
            const sq = new Square();
            sq.point = {
                x: p.x + this._centerPoint.x,
                y: p.y + this._centerPoint.y
            }
            sq.color = this._color
            arr.push(sq);
        })
        this._squareGroup = arr;
    }

    //是否顺时针旋转 
    protected isClock = true;

    /**
     * 旋转后的坐标
     */
    public afterRotatePoint():Shape{
        let point: Shape;
        // 顺时针
        if(this.isClock){
            point = this._shape.map(p => {
                return {
                    x: p.y,
                    y: -p.x
                }
            })
        }
        // 逆时针
        else{
            point = this._shape.map(p => {
                return {
                    x: -p.y,
                    y: p.x
                }
            })
        }

        return point;
    }

    // 旋转
    public rotate(){
        this._shape = this.afterRotatePoint();
        this.changeEachSquarePoint();
    }
}