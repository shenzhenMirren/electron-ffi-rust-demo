const {
	contextBridge
} = require('electron')
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	try {
		//========================The example begins=============
		//========================示例开始========================
		let ffi = require('ffi-napi');
		let path = require('path');
		// The path of dynamic library
		// 动态库的所在地址
		const libPath = "librust_api"
		// Define the method for JavaScript to call rust
		// 定义js调用rust的方法
		function ffiLib(libPath, callback) {
			return ffi.Library(path.join(__dirname, libPath), callback);
		}
		let rustApi = ffiLib(libPath, {
			//Key = name of method, value = ['type of return result ', ['type of request parameter',...]]
			//key=方法的名称,value=['返回结果的类型',['请求参数的类型',...]]
			'generate_str': ['string', []],
			'say_hello': ['string', ['string']]
		});
		//Register the method to the context of electron
		//注册rust方法到electron的上下文
		contextBridge.exposeInMainWorld('fns', {
			generate_str: () => {
				return rustApi.generate_str();
			},
			say_hello: (name) => {
				return rustApi.say_hello(name);
			}
		});
		//====================The example ends===============
		//====================示例结束========================
		console.log('require ffi-napi ok')
	} catch (e) {
		console.log(e)
	}
	for (const type of ['chrome', 'node', 'electron']) {
		replaceText(`${type}-version`, process.versions[type])
	}
})
