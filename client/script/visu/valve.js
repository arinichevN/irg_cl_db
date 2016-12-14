function Valve() {
    this.type = VISU_TYPE.TOP;
    this.container = {};
    this.data = [];
    this.prog = [];
    this.initialized = false;
    this.controller_state = null;
    this.t1 = null;

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
        this.getB = cb("");
        this.saveB = cb("");
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
        a(rcont, [this.getB, this.saveB, this.bb]);
        a(this.container, [lcont, rcont]);
        cla([lcont], ["w70m", "lg1"]);
        cla([rcont], ["w30m", "lg1"]);
        cla([this.getB, this.saveB, this.bb], ["h33m", "ug1","f2"]);
        this.initialized = true;
    };
    this.getName = function () {
        return trans.get(405);
    };
    this.updateStr = function () {
        this.t1.updateHeader();
        this.saveB.innerHTML = trans.get(1);
        this.getB.innerHTML = trans.get(57);
        this.bb.updateStr();
    };
    this.cellChanged = function (id) {
        if (this.t_block) {
            this.t_block = false;
            return;
        }
        if (this.last_sc === this.t1.sc && this.last_sr === this.t1.sr) {
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
                        if (this.data[i].is_master === 0) {
                            data.push([this.data[i].name, enabled]);
                        }
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
                this.updated = true;
                break;
            case app.ACTION.VALVE.SAVE:
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
            case app.ACTION.VALVE.SAVE:
                logger.err(254);
                cursor_blocker.disable();
                break;
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