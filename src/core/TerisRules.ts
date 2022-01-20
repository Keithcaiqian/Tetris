import { MoveDirection, Point, Shape } from "./types";
import GameConfig from './GameConfig'
import { SquareGroup } from "./SquareGroup";
import { Square } from "./Square";

function isPoint(obj: any): obj is Point {
    if (typeof obj.x === "undefined") {
        return false;
    }
    return true;
}

 export class TerisRules{
    /**
     * 判断方块是否可以移动到目标位置
     * @param shape 方块的形状
     * @param targetPoint 目标位置
     * @param exist 已存在的方块
     */
    static canIMove(shape:Shape,targetPoint:Point,exist:Square[]):boolean{
        // 方块移动后的位置坐标
        const targetPointGroup: Point[] = shape.map(p => ({
            x: p.x + targetPoint.x,
            y: p.y + targetPoint.y
        }))

        // 判断是否有超出边界的方块
        let res:boolean = targetPointGroup.some(item => {
            return item.x < 0 || item.x > GameConfig.PanelSize.width - 1 ||
                item.y < 0 || item.y > GameConfig.PanelSize.height - 1
        })
        if(res){
            return false;
        }
        
        // 判断是否与已存在的方块重合
        res = targetPointGroup.some(item => exist.some(it => it.point.x === item.x && it.point.y === item.y));
        if(res){
            return false
        }
        return true;
    }

    static move(teris: SquareGroup, targetPoint: Point,exist:Square[]): boolean;
    static move(teris: SquareGroup, direction: MoveDirection,exist:Square[]): boolean;
    static move(teris: SquareGroup,targetPointOrDirection: Point | MoveDirection,exist:Square[]): boolean{
        // 移动目标位置
        if (isPoint(targetPointOrDirection)){
            if(this.canIMove(teris.shape,targetPointOrDirection,exist)){
                teris.centerPoint = targetPointOrDirection;
                return true;
            }
            return false;
        }
        // 移动方向
        else{
            const direction = targetPointOrDirection;
            let targetPoint: Point;
            if (direction === MoveDirection.down) {
                targetPoint = {
                    x: teris.centerPoint.x,
                    y: teris.centerPoint.y + 1
                }
            }
            else if (direction === MoveDirection.left) {
                targetPoint = {
                    x: teris.centerPoint.x - 1,
                    y: teris.centerPoint.y
                }
            }
            else {
                targetPoint = {
                    x: teris.centerPoint.x + 1,
                    y: teris.centerPoint.y
                }
            }
            return this.move(teris,targetPoint,exist)
        }
    }

    /**
     * 将当前的方块，移动到目标方向的终点
     * @param teris 
     * @param direction 
     */
    static moveDirectly(teris: SquareGroup, direction: MoveDirection,exist: Square[]){
        while (this.move(teris,direction,exist)) {
            
        }
    }

    /**
     * 旋转
     */
    static rotate(teris: SquareGroup,exist:Square[]){
        const newShape = teris.afterRotatePoint();
        if(this.canIMove(newShape,teris.centerPoint,exist)){
            teris.rotate();
            return true;
        }else{
            return false;
        }
    }

    /**
     *  从已存在的方块中进行消除，并返回消除了多少行
     */
     static deleteSquares(exist:Square[]):number{
        const ys = exist.map(p => p.point.y);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        var num = 0;
        for(let y = minY; y <= maxY; y++){
            if(this.deleteLineY(exist,y)){
                num++
            };
        }
        return num;
    }

    /**
     * 判断某行是否已满并删除
     * @param exist 方块数组
     * @param y 行数
     */
    private static deleteLineY(exists:Square[],y:number): boolean{
        const squares = exists.filter(sq => sq.point.y === y);
        if(squares.length === GameConfig.PanelSize.width){
            squares.forEach(item => {
                //1. 从界面中移除
                item.viewer?.remove(); 
                
                const index = exists.indexOf(item)
                exists.splice(index, 1);
            })
            //2. 剩下的，y坐标比当前的y小的方块，y+1
            exists.filter(sq => sq.point.y < y).forEach(sq => {
                sq.point = {
                    x: sq.point.x,
                    y: sq.point.y + 1
                }
            })
            return true
        }
        return false;
    }
 }