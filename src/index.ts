import $ from 'jquery';
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import { createTeris } from "./core/Teris";

const sqGroup = createTeris({x:3,y:3});
sqGroup.squareGroup.forEach(s => {
    s.viewer = new SquarePageViewer(s,$('#root'));
})

$('#btnDown').on('click',function(){
    sqGroup.centerPoint = {
        x: sqGroup.centerPoint.x,
        y: sqGroup.centerPoint.y + 1,
    }
})
$('#btnRight').on('click',function(){
    sqGroup.centerPoint = {
        x: sqGroup.centerPoint.x + 1,
        y: sqGroup.centerPoint.y,
    }
})
$('#btnLeft').on('click',function(){
    sqGroup.centerPoint = {
        x: sqGroup.centerPoint.x - 1,
        y: sqGroup.centerPoint.y,
    }
})
$('#btnUp').on('click',function(){
    sqGroup.centerPoint = {
        x: sqGroup.centerPoint.x,
        y: sqGroup.centerPoint.y - 1,
    }
})
