function Commander() {
    this.type = VISU_TYPE.TOP;
    this.container = null;
    this.dt = null;
    this.execB = null;

    this.startB = null;
    this.stopB = null;
    this.printB = null;
    this.resetB = null;
    this.exitB = null;
    this.helpB = null;
    this.stateB = null;
    this.dateB = null;

    this.bb = null;
    this.tcont = null;
    this.data = [];//[my_pin_id, type, name] type: device.type
    this.action = {
        START: 1,
        STOP: 2,
        RESET: 3,
        EXIT: 4,
        PRINT: 5,
        GET_HELP: 6,
        GET_DATE: 7,
        GET_STATE: 8
    };
    this.btimer = null;
    this.initialized = false;
    this.visible = false;
    this.init = function () {
        var self = this;
        this.container = cvis();
        this.bcont = cd();
        this.startB = cb("start");
        this.stopB = cb("stop");
        this.resetB = cb("reset");
        this.exitB = cb("exit");
        this.printB = cb("print data");
        this.helpB = cb("get help");
        this.stateB = cb("get state");
        this.dateB = cb("get date");
        this.startB.onclick = function () {
            cursor_blocker.enable();
            app.sendControllerStart(self);
        };
        this.stopB.onclick = function () {
            cursor_blocker.enable();
            app.sendControllerStop(self);
        };
        this.resetB.onclick = function () {
            cursor_blocker.enable();
            app.sendControllerReset(self);
        };
        this.exitB.onclick = function () {
            cursor_blocker.enable();
            app.sendControllerExit(self);
        };
        this.printB.onclick = function () {
            cursor_blocker.enable();
            app.sendControllerPrint(self);
        };
        this.helpB.onclick = function () {
            cursor_blocker.enable();
            app.sendControllerGetHelp(self);
        };
        this.dateB.onclick = function () {
            cursor_blocker.enable();
            app.sendControllerGetDate(self);
        };
        this.stateB.onclick = function () {
            cursor_blocker.enable();
            app.sendControllerGetState(self);
        };
        this.bb = new BackButton();
        this.tcont = c("pre");
        cla([this.startB, this.stopB, this.resetB, this.exitB, this.printB, this.helpB, this.dateB, this.stateB, this.bb], ["sub_block","f2"]);
        cla([this.bcont, this.tcont], "sub_block");
        a(this.bcont, [this.startB, this.stopB, this.resetB, this.exitB, this.stateB, this.printB, this.helpB, this.dateB, this.bb]);
        a(this.container, [this.bcont, this.tcont]);
        this.initialized = true;
    };
    this.getName = function () {
        return trans.get(413);
    };
    this.updateStr = function () {
        this.bb.updateStr();
    };
    this.confirm = function (action, d) {
        switch (action) {
            case  app.ACTION.CONTROLLER.START:
            case app.ACTION.CONTROLLER.STOP:
            case app.ACTION.CONTROLLER.RESET:
            case app.ACTION.CONTROLLER.EXIT:
                break;
            case app.ACTION.CONTROLLER.PRINT:
            case app.ACTION.CONTROLLER.GET_STATE:
            case app.ACTION.CONTROLLER.GET_HELP:
                this.tcont.innerHTML = d;
                break
            case app.ACTION.CONTROLLER.GET_DATE:
                this.tcont.innerHTML = "year:" + d.year + ' month:' + d.month + ' day:' + d.day + ' hour:' + d.hour + " minute:" + d.min + " second:" + d.sec;
                break;
        }
        cursor_blocker.disable();
    };
    this.abort = function (action, m) {
        this.tcont.innerHTML = m;
        cursor_blocker.disable();

    };
    this.show = function () {
        this.container.classList.remove('hdn');
        this.visible = true;
    };
    this.hide = function () {
        this.container.classList.add('hdn');
        this.visible = false;
    };
}
var vcommander = new Commander();
visu.push(vcommander);



