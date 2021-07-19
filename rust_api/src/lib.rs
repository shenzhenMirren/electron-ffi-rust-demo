use std::os::raw::c_char;
use std::ffi::{CStr, CString};

#[no_mangle]
pub extern "C" fn generate_str() -> *mut c_char {
    let ping = String::from("Rust side generate: ping");
    let c_str_ping = CString::new(ping).unwrap();
    c_str_ping.into_raw()
}

#[no_mangle]
pub extern "C" fn say_hello(whoc: *mut c_char) -> *mut c_char {
    let mut ping = String::from("hello ");
    let who = unsafe {
        CStr::from_ptr(whoc).to_string_lossy().into_owned()
    };
    ping.push_str(&*who);
    let c_str_ping = CString::new(ping).unwrap();
    c_str_ping.into_raw()
}