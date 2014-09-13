// Title: Tigra Calendar
// URL: http://www.softcomplex.com/products/tigra_calendar/
// Version: 3.3 (American date format)
// Date: 09/01/2005 (mm/dd/yyyy)
// Note: Permission given to use this script in ANY kind of applications if
//    header lines are left unchanged.
// Note: Script consists of two files: calendar?.js and calendar.html

// if two digit year input dates after this year considered 20 century.
var NUM_CENTYEAR = 30;
// is time input control required by default
var BUL_TIMECOMPONENT = false;
// are year scrolling buttons required by default
var BUL_YEARSCROLL = true;

var calendars = [];
var RE_NUM = /^\-?\d+$/;

function calJulian(obj_target) {

	// assigning methods
	this.gen_date = jus_gen_date2;
	this.gen_time = jus_gen_time2;
	this.gen_tsmp = jus_gen_tsmp2;
	this.prs_date = jus_prs_date2;
	this.prs_time = jus_prs_time2;
	this.prs_tsmp = jus_prs_tsmp2;
	this.popup    = jus_popup2;

	// validate input parameters
	if (!obj_target)
		return jus_error("Error calling the calendar: no target control specified");
	if (obj_target.value == null)
		return jus_error("Error calling the calendar: parameter specified is not valid target control");
	this.target = obj_target;
	this.time_comp = BUL_TIMECOMPONENT;
	this.year_scroll = BUL_YEARSCROLL;
	
	// register in global collections
	this.id = calendars.length;
	calendars[this.id] = this;
}

function jus_popup2 (str_datetime) {
	if (str_datetime) {
		this.dt_current = this.prs_tsmp(str_datetime);
	}
	else {
		this.dt_current = this.prs_tsmp(this.target.value);
		this.dt_selected = this.dt_current;
	}
	if (!this.dt_current) return;

	var obj_calwindow = window.open(
		'/common/calendar.html?datetime=' + this.dt_current.valueOf()+ '&id=' + this.id,
		'Calendar', 'width=200,height='+(this.time_comp ? 215 : 190)+
		',status=no,resizable=no,top=200,left=600,dependent=yes,alwaysRaised=yes'
	);
	obj_calwindow.opener = window;
	obj_calwindow.focus();
}

// timestamp generating function
function jus_gen_tsmp2 (dt_datetime) {
	return(this.gen_date(dt_datetime) + ' ' + this.gen_time(dt_datetime));
}

Date.prototype.msPERDAY = 1000 * 60 * 60 * 24;
// Day of YearDate.prototype.getDayOfYear = function() {
        //Returns day of year 1 through 365 or 366

        var start = new Date(this.getFullYear(), 0, 0);
        return this.daysBetween(start) * -1;
    };    Date.prototype.daysBetween = function(d) {
        var rtrn = null;

        if (! d instanceof Date) {
            try {
                d = new Date(d);
            }
            catch (e) {
          //      return = null;
            }
        }

        var c = this.getTime();
        var n = d.getTime();

		//alert(n);
       // alert(c);
        
        c = Math.floor(c/this.msPERDAY);
        n = Math.floor(n/this.msPERDAY);
       
       // alert(n - c);
        return n - c;
    };
    
// date generating function
function jus_gen_date2 (dt_datetime) {
	dt =  (dt_datetime.getMonth() < 9 ? '0' : '') + (dt_datetime.getMonth() + 1) + "/"
		+ (dt_datetime.getDate() < 10 ? '0' : '') + dt_datetime.getDate() + "/"
		+ (YYYY=dt_datetime.getFullYear()+"").substring(2,4);

	//alert(dt);	 var date = new Date(dt);
     var day = date.getDayOfYear();
     var padDay = pad(day, 3, '0', 1);     return padDay;  // Day of Year
}
// time generating function
function jus_gen_time2 (dt_datetime) {
	return (
		(dt_datetime.getHours() < 10 ? '0' : '') + dt_datetime.getHours() + ":"
		+ (dt_datetime.getMinutes() < 10 ? '0' : '') + (dt_datetime.getMinutes()) + ":"
		+ (dt_datetime.getSeconds() < 10 ? '0' : '') + (dt_datetime.getSeconds())
	);
}

// timestamp parsing function
function jus_prs_tsmp2 (str_datetime) {
	// if no parameter specified return current timestamp
	if (!str_datetime)
		return (new Date());

	// if positive integer treat as milliseconds from epoch
	if (RE_NUM.exec(str_datetime))
		return new Date(str_datetime);
		
	// else treat as date in string format
	var arr_datetime = str_datetime.split(' ');
	return this.prs_time(arr_datetime[1], this.prs_date(arr_datetime[0]));
}

