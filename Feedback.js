function show() {
    let name = document.getElementById("nm").value
    let Email = document.getElementById("em").value
    let Div = document.getElementById("div").value
    let feedback = document.getElementById("feed").value
    document.getElementById("myP").textContent = `Thankyou your feedback ${name}`
    console.log(name)
    console.log(Email)
    console.log(Div)
    console.log(feedback)
}