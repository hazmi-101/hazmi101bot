/*

butuh 2 library google app scrript kedua library ini dibuat oleh banghasan blog.banghasan.com
komunitas bot google app script: https://t.me/botindonesia

Library Telegram versi 2 > https://github.com/banghasan/Telegram-Lib-GAS-V2
Legacy: MWkhreE4chZ56V_bDwpYUBPvg_do21SJR
New Editor: 11LhYmqUg8UVtqMg3rPaau5uHwCMtsE_0RwUQim4ZY-OCfDe_YyIYKPSP

miniSheetDBv2 > https://github.com/telegrambotindonesia/miniSheetDBv2
Legacy: MbEHC24_R5YUoHX8iCbUEAaZTb1melOAr
New Editor: 1wMvpNwIL8fCMS7gN5XKPY7P-w4MmKT9yt_g2eXDGBtDErOIPq2vcNxIN
*/
//konfigurasi (harus di isi)
let token = ''; //masukan token bot telegram
let adminBot = ; //masukan id akun tekegram admin
let usernamebot = ""; // masukan usernamebot
let deployUrl = ""; //masukan deploy url
let db = new miniSheetDB2.init("", 'Sheet1') //masukan id document google script
//variable
let debug = false; //debug mode true untuk mengaktifkan false untuk menonaktifkan
let tg = new telegram.daftar(token);

function setWebhook() {
return Logger.log(tg.setWebhook(deployUrl))
}

function doGet(e) {
return tg.util.outputText("Hanya data POST yang kita proses yak!");
}

function doPost(e) {
let update = tg.doPost(e);
try {
if (debug) return tg.sendMessage(adminBot, JSON.stringify(update, null, 2))
prosesPesan(update)
} catch (e) {
tg.sendMessage(adminBot, e.message)
}
}

