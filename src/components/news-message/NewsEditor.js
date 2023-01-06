import React,{useState} from 'react'
import { Editor } from "react-draft-wysiwyg";
import {  convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export default function NewsEditor(props) {
    const [editorState, seteditorState] = useState('')
  return (
    <div>
        <Editor
                editorState={editorState}/* //以受控方式更新编辑器状态的属性。 */
                toolbarClassName = "toolbarClassName"
                wrapperClassName = "wrapperClassName"
                editorClassName = "editorClassName"
                onEditorStateChange={(editorState)=>seteditorState(editorState)}//每当编辑器的状态发生变化时都会调用函数，可用来改变 editorState。
                onBlur={()=>{
                    props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
                }}
            />
    </div>
  )
}
