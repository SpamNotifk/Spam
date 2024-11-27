// الكود السري للتحقق
const validCode = "SpaMCall";

// العناصر من الصفحة
const codePage = document.getElementById("code-page");
const formPage = document.getElementById("form-page");
const verifyButton = document.getElementById("verify-code");
const activationCode = document.getElementById("activation-code");
const errorMessage = document.getElementById("error-message");
const victimForm = document.getElementById("victim-form");

// التحقق من الكود
verifyButton.addEventListener("click", () => {
  if (activationCode.value === validCode) {
    codePage.style.display = "none";
    formPage.style.display = "block";
  } else {
    errorMessage.textContent = "الكود غير صحيح، حاول مرة أخرى.";
  }
});

// إرسال البيانات إلى بوت Telegram
victimForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const phone = document.getElementById("phone").value;
  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;

  // معلومات البوت
  const botToken = "7808129262:AAGhZRKa_JHk1SQObAhJ4SzfJT8Mnq7-pI8"; // ضع توكن البوت هنا
  const chatId = "7499043737";     // ضع Chat ID هنا

  // الرسالة التي سيتم إرسالها
  const message = `
    📞 رقم الهاتف: ${phone}
    🧑 اسم الضحية: ${name}
    📍 موقع الضحية: ${location}
    📝 نوع الإرسال: ${type}
  `;

  // طلب الإرسال إلى Telegram
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  })
    .then((response) => {
      if (response.ok) {
        alert("جار ارسال الاسبام الخاص بك يرجى الانتضار لحيت اكمل طلبك ⚡️");
        victimForm.reset();
      } else {
        alert("حدث خطأ أثناء الإرسال، حاول مرة أخرى.");
      }
    })
    .catch((error) => {
      alert("فشل الاتصال بالخادم: " + error.message);
    });
});
