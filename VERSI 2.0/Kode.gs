/*
PASANG 3 LIBLARY DIBAWAH INI

banghasan versi 2:
Editor Lama:
MWkhreE4chZ56V_bDwpYUBPvg_do21SJR
Editor Baru:
11LhYmqUg8UVtqMg3rPaau5uHwCMtsE_0RwUQim4ZY-OCfDe_YyIYKPSP

minidb:
ID Legacy:
MElMS4ozme33Zwbcq7h7mRqZTb1melOAr
New Editor:
1NLQhvkXR9BHzlLELujjwFuEwY9rKaSPGZdE9Fqlfuccza0T4Fe3n5kXk


butthx:
ID Library (stable) :
1OnTWLtbd0GD3qGd2pSZUxWD1j_G4Rki75baKIgFdTN5WB78qLnjZj7qj
ID Library (beta) :
1QnAO4mNqFd4Kn_MOtvIqCmGC1BvTvxv0MDmB1BvSBzAMmevVejvuk2HW
*/

//KONFIGURASI
var BotToken = "ISI DENGAN BOT TOKEN"
var GoogleSheetFileId = "ISI DENGAN ID GOOGLE SHEET"
var GoogleSheetName = "ISI DENGAN NAMA GOOGLE SHEET" //contoh "Sheet1"
var usernamebot = "ISI DENGAN USERNAME BOT" //contoh "Hazmi101Bot"
var googlescriptdeployurl = "ISI DENGAN LINK DEPLOY GOOGLE SCRIPT" //contoh "https://script.google.com/macros/s/xxxxxx/exec"

/*

AGAR FITUR OCR DAPAT BERKERJA LAKUKAN INI:
https://hazmi-101.github.io/file/tutorial_ocr.jpg

*/


//hati-hati saat mengubah script dibawah


var bot = new butthx.bot(BotToken)
var db = new miniSheetDB.init(GoogleSheetFileId,GoogleSheetName)
var tg = new telegram.daftar();
var user = new telegram.user();

function simpanToken() {  
var token = BotToken;
return user.setValue('token_'+usernamebot, token);
}
function cekToken() {
var token = user.getValue('token_'+usernamebot);
Logger.log(token);
}
var token = user.getValue('token_'+usernamebot);
tg.setToken(token);
function setWebhook() {
var url = "https://script.google.com/macros/s/AKfycbwVlYNbArUqY-1wC1CyySVkJm795qdcLA7OCyyDEkzpaRPweps/exec";
var r = tg.setWebhook(url);
Logger.log(r);
}
function cekToken() {
var r =  user.getValue('token_'+usernamebot);
if (r) {
var pesan = "Token sudah disimpan: " + r;
} else { 
var pesan = "Token gagal di simpan.";
}
Logger.log(pesan);
return r;
}
function getMe(){
var me = tg.getMe();
Logger.log(me);
return me;
}
function getWebhookInfo() {
var r = tg.getWebhookInfo();
Logger.log(r);
return r;
}
function deleteWebhook() {
var r = tg.deleteWebhook();
Logger.log(r);
return r;
}

//DIBAWAH ADALAH FUNCTION (FUNGSI) bisa dihapus jika anda ingin menghapus suatu fitur
//broadcast

function saveUser(userID){
let range = db.has(userID) // kita cek apakah id user ada atau tidak.
if(!range){ //jika belum ada maka kita tambahin
let row = db.sheet.getLastRow() + 1 // kita ambil baris terakhir
let f = db.setValue('A'+row,userID) // 'A'+row disini diartikan sebagai 'A2' baris ke 2 kolom pertama(A)
}
return
}
function broadcast(text,entities){ //entities disini di butuhkan untuk memformat text jika pesannya mengandung text bold maka akan ke format otomatis. 
let sender = 0 // jika bot sudah mengirim pesan ke 20 orang maka bot akan sleep untuk 2 detik.
let success = 0 //pesan yang berhasil dikirim
let failed = 0 //pesan yang gagal dikirim
let data = db.getAll() // mengambil semua data user
data.shift() // menghapus data pertama [id]
let amount = data.length // banyak user
bot.build.loop(amount,(i)=>{ // looping kirim pesan 
let user = data[i][0]
sender ++ // angka sender akan naik seiring loopiny
if(sender >= 20){ // jika sender lebih dari 20 atau sama dengan 20
sender = 0 //kita reset lagi hitungan sender nya
Utilities.sleep(2000) // jeda 2 detik
try{ //lanjut broadcast
bot.sendMessage(user,text,{entities:entities})
success ++ // berhasil ++
}catch (error){
failed ++ // gagal ++
}
}else{ // jika sender kurang dari 20
try{ //broadcast pesan
bot.sendMessage(user,text,{entities:entities})
success ++ // berhasil ++
}catch(error){
failed ++ // gagal ++
}
}
}) //jika broadcast sudah selesai maka di akhiri dengan mengirim pesan :
return bot.replyToMessage("Successfully send to "+success+" people,failed to "+failed+" people")
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
var urlpath = "https://api.telegram.org/file/bot"+BotToken+"/"+foto.result.file_path; 
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
return tg.kirimPesan(msg.chat.id,"<b>Hasil OCR:</b>\n\n"+status, 'HTML', msg.message_id);
}