function prosesPesan(update) {
if (update.message) {
//simpan id user untuk broadcast
var msg = update.message;
try{db.getAll()}catch(e){db.setValue("A1",msg.chat.id)}
if(!db.key(msg.chat.id)){db.setValue("A"+Number (db.sheet.getLastRow()+1),msg.chat.id)}

//FUNCTION
function broadcast(a,b) {
let terkirim = 0
let berhasil = 0
let gagal = 0
let gagallist = []
let data = db.getAll().data
for (let i = 0; i < data.length; i++) {
if (terkirim >= 20) {
terkirim = 0
Utilities.sleep(2000)
}
try {
tg.copyMessage(String(data[i]),a,b)
berhasil++
} catch (e) {
gagal++
gagallist.push(String(data[i]).slice(0,-1))
}
}
tg.sendMessage(adminBot, "berhasil terkirim: " + berhasil + "\ngagal terkirim: " + gagal+"\n\nlist pesan yang gagal terkirim:\n"+JSON.stringify(gagallist))
}

//tanggal

//credit Hijriyah   https://www.al-habib.info/islamic-calendar/hijricalendartext.htm
function gmod(n,m){
return ((n%m)+m)%m;
}
function kuwaiticalendar(adjust){
var today = new Date();
if(adjust) {
adjustmili = 1000*60*60*18*adjust; 
todaymili = today.getTime()+adjustmili;
today = new Date(todaymili);
}
day = today.getDate();
month = today.getMonth();
year = today.getFullYear();
m = month+1;
y = year;
if(m<3) {
y -= 1;
m += 12;
}
a = Math.floor(y/100.);
b = 2-a+Math.floor(a/4.);
if(y<1583) b = 0;
if(y==1582) {
if(m>10)  b = -10;
if(m==10) {
b = 0;
if(day>4) b = -10;
}
}
jd = Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+day+b-1524;
b = 0;
if(jd>2299160){
a = Math.floor((jd-1867216.25)/36524.25);
b = 1+a-Math.floor(a/4.);
}
bb = jd+b+1524;
cc = Math.floor((bb-122.1)/365.25);
dd = Math.floor(365.25*cc);
ee = Math.floor((bb-dd)/30.6001);
day =(bb-dd)-Math.floor(30.6001*ee);
month = ee-1;
if(ee>13) {
cc += 1;
month = ee-13;
}
year = cc-4716;
if(adjust) {
wd = gmod(jd+1-adjust,7)+1;
} else {
wd = gmod(jd+1,7)+1;
}
iyear = 10631./30.;
epochastro = 1948084;
epochcivil = 1948085;
shift1 = 8.01/60.;
z = jd-epochastro;
cyc = Math.floor(z/10631.);
z = z-10631*cyc;
j = Math.floor((z-shift1)/iyear);
iy = 30*cyc+j;
z = z-Math.floor(j*iyear+shift1);
im = Math.floor((z+28.5001)/29.5);
if(im==13) im = 12;
id = z-Math.floor(29.5001*im-29);
var myRes = new Array(8);
myRes[0] = day;
myRes[1] = month-1;
myRes[2] = year;
myRes[3] = jd-1;
myRes[4] = wd-1;
myRes[5] = id;
myRes[6] = im-1;
myRes[7] = iy;
return myRes;
}
function writeIslamicDate(adjustment) {
var wdNames = new Array("Ahad","Ithnin","Thulatha","Arbaa","Khams","Jumuah","Sabt");
var iMonthNames = new Array("Muharram","Safar","Rabi'ul Awwal","Rabi'ul Akhir",
"Jumadal Ula","Jumadal Akhira","Rajab","Sha'ban",
"Ramadan","Shawwal","Dhul Qa'ada","Dhul Hijja");
var iDate = kuwaiticalendar(adjustment);
var outputIslamicDate = wdNames[iDate[4]] + ", " 
+ iDate[5] + " " + iMonthNames[iDate[6]] + " " + iDate[7] + " Hijriyah";
return outputIslamicDate;
}
// credit Masehi    https://bolosaholic.com/2-cara-menampilkan-tanggal-dan-waktu/
var tw = new Date();
if (tw.getTimezoneOffset() == 0) (a=tw.getTime() + ( 7 *60*60*1000))
else (a=tw.getTime());
tw.setTime(a);
var tahun= tw.getFullYear ();
var hari= tw.getDay ();
var bulan= tw.getMonth ();
var tanggal= tw.getDate ();
var hariarray=new Array("Minggu,","Senin,","Selasa,","Rabu,","Kamis,","Jum'at,","Sabtu,");
var bulanarray=new Array("Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","Nopember","Desember");

//ocr

function fungsi_ocr(msg, file_id) {
var status;
try {
var foto = tg.getFile(file_id);
var urlpath = "https://api.telegram.org/file/bot"+token+"/"+foto.result.file_path; 
var imageBlob = UrlFetchApp.fetch(urlpath).getBlob();
var resource =
{
title: imageBlob.getName(),
mimeType: imageBlob.getContentType()
};

var options = 
{
ocr: true
};    
var docFile = Drive.Files.insert(resource, imageBlob, options);
var doc = DocumentApp.openById(docFile.id);
var text = doc.getBody().getText().replace("n", "");
Drive.Files.remove(docFile.id);
status = text;
} 
catch (error)
{    
status = "ada error sepertinya anda belum mengaktifkan:\n\nhttps://hazmi-101.github.io/file/tutorial_ocr.jpg\n\n\npesan error: " + error.toString();
}
return tg.kirimPesan(msg.chat.id,"<b>Hasil OCR:</b>\n\n"+status.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),'HTML',true,msg.message_id);
}

if (msg.text) {
//start
if (/\/start$/i.exec(msg.text) && (msg.chat.type == "private")) {
tg.sendMessage(msg.chat.id, "pembuat bot ini @hazmi101", "HTML", true, msg.message_id)
tg.sendSticker(msg.chat.id, 'https://raw.githubusercontent.com/hazmi-101/hazmi101bot/main/gambar/tutorial1.webp')
}
//ping
if (new RegExp("^[!\/]ping(@" + usernamebot + ")?$", "i").exec(msg.text)) {
var date = Date.now()
var msgd = msg.date
var diff = (date / 1000) - msgd
var ping = diff.toFixed(3)
tg.sendMessage(msg.chat.id, ping)
};
//tanggal
if (new RegExp("^[!\/]tanggal(@" + usernamebot + ")?$", "i").exec(msg.text)) {
tg.kirimPesan(msg.chat.id, "<b>UTC +07:00</b>\n" + writeIslamicDate(-1) + "\n\n" + hariarray[hari] + " " + tanggal + " " + bulanarray[bulan] + " " + tahun + " Masehi\n\n\nSet UTC (coming soon)", "HTML")
}
//idul fitri
function selisih_tanggal() {
var d = new Date();
var tanggal = new Date('2021/05/13'); //tanggal bisa diganti karena waktu idul fitri bisa berubah-ubah
d.setHours(0);
d.setMinutes(0);
d.setSeconds(0);
d.setMilliseconds(0);
var selisih = Math.abs(d - tanggal) / 86400000;
return selisih;
}
//RANDOM
function makeid(length) { var result = []; var characters = "!?$%^&*()-=+[]{};#:@~,.?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; var charactersLength = characters.length; for (var i = 0; i < length; i++) { result.push(characters.charAt(Math.floor(Math.random() * charactersLength))); } return result.join(''); }
if (new RegExp("^[!\/]randompassword(@" + usernamebot + ")?$", "i").exec(msg.text)) {
tg.kirimPesan(msg.chat.id, "<b>RANDOM PASSWORD</b>\n\n<code>" + makeid(32) + "</code>\n\n(klik teks diatas untuk menyalin)\n\npenjelasan:\nalat ini sangat berguna jika anda ingin password/katasandi anda sulit dibobol,\nkarena password yang dihasilkan alat ini terlalu sulit untuk dihapal jadi:\n\n<b>Jika Anda Menerapkan Password diatas Sebagai Password Anda</b>\nharap mencatat pasword anda ditempat yang aman dan Jangan Sampai Hilang", "HTML");
}
//OCR
if (new RegExp("^[!\/]ocr(@" + usernamebot + ")?$", "i").exec(msg.text)) {
if (!msg.reply_to_message) { tg.sendPhoto(msg.chat.id, "https://raw.githubusercontent.com/hazmi-101/hazmi101bot/main/gambar/peringatanocr.jpg", "cara menggunakan fitur OCR\n\n<b>DEMI KEAMANAN JANGAN MEMASUKAN DATA PRIBADI ANDA!!!</b>", "HTML", "true", msg.message_id) }
else if (msg.reply_to_message.photo) {
tg.sendChatAction(msg.chat.id, "record_video_note");
fungsi_ocr(msg, msg.reply_to_message.photo[msg.reply_to_message.photo.length - 1].file_id)
}
else if (msg.reply_to_message.sticker) { tg.kirimPesan(msg.chat.id, "belum suport ocr sticker", "HTML", true, msg.message_id) }
}
//JALANKAN SCRIPT (admin bot only)
if (new RegExp("^[!\/]jalankan(@" + usernamebot + ")?", "i").exec(msg.text)) {
if (msg.from.id == adminBot) {
var hasil = msg.text.replace(new RegExp("^[!\/]jalankan(@" + usernamebot + ")?", "i"), '')
if (hasil.length !== 0) {
try { eval(hasil) }
catch (err) { tg.kirimPesan(msg.chat.id, "#error\n\n<b>Pesan Error:</b>\n<code>" + tg.util.clearHTML(err.toString()) + "</code>", "HTML", true, msg.message_id) }
}
else(tg.kirimPesan(msg.chat.id, "fitur ini berfungsi untuk menjalankan script"))
}
else { tg.kirimPesan(msg.chat.id, "ini adalah fitur ujicoba khusus pemilik/admin bot", "HTML", true, msg.message_id); }
}
if (/^\/broadcast$/i.exec(msg.text)) {
if (msg.from.id == adminBot) {
if (msg.reply_to_message) {
broadcast(msg.chat.id,msg.reply_to_message.message_id)
}
} else(tg.sendMsg(msg, "reply ke pesan yang ingin di broadcast"))
}
}
}
}
