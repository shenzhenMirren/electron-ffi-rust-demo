// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
var btnGen = document.getElementById("btn_gen");
btnGen.onclick = function() {
	let text=window.fns.generate_str();
	let result='rust api generate_str result: \n'+text;
	console.log(result)
	document.getElementById('rust_result').innerText = result;
}

var btnSay = document.getElementById("btn_say");
btnSay.onclick = function() {
	let name=document.getElementById('rust_name').value||'wolrd';
	let text=window.fns.say_hello(name);
	let result='rust api say_hello result: \n'+text;
	console.log(result)
	document.getElementById('rust_result').innerText = result;
}
