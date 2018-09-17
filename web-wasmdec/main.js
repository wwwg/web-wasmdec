(() => {
    const defaultInput = `(module
	(func $addTwo (param i32 i32) (result i32)
		(return
			(i32.add (get_local 0) (get_local 1))
		)
	)
	(export "addTwo" $addTwo)
)`;
    const defaultOutput = `int fn_addTwo(int arg0, int arg1) {
	return arg0 + arg1;
}`;
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
            return res;
        } catch (e) {
            return null;
        }
    }, input = () => {
        return inEditor.getValue();
    }
    window.onload = () => {
        window.inEditor = ace.edit("input");
        inEditor.session.setMode("ace/mode/lisp");
        inEditor.setValue(defaultInput, -1);
        // setup output
        window.outEditor = ace.edit('output');
        outEditor.session.setMode("ace/mode/c_cpp");
        outEditor.setOptions({
            readOnly: true,
            highlightActiveLine: false,
            highlightGutterLine: false
        });
        outEditor.renderer.$cursorLayer.element.style.opacity = 0;
        outEditor.commands.commmandKeyBinding = {};
        outEditor.textInput.getElement().disabled = true;
        outEditor.setValue(defaultOutput, -1);
        document.getElementById('decompileBtn').onclick = e => {
            let wasm = input();
            let output = decompileWast(wasm);
            if (!output) {
                out(`/*
                Decompilation failed :(
                Check for syntax issues!
                */`);
                return;
            }
            out(output);
        }
    }
})();