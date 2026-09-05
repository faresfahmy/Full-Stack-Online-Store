


const fetchData = (form) => {
    fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        body: form
    }).then((res) => res.json()).then((data) => {
        console.log(data)
    })
}
const full_name_Element = document.querySelector("#fullname") 
const username_Element = document.querySelector("#username") 
const email_Element = document.querySelector("#email") 
const password_Element = document.querySelector("#password") 
const role_Element = document.querySelector("#role") 
const avatar_Element = document.querySelector("#avatar") 
const sendData_Element = document.querySelector("#sendData")
const formData_Element = document.querySelector("#form-data")


formData_Element.addEventListener("submit",(event)=>{
    event.preventDefault();
    const form = new FormData();
    const avatarFile = avatar_Element.files[0];
    form.append("full_name", full_name_Element.value)
    form.append("username", username_Element.value)
    form.append("email", email_Element.value)
    form.append("password", password_Element.value)
    form.append("avatar", avatarFile)
    form.append("role", role_Element.value)
    fetchData(form);
})


