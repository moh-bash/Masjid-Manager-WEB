'use client';

import { 
  MDXEditor, 
  headingsPlugin, 
  listsPlugin, 
  quotePlugin, 
  thematicBreakPlugin, 
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertTable,
  tablePlugin
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

interface MarkdownEditorProps {
  markdown: string;
  onChange: (markdown: string) => void;
}

export default function MarkdownEditor({ markdown, onChange }: MarkdownEditorProps) {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
      <MDXEditor
        markdown={markdown}
        onChange={onChange}
        contentEditableClassName="prose max-w-none p-4 min-h-[300px] outline-none"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <div className="flex items-center gap-2 border-b border-gray-200 p-2 bg-gray-50">
                <UndoRedo />
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <BlockTypeSelect />
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <BoldItalicUnderlineToggles />
                <div className="w-px h-6 bg-gray-300 mx-1" />
                <CreateLink />
                <div className="w-px h-6 bg-primary mx-1" />
                <InsertTable />
              </div>
            )
          })
        ]}
      />
    </div>
  );
}