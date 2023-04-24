// import axios from "/node_modules/axios/dist/axios.min.js";

export const showMsg = function (element, msg) {
  const ourElement = element;
  ourElement.html(msg);
  ourElement.addClass("show");

  setTimeout(() => {
    ourElement.removeClass("show");
  }, 2500);
};

export const sendApi = async function (route, form) {
  const dataForm = new FormData(form);
  let payload = JSON.stringify(dataForm);
  const result = await axios.post(route, { name: "sameh", age: 30 });
  return result;
};
