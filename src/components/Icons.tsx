"use client";

import {
  ExternalLink,
  Copy,
  Trash2,
  PenTool,
  Folder,
  File,
  Video,
  Music,
  FileText,
  BarChart3,
  Image,
  AlertCircle,
  Globe,
  X,
  Move,
  Scissors,
  Clipboard,
  Link,
  Pin,
  Palette,
  LucideProps,
} from "lucide-react";

const iconStyle = { width: 16, height: 16, flexShrink: 0 };

export const MenuIcons = {
  Open: (props: LucideProps) => <ExternalLink {...props} style={{ ...iconStyle, ...props.style }} />,
  Copy: (props: LucideProps) => <Copy {...props} style={{ ...iconStyle, ...props.style }} />,
  CopyLink: (props: LucideProps) => <Link {...props} style={{ ...iconStyle, ...props.style }} />,
  Delete: (props: LucideProps) => <Trash2 {...props} style={{ ...iconStyle, ...props.style }} />,
  Rename: (props: LucideProps) => <PenTool {...props} style={{ ...iconStyle, ...props.style }} />,
  Folder: (props: LucideProps) => <Folder {...props} style={{ ...iconStyle, color: "#fbbf24", ...props.style }} />,
  Move: (props: LucideProps) => <Move {...props} style={{ ...iconStyle, ...props.style }} />,
  Cut: (props: LucideProps) => <Scissors {...props} style={{ ...iconStyle, ...props.style }} />,
  Paste: (props: LucideProps) => <Clipboard {...props} style={{ ...iconStyle, ...props.style }} />,
  Pin: (props: LucideProps) => <Pin {...props} style={{ ...iconStyle, ...props.style }} />,
  Palette: (props: LucideProps) => <Palette {...props} style={{ ...iconStyle, ...props.style }} />,
};

export const FileTypeIcons = {
  File: (props: LucideProps) => <File {...props} style={{ width: 24, height: 24, ...props.style }} />,
  Image: (props: LucideProps) => <Image {...props} style={{ width: 48, height: 48, ...props.style }} />,
  Video: (props: LucideProps) => <Video {...props} style={{ width: 48, height: 48, ...props.style }} />,
  Audio: (props: LucideProps) => <Music {...props} style={{ width: 48, height: 48, ...props.style }} />,
  Pdf: (props: LucideProps) => <FileText {...props} style={{ width: 48, height: 48, ...props.style }} />,
  Document: (props: LucideProps) => <FileText {...props} style={{ width: 48, height: 48, ...props.style }} />,
  Spreadsheet: (props: LucideProps) => <BarChart3 {...props} style={{ width: 48, height: 48, ...props.style }} />,
};

export const OtherIcons = {
  Globe: (props: LucideProps) => <Globe {...props} style={{ width: 16, height: 16, ...props.style }} />,
  AlertCircle: (props: LucideProps) => <AlertCircle {...props} style={{ width: 16, height: 16, ...props.style }} />,
  Close: (props: LucideProps) => <X {...props} style={{ width: 16, height: 16, ...props.style }} />,
};
