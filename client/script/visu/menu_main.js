function MenuMain() {
    this.type = VISU_TYPE.MAIN;
    this.container = null;
    this.initialized = false;
    this.updated = false;
    this.b1 = null;
    this.b2 = null;
    this.b3 = null;
    this.b4 = null;
    this.init = function () {
        this.container = cvis();
        this.b1 = new NavigationButton(vmenu_auto);
        this.b2 = new NavigationButton(vmenu_common_settings);
        this.b3 = new NavigationButton(vcommander);
         this.b4 = new NavigationButton(vhelp);
        cla([this.b1, this.b2, this.b3,this.b4], ["h25m", "ug1", "f2"]);
        a(this.container, [this.b1, this.b2, this.b3, this.b4]);
        this.initialized = true;
    };
    this.getName = function () {
        return "/";
    };
    this.updateStr = function () {
        document.title = trans.get(300);
        this.b1.updateStr();
        this.b2.updateStr();
        this.b3.updateStr();
        this.b4.updateStr();
    };
    this.show = function () {
        if (!this.updated) {
            this.updated = true;
        }
        this.container.classList.remove('hdn');
    };
    this.hide = function () {
        this.container.classList.add('hdn');
    };
}
var vmenu_main = new MenuMain();
visu.push(vmenu_main);
