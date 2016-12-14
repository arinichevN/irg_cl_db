function Program() {
    this.type = VISU_TYPE.TOP;
    this.container = {};
    this.data = [];//[id, name]
    this.initialized = false;
    this.controller_state = null;
    this.DEFAULT_NAME = "ПРОГ";
    this.DEFAULT_BTIME = 10;
    this.DEFAULT_ITIME = 0;
    this.DEFAULT_REPEAT = 1;
    this.DEFAULT_BINF = 0;
    this.DEFAULT_RINF = 0;
    this.DEFAULT_START_KIND = 'm';
    this.DEFAULT_MON_PLAN = '111111111111';
    this.DEFAULT_WD_PLAN = '1111111';
    this.DEFAULT_TP_ID = -1;
    this.DEFAULT_CP_ID = -1;
    this.t1 = null;
    this.addB = null;
    this.delB = null;
    this.sortB = null;
    this.saveB = null;
    this.getB = null;
    this.bb = null;
    this.update = true;//editor will make it false
    this.last_sr = -1;
    this.last_sc = -1;
    this.row = {NUM: 0, GAP: 1, SHIFT: 2};
    this.btimer = null;
    this.del_block = false;
    this.DEFAULT_GAP = 0;
    this.DEFAULT_SHIFT = 0;
    this.action = {
        GET: 3,
        SAVE: 4
    };
    this.visible = false;
    this.init = function () {
        var self = this;
        this.container = cvis();
        this.t1 = new Table(self, 1, trans, [[301, "33%"]]);
        this.t1.m_style = "copy_cell";
        this.t1.cellClickControl([true]);
        this.t1.enable();
        this.addB = cb("");
        this.delB = cb("");
        this.sortB = cb("");
        this.saveB = cb("");
        this.getB = cb("");
        this.addB.onclick = function () {
            self.add();
        };
        this.delB.onclick = function () {
            self.delete();
        };
        this.sortB.onclick = function () {
            self.sort();
        };
        this.saveB.onclick = function () {
            self.save();
        };
        this.getB.onclick = function () {
            self.getData();
        };
        this.bb = new BackButton();
        var rcont = cd();
        var rrcont = cd();
        var rlcont = cd();
        a(rrcont, [this.addB, this.delB, this.bb]);
        a(rlcont, [this.getB, this.sortB, this.saveB]);
        a(rcont, [rrcont, rlcont]);
        a(this.container, [this.t1, rcont]);
        cla([this.t1], ["w50m", "lg1"]);
        cla([rcont], ["w50m", "lg1"]);
        cla([rrcont, rlcont], ["w50m", "lg1"]);
        cla([this.addB, this.delB, this.sortB, this.saveB, this.getB, this.bb], ["h33m", "ug1","f2"]);
        cla([this.t1.upB, this.t1.downB], "f1");
        this.initialized = true;
    };
    this.getName = function () {
        return trans.get(411);
    };
    this.updateStr = function () {
        this.t1.updateHeader();
        this.addB.innerHTML = trans.get(50);
        this.delB.innerHTML = trans.get(51);
        this.sortB.innerHTML = trans.get(56);
        this.saveB.innerHTML = trans.get(1);
        this.getB.innerHTML = trans.get(57);
        this.bb.updateStr();
    };
    this.cellChanged = function (id) {
        if (this.del_block) {
            this.del_block = false;
            return;
        }
        if (this.last_sc === this.t1.sc && this.last_sr === this.t1.sr) {
            var self = this;
            vprogram_edit.prep(this.data[this.t1.sr], self, 0);
            showV(vprogram_edit);
        }
        this.last_sc = this.t1.sc;
        this.last_sr = this.t1.sr;
        this.btnCntDel();
        this.btnCntAdd();
    };
    this.catchEdit = function (d, k) {
         cpo(this.data[this.t1.sr], d);
        this.t1.updateCell(this.t1.sr, this.t1.sc, this.data[this.t1.sr].name);
    };
    this.add = function () {
        this.del_block = true;
        var next_id = this.getNextId();
        if (next_id === null) {
            logger.fail();
            return;
        }
        var new_item = {
            id: next_id,
            name: this.DEFAULT_NAME,
            busy_time: this.DEFAULT_BTIME,
            idle_time: this.DEFAULT_ITIME,
            repeat: this.DEFAULT_REPEAT,
            busy_infinite: this.DEFAULT_BINF,
            repeat_infinite: this.DEFAULT_RINF,
            start_kind: this.DEFAULT_START_KIND,
            month_plan: this.DEFAULT_MON_PLAN,
            weekday_plan: this.DEFAULT_WD_PLAN,
            time_plan_id: this.DEFAULT_TP_ID,
            change_plan_id: this.DEFAULT_CP_ID
        };
        this.data.push(new_item);
        this.sort();
        this.redrawTbl();
        var id = this.getDataItemIndexById(next_id);
        if (id === null) {
            return;
        }
        this.t1.selectCell(id, 0);
        this.btnCntDel();
        this.btnCntAdd();
    };
    this.delete = function () {
        this.del_block = true;
        this.data.splice(this.t1.sr, 1);
        this.t1.deleteSelectedRow();
        this.btnCntDel();
        this.btnCntAdd();
    };
    this.getDataItemIndexById = function (k1) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id === k1) {
                return  i;
            }
        }
        return null;
    };
    this.getNextId = function () {
        var id = -1;
        while (1) {
            id += 1;
            if (id < 0) {
                return null;
            }
            if (id > INT32_MAX) {
                return null;
            }
            var item = this.getDataItem(id);
            if (item === null) {
                return id;
            }
        }
        return null;
    };
    this.sortId = function () {
        if (this.data.length) {
            var temp = null;
            var done = true;
            while (done) {
                done = false;
                for (var i = 0; i < this.data.length - 1; i++) {
                    if (this.data[i].id > this.data[i + 1].id) {
                        cpo(temp, this.data[i].id);
                        cpo(this.data[i], this.data[i + 1]);
                        cpo(this.data[i + 1], temp);
                        done = true;
                    }
                }
            }
        }
    };
    this.sort = function () {
        this.sortId();
        this.redrawTbl();
        this.btnCntDel();
        this.btnCntAdd();
    };
    this.save = function () {
        var data = [
            {
                action: ['program', 'save'],
                param: this.data
            }
        ];
        cursor_blocker.enable();
        sendTo(this, data, this.action.SAVE, "json_db");
    };
    this.getData = function () {
        var data = [
            {
                action: ["program", "geta"]
            }
        ];
        cursor_blocker.enable();
        sendTo(this, data, this.action.GET, "json_db");
    };
    this.btnCntDel = function () {
        if (this.data.length && this.t1.sr >= 0) {
            this.delB.disabled = false;
            return;
        }
        this.delB.disabled = true;
    };
    this.btnCntAdd = function () {
        if (this.t1.sr < 0 && this.data.length > 0) {
            this.addB.disabled = true;
            return;
        }
        this.addB.disabled = false;
    };
    this.confirm = function (action, d, n) {
        switch (action) {
            case this.action.GET:
                cleara(this.data);
                var i = 0;
                for (i = 0; i < d.length; i++) {
                    this.data.push({
                        id: parseInt(d[i].id),
                        name: d[i].name,
                        busy_time: parseInt(d[i].busy_time),
                        idle_time: parseInt(d[i].idle_time),
                        repeat: parseInt(d[i].repeat),
                        busy_infinite: parseInt(d[i].busy_infinite),
                        repeat_infinite: parseInt(d[i].repeat_infinite),
                        start_kind: d[i].start_kind,
                        month_plan: d[i].month_plan,
                        weekday_plan: d[i].weekday_plan,
                        time_plan_id: parseInt(d[i].time_plan_id),
                        change_plan_id: parseInt(d[i].change_plan_id)
                    });
                }
                this.redrawTbl();
                this.t1.selectFirstCell();
                this.btnCntDel();
                this.btnCntAdd();
                break;
            case this.action.SAVE:

                break;
        }
        cursor_blocker.disable();

    };
    this.abort = function (action, m, n) {
        switch (action) {
            case this.action.GET:
                logger.fail();
                break;
            case this.action.SAVE:
                logger.err(254);
                break;
        }
        cursor_blocker.disable();
    };
    this.getDataItem = function (k1) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id === k1) {
                return  this.data[i];
            }
        }
        return null;
    }
    ;
    this.redrawTbl = function () {
        this.last_sc = -1;
        this.last_sr = -1;
        this.t1.clear();
        for (var i = 0; i < this.data.length; i++) {
            this.t1.appendRow([this.data[i].name]);
        }
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
var vprogram = new Program();
visu.push(vprogram);
