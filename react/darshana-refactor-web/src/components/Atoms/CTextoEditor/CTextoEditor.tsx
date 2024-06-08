import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Italic from '@tiptap/extension-italic';
import Document from '@tiptap/extension-document';

import {
  FaBold,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
} from 'react-icons/fa';
import { RiPageSeparator } from 'react-icons/ri';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="menuBar">
      <div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is_active' : ''}
          type="button"
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is_active' : ''}
          type="button"
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is_active' : ''}
          type="button"
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is_active' : ''}
          type="button"
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is_active' : ''
          }
          type="button"
        >
          <FaHeading />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          type="button"
          className={
            editor.isActive('heading', { level: 3 }) ? 'is_active' : ''
          }
        >
          <FaHeading className="heading3" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is_active' : ''}
          type="button"
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is_active' : ''}
          type="button"
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={editor.isActive('horizontalRule') ? 'is_active' : ''}
          type="button"
        >
          <RiPageSeparator />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is_active' : ''}
          type="button"
        >
          <FaQuoteLeft />
        </button>
      </div>
      <div>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          type="button"
        >
          <FaUndo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          type="button"
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

export const CTextoEditor = ({
  disable,
  name,
  label,
  messageError = '* Campo requerido',
  placeholder = 'placehoder',
}: any) => {
  //setear valor de maxHeight del textEditor
  // const root = document.documentElement;
  // root.style.setProperty('--textEditorMaxHeight',textEditorMaxHeight);
  const { formState, watch, setValue } = useFormContext();

  let editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],

    content: watch(name),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      // const text = editor.getText();
      setValue(name, html);
    },
  });
  editor?.setEditable(!disable);

  return (
    <div className="form-group col-sm-12 col-md-12 ">
      <p className="form-label">{label}</p>
      <div className={`textEditor ${formState.errors[name] && 'border-error'}`}>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      {/* {editor?.isEmpty && <span className="message-error">{messageError}</span>} */}
      <div className="message-error">
        <ErrorMessage errors={formState.errors} name={name} />
      </div>
    </div>
  );
};
