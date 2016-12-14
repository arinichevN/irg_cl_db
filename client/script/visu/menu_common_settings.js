function MenuCommonSettings() {
    this.type = VISU_TYPE.TOP;
    this.container = {};
    this.initialized = false;
    this.b1 = null;
    this.b2 = null;
    this.bb = null;
    this.init = function () {
        this.container = cvis();
        this.b1 = new NavigationButton(vlanguage);
        this.b2 = new NavigationButton(vcontroller);
        this.bb = new BackButton();
        cla([this.b1, this.b2, this.bb], ["h33m", "ug1","f2"]);
        a(this.container, [this.b1, this.b2, this.bb]);
        this.initialized = true;
    };
    this.getName = function () {
        return trans.get(410);
    };
    this.updateStr = function () {
        this.b1.updateStr();
        this.b2.updateStr();
        this.bb.updateStr();
    };
    this.show = function () {
        this.container.classList.remove('hdn');
    };
    this.hide = function () {
        this.container.classList.add('hdn');
    };
}
var vmenu_common_settings = new MenuCommonSettings();
visu.push(vmenu_common_settings);

