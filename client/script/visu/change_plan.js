function ChangePlan() {
    this.type = VISU_TYPE.TOP;
    this.container = {};
    this.data = [];//[id, name]
    this.initialized = false;
    this.controller_state = null;
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
        this.t1 = new Table(self, 1, trans, [[381, "33%"], [326, "33%"], [327, "33%"]]);
        this.t1.m_style = "copy_cell";
        this.t1.cellClickControl([true, true, true]);
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
        return trans.get(409);
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
            switch (this.t1.sc) {
                case this.row.NUM:
                    var self = this;
                    vint_edit.prep(this.data[this.t1.sr].id, 0, INT32_MAX, self, this.t1.sc, 381);
                    showV(vint_edit);
                    break;
                case this.row.GAP:
                    var self = this;
                    vtime_edit.prep(this.data[this.t1.sr].gap, 0, INT32_MAX, self, this.t1.sc, 326);
                    showV(vtime_edit);
                    break;
                case this.row.SHIFT:
                    var self = this;
                    vtime_edit.prep(this.data[this.t1.sr].shift, INT32_MIN, INT32_MAX, self, this.t1.sc, 327);
                    showV(vtime_edit);
                    break;
            }
        }
        this.last_sc = this.t1.sc;
        this.last_sr = this.t1.sr;
        this.btnCntDel();
        this.btnCntAdd();
    };
    this.catchEdit = function (d, k) {
        switch (k) {
            case this.row.NUM:
                var item = this.getDataItem(d, this.data[this.t1.sr].seq);
                if (item === null) {
                    this.data[this.t1.sr].id = d;
                    this.t1.updateCell(this.t1.sr, this.t1.sc, this.data[this.t1.sr].id);
                } else {
                    logger.err(205);
                }
                break;
            case this.row.GAP:
                this.data[this.t1.sr].gap = d;
                this.t1.updateCell(this.t1.sr, this.t1.sc, intToTimeStr(this.data[this.t1.sr].gap));
                break;
            case this.row.SHIFT:
                this.data[this.t1.sr].shift = d;
                this.t1.updateCell(this.t1.sr, this.t1.sc, intToTimeStr(this.data[this.t1.sr].shift));
                break;
            default:
                console.log("change_plan: catchEdit: bad k");
                break;
        }
    };
    this.add = function () {
        this.del_block = true;
        if (this.data.length) {
            if (this.t1.sr < 0) {
                logger.err(269);
                return;
            }
            var next_seq = this.getNextSeq(this.t1.sr);
            if (next_seq === null) {
                logger.fail();
                return;
            }
            var new_item = {id: this.data[this.t1.sr].id, seq: next_seq, gap: this.DEFAULT_GAP, shift: this.DEFAULT_SHIFT};
            this.data.splice(this.t1.sr, 0, new_item);
            var sr = this.t1.sr;
            var sc = this.t1.sc;
            this.redrawTbl();
            this.t1.selectCell(sr, sc);
        } else {
            this.data.push({id: 0, seq: 0, gap: this.DEFAULT_GAP, shift: this.DEFAULT_SHIFT});
            this.t1.appendRow([this.data[this.data.length - 1].id, intToTimeStr(this.data[this.data.length - 1].gap), intToTimeStr(this.data[this.data.length - 1].shift)]);
        }
    };
    this.delete = function () {
        this.del_block = true;
        this.data.splice(this.t1.sr, 1);
        this.t1.deleteSelectedRow();
        this.btnCntDel();
        this.btnCntAdd();
    };
    this.getNextSeq = function (selected_index) {
        var seq = this.data[selected_index].seq;
        var state = 0;
        while (1) {
            switch (state) {
                case 0://forward
                    seq += 1;
                    if (seq < 0) {
                        return null;
                    }
                    if (seq > INT32_MAX) {
                        seq = -1;
                        state = 1;
                        break;
                    }
                    var item = this.getDataItem(this.data[selected_index].id, seq);
                    if (item === null) {
                        return seq;
                    }
                    break;
                case 1://from 0 to selected_index
                    seq += 1;
                    if (seq < 0) {
                        return null;
                    }
                    if (seq > INT32_MAX) {
                        return null;
                    }
                    var item = this.getDataItem(this.data[selected_index].id, seq);
                    if (item === null) {
                        return seq;
                    }
                    break;
                default:
                    console.log("change_plan: getNextSeq: bad state");
                    return;
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
                        temp = {id: this.data[i].id, seq: this.data[i].seq, gap: this.data[i].gap, shift: this.data[i].shift};
                        this.data[i].id = this.data[i + 1].id;
                        this.data[i].seq = this.data[i + 1].seq;
                        this.data[i].gap = this.data[i + 1].gap;
                        this.data[i].shift = this.data[i + 1].shift;
                        this.data[i + 1].id = temp.id;
                        this.data[i + 1].seq = temp.seq;
                        this.data[i + 1].gap = temp.gap;
                        this.data[i + 1].shift = temp.shift;
                        done = true;
                    }
                }
            }
        }
    };
    this.sortSeq = function () {
        if (this.data.length) {
            var temp = null;
            var done = true;
            while (done) {
                done = false;
                for (var i = 0; i < this.data.length - 1; i++) {
                    if (this.data[i].id === this.data[i + 1].id && this.data[i].seq > this.data[i + 1].seq) {
                        temp = {id: this.data[i].id, seq: this.data[i].seq, gap: this.data[i].gap, shift: this.data[i].shift};
                        this.data[i].id = this.data[i + 1].id;
                        this.data[i].seq = this.data[i + 1].seq;
                        this.data[i].gap = this.data[i + 1].gap;
                        this.data[i].shift = this.data[i + 1].shift;
                        this.data[i + 1].id = temp.id;
                        this.data[i + 1].seq = temp.seq;
                        this.data[i + 1].gap = temp.gap;
                        this.data[i + 1].shift = temp.shift;
                        done = true;
                    }
                }
            }
        }
    };
    this.sort = function () {
        this.sortId();
        this.sortSeq();
        this.redrawTbl();
        this.btnCntDel();
        this.btnCntAdd();
    };
    this.save = function () {
        var data = [
            {
                action: ['change_plan', 'save'],
                param: this.data
            }
        ];
        cursor_blocker.enable();
        sendTo(this, data, this.action.SAVE, "json_db");
    };
    this.getData = function () {
        var data = [
            {
                action: ["change_plan", "geta"]
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
                        seq: parseInt(d[i].seq),
                        gap: parseInt(d[i].gap),
                        shift: parseInt(d[i].shift)
                    });
                }
                this.redrawTbl();
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
    this.getDataItem = function (k1, k2) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id === k1 && this.data[i].seq === k2) {
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
            this.t1.appendRow([this.data[i].id, intToTimeStr(this.data[i].gap), intToTimeStr(this.data[i].shift)]);
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
var vchange_plan = new ChangePlan();
visu.push(vchange_plan);
