import { Square } from "./core/Square";
import $ from 'jquery';
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";


const sq = new Square();
sq.viewer = new SquarePageViewer(sq,$('#root'));
sq.color = '#f40'
sq.point = {
    x: 3,
    y: 4
}
$('#move').on('click',function(){
    sq.point = {
        x: 3,
        y: sq.point.y + 1
    }
})
$('#delete').on('click',function(){
    sq.viewer?.remove();
});
$('#add').on('click',function(){
    sq.viewer = new SquarePageViewer(sq, $("#root"));
});
