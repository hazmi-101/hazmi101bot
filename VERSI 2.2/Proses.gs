function doGet(e){
return tg.util.outputText("hanya untuk post");
}
function doPost(e){
var update = tg.doPost(e);
bot.handleUpdate(e)
if (update){
prosesPesan(update);
return running(bot.update);
}
}

function prosesPesan(update){
try{
//save user untuk broadcast (kirim pesan ke pengguna bot)
saveUser(bot.update.message.chat.id)
bot.cmd(["broadcast","announcement"],(res)=>{ // command /broadcast atau /announcement akan di eksekusi
let adminId = IdAdmin // id admin (id kamu)
if(res.message.from.id == adminId){ // jika admin
if(!res.message.reply_to_message){ // jika tidak reply pesan
return bot.replyToMessage("Please reply message") // maka bot akan mengirimkan pesan
} // jika reply pesan maka bot akan melakukan broadcast pesan
return broadcast(res.message.reply_to_message.text,res.message.reply_to_message.entities)
}
});
bot.on("edited_message",(res)=>{
  bot.reply("pesan di edit")
})

if(update.message){
var msg = update.message


//start
if(/\/start/i.exec(msg.text)) {
if(msg.chat.type == "private") {
return tg.sendMessage(msg.chat.id,"pembuat bot ini @hazmi101","HTML",true, msg.message_id) && tg.sendSticker(msg.chat.id, 'CAACAgUAAx0CThtuVAACrDJgcHMC61s_FTK2Cx8zix7nRAMEqgACnwMAAqOogFeUi6Wszj1BKB4E')}}

//ping
if(/^[!\/]ping(@Hazmi101Bot)?$/i.exec(msg.text)){
var date = Date.now()
var msgd = msg.date
var diff = (date / 1000) - msgd
var ping = diff.toFixed(3)
tg.sendMessage(msg.chat.id,ping)};

//tanggal
if (/^[!\/]tanggal(@Hazmi101Bot)?$/i.exec(msg.text)){
tg.kirimPesan(msg.chat.id,"<b>UTC +07:00</b>\n"+writeIslamicDate(-1)+"\n\n"+hariarray[hari]+" "+tanggal+" "+bulanarray[bulan]+" "+tahun+" Masehi\n\n\nSet UTC (coming soon)","HTML")
}

//jalankan script
if(jalur = /(^\/jalan(@Hazmi101Bot)? )/i.exec(msg.text)){
if(msg.from.id == IdAdmin){
try {
var hasill = msg.text.replace(jalur[1], '') 
eval(hasill)
}
catch(err) {
tg.kirimPesan(msg.chat.id,"<b>PESAN ERROR:</b>\n\n<code>"+String(err)+"</code>","HTML",true,msg.message_id);
} 
}
else{tg.kirimPesan(msg.chat.id,"<b>you don't have access</b>","HTML",true,msg.message_id);}
}
if(/^\/jalan((@Hazmi101Bot)?)$/i.exec(msg.text)){
tg.kirimPesan(msg.chat.id,"<b>kosong</b>","HTML",true,msg.message_id)}

//idul fitri
function selisih_tanggal(){
var d = new Date();
var tanggal = new Date('2021/05/13'); //tanggal bisa diganti karena waktu idul fitri bisa berubah ubah
d.setHours(0);
d.setMinutes(0);
d.setSeconds(0);
d.setMilliseconds(0);
var selisih = Math.abs(d - tanggal)/86400000;
return selisih;
}
if (/^[!\/]idulfitri(@Hazmi101Bot)?$/i.exec(msg.text) ){
return tg.kirimPesan(msg.chat.id, "<b>Idul Fitri</b> "+selisih_tanggal()+" hari lagi\n\n(1 Syawal 1442 Hijriyah | 13 Mei 2021 Masehi)",  "HTML" , true, msg.message_id)}

//RANDOM
function makeid(length) { var result = []; var characters = "!?$%^&*()-=+[]{};#:@~,.?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; var charactersLength = characters.length; for ( var i = 0; i < length; i++ ) { result.push(characters.charAt(Math.floor(Math.random() * charactersLength))); } return result.join(''); } 
if (/^[!\/]randompassword(@Hazmi101Bot)?$/i.exec(msg.text) ){
tg.kirimPesan(msg.chat.id,"<b>RANDOM PASSWORD</b>\n\n<code>"+makeid(32)+"</code>\n\n(klik teks diatas untuk menyalin)\n\npenjelasan:\nalat ini sangat berguna jika anda ingin password/katasandi anda sulit dibobol,\nkarena password yang dihasilkan alat ini terlalu sulit untuk dihapal jadi:\n\n<b>Jika Anda Menerapkan Password diatas Sebagai Password Anda</b>\nharap mencatat pasword anda ditempat yang aman dan Jangan Sampai Hilang","HTML");
}

//OCR
if(/^\/ocr((@Hazmi101Bot)?)$/i.exec(msg.text)){
if(!msg.reply_to_message){tg.sendPhoto(msg.chat.id,"AgACAgUAAx0CT-AKeAACAvZgfM-45bNvDNXjU5N29TDqh-zKawAC4qsxGzhj-FadfRJN9eD0MZUusHB0AAMBAAMCAANtAANxkQACHwQ","cara menggunakan fitur OCR\n\n<b>DEMI KEAMANAN JANGAN MEMASUKAN DATA PRIBADI ANDA!!!</b>","HTML","true",msg.message_id)}
else if(msg.reply_to_message.photo){return fungsi_ocr(msg, msg.reply_to_message.photo[msg.reply_to_message.photo.length -1].file_id)}
else if(msg.reply_to_message.sticker){tg.kirimPesan(msg.chat.id,"belum suport ocr sticker","HTML",true,msg.message_id)}
}

//akhir update pesan
}
}
/*  jika ingin membuat error log hapus / / dibawah dan isi dengan chat id (bisa id grup atau id anda) maka jika ada error akan terkirim ke id itu  */
//catch(error){bot.sendMessage("ISI DENGAN CHAT ID","#ERROR\n\n"+String(error))}
}
