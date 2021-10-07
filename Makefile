.PHONY: run, debug

start: wasi/target/wasm32-wasi/release/wasi.wasm
	@cd host; npm start -- wasi/target/wasm32-wasi/release/wasi.wasm

debug: wasi/target/wasm32-wasi/debug/wasi.wasm
	@cd host; npm start -- wasi/target/wasm32-wasi/debug/wasi.wasm

wasi/target/wasm32-wasi/release/wasi.wasm: wasi/src/main.rs
	@cd wasi; cargo build --target wasm32-wasi --release

wasi/target/wasm32-wasi/debug/wasi.wasm: wasi/src/main.rs
	@cd wasi; cargo build --target wasm32-wasi
