/*
 * jQuery
 * @copyright : GigolNet
 * @author : Ilia GUIGOLACHVILI
 * @web : http://gigol.net
 * @plugin : Roping
 * @version : 1.0.0
 * Last modified : 23/01/2015
 */
(function($){
    /*
     * PLUGIN
     */
    $.fn.roping = function(options){

        //Main objet
        var sheep = this;

        //Init
        var sheep_Left, sheep_Top;
        var shepherd_Height, shepherd_Width, shepherd_Left, shepherd_Top;
        var rope_Left, rope_Top, rope_Height, rope_Width, left, top;
        var rope_StartX, rope_StartY, rope_EndX, rope_EndY;

        //These are the defaults
        var _settings = $.extend({
            shepherd:$("#shepherd"),
            shepherd_x : 0,
            shepherd_y : 0,
            sheep_x    : 0,
            sheep_y    : 0,
            rope_width  : 1,
            rope_color  : "black",
            rope_cap    : "round"
        }, options);

        //Add rope
        var rope = $('<canvas id="rope">Your browser does not support the HTML5 canvas tag.</canvas>').appendTo("body");

        //Canvas
        var ctx = $(rope).get(0).getContext("2d");

        //Dragging
        var isDragging = false;
        $(document).on('mousedown', function(e){
            isDragging = true;
        });
        $(document).on('mouseup', function (e) {
            isDragging = false;
        });
        $(document).on('mousemove', function(e){
            if (isDragging){

                //Shepherd
                shepherd_Left   = _settings.shepherd.offset().left;
                shepherd_Top    = _settings.shepherd.offset().top;
                shepherd_Width  = _settings.shepherd.width();
                shepherd_Height = _settings.shepherd.height();

                //Sheep
                sheep_Left = sheep.offset().left;
                sheep_Top  = sheep.offset().top;

                //Rope
                rope_Left   = (shepherd_Left + _settings.shepherd_x);
                rope_Top    = (shepherd_Top + shepherd_Height + _settings.shepherd_y);
                rope_Width  = (sheep_Left + _settings.sheep_x);
                rope_Height = (sheep_Top + _settings.sheep_y);

                //
                if (shepherd_Left > sheep_Left || (shepherd_Left+shepherd_Width) >sheep_Left ) {
                    //X & Y
                    left = parseInt(sheep_Left / rope_Left);
                    top  = parseInt(sheep_Top / rope_Top);

                    //Calc point
                    rope_StartX = 2 * left + rope_Left / 2 - 2 / sheep_Left;
                    rope_StartY = 2 * top + rope_Top / 2 - 2 / sheep_Top;
                    rope_EndX   = (sheep_Left + _settings.sheep_x);
                    rope_EndY   = (sheep_Top + _settings.sheep_y);
                }
                else {
                    //X & Y
                    left = parseInt(sheep_Left - rope_Left);
                    top  = parseInt(sheep_Top - rope_Top);

                    //Calc point
                    rope_StartX = 2 * left - rope_Left / 2 - sheep_Left / 2;
                    rope_StartY = 2 * top - rope_Top / 2 - sheep_Top / 2;
                    rope_EndX   = (sheep_Left + _settings.sheep_x);
                    rope_EndY   = (sheep_Top + _settings.sheep_y);
                }

                //Limit
                if (rope_Width <= rope_Left){
                    rope_Width = rope_Left;
                }
                if (rope_Height <= rope_Top){
                    rope_Height = rope_Top;
                }

                //Set rope css
                rope.attr("height", rope_Height);
                rope.attr("width", rope_Width);
                rope.css({
                    "position" : "absolute",
                    "left"     : 0,
                    "top"      : 0,
                    "overflow" : "none",
                    "margin"   : 0,
                    "padding"  : 0
                });

                //Clear
                ctx.clearRect(0, 0, rope.width, rope.height);

                //Draw
                ctx.beginPath();
                ctx.moveTo(rope_Left, rope_Top);
                ctx.quadraticCurveTo(rope_StartX, rope_StartY, rope_EndX, rope_EndY);
                ctx.lineWidth   = _settings.rope_width;
                ctx.lineCap     = _settings.rope_cap;
                ctx.strokeStyle = _settings.rope_color;
                ctx.stroke();
            }
        });

    };

}(jQuery));