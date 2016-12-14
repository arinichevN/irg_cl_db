function ProgramEdit() {
    this.type = VISU_TYPE.TOP;
    this.container = {};
    this.STYLE = {
        BLOCK_ACTIVE: "block_active",
        TOGGLE_ACTIVE: "toggle_active"
    };
    this.EDIT = {
        NAME: 1,
        TP: 2,
        CP: 88,
        START_PREVIOUS: 9,
        START_MANUAL: 10,
        START_TIME: 11,
        START_MONTH: 12,
        START_WD: 13,
        BUSY_TIME: 14,
        IDLE_TIME: 15,
        REPEAT: 16,
        BUSY_TIME_CP: 17,
        BUSY_TIME_INF: 18,
        REPEAT_INF: 19
    };
    this.data = {};
    this.KIND_MANUAL = 'm';
    this.KIND_PREVIOUS = 'p';
    this.KIND_TIME = 't';
    this.kind = null;
    this.name_active = false;
    this.UPDATE = 1;
    this.SAVE = 2;
    this.update = true;
    this.update_value = false;
    this.initialized = false;
    this.applyB = null;
    this.cancelB = null;
    this.name_cont = cd();
    this.name_head = null;
    this.name_value = null;
    this.tp_cont = null;
    this.tp_head = null;
    this.tp_value = null;
    this.cp_cont = null;
    this.cp_head = null;
    this.cp_value = null;
    this.mc_cont = null;
    this.mc_head = null;
    this.mc_busytime_cont = null;
    this.mc_busytime_head = null;
    this.mc_busytime_gcont = null;
    this.mc_busytime_inf = null;
    this.mc_busytime_time = null;
    this.mc_idletime_cont = null;
    this.mc_idletime_head = null;
    this.mc_idletime_value = null;
    this.mc_repeat_cont = null;
    this.mc_repeat_head = null;
    this.mc_repeat_gcont = null;
    this.mc_repeat_num = null;
    this.mc_repeat_inf = null;
    this.mcstart_cont = null;
    this.mcstart_head = null;
    this.mcstart_type_cont = null;
    this.mcstart_type_head = null;
    this.mcstart_gcont = null;
    this.mcstart_manual = null;
    this.mcstart_after = null;
    this.mcstart_time = null;
    this.mcstart_restr_cont = null;
    this.mcstart_restr_head = null;
    this.mcstart_restr_month_cont = null;
    this.mcstart_restr_month_head = null;
    this.mcstart_restr_month_value_cont = null;
    this.mcstart_restr_month_value = [];
    this.mcstart_restr_wd_cont = null;
    this.mcstart_restr_wd_head = null;
    this.mcstart_restr_wd_value_cont = null;
    this.mcstart_restr_wd_value = [];
    this.init = function () {
        var self = this;
        this.container = cvis();
        this.name_cont = cd();
        this.name_head = cd();
        this.name_value = cd();
        this.tp_cont = cd();
        this.tp_head = cd();
        this.tp_value = cd();
        this.cp_cont = cd();
        this.cp_head = cd();
        this.cp_value = cd();
        this.mc_cont = cd();
        this.mc_head = cd();
        this.mc_busytime_cont = cd();
        this.mc_busytime_head = cd();
        this.mc_busytime_gcont = cd();
        this.mc_busytime_inf = cd();
        this.mc_busytime_time = cd();
        this.mc_idletime_cont = cd();
        this.mc_idletime_head = cd();
        this.mc_idletime_value = cd();
        this.mc_repeat_cont = cd();
        this.mc_repeat_head = cd();
        this.mc_repeat_gcont = cd();
        this.mc_repeat_num = cd();
        this.mc_repeat_inf = cd();
        this.mcstart_cont = cd();
        this.mcstart_head = cd();
        this.mcstart_type_cont = cd();
        this.mcstart_type_head = cd();
        this.mcstart_gcont = cd();
        this.mcstart_manual = cd();
        this.mcstart_after = cd();
        this.mcstart_time = cd();
        this.mcstart_restr_cont = cd();
        this.mcstart_restr_head = cd();
        this.mcstart_restr_month_cont = cd();
        this.mcstart_restr_month_head = cd();
        this.mcstart_restr_month_value_cont = cd();
        for (var i = 0; i < 12; i++) {
            var elem = cd();
            var id = i;
            elem.innerHTML = trans.get(trans.MONTH_OFFSET + i);
            elem.onclick = function (event) {
                event.stopPropagation();
                self.monthClick(this);
            };
            this.mcstart_restr_month_value.push(elem);
        }
        this.mcstart_restr_wd_cont = cd();
        this.mcstart_restr_wd_head = cd();
        this.mcstart_restr_wd_value_cont = cd();
        this.mcstart_restr_wd_value = [];
        for (var i = 0; i < 7; i++) {
            var elem = cd();
            var id = i;
            elem.innerHTML = trans.get(trans.WEEKDAY_OFFSET + i);
            elem.onclick = function (event) {
                event.stopPropagation();
                self.wdClick(this);
            };
            this.mcstart_restr_wd_value.push(elem);
        }
        this.applyB = cb("");
        this.applyB.onclick = function () {
            self.apply();
        };
        this.cancelB = cb("");
        this.cancelB.onclick = function () {
            self.cancel();
        };
        this.name_value.onclick = function (event) {
            event.stopPropagation();
            self.paramClick(self.EDIT.NAME);
        };
        this.tp_value.onclick = function (event) {
            event.stopPropagation();
            self.paramClick(self.EDIT.TP);
        };
        this.cp_value.onclick = function (event) {
            event.stopPropagation();
            self.paramClick(self.EDIT.CP);
        };
        this.mcstart_manual.onclick = function (event) {
            event.stopPropagation();
            self.paramClick(self.EDIT.START_MANUAL);
        };
        this.mcstart_after.onclick = function (event) {
            event.stopPropagation();
            self.paramClick(self.EDIT.START_PREVIOUS);
        };
        this.mcstart_time.onclick = function (event) {
            event.stopPropagation();
            self.paramClick(self.EDIT.START_TIME);
        };
        this.mc_busytime_time.onclick = function (event) {
            event.stopPropagation();
            self.paramClick(self.EDIT.BUSY_TIME);
        };
        this.mc_busytime_inf.onclick = function (event) {
            event.stopPropagation();
            self.paramClick(self.EDIT.BUSY_TIME_INF);
        };
        this.mc_idletime_cont.onclick = function (event) {
            event.stopPropagation();
            self.paramClick(self.EDIT.IDLE_TIME);
        };
        this.mc_repeat_num.onclick = function (event) {
            event.stopPropagation();
            self.paramClick(self.EDIT.REPEAT);
        };
        this.mc_repeat_inf.onclick = function (event) {
            event.stopPropagation();
            self.paramClick(self.EDIT.REPEAT_INF);
        };
        ael([this.name_cont, this.tp_cont, this.cp_cont, this.mcstart_cont, this.mc_cont], "click", function () {
            self.contClick(this);
        });
        var blcont = cd();
        var btcont = cd();
        cla(this.container, "section_free");
        cla([this.name_cont, this.tp_cont, this.cp_cont, this.mcstart_cont, this.mc_cont], "block");
        cla([this.name_head, this.tp_head, this.cp_head, this.mcstart_head, this.mc_head], "block_head");
        cla([this.mcstart_after, this.mcstart_time, this.mcstart_manual, this.mc_busytime_time, this.mc_busytime_inf, this.mc_repeat_num, this.mc_repeat_inf], "toggleable");
        cla([this.mcstart_restr_month_value_cont, this.mcstart_restr_wd_value_cont, this.mc_busytime_gcont, this.mc_repeat_gcont, this.mcstart_gcont], "toggle_cont");
        cla([this.mcstart_restr_cont, this.mcstart_restr_month_cont, this.mcstart_restr_wd_cont, this.mcstart_type_cont, this.mc_busytime_cont, this.mc_idletime_cont, this.mc_repeat_cont], "sub_block");
        cla([this.mc_busytime_head, this.mc_idletime_head, this.mc_repeat_head, this.mcstart_type_head, this.mcstart_restr_head, this.mcstart_restr_wd_head, this.mcstart_restr_month_head], "sub_block_head");
        cla([this.name_value, this.tp_value, this.cp_value, this.mc_idletime_value], "sub_block1");
        cla(this.mcstart_restr_month_value, ["toggleable", "fl"]);
        cla(this.mcstart_restr_wd_value, ["toggleable", "fl"]);
        cla([this.name_value, this.mc_busytime_time, this.mc_idletime_value, this.mc_repeat_num, this.tp_value, this.cp_value], "editable");
        cla([this.cancelB, this.applyB], ["w50m", "lg05"]);
        cla(blcont, "block_cont");
        cla(btcont, "btn_cont");
        a(btcont, [this.cancelB, this.applyB]);
        a(this.name_cont, [this.name_head, this.name_value]);
        a(this.tp_cont, [this.tp_head, this.tp_value]);
        a(this.cp_cont, [this.cp_head, this.cp_value]);

        a(this.mc_busytime_gcont, [this.mc_busytime_time, this.mc_busytime_inf]);
        a(this.mc_busytime_cont, [this.mc_busytime_head, this.mc_busytime_gcont]);
        a(this.mc_idletime_cont, [this.mc_idletime_head, this.mc_idletime_value]);
        a(this.mc_repeat_gcont, [this.mc_repeat_num, this.mc_repeat_inf]);
        a(this.mc_repeat_cont, [this.mc_repeat_head, this.mc_repeat_gcont]);
        a(this.mc_cont, [this.mc_head, this.mc_busytime_cont, this.mc_idletime_cont, this.mc_repeat_cont]);
        a(this.mcstart_gcont, [this.mcstart_manual, this.mcstart_after, this.mcstart_time]);
        a(this.mcstart_type_cont, [this.mcstart_type_head, this.mcstart_gcont]);
        for (var i = 0; i < this.mcstart_restr_month_value.length; i++) {
            a(this.mcstart_restr_month_value_cont, this.mcstart_restr_month_value[i]);
        }
        a(this.mcstart_restr_month_cont, [this.mcstart_restr_month_head, this.mcstart_restr_month_value_cont]);
        for (var i = 0; i < this.mcstart_restr_wd_value.length; i++) {
            a(this.mcstart_restr_wd_value_cont, this.mcstart_restr_wd_value[i]);
        }
        a(this.mcstart_restr_wd_cont, [this.mcstart_restr_wd_head, this.mcstart_restr_wd_value_cont]);
        a(this.mcstart_restr_cont, [this.mcstart_restr_head, this.mcstart_restr_month_cont, this.mcstart_restr_wd_cont]);
        a(this.mcstart_cont, [this.mcstart_head, this.mcstart_type_cont, this.mcstart_restr_cont]);

        a(blcont, [this.name_cont, this.tp_cont, this.cp_cont, this.mcstart_cont, this.mc_cont]);
        a(this.container, [blcont, btcont]);
        this.initialized = true;
    };
    this.paramClick = function (kind, event) {
        switch (kind) {
            case this.EDIT.NAME:
                var self = this;
                vstring_edit_smp.prep(this.data.name, app.NAME_SIZE, self, this.EDIT.NAME, 301);
                showV(vstring_edit_smp);
                break;
            case this.EDIT.TP:
                var self = this;
                vint_edit.prep(this.data.time_plan_id, INT32_MIN, INT32_MAX, self, kind, 376);
                showV(vint_edit);
                break;
            case this.EDIT.CP:
                var self = this;
                vint_edit.prep(this.data.change_plan_id, INT32_MIN, INT32_MAX, self, kind, 377);
                showV(vint_edit);
                break;
            case this.EDIT.START_MANUAL:
                if (this.data.start_kind !== this.KIND_MANUAL) {
                    this.data.start_kind = this.KIND_MANUAL;
                    cla(this.mcstart_manual, this.STYLE.TOGGLE_ACTIVE);
                    clr(this.mcstart_after, this.STYLE.TOGGLE_ACTIVE);
                    clr(this.mcstart_time, this.STYLE.TOGGLE_ACTIVE);
                }
                break;
            case this.EDIT.START_PREVIOUS:
                if (this.data.start_kind !== this.KIND_PREVIOUS) {
                    this.data.start_kind = this.KIND_PREVIOUS;
                    clr(this.mcstart_manual, this.STYLE.TOGGLE_ACTIVE);
                    cla(this.mcstart_after, this.STYLE.TOGGLE_ACTIVE);
                    clr(this.mcstart_time, this.STYLE.TOGGLE_ACTIVE);
                }
                break;
            case this.EDIT.START_TIME:
                if (this.data.start_kind !== this.KIND_TIME) {
                    this.data.start_kind = this.KIND_TIME;
                    clr(this.mcstart_manual, this.STYLE.TOGGLE_ACTIVE);
                    clr(this.mcstart_after, this.STYLE.TOGGLE_ACTIVE);
                    cla(this.mcstart_time, this.STYLE.TOGGLE_ACTIVE);
                }
                break;
            case this.EDIT.BUSY_TIME:
                if (this.data.busy_infinite === 1) {
                    this.data.busy_infinite = 0;
                    cla(this.mc_busytime_time, this.STYLE.TOGGLE_ACTIVE);
                    clr(this.mc_busytime_inf, this.STYLE.TOGGLE_ACTIVE);
                } else {
                    var self = this;
                    vtime_edit.prep(this.data.busy_time, 0, INT32_MAX, self, kind, 314);
                    showV(vtime_edit);
                }
                break;
            case this.EDIT.BUSY_TIME_INF:
                if (this.data.busy_infinite === 0) {
                    this.data.busy_infinite = 1;
                    clr(this.mc_busytime_time, this.STYLE.TOGGLE_ACTIVE);
                    cla(this.mc_busytime_inf, this.STYLE.TOGGLE_ACTIVE);
                }
                break;
            case this.EDIT.IDLE_TIME:
                var self = this;
                vtime_edit.prep(this.data.idle_time, 0, INT32_MAX, self, kind, 315);
                showV(vtime_edit);
                break;
            case this.EDIT.REPEAT:
                if (this.data.repeat_infinite === 1) {
                    this.data.repeat_infinite = 0;
                    cla(this.mc_repeat_num, this.STYLE.TOGGLE_ACTIVE);
                    clr(this.mc_repeat_inf, this.STYLE.TOGGLE_ACTIVE);
                } else {
                    var self = this;
                    vint_edit.prep(this.data.repeat, 0, INT32_MAX, self, kind, 316);
                    showV(vint_edit);
                }
                break;
            case this.EDIT.REPEAT_INF:
                if (this.data.repeat_infinite === 0) {
                    this.data.repeat_infinite = 1;
                    clr(this.mc_repeat_num, this.STYLE.TOGGLE_ACTIVE);
                    cla(this.mc_repeat_inf, this.STYLE.TOGGLE_ACTIVE);
                }
                break;
            default:
                console.log("paramClick: unknown param");
                break;
        }
    };
    this.monthClick = function (elem) {
        var id = -1;
        var p = elem;
        while (p) {
            p = p.previousElementSibling;
            id++;
        }
        var arr = this.data.month_plan.split("");
        if (clc(this.mcstart_restr_month_value[id], this.STYLE.TOGGLE_ACTIVE)) {
            arr[id] = "0";
            clr(this.mcstart_restr_month_value[id], this.STYLE.TOGGLE_ACTIVE);
        } else {
            arr[id] = "1";
            cla(this.mcstart_restr_month_value[id], this.STYLE.TOGGLE_ACTIVE);
        }
        this.data.month_plan = arr.join("");
    };
    this.wdClick = function (elem) {
        var id = -1;
        var p = elem;
        while (p) {
            p = p.previousElementSibling;
            id++;
        }
        var arr = this.data.weekday_plan.split("");
        if (clc(this.mcstart_restr_wd_value[id], this.STYLE.TOGGLE_ACTIVE)) {
            arr[trans.wdRu2En(id)] = "0";
            clr(this.mcstart_restr_wd_value[id], this.STYLE.TOGGLE_ACTIVE);
        } else {
            arr[trans.wdRu2En(id)] = "1";
            cla(this.mcstart_restr_wd_value[id], this.STYLE.TOGGLE_ACTIVE);
        }
        this.data.weekday_plan = arr.join("");
    };
    this.catchEdit = function (d, k) {
        switch (k) {
            case this.EDIT.NAME:
                this.data.name = d;
                this.name_value.innerHTML = this.data.name;
                break;
            case this.EDIT.TP:
                this.data.time_plan_id = d;
                this.tp_value.innerHTML = this.data.time_plan_id;
                break;
            case this.EDIT.CP:
                this.data.change_plan_id = d;
                this.cp_value.innerHTML = this.data.change_plan_id;
                break;
            case this.EDIT.START_PREVIOUS:
                var found = false;
                for (var i = 0; i < d.length; i++) {
                    if (d[i][1]) {
                        this.data.parent_id = app.getProgIdByName(d[i][0]);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    this.data.parent_id = -1;

                }
                break;
            case this.EDIT.START_TIME:
                cleara(this.data.time_plan);
                for (var i = 0; i < d.length; i++) {
                    this.data.time_plan.push({start_time: d[i]});
                }
                break;
            case this.EDIT.START_MONTH:
                var plan = [];
                for (var i = 0; i < d.length; i++) {
                    if (d[i][1]) {
                        plan.push("1");
                    } else {
                        plan.push("0");
                    }
                }
                this.data.month_plan = plan.join("");
                this.updateMonthPlan();
                break;
            case this.EDIT.START_WD:
                var plan = [];
                for (var i = 0; i < d.length; i++) {
                    if (d[i][1]) {
                        plan.push("1");
                    } else {
                        plan.push("0");
                    }
                }
                this.data.weekday_plan = plan.join("");
                this.updateWeekdayPlan();
                break;
            case this.EDIT.BUSY_TIME:
                this.data.busy_time = d;
                this.mc_busytime_time.innerHTML = intToTimeStr(this.data.busy_time);
                break;
            case this.EDIT.IDLE_TIME:
                this.data.idle_time = d;
                this.mc_idletime_value.innerHTML = intToTimeStr(this.data.idle_time);
                break;
            case this.EDIT.REPEAT:
                this.data.repeat = d;
                this.mc_repeat_num.innerHTML = this.data.repeat;
                break;
            default:
                console.log("catchEdit: unknown param");
                break;
        }
    };
    this.contClick = function (elem) {
        if (clc(elem, "block_active")) {
            clr(elem, "block_active");
        } else {
            if (app.buf_id !== null && app.buf_id !== this.data.id) {
                cla(elem, "block_active");
            }
        }

    };
    this.updateMonthPlan = function () {
        var plan = this.data.month_plan.split("");
        for (var i = 0; i < plan.length; i++) {
            if (plan[i] === "1") {
                cla(this.mcstart_restr_month_value[i], this.STYLE.TOGGLE_ACTIVE);
            } else {
                clr(this.mcstart_restr_month_value[i], this.STYLE.TOGGLE_ACTIVE);
            }
        }
    };
    this.updateWeekdayPlan = function () {
        var plan = this.data.weekday_plan.split("");
        for (var i = 0; i < plan.length; i++) {
            if (plan[i] === "1") {
                cla(this.mcstart_restr_wd_value[trans.wdEn2Ru(i)], this.STYLE.TOGGLE_ACTIVE);
            } else {
                clr(this.mcstart_restr_wd_value[trans.wdEn2Ru(i)], this.STYLE.TOGGLE_ACTIVE);
            }
        }
    };
    this.getName = function () {
        return trans.get(407);
    };
    this.updateStr = function () {
        this.name_head.innerHTML = trans.get(301);
        this.tp_head.innerHTML = trans.get(376);
        this.cp_head.innerHTML = trans.get(377);
        this.mc_head.innerHTML = trans.get(336);
        this.mc_busytime_head.innerHTML = trans.get(314);
        this.mc_idletime_head.innerHTML = trans.get(315);
        this.mc_repeat_head.innerHTML = trans.get(316);
        this.mc_repeat_inf.innerHTML = trans.get(312);
        this.mc_busytime_inf.innerHTML = trans.get(312);
        this.mcstart_head.innerHTML = trans.get(335);
        this.mcstart_type_head.innerHTML = trans.get(360);
        this.mcstart_manual.innerHTML = trans.get(354);
        this.mcstart_after.innerHTML = trans.get(351);
        this.mcstart_time.innerHTML = trans.get(359);
        this.mcstart_restr_head.innerHTML = trans.get(352);
        this.mcstart_restr_month_head.innerHTML = trans.get(318);
        this.mcstart_restr_wd_head.innerHTML = trans.get(353);
        for (var i = 0; i < 12; i++) {
            this.mcstart_restr_month_value[i].innerHTML = trans.get(i + trans.MONTH_OFFSET);
        }
        for (var i = 0; i < 7; i++) {
            this.mcstart_restr_wd_value[i].innerHTML = trans.get(i + trans.WEEKDAY_OFFSET);
        }
        this.cancelB.innerHTML = trans.get(5);
        this.applyB.innerHTML = trans.get(2);
        if (this.update_value) {
            ;
        }
    };
    this.prep = function (data, slave, kind) {
        this.slave = slave;
        cpo(this.data, data);
        this.kind = kind;
        this.slave.update = false;
    };
    this.apply = function () {
        this.slave.catchEdit(this.data, this.kind);
        goBack();
    };
    this.cancel = function () {
        goBack();
    };
    this.updateView = function () {
        this.updateName();
        this.updateTP();
        this.updateCP();
        this.updateMcstart();
        this.updateMc();
        this.update_value = true;
    };
    this.updateCont = function () {
        clr(this.name_cont, "block_active");
        clr(this.tp_cont, "block_active");
        clr(this.cp_cont, "block_active");
        clr(this.mcstart_cont, "block_active");
        clr(this.mc_cont, "block_active");
    };
    this.updateName = function () {
        this.name_value.innerHTML = this.data.name;
    };
    this.updateTP = function () {
        this.tp_value.innerHTML = this.data.time_plan_id;

    };
    this.updateCP = function () {
        this.cp_value.innerHTML = this.data.change_plan_id;
    };
    this.updateMcstart = function () {
        switch (this.data.start_kind) {
            case this.KIND_MANUAL:
                cla(this.mcstart_manual, this.STYLE.TOGGLE_ACTIVE);
                clr(this.mcstart_after, this.STYLE.TOGGLE_ACTIVE);
                clr(this.mcstart_time, this.STYLE.TOGGLE_ACTIVE);
                break;
            case this.KIND_PREVIOUS:
                clr(this.mcstart_manual, this.STYLE.TOGGLE_ACTIVE);
                cla(this.mcstart_after, this.STYLE.TOGGLE_ACTIVE);
                clr(this.mcstart_time, this.STYLE.TOGGLE_ACTIVE);
                break;
            case this.KIND_TIME:
                clr(this.mcstart_manual, this.STYLE.TOGGLE_ACTIVE);
                clr(this.mcstart_after, this.STYLE.TOGGLE_ACTIVE);
                cla(this.mcstart_time, this.STYLE.TOGGLE_ACTIVE);
                break;
        }
        this.updateMonthPlan();
        this.updateWeekdayPlan();
    };
    this.updateMc = function () {
        this.mc_busytime_time.innerHTML = intToTimeStr(this.data.busy_time);
        this.mc_idletime_value.innerHTML = intToTimeStr(this.data.idle_time);
        this.mc_repeat_num.innerHTML = this.data.repeat;
        if (this.data.busy_infinite === 1) {
            clr(this.mc_busytime_time, this.STYLE.TOGGLE_ACTIVE);
            cla(this.mc_busytime_inf, this.STYLE.TOGGLE_ACTIVE);
        } else {
            cla(this.mc_busytime_time, this.STYLE.TOGGLE_ACTIVE);
            clr(this.mc_busytime_inf, this.STYLE.TOGGLE_ACTIVE);
        }
        if (this.data.repeat_infinite === 1) {
            clr(this.mc_repeat_num, this.STYLE.TOGGLE_ACTIVE);
            cla(this.mc_repeat_inf, this.STYLE.TOGGLE_ACTIVE);
        } else {
            cla(this.mc_repeat_num, this.STYLE.TOGGLE_ACTIVE);
            clr(this.mc_repeat_inf, this.STYLE.TOGGLE_ACTIVE);
        }
    };
    this.show = function () {
        if (this.update) {
            this.updateView();
            this.updateCont();
        } else {
            this.update = true;
        }
        clr(this.container, "hdn");
    };
    this.hide = function () {
        cla(this.container, "hdn");
    };
}
var vprogram_edit = new ProgramEdit();
visu.push(vprogram_edit);

