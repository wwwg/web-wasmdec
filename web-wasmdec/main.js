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
    window.onload = () => {
        let inEditor = ace.edit("input");
        inEditor.session.setMode("ace/mode/lisp");
        inEditor.setValue(defaultInput, -1);
        // setup output
        let outEditor = ace.edit('output');
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
    }
})();