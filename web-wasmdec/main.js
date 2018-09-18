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
    const examples = {
        'addTwo': defaultInput,
        'funcs': `(module
	(type $varg_i32 (func (result i32)))
	(func $addTwo (param i32 i32) (result i32)
		(return
			(i32.add
				(get_local 0)
				(get_local 1)
			)
		)
	)
	(func $getOne (type $varg_i32)
		(return
			(i32.const 1)
		)
	)
	(export "addTwo" $addTwo)
)`,
        'emcc': `;; Simple Emscripten-compiled C program
 (module
 (type $FUNCSIG$vii (func (param i32 i32)))
 (type $FUNCSIG$vi (func (param i32)))
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (import "env" "DYNAMICTOP_PTR" (global $DYNAMICTOP_PTR$asm2wasm$import i32))
 (import "env" "tempDoublePtr" (global $tempDoublePtr$asm2wasm$import i32))
 (import "env" "ABORT" (global $ABORT$asm2wasm$import i32))
 (import "env" "memoryBase" (global $memoryBase i32))
 (import "env" "tableBase" (global $tableBase i32))
 (import "global" "NaN" (global $nan$asm2wasm$import f64))
 (import "global" "Infinity" (global $inf$asm2wasm$import f64))
 (import "env" "abortStackOverflow" (func $abortStackOverflow (param i32)))
 (import "env" "_printf" (func $_printf (param i32 i32) (result i32)))
 (import "env" "memory" (memory $0 256))
 (import "env" "table" (table 0 anyfunc))
 (global $DYNAMICTOP_PTR (mut i32) (get_global $DYNAMICTOP_PTR$asm2wasm$import))
 (global $tempDoublePtr (mut i32) (get_global $tempDoublePtr$asm2wasm$import))
 (global $ABORT (mut i32) (get_global $ABORT$asm2wasm$import))
 (global $STACKTOP (mut i32) (i32.const 0))
 (global $STACK_MAX (mut i32) (i32.const 0))
 (global $__THREW__ (mut i32) (i32.const 0))
 (global $threwValue (mut i32) (i32.const 0))
 (global $setjmpId (mut i32) (i32.const 0))
 (global $undef (mut i32) (i32.const 0))
 (global $nan (mut f64) (get_global $nan$asm2wasm$import))
 (global $inf (mut f64) (get_global $inf$asm2wasm$import))
 (global $tempInt (mut i32) (i32.const 0))
 (global $tempBigInt (mut i32) (i32.const 0))
 (global $tempBigIntS (mut i32) (i32.const 0))
 (global $tempValue (mut i32) (i32.const 0))
 (global $tempDouble (mut f64) (f64.const 0))
 (global $tempRet0 (mut i32) (i32.const 0))
 (global $tempFloat (mut f32) (f32.const 0))
 (global $f0 (mut f32) (f32.const 0))
 (data (get_global $memoryBase) "%s\\n\\00Hello, wasmdec!\\00secondVal: %d\n")
 (export "_main" (func $_main))
 (export "__post_instantiate" (func $__post_instantiate))
 (export "runPostSets" (func $runPostSets))
 (export "_doubleValue" (func $_doubleValue))
 (func $stackAlloc (param $size i32) (result i32)
  (local $ret i32)
  (set_local $ret
   (get_global $STACKTOP)
  )
  (set_global $STACKTOP
   (i32.add
    (get_global $STACKTOP)
    (get_local $size)
   )
  )
  (set_global $STACKTOP
   (i32.and
    (i32.add
     (get_global $STACKTOP)
     (i32.const 15)
    )
    (i32.const -16)
   )
  )
  (if
   (i32.ge_s
    (get_global $STACKTOP)
    (get_global $STACK_MAX)
   )
   (call $abortStackOverflow
    (get_local $size)
   )
  )
  (return
   (get_local $ret)
  )
 )
 (func $stackSave (result i32)
  (return
   (get_global $STACKTOP)
  )
 )
 (func $stackRestore (param $top i32)
  (set_global $STACKTOP
   (get_local $top)
  )
 )
 (func $establishStackSpace (param $stackBase i32) (param $stackMax i32)
  (set_global $STACKTOP
   (get_local $stackBase)
  )
  (set_global $STACK_MAX
   (get_local $stackMax)
  )
 )
 (func $setThrew (param $threw i32) (param $value i32)
  (if
   (i32.eq
    (get_global $__THREW__)
    (i32.const 0)
   )
   (block
    (set_global $__THREW__
     (get_local $threw)
    )
    (set_global $threwValue
     (get_local $value)
    )
   )
  )
 )
 (func $_doubleValue (param $$0 i32) (result i32)
  (local $$1 i32)
  (local $$2 i32)
  (local $$3 i32)
  (local $label i32)
  (local $sp i32)
  (set_local $sp
   (get_global $STACKTOP)
  )
  (set_global $STACKTOP
   (i32.add
    (get_global $STACKTOP)
    (i32.const 16)
   )
  )
  (if
   (i32.ge_s
    (get_global $STACKTOP)
    (get_global $STACK_MAX)
   )
   (call $abortStackOverflow
    (i32.const 16)
   )
  )
  (set_local $$1
   (get_local $$0)
  )
  ;;@ main.c:4:0
  (set_local $$2
   (get_local $$1)
  )
  (set_local $$3
   (i32.shl
    (get_local $$2)
    (i32.const 1)
   )
  )
  (set_global $STACKTOP
   (get_local $sp)
  )
  (return
   (get_local $$3)
  )
 )
 (func $_main (result i32)
  (local $$0 i32)
  (local $$1 i32)
  (local $$2 i32)
  (local $$3 i32)
  (local $$4 i32)
  (local $$5 i32)
  (local $$6 i32)
  (local $$7 i32)
  (local $$8 i32)
  (local $$9 i32)
  (local $$vararg_buffer i32)
  (local $$vararg_buffer1 i32)
  (local $label i32)
  (local $sp i32)
  (set_local $sp
   (get_global $STACKTOP)
  )
  (set_global $STACKTOP
   (i32.add
    (get_global $STACKTOP)
    (i32.const 32)
   )
  )
  (if
   (i32.ge_s
    (get_global $STACKTOP)
    (get_global $STACK_MAX)
   )
   (call $abortStackOverflow
    (i32.const 32)
   )
  )
  (set_local $$vararg_buffer1
   (i32.add
    (get_local $sp)
    (i32.const 8)
   )
  )
  (set_local $$vararg_buffer
   (get_local $sp)
  )
  (set_local $$0
   (i32.const 0)
  )
  (loop $while-in
   (block $while-out
    ;;@ main.c:10:0
    (set_local $$3
     (get_local $$1)
    )
    (set_local $$4
     (i32.add
      (get_local $$3)
      (i32.const 1)
     )
    )
    (set_local $$1
     (get_local $$4)
    )
    ;;@ main.c:11:0
    (set_local $$5
     (get_local $$1)
    )
    (set_local $$6
     (i32.lt_s
      (get_local $$5)
      (i32.const 10)
     )
    )
    (if
     (get_local $$6)
     (br $while-out)
    )
    (br $while-in)
   )
  )
  ;;@ main.c:15:0
  (i32.store
   (get_local $$vararg_buffer)
   (i32.add
    (get_global $memoryBase)
    (i32.const 4)
   )
  )
  (drop
   (call $_printf
    (i32.add
     (get_global $memoryBase)
     (i32.const 0)
    )
    (get_local $$vararg_buffer)
   )
  )
  ;;@ main.c:17:0
  (set_local $$1
   (i32.const 6)
  )
  ;;@ main.c:19:0
  (set_local $$7
   (get_local $$1)
  )
  (set_local $$8
   (call $_doubleValue
    (get_local $$7)
   )
  )
  (set_local $$2
   (get_local $$8)
  )
  ;;@ main.c:20:0
  (set_local $$9
   (get_local $$2)
  )
  (i32.store
   (get_local $$vararg_buffer1)
   (get_local $$9)
  )
  (drop
   (call $_printf
    (i32.add
     (get_global $memoryBase)
     (i32.const 20)
    )
    (get_local $$vararg_buffer1)
   )
  )
  (set_global $STACKTOP
   (get_local $sp)
  )
  ;;@ main.c:21:0
  (return
   (i32.const 0)
  )
 )
 (func $runPostSets
  (local $temp i32)
  (nop)
 )
 (func $__post_instantiate
  (set_global $STACKTOP
   (i32.add
    (get_global $memoryBase)
    (i32.const 48)
   )
  )
  (set_global $STACK_MAX
   (i32.add
    (get_global $STACKTOP)
    (i32.const 5242880)
   )
  )
  (call $runPostSets)
 )
)`,
        'switch': `;; Switch routine in C compiled to wasm
 (module
 (type $FUNCSIG$vii (func (param i32 i32)))
 (type $FUNCSIG$vi (func (param i32)))
 (type $FUNCSIG$iii (func (param i32 i32) (result i32)))
 (import "env" "memory" (memory $0 256))
 (import "env" "table" (table 0 anyfunc))
 (import "env" "memoryBase" (global $memoryBase i32))
 (import "env" "tableBase" (global $tableBase i32))
 (import "env" "DYNAMICTOP_PTR" (global $DYNAMICTOP_PTR$asm2wasm$import i32))
 (import "env" "tempDoublePtr" (global $tempDoublePtr$asm2wasm$import i32))
 (import "env" "ABORT" (global $ABORT$asm2wasm$import i32))
 (import "global" "NaN" (global $nan$asm2wasm$import f64))
 (import "global" "Infinity" (global $inf$asm2wasm$import f64))
 (import "env" "abortStackOverflow" (func $abortStackOverflow (param i32)))
 (import "env" "_printf" (func $_printf (param i32 i32) (result i32)))
 (global $DYNAMICTOP_PTR (mut i32) (get_global $DYNAMICTOP_PTR$asm2wasm$import))
 (global $tempDoublePtr (mut i32) (get_global $tempDoublePtr$asm2wasm$import))
 (global $ABORT (mut i32) (get_global $ABORT$asm2wasm$import))
 (global $STACKTOP (mut i32) (i32.const 0))
 (global $STACK_MAX (mut i32) (i32.const 0))
 (global $__THREW__ (mut i32) (i32.const 0))
 (global $threwValue (mut i32) (i32.const 0))
 (global $setjmpId (mut i32) (i32.const 0))
 (global $undef (mut i32) (i32.const 0))
 (global $nan (mut f64) (get_global $nan$asm2wasm$import))
 (global $inf (mut f64) (get_global $inf$asm2wasm$import))
 (global $tempInt (mut i32) (i32.const 0))
 (global $tempBigInt (mut i32) (i32.const 0))
 (global $tempBigIntS (mut i32) (i32.const 0))
 (global $tempValue (mut i32) (i32.const 0))
 (global $tempDouble (mut f64) (f64.const 0))
 (global $tempRet0 (mut i32) (i32.const 0))
 (global $tempFloat (mut f32) (f32.const 0))
 (global $f0 (mut f32) (f32.const 0))
 (data (get_global $memoryBase) "one\\n\\00two\\n\\00forty two!\\n\\00default\n")
 (export "__post_instantiate" (func $__post_instantiate))
 (export "_main" (func $_main))
 (export "runPostSets" (func $runPostSets))
 (func $stackAlloc (; 2 ;) (param $size i32) (result i32)
  (local $ret i32)
  (set_local $ret
   (get_global $STACKTOP)
  )
  (set_global $STACKTOP
   (i32.add
    (get_global $STACKTOP)
    (get_local $size)
   )
  )
  (set_global $STACKTOP
   (i32.and
    (i32.add
     (get_global $STACKTOP)
     (i32.const 15)
    )
    (i32.const -16)
   )
  )
  (if
   (i32.ge_s
    (get_global $STACKTOP)
    (get_global $STACK_MAX)
   )
   (call $abortStackOverflow
    (get_local $size)
   )
  )
  (return
   (get_local $ret)
  )
 )
 (func $stackSave (; 3 ;) (result i32)
  (return
   (get_global $STACKTOP)
  )
 )
 (func $stackRestore (; 4 ;) (param $top i32)
  (set_global $STACKTOP
   (get_local $top)
  )
 )
 (func $establishStackSpace (; 5 ;) (param $stackBase i32) (param $stackMax i32)
  (set_global $STACKTOP
   (get_local $stackBase)
  )
  (set_global $STACK_MAX
   (get_local $stackMax)
  )
 )
 (func $setThrew (; 6 ;) (param $threw i32) (param $value i32)
  (if
   (i32.eq
    (get_global $__THREW__)
    (i32.const 0)
   )
   (block
    (set_global $__THREW__
     (get_local $threw)
    )
    (set_global $threwValue
     (get_local $value)
    )
   )
  )
 )
 (func $_main (; 7 ;) (param $$0 i32) (param $$1 i32) (result i32)
  (local $$2 i32)
  (local $$3 i32)
  (local $$4 i32)
  (local $$5 i32)
  (local $$6 i32)
  (local $$vararg_buffer i32)
  (local $$vararg_buffer1 i32)
  (local $$vararg_buffer3 i32)
  (local $$vararg_buffer5 i32)
  (local $label i32)
  (local $sp i32)
  (set_local $sp
   (get_global $STACKTOP)
  )
  (set_global $STACKTOP
   (i32.add
    (get_global $STACKTOP)
    (i32.const 48)
   )
  )
  (if
   (i32.ge_s
    (get_global $STACKTOP)
    (get_global $STACK_MAX)
   )
   (call $abortStackOverflow
    (i32.const 48)
   )
  )
  (set_local $$vararg_buffer5
   (i32.add
    (get_local $sp)
    (i32.const 24)
   )
  )
  (set_local $$vararg_buffer3
   (i32.add
    (get_local $sp)
    (i32.const 16)
   )
  )
  (set_local $$vararg_buffer1
   (i32.add
    (get_local $sp)
    (i32.const 8)
   )
  )
  (set_local $$vararg_buffer
   (get_local $sp)
  )
  (set_local $$2
   (i32.const 0)
  )
  (set_local $$3
   (get_local $$0)
  )
  (set_local $$4
   (get_local $$1)
  )
  ;;@ switch.c:9:0
  (set_local $$5
   (i32.const 42)
  )
  ;;@ switch.c:10:0
  (set_local $$6
   (get_local $$5)
  )
  (block $switch
   (block $switch-default
    (block $switch-case1
     (block $switch-case0
      (block $switch-case
       (br_table $switch-case $switch-case0 $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-default $switch-case1 $switch-default
        (i32.sub
         (get_local $$6)
         (i32.const 1)
        )
       )
      )
      (block
       ;;@ switch.c:12:0
       (drop
        (call $_printf
         (i32.add
          (get_global $memoryBase)
          (i32.const 0)
         )
         (get_local $$vararg_buffer)
        )
       )
       (br $switch)
      )
     )
     (block
      ;;@ switch.c:15:0
      (drop
       (call $_printf
        (i32.add
         (get_global $memoryBase)
         (i32.const 5)
        )
        (get_local $$vararg_buffer1)
       )
      )
      (br $switch)
     )
    )
    (block
     ;;@ switch.c:18:0
     (drop
      (call $_printf
       (i32.add
        (get_global $memoryBase)
        (i32.const 10)
       )
       (get_local $$vararg_buffer3)
      )
     )
     (br $switch)
    )
   )
   ;;@ switch.c:21:0
   (drop
    (call $_printf
     (i32.add
      (get_global $memoryBase)
      (i32.const 22)
     )
     (get_local $$vararg_buffer5)
    )
   )
  )
  (set_global $STACKTOP
   (get_local $sp)
  )
  ;;@ switch.c:24:0
  (return
   (i32.const 0)
  )
 )
 (func $runPostSets (; 8 ;)
  (local $temp i32)
  (nop)
 )
 (func $__post_instantiate (; 9 ;)
  (set_global $STACKTOP
   (i32.add
    (get_global $memoryBase)
    (i32.const 32)
   )
  )
  (set_global $STACK_MAX
   (i32.add
    (get_global $STACKTOP)
    (i32.const 5242880)
   )
  )
  (call $runPostSets)
 )
)`
    };
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
                    if (ext !== 'wast' && ext !== 'wasm') {
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
                    } else {
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