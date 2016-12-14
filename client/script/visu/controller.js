function Controller() {
    this.type = VISU_TYPE.TOP;
    this.container = null;
    this.dt = null;
    this.execB = null;
    this.stB = null;
    this.spB = null;
    this.bb = null;
    this.data = [];//[my_pin_id, type, name] type: device.type
    this.action = {
        START: 1,
        STOP: 2,
        PING: 3
    };
    this.btimer = null;
    this.initialized = false;
    this.visible = false;
    this.init = function () {
        var self = this;
        this.container = cvis();
        this.stB = cb("");
        this.spB = cb("");
        this.stB.onclick = function () {
            cursor_blocker.enable();app.sendControllerStart(self);
        };
        this.spB.onclick = function () {
            cursor_blocker.enable();app.sendControllerStop(self);
        };
        this.bb = new BackButton();
        a(this.container, [this.stB, this.spB, this.bb]);
        cla([this.stB, this.spB, this.bb], ["h30m", "ug1","f2"]);
        this.initialized = true;
    };
    this.getName = function () {
        return trans.get(412);
    };
    this.updateStr = function () {
        this.stB.innerHTML = trans.get(349);
        this.spB.innerHTML = trans.get(350);
        this.bb.updateStr();
    };
    this.confirm = function (action, d) {
        switch (action) {
            case app.ACTION.CONTROLLER.START:
                cursor_blocker.disable();
                break;
            case app.ACTION.CONTROLLER.STOP:
                cursor_blocker.disable();
                break;
            case app.ACTION.CONTROLLER.GET_STATE:
                if (d === ACP.RESP.APP_BUSY) {//controller is running
                    this.stB.disabled = true;
                    this.spB.disabled = false;
                } else if (d === ACP.RESP.APP_IDLE) {//controller is waiting for start
                    this.stB.disabled = false;
                    this.spB.disabled = true;
                } else {
                    this.stB.disabled = true;
                    this.spB.disabled = true;
                }
                this.startAUPD();
                break;
        }
    };
    this.abort = function (action, m) {
        switch (action) {
            case app.ACTION.CONTROLLER.GET_STATE:
                this.stB.disabled = true;
                this.spB.disabled = true;
                this.startAUPD();
                break;
        }

    };
    this.startAUPD = function () {
        if (this.visible) {
            var self = this;
            this.btimer = window.setTimeout(function () {
                app.sendControllerGetState(self);
            }, 700);
        }
    };
    this.show = function () {
        this.stB.disabled = true;
        this.spB.disabled = true;
        var self=this;
        app.sendControllerGetState(self);
        this.container.classList.remove('hdn');
        this.visible = true;
    };
    this.hide = function () {
        this.container.classList.add('hdn');
        this.visible = false;
    };
}
var vcontroller = new Controller();
visu.push(vcontroller);