// date parsing function
function jus_prs_date2 (str_date) {

	var arr_date = str_date.split('/');

	if (arr_date.length != 3) return alert ("Invalid date format: '" + str_date + "'.\nFormat accepted is dd-mm-yyyy.");
	if (!arr_date[1]) return alert ("Invalid date format: '" + str_date + "'.\nNo day of month value can be found.");
	if (!RE_NUM.exec(arr_date[1])) return alert ("Invalid day of month value: '" + arr_date[1] + "'.\nAllowed values are unsigned integers.");
	if (!arr_date[0]) return alert ("Invalid date format: '" + str_date + "'.\nNo month value can be found.");
	if (!RE_NUM.exec(arr_date[0])) return alert ("Invalid month value: '" + arr_date[0] + "'.\nAllowed values are unsigned integers.");
	if (!arr_date[2]) return alert ("Invalid date format: '" + str_date + "'.\nNo year value can be found.");
	if (!RE_NUM.exec(arr_date[2])) return alert ("Invalid year value: '" + arr_date[2] + "'.\nAllowed values are unsigned integers.");

	var dt_date = new Date();
	dt_date.setDate(1);

	if (arr_date[0] < 1 || arr_date[0] > 12) return alert ("Invalid month value: '" + arr_date[0] + "'.\nAllowed range is 01-12.");
	dt_date.setMonth(arr_date[0]-1);
	 
	if (arr_date[2] < 100) arr_date[2] = Number(arr_date[2]) + (arr_date[2] < NUM_CENTYEAR ? 2000 : 1900);
	dt_date.setFullYear(arr_date[2]);

	var dt_numdays = new Date(arr_date[2], arr_date[0], 0);
	dt_date.setDate(arr_date[1]);
	if (dt_date.getMonth() != (arr_date[0]-1)) return alert ("Invalid day of month value: '" + arr_date[1] + "'.\nAllowed range is 01-"+dt_numdays.getDate()+".");

	return (dt_date)
}

// time parsing function
function jus_prs_time2 (str_time, dt_date) {

	if (!dt_date) return null;
	var arr_time = String(str_time ? str_time : '').split(':');

	if (!arr_time[0]) dt_date.setHours(0);
	else if (RE_NUM.exec(arr_time[0])) 
		if (arr_time[0] < 24) dt_date.setHours(arr_time[0]);
		else return jus_error ("Invalid hours value: '" + arr_time[0] + "'.\nAllowed range is 00-23.");
	else return jus_error ("Invalid hours value: '" + arr_time[0] + "'.\nAllowed values are unsigned integers.");
	
	if (!arr_time[1]) dt_date.setMinutes(0);
	else if (RE_NUM.exec(arr_time[1]))
		if (arr_time[1] < 60) dt_date.setMinutes(arr_time[1]);
		else return jus_error ("Invalid minutes value: '" + arr_time[1] + "'.\nAllowed range is 00-59.");
	else return jus_error ("Invalid minutes value: '" + arr_time[1] + "'.\nAllowed values are unsigned integers.");

	if (!arr_time[2]) dt_date.setSeconds(0);
	else if (RE_NUM.exec(arr_time[2]))
		if (arr_time[2] < 60) dt_date.setSeconds(arr_time[2]);
		else return jus_error ("Invalid seconds value: '" + arr_time[2] + "'.\nAllowed range is 00-59.");
	else return jus_error ("Invalid seconds value: '" + arr_time[2] + "'.\nAllowed values are unsigned integers.");

	dt_date.setMilliseconds(0);
	return dt_date;
}

function jus_error (str_message) {
	alert (str_message);
	return null;
}
/**  
*  
*  Javascript string pad  
*  http://www.webtoolkit.info/  
*  
**/  
  
var STR_PAD_LEFT = 1;   
var STR_PAD_RIGHT = 2;   
var STR_PAD_BOTH = 3;   
  
function pad(str, len, pad, dir) {   
  
    if (typeof(len) == "undefined") { var len = 0; }   
    if (typeof(pad) == "undefined") { var pad = ' '; }   
    if (typeof(dir) == "undefined") { var dir = STR_PAD_LEFT; }   
	var str = str.toString();
     //alert(strLen.length);
    if (len + 1 >= str.length) {   

        switch (dir){   
  
            case STR_PAD_LEFT:   
                str = Array(len + 1 - str.length).join(pad) + str;   
               
            break;   
  
            case STR_PAD_BOTH:   
                var right = Math.ceil((padlen = len - str.length) / 2);   
                var left = padlen - right;   
                str = Array(left+1).join(pad) + str + Array(right+1).join(pad);   
            break;   
  
            default:   
                str = str + Array(len + 1 - str.length).join(pad);   
            break;   
  
        } // switch   
    }   
    return str;   
}  


