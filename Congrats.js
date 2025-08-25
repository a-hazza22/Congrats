// هذا السطر يربط المتغير apodContainer بعنصر HTML الذي يحمل المعرف (ID) "apod-container".
// هذا هو المكان الذي سيتم فيه عرض الصورة والمعلومات.
const apodContainer = document.getElementById("apod-container");
// هذه دالة غير متزامنة (async function) لجلب البيانات من واجهة برمجة تطبيقات ناسا (APOD API).
// تأخذ الدالة تاريخًا (date) كمدخل.
const fetchAPOD = async (date) => {
  // هذا السطر يرسل طلبًا لجلب البيانات من الرابط.
  const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=DEMO_KEY`;
  const response = await fetch(url);
    // هذا الشرط يتحقق مما إذا كان الطلب قد نجح.
  if (!response.ok) {
    apodContainer.innerHTML = "An error occurred while fetching the APOD data.";
    throw new Error("An error occurred while fetching the APOD data.");
  }
      // هذا السطر يحول استجابة الخادم إلى كائن جافا سكريبت (JSON)
  const data = await response.json();
  apodContainer.innerHTML = `
    <img id="apod-image" src="${data.url}" alt="${data.title}" width="600">
    <div id="apod-info">
      <h2 id="apod-title">${data.title}</h2>
      <p>${data.explanation}</p>
    </div>
  `;
};
// هذا السطر يضيف دالة حدث (event listener) لنموذج (form) عيد الميلاد.
//   التحقق من ان الكود اشتغل 
document
  .getElementById("birthdayForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const birthday = document.getElementById("birthday").value;
    const errorMessage = document.getElementById("error-message");

    const minDate = new Date("1995-06-16");

    if (new Date(birthday) < minDate) {
      errorMessage.textContent =
        "Invalid entry: Please enter a date on or after June 16, 1995.";
      apodContainer.innerHTML = "";
    } else {
      errorMessage.textContent = "";
      fetchAPOD(birthday);
    }
  });

