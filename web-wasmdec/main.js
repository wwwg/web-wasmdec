(() => {
    const defaultInput = `;; Edit this code to see it decompile in real time
(module
	(func $addTwo (param i32 i32) (result i32)
		(return
			(i32.add (get_local 0) (get_local 1))
		)
	)
	(export "addTwo" $addTwo)
)`;
    const defaultOutput = `// Click the menu icon in the top left to view more examples
    int fn_addTwo(int arg0, int arg1) {
	return arg0 + arg1;
}`;
    window.example = exString => {
        // hide the drawer;
        $('.mdl-layout__drawer').toggleClass('is-visible');
        $('.mdl-layout__obfuscator').toggleClass('is-visible');
        setTimeout(() => {
            inEditor.setValue(examples[exString], -1);
            setTimeout(() => {
                document.getElementById('decompileBtn').click();
            }, 100);
        }, 250);
    }
    let out = txt => {
        outEditor.setValue(txt, -1);
    }, decompileWast = inputWasm => {
        try {
            let decompiler = new Wasmdec.Decompiler(true, false,
                                                'wast', inputWasm);
            let success = decompiler.decompile();
            if (!success) {
                return null;
            }
            let res = decompiler.getDecompiledCode();
            // decompiler must be manually freed because it's a C++ object allocated on the heap
            decompiler.destroy();
            res = res.replace(/\/\/ Decompiled([\s\S]*?)\/\/ End of preamble\n\n/gim, ""); 
            res = res.trim();
            return res;
        } catch (e) {
            console.error("web-wasmdec: caught error when decompiling:");
            console.log(e);
            return null;
        }
    }, input = () => {
        return inEditor.getValue();
    }, decompileWasm = inputWasm => {
        try {
            let decompiler = new Wasmdec.Decompiler(true, false,
                                                'wasm', inputWasm);
            let success = decompiler.decompile();
            if (!success) {
                return null;
            }
            let res = decompiler.getDecompiledCode();
            // decompiler must be manually freed because it's a C++ object allocated on the heap
            decompiler.destroy();
            return res;
        } catch (e) {
            console.error("web-wasmdec: caught error when decompiling:");
            console.log(e);
            return null;
        }
    }, allocStr = str => {
        let _malloc = Wasmdec.Module._malloc,
            u8 = new Uint8Array(Wasmdec.Module.wasmMemory.buffer),
            len = str.length,
            ptr = _malloc(len + 1),
            i = 0;
        for (i = 0; i < len; ++i) {
            let offset = i + ptr;
            u8[offset] = str.charCodeAt(i);
        }
        ++i;
        u8[i] = 0x0; // null terminator
        return ptr;
    }, freeStr = ptr => {
        return Wasmdec.Module._free(ptr);
    }
    window.onload = () => {
        window.allocStr = allocStr;
        Wasmdec.Module.addOnPostRun(() => {
            $("#loadingOverlay").fadeOut(150);
        });
        window.inEditor = ace.edit("input");
        inEditor.session.setMode("ace/mode/lisp");
        inEditor.setValue(defaultInput, -1);
        // setup output
        window.outEditor = ace.edit('output');
        outEditor.session.setMode("ace/mode/c_cpp");
        outEditor.setValue(defaultOutput, -1);
        document.getElementById('decompileBtn').onclick = e => {
            let wasm = input();
            let output = decompileWast(wasm);
            if (!output) {
                out(`/* Decompilation failed :( */`);
                return;
            }
            out(output);
        }
        document.getElementById('selectFileBtn').onclick = e => {
            let input = document.createElement('input');
            input.addEventListener("change", () => {
                let f = input.files[0];
                var reader = new FileReader();
                reader.onload = function(evt) {
                    if(evt.target.readyState != 2) return;
                    if(evt.target.error) {
                        alert('Error while reading file');
                        return;
                    }
            
                    const f_out = evt.target.result;
                    const ext = f.name.split('.').pop();
                    if (ext !== 'wast' && ext !== 'wasm' && ext !== 'wat') {
                        alert('Invalid file! use a .wast or .wasm!');
                        return;
                    }
                    if (ext == 'wasm') {
                        inEditor.setValue(';; "' + f.name + '" (Selected wasm binary file)', -1);
                        let output = decompileWasm(f_out);
                        if (!output) {
                            out(`/*
                            Decompilation failed :(
                            Check for syntax issues!
                            */`);
                            return;
                        }
                        out(output);
                    } else if ((ext == 'wast' || ext == 'wat')) {
                        inEditor.setValue(f_out, -1);
                        document.getElementById('decompileBtn').click();
                    }
                };
                reader.readAsText(f);
            }, false);
            input.type = 'file';
            input.click();
        }
        window.lastTime = null;
        inEditor.textInput.getElement().addEventListener('keydown', () => {
            lastTime = Date.now();
        });
        setInterval(() => {
            if (!lastTime) return;
            let changeT = Date.now() - lastTime;
            if (changeT >= 500) {
                document.getElementById('decompileBtn').click();
                lastTime = null;
            }
        }, 100);
    }
})();