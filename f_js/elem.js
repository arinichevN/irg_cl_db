function MyImage(name) {
    this.container = c("img");
    s(this.container, "src", "client/image/" + name);
}
function NavigationButton(slave) {//create navigation button
    this.slave = slave;
    this.container = cb("");
    this.container.addEventListener("click", function () {
        showV(slave);
    }, false);
    this.updateStr = function () {
        this.container.innerHTML = this.slave.getName();
    };
}
function SaveButton(slave, id) {
    var self = this;
    this.slave = slave;
    this.id = id;
    this.disabled = false;
    this.container = cb("");
    this.container.addEventListener("click", function () {
        self.slave.save(self.id);
    }, false);
    this.updateStr = function () {
        this.container.innerHTML = trans.get(1);
    };
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
    this.updateStr();
}
function Fieldset() {
    this.container = c('fieldset');
    this.head = c('legend');
    a(this.container, this.head);
    this.updateStr = function (v) {
        this.head.innerHTML = v;
    };
}
function CopyButton(slave, id) {
    var self = this;
    this.slave = slave;
    this.id = id;
    this.disabled = false;
    this.container = cb("");
    this.container.addEventListener("click", function () {
        self.slave.copy(self.id);
    }, false);
    this.updateStr = function () {
        this.container.innerHTML = trans.get(6);
    };
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
    this.updateStr();
}
function PasteButton(slave, id) {
    var self = this;
    this.slave = slave;
    this.id = id;
    this.disabled = false;
    this.container = cb("");
    this.container.addEventListener("click", function () {
        self.slave.paste(self.id);
    }, false);
    this.updateStr = function () {
        this.container.innerHTML = trans.get(7);
    };
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
    this.updateStr();
}
function IncButton(slave, sign, kind, incr, text) {
    var self = this;
    this.slave = slave;
    this.sign = sign;
    this.kind = kind;
    this.inc = incr;
    this.text = text;
    this.disabled = false;
    this.container = cb(this.text);
    this.container.onmousedown = function () {
        inc.down(self.slave, self.sign, self.kind, self.inc);
    };
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
}
function UpButton(slave) {
    this.b = new IncButton(slave, -1, 0, 1, "&uparrow;");
    this.container = this.b.container;
    this.disabled = false;
    this.enable = function () {
        this.b.enable();
        this.disabled = false;
    };
    this.disable = function () {
        this.b.disable();
        this.disabled = true;
    };
}
function DownButton(slave) {
    this.b = new IncButton(slave, 1, 0, 1, "&downarrow;");
    this.container = this.b.container;
    this.disabled = false;
    this.enable = function () {
        this.b.enable();
        this.disabled = false;
    };
    this.disable = function () {
        this.b.disable();
        this.disabled = true;
    };
}
function LeftButton(slave) {
    var b = new IncButton(slave, -1, 1, 1, "&leftarrow;");
    this.container = b.container;
    this.disabled = false;
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
}
function RightButton(slave) {
    var b = new IncButton(slave, 1, 1, 1, "&rightarrow;");
    this.container = b.container;
    this.disabled = false;
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
}
function BackButton() {
    this.text_id = 0;
    this.container = cb(trans.get(this.text_id));
    this.container.onclick = function () {
        goBack();
    };
    this.updateStr = function () {
        this.container.innerHTML = trans.get(this.text_id);
    };
}
function UpdateButton(slave, kind) {
    var self = this;
    this.slave = slave;
    this.kind = kind;
    this.container = cb("");
    this.container.onclick = function () {
        self.slave.update(self.kind);
    };
    this.updateStr = function () {
        this.container.innerHTML = "&circlearrowright;";
        this.container.title = trans.get(46);
    };
    this.updateStr();
}
function AddButton(slave, id) {
    var self = this;
    this.slave = slave;
    this.id = id;
    this.disabled = false;
    this.container = cb("");
    this.container.addEventListener("click", function () {
        self.slave.add(self.id);
    }, false);
    this.updateStr = function () {
        this.container.innerHTML = trans.get(50);
    };
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
    this.updateStr();
}
function DeleteButton(slave, id) {
    var self = this;
    this.slave = slave;
    this.id = id;
    this.disabled = false;
    this.container = cb("");
    this.container.addEventListener("click", function () {
        self.slave.delete(self.id);
    }, false);
    this.updateStr = function () {
        this.container.innerHTML = trans.get(51);
    };
    this.enable = function () {
        this.container.disabled = false;
        this.disabled = false;
    };
    this.disable = function () {
        this.container.disabled = true;
        this.disabled = true;
    };
    this.updateStr();
}
function TimeAndDateSelector(slave, id) {
    var self = this;
    this.data = {
        year: 0,
        month: 0,
        day: 0,
        wday: 0,
        hour: 0,
        min: 0,
        sec: 0
    };
    this.wd = [];//all weekdays
    this.slave = slave;
    this.id = id;
    this.container = cd();
    this.header = cd();
    this.toyB = cb("");
    this.yearB = cb("");
    this.wdB = cb("");
    this.applyB = cb("");
    a(this.container, [this.header, this.yearB, this.toyB, this.wdB, this.applyB]);
    this.toyB.onclick = function () {
        vtoy_edit.prep(self.data.month, self.data.day, self.data.hour * 3600 + self.data.min * 60 + self.data.sec, self, 1, 54);
        showV(vtoy_edit);
    };
    this.yearB.onclick = function () {
        vint_edit.prep(self.data.year, 1900, 2099, self, 2, 52);
        showV(vint_edit);
    };
    this.wdB.onclick = function () {
        vselect_edit.prep(self.wd, 0, self, 3, 53);
        showV(vselect_edit);
    };
    this.applyB.onclick = function () {
        self.slave.catchEdit(self.data, self.id);
    };
    this.updateStr = function () {
        this.header.innerHTML = trans.get(55);
        this.wdB.innerHTML = trans.getWD(this.data.wday, 0);
        this.toyB.innerHTML = app.toToy(this.data.month, this.data.day, this.data.hour * 3600 + this.data.min * 60 + this.data.sec);
        this.mkWD();
        this.applyB.innerHTML = trans.get(2);
    };
    this.updateLabel = function () {
        this.wdB.innerHTML = trans.getWD(this.data.wday, 0);
        this.toyB.innerHTML = app.toToy(this.data.month, this.data.day, this.data.hour * 3600 + this.data.min * 60 + this.data.sec);
        this.yearB.innerHTML = this.data.year;
        this.mkWD();
    };
    this.setTimestamp = function (t) {
        var d = new Date(t);
        this.data.year = d.getFullYear();
        this.data.month = d.getMonth();
        this.data.day = d.getDate();
        this.data.wday = d.getDay();
        this.data.hour = d.getHours();
        this.data.min = d.getMinutes();
        this.data.sec = d.getSeconds();
        this.updateLabel();
    };
    //expected: min_hour_wday_day_month_year
    this.setString = function (v) {
        var arr = v.split('_');
        this.data.sec = parseInt(arr[0]);
        this.data.min = parseInt(arr[1]);
        this.data.hour = parseInt(arr[2]);
        this.data.wday = parseInt(arr[3]);
        this.data.day = parseInt(arr[4]);
        this.data.month = parseInt(arr[5]);
        this.data.year = parseInt(arr[6]);
        this.updateLabel();
    };
    this.getStrData = function () {
        var mm = intTo2str(this.data.min);
        var hh = intTo2str(this.data.hour);
        var DD = intTo2str(this.data.day);
        var MM = intTo2str(this.data.month);
        var w = this.data.wday;
        var YY = this.data.year;
        return " " + mm + hh + w + DD + MM + YY;
    };
    this.mkWD = function () {
        cleara(this.wd);
        var selected = false;
        for (var i = 0; i < 7; i++) {
            if (this.data.wday === i) {
                selected = true;
            } else {
                selected = false;
            }
            this.wd.push([trans.getWD(i, 0), selected]);
        }
    };
    this.catchEdit = function (v, k) {
        switch (k) {
            case 1://toy
                this.data.month = v.m;
                this.data.day = v.d;
                this.data.hour = Math.floor(v.t / 3600);
                this.data.min = Math.ceil(v.t % 3600 / 60);
                this.data.sec = v.t % 3600 % 60;
                this.toyB.innerHTML = app.toToy(this.data.month, this.data.day, this.data.hour * 3600 + this.data.min * 60 + this.data.sec);
                break;
            case 2://year
                this.data.year = v;
                this.yearB.innerHTML = this.data.year;
                break;
            case 3://weekday
                this.data.wday = v;
                for (var i = 0; i < v.length; i++) {
                    if (v[i][1]) {
                        this.data.wday = i;
                        for (var j = 0; j < this.wd.length; j++) {
                            if (j === i) {
                                this.wd[j][1] = true;
                            } else {
                                this.wd[j][1] = false;
                            }
                        }
                        this.wdB.innerHTML = this.wd[this.data.wday][0];
                        break;
                    }
                }
                break;
        }
    };
    this.updateStr();
}