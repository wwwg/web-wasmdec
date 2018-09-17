(() => {
    window.onload = () => {
        let inEditor = ace.edit("input");
        inEditor.session.setMode("ace/mode/lisp");
    }
})();