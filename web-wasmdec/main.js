(() => {
    window.onload = () => {
        let inEditor = ace.edit("input");
        inEditor.session.setMode("ace/mode/lisp");
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
    }
})();