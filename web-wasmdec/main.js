(() => {
    window.onload = () => {
        let inEditor = ace.edit("input");
        inEditor.session.setMode("ace/mode/lisp");
        let outEditor = ace.edit('output');
        outEditor.session.setMode("ace/mode/c_cpp");
    }
})();