import { MoveDirection, Point, Shape } from "./types";
import GameConfig from './GameConfig'
import { SquareGroup } from "./SquareGroup";

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
     */
    static canIMove(shape:Shape,targetPoint:Point):boolean{
        // 方块移动后的位置坐标
        const targetPointGroup: Point[] = shape.map(p => ({
            x: p.x + targetPoint.x,
            y: p.y + targetPoint.y
        }))

        // 判断是否有超出边界的方块
        const res:boolean = targetPointGroup.some(item => {
            return item.x < 0 || item.x > GameConfig.PanelSize.width - 1 ||
                item.y < 0 || item.y > GameConfig.PanelSize.height - 1
        })

        return !res;
    }

    static move(teris: SquareGroup, targetPoint: Point): boolean;
    static move(teris: SquareGroup, direction: MoveDirection): boolean;
    static move(teris: SquareGroup,targetPointOrDirection: Point | MoveDirection): boolean{
        // 移动目标位置
        if (isPoint(targetPointOrDirection)){
            if(this.canIMove(teris.shape,targetPointOrDirection)){
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
            return this.move(teris,targetPoint)
        }
    }

    /**
     * 将当前的方块，移动到目标方向的终点
     * @param teris 
     * @param direction 
     */
    static moveDirectly(teris: SquareGroup, direction: MoveDirection){
        while (this.move(teris,direction)) {
            
        }
    }
 }