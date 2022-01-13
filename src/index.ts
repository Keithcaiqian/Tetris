import $ from 'jquery';
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import { createTeris } from "./core/Teris";
import { TerisRules } from './core/TerisRules';
import { MoveDirection } from './core/types';

const teris = createTeris({x:3,y:3});
teris.squareGroup.forEach(s => {
    s.viewer = new SquarePageViewer(s,$('#root'));
})

$('#btnDown').on('click',function(){
    TerisRules.move(teris,MoveDirection.down)
})
$('#btnRight').on('click',function(){
    TerisRules.moveDirectly(teris,MoveDirection.right)
})
$('#btnLeft').on('click',function(){
    TerisRules.move(teris,MoveDirection.left)
})
$('#btnUp').on('click',function(){
    TerisRules.move(teris,{
        x: teris.centerPoint.x,
        y: teris.centerPoint.y - 1,
    })
})
