import { Point, IViewer } from "./types"

export class Square{
    private _point: Point = {
        x: 0,
        y: 0,
    }
    private _color: String = ''

    //属性：显示者
    private _viewer?: IViewer

    public get viewer() {
        return this._viewer;
    }

    public set viewer(v) {
        this._viewer = v;
    }

    public set point(val:Point) {
        this._point = val;

        //完成显示
        if (this._viewer) {
            this._viewer.show();
        }
    }
    public get point(){
        return this._point;
    }

    public set color(val:String){
        this._color = val;
    }
    public get color(){
        return this._color;
    }
}