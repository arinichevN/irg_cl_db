function Language() {
    this.type = VISU_TYPE.TOP;
    this.container = {};
    this.initialized = false;
    this.rb = null;
    this.eb = null;
    this.bb = null;
    this.init = function () {
        this.container = cvis();
        this.bb = new BackButton();
        a(this.container, [trans, this.bb]);
        trans.setBStyle("h50m");
        cla(trans,"h60m");
        cla(this.bb, ["h33m","f2"]);
        this.initialized = true;
    };
    this.getName = function () {
        return "language";
    };
    this.updateStr = function () {
        this.bb.updateStr();
    };
    this.show = function () {
        this.container.classList.remove('hdn');
    };
    this.hide = function () {
        this.container.classList.add('hdn');
    };
}
var vlanguage = new Language();
visu.push(vlanguage);