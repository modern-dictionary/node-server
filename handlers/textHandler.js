// handlers/textHandler.js

module.exports = {
  handleTextEdit: (socket, io, data) => {
    // data باید شامل اطلاعاتی مانند teamId، wordId و text باشد.
    console.log(`ویرایش متن از کاربر ${data.userId} در تیم ${data.teamId}: ${data.text}`);

    // انتشار رویداد تغییر متن به تمام کلاینت‌های موجود در room مربوط به تیم
    io.to(`team-${data.teamId}`).emit("word-update", {
      wordId: data.wordId,
      text: data.text,
      userId: data.userId
    });

    // در صورت نیاز، می‌توانید اینجا درخواست HTTP به API لاراول برای ذخیره تغییرات ارسال کنید.
    // مثال:
    // const axios = require('axios');
    // axios.post('http://localhost:8000/api/words/' + data.wordId + '/update', { text: data.text });
  }
};
