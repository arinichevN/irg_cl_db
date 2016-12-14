function Valve() {
    this.type = VISU_TYPE.TOP;
    this.container = {};
    this.data = [];
    this.prog = [];
    this.initialized = false;
    this.controller_state = null;
    this.t1 = null;
    this.ptglB = null;
    this.vtglB = null;
    this.saveB = null;
    this.getB = null;
    this.bb = null;
    this.tblFree = false;
    this.timer = null;
    this.timer_ul = null;
    this.btimer = null;
    this.t_block = false;
    this.vtgl_str = 374;
    this.ptgl_str = 371;
    this.last_sr = -1;
    this.last_sc = -1;
    this.row = {NAME: 0, PROG: 1, PREV: 2, RAIN: 3};
    this.updated = false;
    this.visible = false;
    this.init = function () {
        var self = this;
        this.container = cvis();
        this.t1 = new Table(self, 1, trans, [[301, "30%"], [375, "30%"], [380, "30%"], [303, "10%"]]);
        this.t1.m_style = "copy_cell";
        this.t1.cellClickControl([true, true, true, true]);
        this.t1.enable();
        this.vtglB = cb("");
        this.ptglB = cb("");
        this.getB = cb("");
        this.saveB = cb("");
        this.vtglB.onclick = function () {
            self.vtoggle();
        };
        this.ptglB.onclick = function () {
            self.ptoggle();
        };
        this.saveB.onclick = function () {
            self.save();
        };
        this.getB.onclick = function () {
            self.getData();
        };
        this.bb = new BackButton();
        var rcont = cd();
        var lcont = cd();
        a(lcont, [this.t1]);
        a(rcont, [this.ptglB, this.vtglB, this.getB, this.saveB, this.bb]);
        a(this.container, [lcont, rcont]);
        cla([lcont], ["w70m", "lg1"]);
        cla([rcont], ["w30m", "lg1"]);
        cla([this.ptglB, this.vtglB, this.getB, this.saveB, this.bb], ["h20m", "ug1"]);
        //  cla(this.vtglB, "disabled_btn");
        //   cla(this.ptglB, "disabled_btn");
        this.initialized = true;
    };
    this.getName = function () {
        return trans.get(405);
    };
    this.updateStr = function () {
        this.t1.updateHeader();
        this.updateTglBStr();
        this.saveB.innerHTML = trans.get(1);
        this.getB.innerHTML = trans.get(57);
        this.bb.updateStr();
    };
    this.updateTglBStr = function () {
        this.vtglB.innerHTML = trans.get(this.vtgl_str);
        this.ptglB.innerHTML = trans.get(this.ptgl_str);
    };
    this.cellChanged = function (id) {
        if (this.t_block) {
            this.t_block = false;
            return;
        }
        if (this.last_sc === this.t1.sc && this.last_sr === this.t1.sr) {
            console.log(this.data);
            if (this.data[this.t1.sr].is_master && this.t1.sc !== this.row.NAME) {
                logger.wrn(271);
                return;
            }
            switch (this.t1.sc) {
                case this.row.NAME:
                    var self = this;
                    vstring_edit_smp.prep(this.data[this.t1.sr].name, app.NAME_SIZE, self, this.t1.sc, 301);
                    showV(vstring_edit_smp);
                    break;
                case this.row.PROG:
                    var self = this;
                    var data = [];
                    for (var i = 0; i < this.prog.length; i++) {
                        var enabled = false;
                        if (this.data[this.t1.sr].prog_id === this.prog[i].id) {
                            enabled = true;
                        }
                        data.push([this.prog[i].name, enabled]);
                    }
                    vselect_edit.prep(data, false, self, this.t1.sc, 375);
                    showV(vselect_edit);
                    break;
                case this.row.PREV:
                    var self = this;
                    var data = [];
                    for (var i = 0; i < this.data.length; i++) {
                        var enabled = false;
                        if (this.data[this.t1.sr].prev_id === this.data[i].id) {
                            enabled = true;
                        }
                        data.push([this.data[i].name, enabled]);
                    }
                    vselect_edit.prep(data, false, self, this.t1.sc, 380);
                    showV(vselect_edit);
                    break;
                case this.row.RAIN:
                    if (this.data[this.t1.sr].rain_sensitive) {
                        this.data[this.t1.sr].rain_sensitive = 0;
                    } else {
                        this.data[this.t1.sr].rain_sensitive = 1;
                    }
                    this.t1.updateCell(this.t1.sr, this.t1.sc, boolToStr(this.data[this.t1.sr].rain_sensitive));
                    break;
            }
        }
        if (this.last_sr !== this.t1.sr) {
            this.sendU();
        }
        this.last_sc = this.t1.sc;
        this.last_sr = this.t1.sr;
    };
    this.catchEdit = function (d, k) {
        switch (k) {
            case this.row.NAME:
                this.data[this.t1.sr].name = d;
                this.t1.updateCell(this.t1.sr, this.t1.sc, this.data[this.t1.sr].name);
                break;
            case this.row.PROG:
                var found = false;
                for (var i = 0; i < d.length; i++) {
                    if (d[i][1]) {
                        this.data[this.t1.sr].prog_id = this.prog[i].id;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.data[this.t1.sr].prog_id = -1;
                }
                this.t1.updateCell(this.t1.sr, this.t1.sc, this.getProgNameById(this.data[this.t1.sr].prog_id));
                break;
            case this.row.PREV:
                var found = false;
                for (var i = 0; i < d.length; i++) {
                    if (d[i][1]) {
                        this.data[this.t1.sr].prev_id = this.data[i].id;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.data[this.t1.sr].prev_id = -1;
                }
                this.t1.updateCell(this.t1.sr, this.t1.sc, this.getValveNameById(this.data[this.t1.sr].prev_id));
                break;
            default:
                console.log("catchEdit: bad k");
                break;
        }
    };
    this.ptoggle = function () {
        var self = this;
        cursor_blocker.enable();
        if (this.ptgl_str === 370) {
            app.sendValveProgStop(self, [this.data[this.t1.sr].id]);
        } else if (this.ptgl_str === 369) {
            app.sendValveProgStart(self, [this.data[this.t1.sr].id]);
        }
    };
    this.vtoggle = function () {
        var self = this;
        cursor_blocker.enable();
        if (this.vtgl_str === 379) {
            app.sendValveTurnOff(self, [this.data[this.t1.sr].id]);
        } else if (this.vtgl_str === 378) {
            app.sendValveTurnOn(self, [this.data[this.t1.sr].id]);
        }
    };
    this.getRow = function (id) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                return i;
            }
        }
        return -1;
    };
    this.updateTbl = function () {
        for (var i = 0; i < this.data.length; i++) {
            if (this.progIsLoaded(this.data[i].id)) {
                this.t1.unmarkCellDis(i, 0);
            } else {
                this.t1.markCellDis(i, 0);
            }
            if (this.progIsRunning(this.data[i].id)) {
                this.t1.markCell(i, 0, app.STYLE.ACTIVATED);
            } else {
                this.t1.unmarkCell(i, 0, app.STYLE.ACTIVATED);
            }
        }
    };
    this.getValveByProgId = function (prog_id) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].prog_id === prog_id) {
                return this.data[i];
            }
        }
        return null;
    };

    this.getProgById = function (id) {
        for (var i = 0; i < this.prog.length; i++) {
            if (this.prog[i].id === id) {
                return this.prog[i];
            }
        }
        return null;
    };
    this.getProgNameById = function (id) {
        for (var i = 0; i < this.prog.length; i++) {
            if (this.prog[i].id === id) {
                return this.prog[i].name;
            }
        }
        return "";
    };
    this.getValveNameById = function (id) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                return this.data[i].name;
            }
        }
        return "";
    };
    this.sendU = function () {
        var self = this;
        cursor_blocker.enable();
        app.sendControllerGetValveData(self, [this.data[this.t1.sr].id]);
    };

    this.sendP = function () {
        var self = this;
        app.sendControllerGetState(self);
    };
    this.getData = function () {
        var self = this;
        cursor_blocker.enable();
        app.sendValveProgGeta(self);
    };
    this.save = function () {
        var self = this;
        cursor_blocker.enable();
        app.sendValveSave(self, this.data);
    };
    this.confirm = function (action, d, n) {
        switch (action) {
            case app.ACTION.VALVE_PROG_GETA:
                cleara(this.data);
                for (var i = 0; i < d.valve.length; i++) {
                    this.data.push({
                        id: parseInt(d.valve[i].id),
                        name: d.valve[i].name,
                        prev_id: parseInt(d.valve[i].prev_id),
                        prog_id: parseInt(d.valve[i].prog_id),
                        rain_sensitive: parseInt(d.valve[i].rain_sensitive),
                        is_master: parseInt(d.valve[i].is_master)
                    });
                }
                cleara(this.prog);
                for (var i = 0; i < d.prog.length; i++) {
                    this.prog.push({
                        id: parseInt(d.prog[i].id),
                        name: d.prog[i].name
                    });
                }
                this.t_block = true;
                this.redrawTbl();
                //   this.sendU();
                this.updated = true;
                break;
            case  app.ACTION.CONTROLLER.VALVE.GET_DATA:
                if (d.length === 0) {
                    this.ptglB.disabled = true;
                    this.ptgl_str = 371;
                    this.vtgl_str = 374;
                    this.ptglB.disabled = true;
                    this.vtglB.disabled = true;
                } else {
                    if (parseFloat(d[0].last_output) === 1) {
                        this.vtgl_str = 379;
                    } else {
                        this.vtgl_str = 378;
                    }
                    this.vtglB.disabled = false;
                    var prog = this.getProgById(this.data[this.t1.sr].prog_id);
                    if (prog === null || this.data[this.t1.sr].is_master) {//no program to control
                        this.ptglB.disabled = true;
                        this.ptgl_str = 371;
                    } else {
                        this.ptglB.disabled = false;
                        if (d[0].state === "NULL") {//no running program
                            this.ptgl_str = 369;
                        } else {//program is running
                            this.ptgl_str = 370;
                        }
                    }

                }
                this.updateTglBStr();
                break;
            case app.ACTION.CONTROLLER.VALVE.TURN_ON:
            case app.ACTION.CONTROLLER.VALVE.TURN_OFF:
                this.delaySendState();
                cursor_blocker.disable();
                break;
            case app.ACTION.CONTROLLER.VALVE.PROG_START:
            case app.ACTION.CONTROLLER.VALVE.PROG_STOP:
                this.delaySendState();
                cursor_blocker.disable();
                break;
            case app.ACTION.CONTROLLER.GET_STATE:
                if (d === ACP.RESP.APP_BUSY) {
                    this.vtglB.disabled = false;
                    var prog = this.getProgById(this.data[this.t1.sr].prog_id);
                    if (prog === null) {
                        this.ptglB.disabled = true;
                        this.ptgl_str = 371;
                    } else {
                        this.ptglB.disabled = false;
                        this.ptgl_str = 369;
                    }
                    this.vtgl_str = 374;
                    this.ptgl_str = 371;
                } else {
                    this.vtglB.disabled = true;
                    this.ptglB.disabled = true;
                    this.vtgl_str = 374;
                    this.ptgl_str = 371;
                }
                this.updateTglBStr();
                cursor_blocker.disable();
                break;
        }
        cursor_blocker.disable();

    };
    this.abort = function (action, m, n) {
        switch (action) {
            case app.ACTION.VALVE_PROG_GETA:
                logger.fail();
                cursor_blocker.disable();
                break;
            case app.ACTION.CONTROLLER.VALVE.GET_DATA:
                this.sendP();
                break;
            case app.ACTION.CONTROLLER.VALVE.TURN_ON:
            case app.ACTION.CONTROLLER.VALVE.TURN_OFF:
                logger.fail();
                cursor_blocker.disable();
                break;
            case app.ACTION.CONTROLLER.VALVE.PROG_START:
            case app.ACTION.CONTROLLER.VALVE.PROG_STOP:
                logger.fail();
                cursor_blocker.disable();
                break;
            case app.ACTION.CONTROLLER.GET_STATE:
                this.vtglB.disabled = true;
                this.ptglB.disabled = true;
                this.vtglB.innerHTML = trans.get(374);
                this.ptglB.innerHTML = trans.get(371);
                cursor_blocker.disable();
                break;
            case app.ACTION.VALVE.SAVE:
                logger.err(202);
                cursor_blocker.disable();
                break;
        }
    };
    this.freeAll = function () {
        if (!this.tblFree) {
            this.freeTbl();
            this.btnCntVtgl();
            this.btnCntPtgl();
            this.tblFree = true;
        }
    };
    this.delaySendPing = function () {
        if (this.visible) {
            var self = this;
            this.ttimer = window.setTimeout(function () {
                self.sendP();
            }, 700);
        }
    };
    this.delaySendState = function () {
        if (this.visible) {
            var self = this;
            this.btimer = window.setTimeout(function () {
                self.sendU();
            }, 700);
        }
    };
    this.freeTbl = function () {
        for (var i = 0; i < this.data.length; i++) {
            this.t1.unmarkCell(i, 0);
            this.t1.markCellDis(i, 0);
        }
    };
    this.redrawTbl = function () {
        this.t1.clear();
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].is_master) {
                this.t1.appendRow([
                    this.data[i].name,
                    "&empty;",
                    "&empty;",
                    "&empty;"
                ]);
            } else {
                this.t1.appendRow([
                    this.data[i].name,
                    this.getProgNameById(this.data[i].prog_id),
                    this.getValveNameById(this.data[i].prev_id),
                    boolToStr(this.data[i].rain_sensitive)
                ]);
            }
        }
        this.t1.selectFirstCell();
    };
    this.show = function () {
        this.container.classList.remove('hdn');
        this.visible = true;
        this.sendU();
        //  this.delaySendState();
    };
    this.hide = function () {
        this.container.classList.add('hdn');
        if (this.btimer !== null) {
            window.clearTimeout(this.btimer);
            this.btimer = null;
        }
        this.visible = false;
    };
}
var vvalve = new Valve();
visu.push(vvalve);