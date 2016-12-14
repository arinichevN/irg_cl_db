function PageBlocker() {
    this.container = null;
    this.active = false;
    this.init = function () {
        this.container = cd();
        cla(this.container, ['page_blocker', 'hdn']);
        a(document.body, this.container);
    };
    this.enable = function () {
        clr(this.container, 'hdn');
    };
    this.disable = function () {
        cla(this.container, 'hdn');
    };
    this.toggle = function () {
        if (clc(this.container, 'hdn')) {
            clr(this.container, 'hdn');
        } else {
            cla(this.container, 'hdn');
        }
    };
}
if (typeof cursor_blocker === 'undefined') {
    var cursor_blocker = new PageBlocker();
    elem.push(cursor_blocker);
} else {
    console.log("warning: you have another cursor_blocker");
}
