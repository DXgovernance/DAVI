import { Fragment } from 'react';
import {
  RiH1,
  RiH2,
  RiBold,
  RiItalic,
  RiStrikethrough,
  RiCodeFill,
  RiDoubleQuotesL,
  RiMarkPenLine,
  RiParagraph,
  RiListUnordered,
  RiListOrdered,
  RiSeparator,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
} from 'react-icons/ri';

import { Divider, Header } from './MenuBar.styled';
import MenuItem from '../MenuItem/MenuItem';

const MenuBar = ({ editor }) => {
  const iconSize = 20;
  const items = [
    {
      icon: <RiH1 size={iconSize} />,
      title: 'Heading 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: <RiH2 size={iconSize} />,
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      title: 'divider',
    },
    {
      icon: <RiBold size={iconSize} />,
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: <RiItalic size={iconSize} />,
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: <RiStrikethrough size={iconSize} />,
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },

    {
      title: 'divider',
    },
    {
      icon: <RiCodeFill size={iconSize} />,
      title: 'Code',
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    {
      icon: <RiDoubleQuotesL size={iconSize} />,
      title: 'Blockquote',
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      icon: <RiMarkPenLine size={iconSize} />,
      title: 'Highlight',
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
    {
      title: 'divider',
    },
    {
      icon: <RiParagraph size={iconSize} />,
      title: 'Paragraph',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      icon: <RiListUnordered size={iconSize} />,
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: <RiListOrdered size={iconSize} />,
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      title: 'divider',
    },
    {
      icon: <RiSeparator size={iconSize} />,
      title: 'Horizontal Rule',
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      title: 'divider',
    },
    {
      icon: <RiArrowGoBackLine size={iconSize} />,
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <RiArrowGoForwardLine size={iconSize} />,
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <Header>
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.title === 'divider' ? <Divider /> : <MenuItem {...item} />}
        </Fragment>
      ))}
    </Header>
  );
};

export default MenuBar;
