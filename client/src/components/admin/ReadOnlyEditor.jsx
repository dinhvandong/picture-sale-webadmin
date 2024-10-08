import React from 'react';
import { Editor, EditorState, convertFromRaw, ContentState, Entity } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ReadOnlyEditor = ({ content }) => {
  const contentState = convertFromRaw(JSON.parse(content));
  const editorState = EditorState.createWithContent(ContentState.createFromBlockArray(contentState.getBlockMap()));

  const getEntity = (block, start, end) => {
    for (let i = start; i < end; i++) {
      const entityKey = block.getEntityAt(i);
      if (entityKey) {
        const entity = Entity.get(entityKey);
        if (entity.getType() === 'IMAGE') {
          return entity;
        }
      }
    }
    return null;
  };

  const blockRendererFn = (contentBlock) => {
    const blockType = contentBlock.getType();
    if (blockType === 'atomic') {
      const entity = getEntity(contentBlock, 0, contentBlock.getLength());
      if (entity) {
        const { src, alt } = entity.getData();
        return {
          component: ImageBlock,
          editable: false,
          props: {
            src,
            alt,
          },
        };
      }
    }
    return null;
  };

  const ImageBlock = ({ src, alt }) => (
    <div>
      <a href={src} target="_blank" rel="noopener noreferrer">
        {alt}
      </a>
      <br />
      <img src={src} alt={alt} />
    </div>
  );

  return (
    <div>
      <Editor editorState={editorState} readOnly={true} blockRendererFn={blockRendererFn} />
    </div>
  );
};

export default ReadOnlyEditor;