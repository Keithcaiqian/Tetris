import { IViewer } from "../types";
import $ from 'jquery';
import { Square } from "../Square";
import config from './PageConfig';

export class SquarePageViewer implements IViewer{
    private dom?:JQuery<HTMLElement>;
    private isRemove: boolean = false; //是否已经移除
    constructor(
        private square:Square,
        private parent:JQuery<HTMLElement>
    ){
        
    }

    show(): void {
        if(this.isRemove){
            return ;
        }

        if(!this.dom){
            this.dom = $('<div></div').css({
                position:'absolute',
                width: config.Square.width,
                height: config.Square.height,
                border:'1px solid #ccc',
                boxSizing:'border-box',
            }).appendTo(this.parent)
            this.isRemove = false;
        }
        this.dom.css({
            left: this.square.point.x * config.Square.width,
            top: this.square.point.y * config.Square.height,
            background: this.square.color
        });
    }
    remove(): void {
        if(this.dom){
            this.dom.remove();
            this.isRemove = true
        }
    }

}