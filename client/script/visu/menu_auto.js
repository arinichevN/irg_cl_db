function MenuAuto() {
    this.type = VISU_TYPE.TOP;
    this.container = {};
    this.initialized = false;
    this.b1 = null;
    this.b2 = null;
    this.b3 = null;
    this.b4 = null;
    this.bb = null;
    this.init = function () {
        this.container = cvis();
        this.b1 = new NavigationButton(vvalve);
        this.b2 = new NavigationButton(vprogram);
        this.b3 = new NavigationButton(vtime_plan);
        this.b4 = new NavigationButton(vchange_plan);
        this.bb = new BackButton();
        a(this.container, [this.b1, this.b2, this.b3,this.b4, this.bb]);
        cla([this.b1, this.b2, this.b3,this.b4, this.bb], ["h20m", "ug1","f2"]);
        this.initialized = true;
    };
    this.getName = function () {
        return trans.get(406);
    };
    this.updateStr = function () {
        this.b1.updateStr();
        this.b2.updateStr();
        this.b3.updateStr();
        this.b4.updateStr();
        this.bb.updateStr();
    };
    this.show = function () {
        clr(this.container,'hdn');
    };
    this.hide = function () {
        cla(this.container,'hdn');
    };
}
var vmenu_auto = new MenuAuto();
visu.push(vmenu_auto);