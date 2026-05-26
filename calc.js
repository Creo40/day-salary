var $=function(i){return document.getElementById(i)};
function toM(t){var p=t.split(':');return+p[0]*60+(+p[1])}
function gM(d){var dt=new Date(d.getFullYear(),d.getMonth(),d.getDate()),w=dt.getDay();if(!w)dt.setDate(dt.getDate()-6);else dt.setDate(dt.getDate()-w+1);return dt}
function gW(a,b){return Math.round((gM(a)-gM(b))/6048e5)}
function iB(dt,r,i){return gW(dt,r)%2===0?i:!i}
function iWD(y,m,d,c){var w=new Date(y,m,d).getDay();if(c.rest_mode==='double')return w>0&&w<6;if(c.rest_mode==='single')return c.single_rest_day==='saturday'?w!==5:w!==0;if(c.rest_mode==='alternate')return iB(new Date(y,m,d),new Date(c.ref_monday_ts),c.ref_is_big)?w!==0:w>0&&w<6;return true}
function cWD(y,m,c){var n=new Date(y,m+1,0).getDate(),t=0;for(var d=1;d<=n;d++)if(iWD(y,m,d,c))t++;return t}
function gDH(c){return Math.max(0,(toM(c.work_end)-toM(c.work_start)-toM(c.lunch_end)+toM(c.lunch_start))/60)}
function gDHT(c){var w=Math.max(0,(toM(c.work_end)-toM(c.work_start))-(toM(c.lunch_end)-toM(c.lunch_start)));return Math.floor(w/60)+'时'+(w%60?w%60+'分':'')}
function gDS(c){var dh=gDH(c);if(dh<=0)return 0;if(c.calc_mode==='legal')return c.salary/21.75;var n=new Date;if(!iWD(n.getFullYear(),n.getMonth(),n.getDate(),c))return 0;var wd=cWD(n.getFullYear(),n.getMonth(),c);return wd?c.salary/wd:0}
function gHR(c){var dh=gDH(c);if(dh<=0)return 0;if(c.calc_mode==='legal')return c.salary/174;var n=new Date;if(!iWD(n.getFullYear(),n.getMonth(),n.getDate(),c))return 0;var wd=cWD(n.getFullYear(),n.getMonth(),c);return wd?c.salary/(wd*dh):0}
function gEH(c){var n=new Date,s=n.getHours()*3600+n.getMinutes()*60+n.getSeconds(),ws=toM(c.work_start)*60,we=toM(c.work_end)*60,ls=toM(c.lunch_start)*60,le=toM(c.lunch_end)*60;if(s<=ws)return 0;if(s>=we)return(we-ws-(le-ls))/3600;var e=s-ws;if(s>le)e-=le-ls;else if(s>ls)e-=s-ls;return Math.max(0,e/3600)}
function gTE(c){var n=new Date;if(!iWD(n.getFullYear(),n.getMonth(),n.getDate(),c))return c.calc_mode==='legal'?c.salary/21.75:0;return gSt(c)==='off'?gDS(c):gEH(c)*gHR(c)}
function gSt(c){var n=new Date;if(!iWD(n.getFullYear(),n.getMonth(),n.getDate(),c))return'rest';var s=n.getHours()*3600+n.getMinutes()*60+n.getSeconds(),ws=toM(c.work_start)*60,we=toM(c.work_end)*60,ls=toM(c.lunch_start)*60,le=toM(c.lunch_end)*60;if(s<ws)return'waiting';if(s>=we)return'off';if(s>=ls&&s<le)return'lunch';return'working'}
function lCfg(){try{var r=localStorage.getItem('dayW3');if(r)return JSON.parse(r)}catch(e){}return null}
function sS(c){localStorage.setItem('dayW3',JSON.stringify(c))}
