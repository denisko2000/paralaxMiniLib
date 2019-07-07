// obj={
//     containner: containner,
//     paddings : [],
//     speeds : []
// }
function paralax(obj) {
    this.obj = obj;
    this.SetContainnerDefault();
    this.SetChildrenStyles();
    this.satWheel();
}
paralax.prototype.SetContainnerDefault = function() {
    this.containner = this.obj.containner;
    this.ContainnerHeight = this.containner.offsetHeight;
    this.containner.style.cssText = ' position: relative;\
    overflow-y : hidden;  \
    '
};
paralax.prototype.SetChildrenStyles = function() {
    this.children = this.containner.children;
    this.paddings = new Array();
    this.const = new Array();
    this.heights = new Array();
    this.speeds = new Array();
    this.objScroll = new Array();
    this.PaddingHeight = new Array();
    this.transform = new Array();
    for (let index = 0; index < this.children.length; index++) {
        this.heights[index] = this.children[index].offsetHeight;
        this.const[index] = (this.obj.paddings[index] != undefined) ? this.obj.paddings[index] : 100;
        this.paddings[index] = (index != 0) ? this.PaddingHeight[index - 1] + this.const[index] : this.const[index];
        if (this.paddings[index] > this.ContainnerHeight) {
            this.paddings[index] = this.ContainnerHeight;
        }
        this.PaddingHeight[index] = this.paddings[index] + this.heights[index];
        this.transform[index] = 0;
        this.speeds[index] = (this.obj.speeds[index]) ? this.obj.speeds[index] : 1;
        if (this.paddings[index] < this.ContainnerHeight) {
            this.objScroll.push(index);
        }
        this.children[index].style.cssText = 'position: absolute;\
        top:' + ((this.paddings[index] < this.ContainnerHeight) ? this.paddings[index] : this.ContainnerHeight) + 'px \
        '
    };
    console.log(this.PaddingHeight);
    console.log(this.paddings);
    console.log(this.const);


};
paralax.prototype.satWheel = function() {
    let ts = this;
    this.containner.addEventListener('wheel', function(e) {
        let delta = e.deltaY * (-1);
        for (let index = 0; index < ts.objScroll.length; index++) {
            ts.transform[ts.objScroll[index]] += delta * ts.speeds[ts.objScroll[index]];
            ts.children[ts.objScroll[index]].style.transform = 'translateY(' + ts.transform[ts.objScroll[index]] + 'px)';
        }
        for (let index = 0; index < ts.objScroll.length; index++) {
            if (ts.PaddingHeight[ts.objScroll[index]] + ts.transform[ts.objScroll[index]] <= 0 || ts.paddings[ts.objScroll[index]] + ts.transform[ts.objScroll[index]] >= ts.ContainnerHeight) {
                ts.objScroll.splice(index, 1);
            }
        }
        for (let index = 0; index < ts.objScroll.length; index++) {
            if (delta < 0 && ts.paddings[ts.objScroll[index] + 1] + ts.transform[ts.objScroll[index] + 1] - ts.PaddingHeight[ts.objScroll[index]] - ts.transform[ts.objScroll[index]] >= ts.const[ts.objScroll[index] + 1] && ts.objScroll.indexOf(ts.objScroll[index] + 1) == -1) {
                ts.objScroll.push(ts.objScroll[index] + 1);
            }
            if (delta > 0 && ts.paddings[ts.objScroll[index]] + ts.transform[ts.objScroll[index]] - ts.PaddingHeight[ts.objScroll[index] - 1] - ts.transform[ts.objScroll[index] - 1] >= ts.const[ts.objScroll[index]] && ts.objScroll.indexOf(ts.objScroll[index] - 1) == -1) {
                ts.objScroll.push(ts.objScroll[index] - 1);
            }
        }
    })
};