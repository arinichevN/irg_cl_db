var app = {
    ACTION: {
        CONTROLLER: {
            START: 1,
            STOP: 2,
            RESET: 3,
            EXIT: 4,
            PRINT: 5,
            GET_HELP: 6,
            GET_DATE: 7,
            GET_STATE: 8,
            VALVE: {
                GET_DATAA: 9,
                GET_DATA: 10,
                PROG_RESET: 11,
                PROG_START: 12,
                PROG_STOP: 13,
                TURN_ON: 14,
                TURN_OFF: 15,
            }
        },
        VALVE: {
            GETAA: 16,
            GETAN: 17,
            SAVE: 18

        },
        PROGRAM: {
            GETA: 19,
            SAVE: 20
        },
        TIME_PLAN: {
            GETA: 21,
            SAVE: 22
        },
        CHANGE_PLAN: {
            GETA: 23,
            SAVE: 24
        },
        VALVE_PROG_GETA: 25
    },
    DEFAULT: {GAP: 60, SHIFT: 10},
    DEV_KIND: {IN: 0, OUT: 1, FREE: 2},
    START_KIND: {TIME: 't', PREVIOUS: 'p', MANUAL: 'm'},
    STATE: {
        ON: 1,
        OFF: 2,
        DO: 3,
        INIT: 4,
        CKIND: 5,
        WMANUAL: 6,
        WTOY: 7,
        WPST: 8,
        WPSP: 9,
        CMWD: 10,
        GTOD: 11,
        WNDAY: 12,
        WTOD: 13,
        CINF: 14,
        CREP: 15,
        WBTIME: 16,
        WITIME: 17,
        WBINF: 18,
        CSENS: 19,
        WRAIN: 20,
        SRAIN: 21,
        WDRY: 22,
        SDRY: 23,
        CSTEP: 24,
        WGAP: 25,
        MS_BUSY: 80,
        MS_IDLE: 81,
        APP_INIT_W: 90,
        APP_INIT_RUN: 91,
        APP_RUN: 92,
        APP_WAIT: 93,
        APP_STOP: 94
    },
    STYLE: {
        ACTIVATED: "active_element"
    },
    NAME_SIZE: 32,
    controller_state: null,
    //copy from db
    prog: [],
    valve: [],
    time_plan: [],
    change_plan: [],
    valve_data: [],
    buf_id: null,
    version: 1,
    controller_version: null,
    version_acceptable: {
        controller: [1],
        f_php: [2],
        f_js: [2]
    },
    init: function () {
        a(document.body, logger);
        this.checkJsVersion();
        trans.setLang(1, ["english", "русский"]);
        //    logger.enableDate();
        //   logger.dtHide();

        vtime_plan.getData();
        vchange_plan.getData();
        vprogram.getData();
        vvalve.getData();
        //alert("Hello")
        // this.sendCV();
    },
    update: function () {
        this.sendU();
    },
    checkJsVersion: function () {
        var found = false;
        for (var i = 0; i < this.version_acceptable.f_js.length; i++) {
            if (this.version_acceptable.f_js[i] === f_js_version) {
                found = true;
            }
        }
        if (!found) {
            var s1 = "current f_js version: " + f_js_version + "\n";
            var s2 = "acceptable f_js versions: " + this.version_acceptable.f_js.join(" ") + "\n";
            alert("incompatible f_js version!\n" + s1 + s2);
        }
    },
    checkControllerVersion: function (v) {
        this.controller_version = v;
        var found = false;
        for (var i = 0; i < this.version_acceptable.controller.length; i++) {
            if (this.version_acceptable.controller[i] === v) {
                found = true;
            }
        }
        if (!found) {
            var s1 = "current controller version: " + this.controller_version + "\n";
            var s2 = "acceptable controller versions: " + this.version_acceptable.controller.join(" ") + "\n";
            alert("incompatible controller version!\n" + s1 + s2);
        }
    },
    sendControllerGetState: function (slave) {
        var data = [
            {
                action: ['controller', 'get_state']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.GET_STATE, 'json_udp_acp');
    },
    sendControllerStart: function (slave) {
        var data = [
            {
                action: ['controller', 'start']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.START, 'json_udp_acp');
    },
    sendControllerStop: function (slave) {
        var data = [
            {
                action: ['controller', 'stop']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.STOP, 'json_udp_acp');
    },
    sendControllerReset: function (slave) {
        var data = [
            {
                action: ['controller', 'reset']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.RESET, 'json_udp_acp');
    },
    sendControllerExit: function (slave) {
        var data = [
            {
                action: ['controller', 'terminate']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.EXIT, 'json_udp_acp');
    },
    sendControllerPrint: function (slave) {
        var data = [
            {
                action: ['controller', 'print_all']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.PRINT, 'json_udp_acp');
    },
    sendControllerGetHelp: function (slave) {
        var data = [
            {
                action: ['controller', 'print_help']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.GET_HELP, 'json_udp_acp');
    },
    sendControllerGetDate: function (slave) {
        var data = [
            {
                action: ['controller', 'get_date']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.GET_DATE, 'json_udp_acp');
    },
    sendControllerGetValveDataa: function (slave) {
        var data = [
            {
                action: ['controller', 'valve', 'get_dataa']
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.GET_DATAA, 'json_udp_acp');
    },
    sendControllerGetValveData: function (slave, valve_id_arr) {
        var data = [
            {
                action: ['controller', 'valve', 'get_data'],
                param: valve_id_arr
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.GET_DATA, 'json_udp_acp');
    },
    sendGetValveDatan: function (slave) {
        var data = [
            {
                action: ['valve', 'geta_n']
            }
        ];
        sendTo(slave, data, this.ACTION.VALVE.GETAN, 'json_db');
    },
    sendValveGeta: function (slave) {
        var data = [
            {
                action: ['valve', 'geta']
            }
        ];
        sendTo(slave, data, this.ACTION.VALVE.GETA, 'json_db');
    },
    sendValveSave: function (slave, data) {
        var data = [
            {
                action: ['valve', 'save'],
                param: data
            }
        ];
        sendTo(slave, data, this.ACTION.VALVE.SAVE, 'json_db');
    },
    sendValveProgStart: function (slave, prog_id_arr) {
        var data = [
            {
                action: ['controller', 'valve', 'prog_start'],
                param: prog_id_arr
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.PROG_START, 'json_udp_acp');
    },
    sendValveProgStop: function (slave, prog_id_arr) {
        var data = [
            {
                action: ['controller', 'valve', 'prog_stop'],
                param: prog_id_arr
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.PROG_STOP, 'json_udp_acp');
    },
    sendValveProgReset: function (slave, prog_id_arr) {
        var data = [
            {
                action: ['controller', 'valve', 'prog_reset'],
                param: prog_id_arr
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.PROG_RESET, 'json_udp_acp');
    },
    sendValveTurnOn: function (slave, prog_id_arr) {
        var data = [
            {
                action: ['controller', 'valve', 'turn_on'],
                param: prog_id_arr
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.TURN_ON, 'json_udp_acp');
    },
    sendValveTurnOff: function (slave, prog_id_arr) {
        var data = [
            {
                action: ['controller', 'valve', 'turn_off'],
                param: prog_id_arr
            }
        ];
        sendTo(slave, data, this.ACTION.CONTROLLER.VALVE.TURN_OFF, 'json_udp_acp');
    },
    sendValveProgGeta: function (slave) {
        var data = [
            {
                action: ['valve_prog_geta']
            }
        ];
        sendTo(slave, data, this.ACTION.VALVE_PROG_GETA, 'json_db');
    },
    sendCV: function () {
        var data = [
            {
                action: ['controller', 'getv']
            }
        ];
        sendTo(this, data, this.ACTION.CVERSION, "json_udp_acp");
    },
    confirm: function (action, d) {
        switch (action) {
            case this.ACTION.CVERSION:
                this.checkControllerVersion(d);
                break;
        }
        cursor_blocker.disable();
    },
    abort: function (action, m) {
        switch (action) {
            case this.ACTION.CVERSION:
                var self = this;
                this.vtimer = window.setTimeout(function () {
                    self.sendCV();
                }, 1000);
                break;
        }

        cursor_blocker.disable();
    },
    saveLocal: function (diff) {
        for (var i in diff) {
            for (var j = 0; j < diff[i].length; j++) {
                for (var k = 0; k < this.valve.length; k++) {
                    if (this.valve[k].id === diff[i][j].id) {
                        this.valve[k][i] = diff[i][j].value;
                    }
                }
            }
        }
    },
    toToy: function (m, d, t) {
        var mstr = trans.getMon(m, 1);
        var dstr = d.toString();
        var tstr = intToTimeStr(t);
        return mstr + " " + dstr + " " + tstr;
    },
    getStspKind: function (id) {
        switch (id) {
            case 'm':
                return trans.get(321);
                break;
            case 't':
                return trans.get(322);
                break;
        }
    },
    getSstKind: function (id) {
        switch (id) {
            case 't':
                return trans.get(322);
                break;
            case 'p':
                return trans.get(328);
                break;
            case 'n':
                return trans.get(348);
                break;
        }
    },
    progLoaded: function (id) {
        for (var i = 0; i < this.prog.length; i++) {
            if (this.prog[i].id === id) {
                return true;
            }
        }
        return false;
    },
    addProg: function (prog) {
        var p = {
            id: parseInt(prog.id),
            name: prog.name,
            busy_time: parseInt(prog.busy_time),
            idle_time: parseInt(prog.idle_time),
            repeat: parseInt(prog.repeat),
            busy_infinite: parseInt(prog.busy_infinite),
            repeat_infinite: parseInt(prog.repeat_infinite),
            start_kind: prog.start_kind,
            month_plan: prog.month_plan,
            weekday_plan: prog.weekday_plan,
            time_plan_id: parseInt(prog.time_plan_id),
            change_plan_id: parseInt(prog.change_plan_id)
        };
        this.prog.push(p);
    },
    addTimePlan: function (item) {
        var p = {
            id: item.id,
            start_time: item.start_time
        };
        this.time_plan.push(p);
    },
    addChangePlan: function (item) {
        var p = {
            id: item.id,
            seq: item.seq,
            gap: item.gap,
            shift: item.shift
        };
        this.change_plan.push(p);
    },
    deleteProg: function (prog_id) {
        var pi = this.getProgId(prog_id);
        if (pi !== -1) {
            this.prog.splice(pi, 1);
        }
    },
    deleteTimePlan: function (id) {
        var pi = this.getTimePlanId(id);
        if (pi !== -1) {
            this.time_plan.splice(pi, 1);
        }
    },
    deleteChangePlan: function (id) {
        var pi = this.getChangePlanId(id);
        if (pi !== -1) {
            this.change_plan.splice(pi, 1);
        }
    },
    getProgId: function (id) {
        for (var i = 0; i < this.prog.length; i++) {
            if (this.prog[i].id === id) {
                return i;
            }
        }
        return -1;
    },
    getProg: function (id) {
        for (var i = 0; i < this.prog.length; i++) {
            if (this.prog[i].id === id) {
                return this.prog[i];
            }
        }
        return null;
    },
    getTimePlanId: function (id) {
        for (var i = 0; i < this.time_plan.length; i++) {
            if (this.time_plan[i].id === id) {
                return i;
            }
        }
        return -1;
    },
    getTimePlan: function (id) {
        for (var i = 0; i < this.time_plan.length; i++) {
            if (this.time_plan[i].id === id) {
                return this.time_plan[i];
            }
        }
        return null;
    },
    getChangePlanId: function (id) {
        for (var i = 0; i < this.change_plan.length; i++) {
            if (this.change_plan[i].id === id) {
                return i;
            }
        }
        return -1;
    },
    getChangePlan: function (id) {
        for (var i = 0; i < this.time_plan.length; i++) {
            if (this.change_plan[i].id === id) {
                return this.change_plan[i];
            }
        }
        return null;
    },
    getProgField: function (id, field_name) {
        for (var i = 0; i < this.prog.length; i++) {
            if (this.prog[i].id === id) {
                return this.prog[i][field_name];
            }
        }
        return null;
    },
    getValveField: function (id, field_name) {
        for (var i = 0; i < this.valve.length; i++) {
            if (this.valve[i].id === id) {
                return this.valve[i][field_name];
            }
        }
        return null;
    },
    getStartTime: function (prog_id, id) {
        var ctod = [];
        var pi = this.getProgId(prog_id);
        for (var i = 0; i < this.prog[pi].time_plan.length; i++) {
            ctod.push(this.prog[pi].time_plan[i].start_time);
        }
        ctod.sort(asc);
        if (id < ctod.length) {
            return ctod[id];
        } else {
            return null;
        }
    },
    getChangeValue: function (prog_id, id) {
        var data = [];
        var pi = this.getProgId(prog_id);
        for (var i = 0; i < this.prog[pi].change_plan.length; i++) {
            data.push([this.prog[pi].change_plan[i].shift, this.prog[pi].change_plan[i].seq]);
        }
        data.sort(asca(1));
        if (id < data.length) {
            return data[id][0];
        } else {
            return null;
        }
    },
    getValveName: function (id) {
        for (var i = 0; i < this.valve.length; i++) {
            if (this.valve[i].id === id) {
                return this.valve[i].description;
            }
        }
        return "";
    },
    getProgIdByName: function (name) {
        for (var i = 0; i < this.prog.length; i++) {
            if (this.prog[i].name === name) {
                return this.prog[i].id;
            }
        }
        return null;
    }
};
elem.push(app);
