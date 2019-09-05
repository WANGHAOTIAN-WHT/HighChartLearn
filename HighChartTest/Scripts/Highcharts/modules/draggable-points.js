/*
 Highcharts JS v7.1.3 (2019-08-14)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(f){"object"===typeof module&&module.exports?(f["default"]=f,module.exports=f):"function"===typeof define&&define.amd?define("highcharts/modules/draggable-points",["highcharts"],function(r){f(r);f.Highcharts=r;return f}):f("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(f){function r(k,f,r,A){k.hasOwnProperty(f)||(k[f]=A.apply(null,r))}f=f?f._modules:{};r(f,"modules/draggable-points.src.js",[f["parts/Globals.js"],f["parts/Utilities.js"]],function(k,f){function r(a){return{left:"right",
right:"left",top:"bottom",bottom:"top"}[a]}function A(a){var b=["draggableX","draggableY"],c;m(a.dragDropProps,function(a){a.optionName&&b.push(a.optionName)});for(c=b.length;c--;)if(a.options.dragDrop[b[c]])return!0}function L(a){var b=a.series?a.series.length:0;if(a.hasCartesianSeries&&!a.polar)for(;b--;)if(a.series[b].options.dragDrop&&A(a.series[b]))return!0}function M(a){var b=a.series,c=b.options.dragDrop||{};a=a.options&&a.options.dragDrop;var d,e;m(b.dragDropProps,function(a){"x"===a.axis&&
a.move?d=!0:"y"===a.axis&&a.move&&(e=!0)});return(c.draggableX&&d||c.draggableY&&e)&&!(a&&!1===a.draggableX&&!1===a.draggableY)&&b.yAxis&&b.xAxis}function w(a,b){return void 0===a.chartX||void 0===a.chartY?b.pointer.normalize(a):a}function x(a,b,c,d){var e=b.map(function(b){return n(a,b,c,d)});return function(){e.forEach(function(a){a()})}}function N(a,b,c){var d=b.dragDropData.origin;b=d.chartX;d=d.chartY;var e=a.chartX;a=a.chartY;return Math.sqrt((e-b)*(e-b)+(a-d)*(a-d))>c}function O(a,b,c){var d=
{chartX:a.chartX,chartY:a.chartY,guideBox:c&&{x:c.attr("x"),y:c.attr("y"),width:c.attr("width"),height:c.attr("height")},points:{}};b.forEach(function(b){var c={};m(b.series.dragDropProps,function(d,e){d=b.series[d.axis+"Axis"];c[e]=b[e];c[e+"Offset"]=d.toPixels(b[e])-(d.horiz?a.chartX:a.chartY)});c.point=b;d.points[b.id]=c});return d}function P(a){var b=a.series,c=[],d=b.options.dragDrop.groupBy;b.isSeriesBoosting?b.options.data.forEach(function(a,d){c.push((new b.pointClass).init(b,a));c[c.length-
1].index=d}):c=b.points;return a.options[d]?c.filter(function(b){return b.options[d]===a.options[d]}):[a]}function E(a,b){var c=P(b),d=b.series,e=d.chart,p;v(d.options.dragDrop&&d.options.dragDrop.liveRedraw,!0)||(e.dragGuideBox=p=d.getGuideBox(c),e.setGuideBoxState("default",d.options.dragDrop.guideBox).add(d.group));e.dragDropData={origin:O(a,c,p),point:b,groupedPoints:c,isDragging:!0}}function Q(a,b){var c=a.point,d=q(c.series.options.dragDrop,c.options.dragDrop),e={},p=a.updateProp,D={};m(c.series.dragDropProps,
function(a,b){if(!p||p===b&&a.resize&&(!a.optionName||!1!==d[a.optionName]))if(p||a.move&&("x"===a.axis&&d.draggableX||"y"===a.axis&&d.draggableY))e[b]=a});(p?[c]:a.groupedPoints).forEach(function(c){D[c.id]={point:c,newValues:c.getDropValues(a.origin,b,e)}});return D}function F(a,b){var c=a.dragDropData.newPoints;b=!1===b?!1:q({duration:400},a.options.animation);a.isDragDropAnimating=!0;m(c,function(a){a.point.update(a.newValues,!1)});a.redraw(b);setTimeout(function(){delete a.isDragDropAnimating;
a.hoverPoint&&!a.dragHandles&&a.hoverPoint.showDragHandles()},b.duration)}function G(a){var b=a.series&&a.series.chart,c=b&&b.dragDropData;!b||!b.dragHandles||c&&(c.isDragging&&c.draggedPastSensitivity||c.isHoveringHandle===a.id)||b.hideDragHandles()}function H(a){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}function I(a){for(var b in a)if(a.hasOwnProperty(b))return a[b]}function R(a,b){if(!b.zoomOrPanKeyPressed(a)){var c=b.dragDropData;var d=0;if(c&&c.isDragging){var e=c.point;d=e.series.options.dragDrop;
a.preventDefault();c.draggedPastSensitivity||(c.draggedPastSensitivity=N(a,b,v(e.options.dragDrop&&e.options.dragDrop.dragSensitivity,d&&d.dragSensitivity,2)));c.draggedPastSensitivity&&(c.newPoints=Q(c,a),b=c.newPoints,d=H(b),b=1===d?I(b):null,e.firePointEvent("drag",{origin:c.origin,newPoints:c.newPoints,newPoint:b&&b.newValues,newPointId:b&&b.point.id,numNewPoints:d,chartX:a.chartX,chartY:a.chartY},function(){var b=e.series,c=b.chart,d=c.dragDropData,f=q(b.options.dragDrop,e.options.dragDrop),
h=f.draggableX,l=f.draggableY;b=d.origin;var k=a.chartX-b.chartX,y=a.chartY-b.chartY,t=k;d=d.updateProp;c.inverted&&(k=-y,y=-t);if(v(f.liveRedraw,!0))F(c,!1),e.showDragHandles();else if(d){h=k;c=y;t=e.series;l=t.chart;d=l.dragDropData;f=t.dragDropProps[d.updateProp];var g=d.newPoints[e.id].newValues;var m="function"===typeof f.resizeSide?f.resizeSide(g,e):f.resizeSide;f.beforeResize&&f.beforeResize(l.dragGuideBox,g,e);l=l.dragGuideBox;t="x"===f.axis&&t.xAxis.reversed||"y"===f.axis&&t.yAxis.reversed?
r(m):m;h="x"===f.axis?h-(d.origin.prevdX||0):0;c="y"===f.axis?c-(d.origin.prevdY||0):0;switch(t){case "left":var n={x:l.attr("x")+h,width:Math.max(1,l.attr("width")-h)};break;case "right":n={width:Math.max(1,l.attr("width")+h)};break;case "top":n={y:l.attr("y")+c,height:Math.max(1,l.attr("height")-c)};break;case "bottom":n={height:Math.max(1,l.attr("height")+c)}}l.attr(n)}else c.dragGuideBox.translate(h?k:0,l?y:0);b.prevdX=k;b.prevdY=y}))}}}function B(a,b){var c=b.dragDropData;if(c&&c.isDragging&&
c.draggedPastSensitivity){var d=c.point,e=c.newPoints,p=H(e),f=1===p?I(e):null;b.dragHandles&&b.hideDragHandles();a.preventDefault();b.cancelClick=!0;d.firePointEvent("drop",{origin:c.origin,chartX:a.chartX,chartY:a.chartY,newPoints:e,numNewPoints:p,newPoint:f&&f.newValues,newPointId:f&&f.point.id},function(){F(b)})}delete b.dragDropData;b.dragGuideBox&&(b.dragGuideBox.destroy(),delete b.dragGuideBox)}function S(a){var b=a.container,c=k.doc;L(a)&&(x(b,["mousedown","touchstart"],function(b){b=w(b,
a);var c=a.hoverPoint,d=k.merge(c&&c.series.options.dragDrop,c&&c.options.dragDrop),f=d.draggableX||!1;d=d.draggableY||!1;a.cancelClick=!1;!f&&!d||a.zoomOrPanKeyPressed(b)||(a.dragDropData&&a.dragDropData.isDragging?B(b,a):c&&M(c)&&(a.mouseIsDown=!1,E(b,c),c.firePointEvent("dragStart",b)))}),x(b,["mousemove","touchmove"],function(b){R(w(b,a),a)}),n(b,"mouseleave",function(b){B(w(b,a),a)}),a.unbindDragDropMouseUp=x(c,["mouseup","touchend"],function(b){B(w(b,a),a)}),a.hasAddedDragDropEvents=!0,n(a,
"destroy",function(){a.unbindDragDropMouseUp&&a.unbindDragDropMouseUp()}))}var m=f.objectEach,n=k.addEvent,v=k.pick,q=k.merge,h=k.seriesTypes;f=function(a){a=a.shapeArgs||a.graphic.getBBox();var b=a.r||0,c=a.height/2;return["M",0,b,"L",0,c-5,"A",1,1,0,0,0,0,c+5,"A",1,1,0,0,0,0,c-5,"M",0,c+5,"L",0,a.height-b]};var z=h.line.prototype.dragDropProps={x:{axis:"x",move:!0},y:{axis:"y",move:!0}};h.flags&&(h.flags.prototype.dragDropProps=z);var g=h.column.prototype.dragDropProps={x:{axis:"x",move:!0},y:{axis:"y",
move:!1,resize:!0,beforeResize:function(a,b,c){var d=c.series.translatedThreshold,e=a.attr("y");b.y>=c.series.options.threshold?(b=a.attr("height"),a.attr({height:Math.max(0,Math.round(b+(d?d-(e+b):0)))})):a.attr({y:Math.round(e+(d?d-e:0))})},resizeSide:function(a,b){var c=b.series.chart.dragHandles;a=a.y>=(b.series.options.threshold||0)?"top":"bottom";b=r(a);c[b]&&(c[b].destroy(),delete c[b]);return a},handlePositioner:function(a){var b=a.shapeArgs||a.graphic.getBBox();return{x:b.x,y:a.y>=(a.series.options.threshold||
0)?b.y:b.y+b.height}},handleFormatter:function(a){a=a.shapeArgs;var b=a.r||0,c=a.width/2;return["M",b,0,"L",c-5,0,"A",1,1,0,0,0,c+5,0,"A",1,1,0,0,0,c-5,0,"M",c+5,0,"L",a.width-b,0]}}};h.bullet&&(h.bullet.prototype.dragDropProps={x:g.x,y:g.y,target:{optionName:"draggableTarget",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){var b=a.targetGraphic.getBBox();return{x:a.barX,y:b.y+b.height/2}},handleFormatter:g.y.handleFormatter}});h.columnrange&&(h.columnrange.prototype.dragDropProps=
{x:{axis:"x",move:!0},low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){a=a.shapeArgs||a.graphic.getBBox();return{x:a.x,y:a.y+a.height}},handleFormatter:g.y.handleFormatter,propValidate:function(a,b){return a<=b.high}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){a=a.shapeArgs||a.graphic.getBBox();return{x:a.x,y:a.y}},handleFormatter:g.y.handleFormatter,propValidate:function(a,b){return a>=
b.low}}});h.boxplot&&(h.boxplot.prototype.dragDropProps={x:g.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.lowPlot}},handleFormatter:g.y.handleFormatter,propValidate:function(a,b){return a<=b.q1}},q1:{optionName:"draggableQ1",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.q1Plot}},handleFormatter:g.y.handleFormatter,propValidate:function(a,b){return a<=
b.median&&a>=b.low}},median:{axis:"y",move:!0},q3:{optionName:"draggableQ3",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.q3Plot}},handleFormatter:g.y.handleFormatter,propValidate:function(a,b){return a<=b.high&&a>=b.median}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.highPlot}},handleFormatter:g.y.handleFormatter,propValidate:function(a,b){return a>=b.q3}}});
h.ohlc&&(h.ohlc.prototype.dragDropProps={x:g.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotLow}},handleFormatter:g.y.handleFormatter,propValidate:function(a,b){return a<=b.open&&a<=b.close}},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotHigh}},handleFormatter:g.y.handleFormatter,propValidate:function(a,b){return a>=
b.open&&a>=b.close}},open:{optionName:"draggableOpen",axis:"y",move:!0,resize:!0,resizeSide:function(a){return a.open>=a.close?"top":"bottom"},handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotOpen}},handleFormatter:g.y.handleFormatter,propValidate:function(a,b){return a<=b.high&&a>=b.low}},close:{optionName:"draggableClose",axis:"y",move:!0,resize:!0,resizeSide:function(a){return a.open>=a.close?"bottom":"top"},handlePositioner:function(a){return{x:a.shapeArgs.x,y:a.plotClose}},handleFormatter:g.y.handleFormatter,
propValidate:function(a,b){return a<=b.high&&a>=b.low}}});if(h.arearange){z=h.columnrange.prototype.dragDropProps;var J=function(a){a=a.graphic?a.graphic.getBBox().width/2+1:4;return["M",0-a,0,"a",a,a,0,1,0,2*a,0,"a",a,a,0,1,0,-2*a,0]};h.arearange.prototype.dragDropProps={x:z.x,low:{optionName:"draggableLow",axis:"y",move:!0,resize:!0,resizeSide:"bottom",handlePositioner:function(a){return(a=a.lowerGraphic&&a.lowerGraphic.getBBox())?{x:a.x+a.width/2,y:a.y+a.height/2}:{x:-999,y:-999}},handleFormatter:J,
propValidate:z.low.propValidate},high:{optionName:"draggableHigh",axis:"y",move:!0,resize:!0,resizeSide:"top",handlePositioner:function(a){return(a=a.upperGraphic&&a.upperGraphic.getBBox())?{x:a.x+a.width/2,y:a.y+a.height/2}:{x:-999,y:-999}},handleFormatter:J,propValidate:z.high.propValidate}}}h.waterfall&&(h.waterfall.prototype.dragDropProps={x:g.x,y:q(g.y,{handleFormatter:function(a){return a.isSum||a.isIntermediateSum?null:g.y.handleFormatter(a)}})});if(h.xrange)var K=function(a,b){var c=a.series,
d=c.xAxis,e=c.yAxis;c=c.chart.inverted;b=d.toPixels(a[b],!0);var f=e.toPixels(a.y,!0);c?(b=d.len-b,f=e.len-f-a.shapeArgs.height/2):f-=a.shapeArgs.height/2;return{x:Math.round(b),y:Math.round(f)}},C=h.xrange.prototype.dragDropProps={y:{axis:"y",move:!0},x:{optionName:"draggableX1",axis:"x",move:!0,resize:!0,resizeSide:"left",handlePositioner:function(a){return K(a,"x")},handleFormatter:f,propValidate:function(a,b){return a<=b.x2}},x2:{optionName:"draggableX2",axis:"x",move:!0,resize:!0,resizeSide:"right",
handlePositioner:function(a){return K(a,"x2")},handleFormatter:f,propValidate:function(a,b){return a>=b.x}}};h.gantt&&(h.gantt.prototype.dragDropProps={y:C.y,start:q(C.x,{optionName:"draggableStart",validateIndividualDrag:function(a){return!a.milestone}}),end:q(C.x2,{optionName:"draggableEnd",validateIndividualDrag:function(a){return!a.milestone}})});"gauge pie sunburst wordcloud sankey histogram pareto vector windbarb treemap bellcurve sma map mapline".split(" ").forEach(function(a){h[a]&&(h[a].prototype.dragDropProps=
null)});var T={"default":{className:"highcharts-drag-box-default",lineWidth:1,lineColor:"#888",color:"rgba(0, 0, 0, 0.1)",cursor:"move",zIndex:900}},U={className:"highcharts-drag-handle",color:"#fff",lineColor:"rgba(0, 0, 0, 0.6)",lineWidth:1,zIndex:901};k.Chart.prototype.setGuideBoxState=function(a,b){var c=this.dragGuideBox;b=q(T,b);a=q(b["default"],b[a]);return c.attr({className:a.className,stroke:a.lineColor,strokeWidth:a.lineWidth,fill:a.color,cursor:a.cursor,zIndex:a.zIndex}).css({pointerEvents:"none"})};
k.Point.prototype.getDropValues=function(a,b,c){var d=this,e=d.series,f=q(e.options.dragDrop,d.options.dragDrop),h={},k=a.points[d.id],g;for(g in c)if(c.hasOwnProperty(g)){if(void 0!==n){var n=!1;break}n=!0}m(c,function(a,c){var p=k[c],g=e[a.axis+"Axis"];g=g.toValue((g.horiz?b.chartX:b.chartY)+k[c+"Offset"]);var u=a.axis.toUpperCase(),l=e[u.toLowerCase()+"Axis"].categories?1:0;l=v(f["dragPrecision"+u],l);var m=v(f["dragMin"+u],-Infinity);u=v(f["dragMax"+u],Infinity);l&&(g=Math.round(g/l)*l);g=Math.max(m,
Math.min(u,g));n&&a.propValidate&&!a.propValidate(g,d)||void 0===p||(h[c]=g)});return h};k.Series.prototype.getGuideBox=function(a){var b=this.chart,c=Infinity,d=-Infinity,e=Infinity,f=-Infinity,h;a.forEach(function(a){(a=a.graphic&&a.graphic.getBBox()||a.shapeArgs)&&(a.width||a.height||a.x||a.y)&&(h=!0,c=Math.min(a.x,c),d=Math.max(a.x+a.width,d),e=Math.min(a.y,e),f=Math.max(a.y+a.height,f))});return h?b.renderer.rect(c,e,d-c,f-e):b.renderer.g()};k.Point.prototype.showDragHandles=function(){var a=
this,b=a.series,c=b.chart,d=c.renderer,f=q(b.options.dragDrop,a.options.dragDrop);m(b.dragDropProps,function(e,h){var g=q(U,e.handleOptions,f.dragHandle),k={className:g.className,"stroke-width":g.lineWidth,fill:g.color,stroke:g.lineColor},m=g.pathFormatter||e.handleFormatter,l=e.handlePositioner;var p=e.validateIndividualDrag?e.validateIndividualDrag(a):!0;e.resize&&p&&e.resizeSide&&m&&(f["draggable"+e.axis.toUpperCase()]||f[e.optionName])&&!1!==f[e.optionName]&&(c.dragHandles||(c.dragHandles={group:d.g("drag-drop-handles").add(b.markerGroup||
b.group)}),c.dragHandles.point=a.id,l=l(a),k.d=p=m(a),m="function"===typeof e.resizeSide?e.resizeSide(a.options,a):e.resizeSide,!p||0>l.x||0>l.y||(k.cursor=g.cursor||"x"===e.axis!==!!c.inverted?"ew-resize":"ns-resize",(e=c.dragHandles[m])||(e=c.dragHandles[m]=d.path().add(c.dragHandles.group)),e.translate(l.x,l.y).attr(k),x(e.element,["touchstart","mousedown"],function(b){b=w(b,c);var d=a.series.chart;d.zoomOrPanKeyPressed(b)||(d.mouseIsDown=!1,E(b,a),d.dragDropData.updateProp=b.updateProp=h,a.firePointEvent("dragStart",
b),b.stopPropagation(),b.preventDefault())}),n(c.dragHandles.group.element,"mouseover",function(){c.dragDropData=c.dragDropData||{};c.dragDropData.isHoveringHandle=a.id}),x(c.dragHandles.group.element,["touchend","mouseout"],function(){var b=a.series.chart;b.dragDropData&&a.id===b.dragDropData.isHoveringHandle&&delete b.dragDropData.isHoveringHandle;b.hoverPoint||G(a)})))})};k.Chart.prototype.hideDragHandles=function(){this.dragHandles&&(m(this.dragHandles,function(a,b){"group"!==b&&a.destroy&&a.destroy()}),
this.dragHandles.group&&this.dragHandles.group.destroy&&this.dragHandles.group.destroy(),delete this.dragHandles)};n(k.Point,"mouseOver",function(){var a=this;setTimeout(function(){var b=a.series,c=b&&b.chart,d=c&&c.dragDropData;!c||d&&d.isDragging&&d.draggedPastSensitivity||c.isDragDropAnimating||!b.options.dragDrop||c.options&&c.options.chart&&c.options.chart.options3d||(c.dragHandles&&c.hideDragHandles(),a.showDragHandles())},12)});n(k.Point,"mouseOut",function(){var a=this;setTimeout(function(){a.series&&
G(a)},10)});n(k.Point,"remove",function(){var a=this.series.chart,b=a.dragHandles;b&&b.point===this.id&&a.hideDragHandles()});k.Chart.prototype.zoomOrPanKeyPressed=function(a){var b=this.userOptions.chart||{},c=b.panKey&&b.panKey+"Key";return a[b.zoomKey&&b.zoomKey+"Key"]||a[c]};n(k.Chart,"render",function(){this.hasAddedDragDropEvents||S(this)})});r(f,"masters/modules/draggable-points.src.js",[],function(){})});
//# sourceMappingURL=draggable-points.js.map