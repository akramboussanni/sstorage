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
} from "lucide-react";

const iconStyle = { width: 16, height: 16, flexShrink: 0 };

export const MenuIcons = {
  Open: () => <ExternalLink style={iconStyle} />,
  Copy: () => <Copy style={iconStyle} />,
  CopyLink: () => <Link style={iconStyle} />,
  Delete: () => <Trash2 style={iconStyle} />,
  Rename: () => <PenTool style={iconStyle} />,
  Folder: () => <Folder style={{ ...iconStyle, color: "#fbbf24" }} />,
  Move: () => <Move style={iconStyle} />,
  Cut: () => <Scissors style={iconStyle} />,
  Paste: () => <Clipboard style={iconStyle} />,
  Pin: () => <Pin style={iconStyle} />,
  Palette: () => <Palette style={iconStyle} />,
};

export const FileTypeIcons = {
  File: () => <File style={{ width: 24, height: 24 }} />,
  Image: () => <Image style={{ width: 48, height: 48 }} />,
  Video: () => <Video style={{ width: 48, height: 48 }} />,
  Audio: () => <Music style={{ width: 48, height: 48 }} />,
  Pdf: () => <FileText style={{ width: 48, height: 48 }} />,
  Document: () => <FileText style={{ width: 48, height: 48 }} />,
  Spreadsheet: () => <BarChart3 style={{ width: 48, height: 48 }} />,
};

export const OtherIcons = {
  Globe: () => <Globe style={{ width: 16, height: 16 }} />,
  AlertCircle: () => <AlertCircle style={{ width: 16, height: 16 }} />,
  Close: () => <X style={{ width: 16, height: 16 }} />,
};
