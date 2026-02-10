"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Folder, Pin } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { Dialog, useDialog } from "@/components/Dialog";
import { Toast, useToast } from "@/components/Toast";
import {
  ContextMenu,
  useContextMenu,
  ContextMenuItem,
} from "@/components/ContextMenu";
import { PreviewCard } from "@/components/PreviewCard";
import { MediaOverview } from "@/components/MediaOverview";
import { MenuIcons, FileTypeIcons } from "@/components/Icons";

interface DriveAccess {
  id: string;
  userId: string;
  user: { username: string; id: string };
  role: string;
}

interface Drive {
  id: string;
  name: string;
  description: string | null;
  owner: { username: string };
  isOwner: boolean;
  canEdit: boolean;
  isPublic: boolean;
  publicRole: string | null;
  access?: DriveAccess[];
}

interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  color?: string;
  isPinned?: boolean;
  orderIndex?: number;
}

interface File {
  id: string;
  originalName: string;
  mimeType: string;
  size: number;
  createdAt: string;
  folderId: string | null;
  isPinned?: boolean;
  orderIndex?: number;
}

const iconSize = 20;
const iconStyle = { width: iconSize, height: iconSize, flexShrink: 0 };

const Icons = {
  Back: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={iconStyle}
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  FolderPlus: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={iconStyle}
    >
      <path d="M12 10v6M9 13h6M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  ),
  Upload: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={iconStyle}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  ),
  Settings: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={iconStyle}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  UserPlus: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={iconStyle}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  ),
  X: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={iconStyle}
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  Trash: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={iconStyle}
    >
      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
  Link: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={iconStyle}
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  Users: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={iconStyle}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

import { useUpload } from '@/components/UploadContext';

export default function DrivePage() {
  const router = useRouter();
  const params = useParams();
  const driveId = params.id as string;
  const { startUpload } = useUpload(); // Added hook

  const [drive, setDrive] = useState<Drive | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [items, setItems] = useState<Array<Folder | File>>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [currentFolderParentId, setCurrentFolderParentId] = useState<
    string | null
  >(null);
  const [currentFolderName, setCurrentFolderName] = useState<string | null>(null);
  const [breadcrumbPath, setBreadcrumbPath] = useState<Array<{ id: string | null; name: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [draggedFolder, setDraggedFolder] = useState<string | null>(null);
  const [draggedFile, setDraggedFile] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [dropIndicator, setDropIndicator] = useState<{ itemId: string; position: "before" | "after" } | null>(null);
  const [moveMode, setMoveMode] = useState<{ items: Array<{ id: string; type: "file" | "folder"; name: string }> } | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [inviteUsername, setInviteUsername] = useState("");
  const [inviteRole, setInviteRole] = useState<"VIEWER" | "EDITOR">("VIEWER");
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showFileOverview, setShowFileOverview] = useState(false);
  const [clipboard, setClipboard] = useState<{
    type: "copy" | "cut";
    items: Array<{ id: string; type: "file" | "folder"; name: string }>;
  } | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPickerFolder, setColorPickerFolder] = useState<Folder | null>(null);
  const [pickedColor, setPickedColor] = useState<string>("#3b82f6");
  const [pendingUploadFile, setPendingUploadFile] = useState<globalThis.File | null>(null);
  const [uploadQuality, setUploadQuality] = useState<"none" | "high" | "balanced" | "small">("balanced");

  const { dialog, showDialog, closeDialog } = useDialog();
  const { toast, showToast } = useToast();
  const { contextMenu, showContextMenu, closeContextMenu } = useContextMenu();

  const loadDrive = useCallback(async () => {
    try {
      const res = await fetch(`/api/drives/${driveId}`);
      if (!res.ok) {
        showToast("Drive not found", "error");
        setTimeout(() => router.push("/"), 1000);
        return;
      }
      const data = await res.json();
      setDrive(data);
    } catch (err) {
      showToast("Failed to load drive", "error");
      setTimeout(() => router.push("/"), 1000);
    }
  }, [driveId, router, showToast]);

  const loadContents = useCallback(async () => {
    try {
      const folderParam = currentFolderId ? `?folderId=${currentFolderId}` : "";
      const [foldersRes, filesRes] = await Promise.all([
        fetch(`/api/drives/${driveId}/folders${folderParam}`),
        fetch(`/api/drives/${driveId}/files${folderParam}`),
      ]);

      const foldersData = await foldersRes.json();
      const filesData = await filesRes.json();

      const foldersArray = Array.isArray(foldersData) ? foldersData : [];
      const filesArray = Array.isArray(filesData) ? filesData : [];

      // Create a combined list with type info for sorting
      const combinedItems = [
        ...foldersArray.map(f => ({ ...f, _type: "folder" as const })),
        ...filesArray.map(f => ({ ...f, _type: "file" as const }))
      ];

      // Sort all items together: pinned -> orderIndex -> alphabetically
      const sortedItems = combinedItems.sort((a, b) => {
        if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
        const orderA = a.orderIndex ?? Infinity;
        const orderB = b.orderIndex ?? Infinity;
        if (orderA !== orderB) return orderA - orderB;
        const nameA = a._type === "folder" ? a.name : a.originalName;
        const nameB = b._type === "folder" ? b.name : b.originalName;
        return nameA.localeCompare(nameB);
      });

      setFolders(foldersArray);
      setFiles(filesArray);
      setItems(sortedItems as any);

      // Fetch the current folder's info to get its parent ID and build breadcrumb
      if (currentFolderId) {
        try {
          const folderInfoRes = await fetch(
            `/api/drives/${driveId}/folders/${currentFolderId}`,
          );
          if (folderInfoRes.ok) {
            const folderInfo = await folderInfoRes.json();
            setCurrentFolderParentId(folderInfo.parentId || null);
            setCurrentFolderName(folderInfo.name);
            
            // Build breadcrumb path by traversing up the parent hierarchy
            const path: Array<{ id: string | null; name: string }> = [{ id: null, name: drive?.name || 'Drive' }];
            let parentId = folderInfo.parentId;
            const visited = new Set<string>();
            
            while (parentId && !visited.has(parentId)) {
              visited.add(parentId);
              try {
                const parentRes = await fetch(`/api/drives/${driveId}/folders/${parentId}`);
                if (parentRes.ok) {
                  const parentFolder = await parentRes.json();
                  path.push({ id: parentFolder.id, name: parentFolder.name });
                  parentId = parentFolder.parentId;
                } else {
                  break;
                }
              } catch {
                break;
              }
            }
            
            // Reverse to get the correct order and add current folder
            path.reverse();
            path.push({ id: currentFolderId, name: folderInfo.name });
            setBreadcrumbPath(path);
          }
        } catch (err) {
          console.error("Failed to load folder info:", err);
        }
      } else {
        setCurrentFolderParentId(null);
        setCurrentFolderName(null);
        setBreadcrumbPath([]);
      }
    } catch (err) {
      console.error("Failed to load contents:", err);
    }
  }, [driveId, currentFolderId]);

  useEffect(() => {
    Promise.all([loadDrive(), loadContents()]).then(() => {
      setLoading(false);
    });
  }, [loadDrive, loadContents]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        if (!moveMode) {
          selectAll();
        }
      }
      if (e.key === "Escape") {
        if (moveMode) {
          setMoveMode(null);
        } else if (selectedItems.size > 0) {
          clearSelection();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [moveMode, selectedItems.size]);

  const handleCreateFolder = () => {
    showDialog(
      "Create Folder",
      "Enter folder name:",
      "prompt",
      undefined,
      (name: string) => {
        if (!name || !name.trim()) return;

        fetch(`/api/drives/${driveId}/folders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            parentId: currentFolderId,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.id) {
              showToast("Folder created!");
              loadContents();
            } else {
              showToast(data.error || "Failed to create folder", "error");
            }
          });
      },
      "Folder name",
    );
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !drive?.canEdit) return;

    const isVideo = file.type.startsWith('video/');
    
    if (isVideo) {
      // Show quality selector for video files
      setUploadQuality("balanced");
      setPendingUploadFile(file);
      showDialog(
        "Select Compression Quality",
        `Choose the compression level for "${file.name}":`,
        "choice",
        async () => {
          if (!pendingUploadFile) return;
          
          await startUpload(pendingUploadFile, {
            driveId,
            folderId: currentFolderId || undefined,
            quality: uploadQuality,
          });
          
          setPendingUploadFile(null);
          loadContents();
        },
        undefined,
        undefined,
        (selected: string) => setUploadQuality(selected as "none" | "high" | "balanced" | "small"),
        uploadQuality,
        [
          { label: "None (original quality, no compression)", value: "none" },
          { label: "High (20-30% compression, best quality)", value: "high" },
          { label: "Balanced (40-60% compression, recommended)", value: "balanced" },
          { label: "Small (60-80% compression, smallest size)", value: "small" },
        ]
      );
    } else {
      // Non-video files don't need quality selection
      await startUpload(file, {
        driveId,
        folderId: currentFolderId || undefined,
      });
      
      loadContents();
    }
    
    e.target.value = "";
  };

  const handleDelete = (type: "folder" | "file", id: string) => {
    const name =
      type === "folder"
        ? folders.find((f) => f.id === id)?.name
        : files.find((f) => f.id === id)?.originalName;

    showDialog(
      "Delete",
      `Are you sure you want to delete "${name}"?`,
      "confirm",
      async () => {
        const endpoint =
          type === "folder"
            ? `/api/drives/${driveId}/folders/${id}`
            : `/api/drives/${driveId}/files/${id}`;

        const res = await fetch(endpoint, { method: "DELETE" });
        if (res.ok) {
          showToast(`${type === "folder" ? "Folder" : "File"} deleted!`);
          loadContents();
        } else {
          showToast("Delete failed", "error");
        }
      },
    );
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    const allIds = new Set<string>();
    folders.forEach((f) => allIds.add(f.id));
    files.forEach((f) => allIds.add(f.id));
    setSelectedItems(allIds);
  };

  const clearSelection = () => {
    setSelectedItems(new Set());
  };

  const startMoveMode = () => {
    if (selectedItems.size === 0) return;
    const itemsToMove: Array<{ id: string; type: "file" | "folder"; name: string }> = [];
    
    selectedItems.forEach((id) => {
      const folder = folders.find((f) => f.id === id);
      if (folder) {
        itemsToMove.push({ id, type: "folder", name: folder.name });
        return;
      }
      const file = files.find((f) => f.id === id);
      if (file) {
        itemsToMove.push({ id, type: "file", name: file.originalName });
      }
    });
    
    setMoveMode({ items: itemsToMove });
    clearSelection();
  };

  const confirmMove = async () => {
    if (!moveMode || !drive?.canEdit) return;

    let successCount = 0;
    for (const item of moveMode.items) {
      try {
        const endpoint =
          item.type === "file"
            ? `/api/drives/${driveId}/files/${item.id}`
            : `/api/drives/${driveId}/folders/${item.id}`;

        const res = await fetch(endpoint, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "move",
            targetFolderId: currentFolderId,
          }),
        });
        
        if (res.ok) {
          const data = await res.json();
          // Verify response contains the item data
          if (data && data.id) {
            successCount++;
          } else {
            console.error("Move response missing item data:", data);
          }
        } else {
          console.error(`Move failed with status ${res.status}`);
        }
      } catch (err) {
        console.error("Move error:", err);
      }
    }

    if (successCount === moveMode.items.length) {
      showToast(
        `Moved ${successCount} item${successCount !== 1 ? "s" : ""}!`,
      );
      setMoveMode(null);
      loadContents();
    } else {
      showToast("Move partially failed", "error");
    }
  };

  const deleteSelected = async () => {
    if (selectedItems.size === 0) return;

    const itemNames: string[] = [];
    const itemsToDelete = { folders: [] as string[], files: [] as string[] };

    selectedItems.forEach((id) => {
      const folder = folders.find((f) => f.id === id);
      if (folder) {
        itemsToDelete.folders.push(id);
        itemNames.push(folder.name);
        return;
      }
      const file = files.find((f) => f.id === id);
      if (file) {
        itemsToDelete.files.push(id);
        itemNames.push(file.originalName);
      }
    });

    showDialog(
      "Delete",
      `Are you sure you want to delete ${selectedItems.size} item${selectedItems.size !== 1 ? "s" : ""}?\n\n${itemNames.join(", ")}`,
      "confirm",
      async () => {
        let successCount = 0;

        for (const fileId of itemsToDelete.files) {
          try {
            const res = await fetch(`/api/drives/${driveId}/files/${fileId}`, {
              method: "DELETE",
            });
            if (res.ok) successCount++;
          } catch (err) {
            console.error("Delete error:", err);
          }
        }

        for (const folderId of itemsToDelete.folders) {
          try {
            const res = await fetch(`/api/drives/${driveId}/folders/${folderId}`, {
              method: "DELETE",
            });
            if (res.ok) successCount++;
          } catch (err) {
            console.error("Delete error:", err);
          }
        }

        if (successCount === selectedItems.size) {
          showToast(
            `Deleted ${successCount} item${successCount !== 1 ? "s" : ""}!`,
          );
          clearSelection();
          loadContents();
        } else {
          showToast("Delete partially failed", "error");
        }
      },
    );
  };

  const handleInviteUser = () => {
    setInviteUsername("");
    setInviteRole("VIEWER");
    setShowInviteDialog(true);
  };

  const handleInviteSubmit = async () => {
    if (!inviteUsername || !inviteUsername.trim()) {
      showToast("Please enter a username", "error");
      return;
    }

    const res = await fetch(`/api/drives/${driveId}/invite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: inviteUsername.trim(),
        role: inviteRole,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      showToast("User invited!");
      loadDrive();
      setShowInviteDialog(false);
      setInviteUsername("");
    } else {
      showToast(data.error || "Failed to invite user", "error");
    }
  };

  const handleUpdateSettings = async (updates: {
    name?: string;
    description?: string;
    isPublic?: boolean;
    publicRole?: string;
  }) => {
    if (!drive?.isOwner) return;

    const res = await fetch(`/api/drives/${driveId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: updates.name ?? drive.name,
        description: updates.description ?? drive.description,
        isPublic: updates.isPublic ?? drive.isPublic,
        publicRole: updates.publicRole ?? drive.publicRole,
      }),
    });

    if (res.ok) {
      showToast("Settings updated!");
      loadDrive();
    } else {
      const data = await res.json();
      showToast(data.error || "Failed to update settings", "error");
    }
  };

  const handleRemoveAccess = async (accessId: string, username: string) => {
    // Find the user ID from the access list
    const access = drive?.access?.find((a) => a.id === accessId);
    if (!access || !access.user?.id) return;

    showDialog(
      "Remove Access",
      `Remove access for ${username}?`,
      "confirm",
      async () => {
        const res = await fetch(
          `/api/drives/${driveId}/access/${access.user.id}`,
          {
            method: "DELETE",
          },
        );

        if (res.ok) {
          showToast("Access removed!");
          loadDrive();
        } else {
          const data = await res.json();
          showToast(data.error || "Failed to remove access", "error");
        }
      },
    );
  };

  const handleDeleteDrive = async () => {
    showDialog(
      "Delete Drive",
      `Are you sure you want to delete "${drive?.name}"? This action cannot be undone. All files and folders will be permanently deleted.`,
      "confirm",
      async () => {
        const res = await fetch(`/api/drives/${driveId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          showToast("Drive deleted successfully!");
          setTimeout(() => router.push("/"), 1500);
        } else {
          const data = await res.json();
          showToast(data.error || "Failed to delete drive", "error");
        }
      },
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    if (bytes < 1024 * 1024 * 1024)
      return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleFolderCustomization = (folder: Folder, updates: Partial<Folder>) => {
    fetch(`/api/drives/${driveId}/folders/${folder.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          showToast("Folder updated!");
          loadContents();
        } else {
          showToast(data.error || "Failed to update folder", "error");
        }
      });
  };

  const handleFileCustomization = (file: File, updates: Partial<File>) => {
    fetch(`/api/drives/${driveId}/files/${file.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          showToast("File updated!");
          loadContents();
        } else {
          showToast(data.error || "Failed to update file", "error");
        }
      });
  };

  const handleReorder = async (droppedId: string, droppedType: "file" | "folder", targetId: string, targetType: "file" | "folder", position: "before" | "after" | "into") => {
    // Find dropped item and target item indices
    const droppedItemIndex = items.findIndex(item => {
      if (droppedType === "folder" && 'name' in item) return item.id === droppedId;
      if (droppedType === "file" && 'originalName' in item) return item.id === droppedId;
      return false;
    });

    const targetItemIndex = items.findIndex(item => {
      if (targetType === "folder" && 'name' in item) return item.id === targetId;
      if (targetType === "file" && 'originalName' in item) return item.id === targetId;
      return false;
    });

    if (droppedItemIndex === -1 || targetItemIndex === -1) return;

    // If dropping INTO a folder, move the item into that folder
    if (position === "into" && targetType === "folder") {
      const updateData: any = {};
      if (droppedType === "folder") {
        updateData.parentId = targetId;
      } else {
        updateData.folderId = targetId;
      }
      
      const endpoint = droppedType === "folder" 
        ? `/api/drives/${driveId}/folders/${droppedId}`
        : `/api/drives/${driveId}/files/${droppedId}`;
        
      fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            loadContents();
          }
        });
      return;
    }

    // Otherwise, reorder within the same level
    const targetItem = items[targetItemIndex];
    const itemBefore = position === "after" ? targetItem : (targetItemIndex > 0 ? items[targetItemIndex - 1] : null);
    const itemAfter = position === "before" ? targetItem : (targetItemIndex < items.length - 1 ? items[targetItemIndex + 1] : null);

    // Calculate new orderIndex between surrounding items
    // Items are sorted ASC, so lower orderIndex = displays first
    let gapStart: number;
    let gapEnd: number;
    
    // We want to insert BETWEEN itemBefore and itemAfter logic
    // The previous logic was confusing `beforeIndex` and `afterIndex` with the mathematical values
    
    if (itemBefore && itemAfter) {
      // Between two items
      gapStart = itemBefore.orderIndex ?? 0;
      gapEnd = itemAfter.orderIndex ?? 0;
    } else if (itemBefore && !itemAfter) {
      // After the last item (so we need a HIGHER index)
      gapStart = itemBefore.orderIndex ?? 0;
      gapEnd = gapStart + 2048; // Large gap
    } else if (!itemBefore && itemAfter) {
      // Before the first item (so we need a LOWER index)
      gapEnd = itemAfter.orderIndex ?? 0;
      gapStart = gapEnd - 2048; // Large gap
    } else {
      // Only one item or empty list
      gapStart = 0;
      gapEnd = 2048;
    }
    
    const newOrderIndex = Math.floor((gapStart + gapEnd) / 2);
    const updateData: any = { orderIndex: newOrderIndex };
    
    if (droppedType === "folder") {
      fetch(`/api/drives/${driveId}/folders/${droppedId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            loadContents();
          } else {
            console.error("Reorder failed:", data);
          }
        })
        .catch(err => console.error("Reorder error:", err));
    } else {
      fetch(`/api/drives/${driveId}/files/${droppedId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            loadContents();
          } else {
            console.error("Reorder failed:", data);
          }
        })
        .catch(err => console.error("Reorder error:", err));
    }
  };

  const handleFolderContextMenu = (e: React.MouseEvent, folder: Folder) => {
    e.preventDefault();
    e.stopPropagation();

    closeContextMenu();

    const items: ContextMenuItem[] = [];

    // If items are selected, show move option first
    if (selectedItems.size > 0) {
      items.push({
        label: `Move Selected Items (${selectedItems.size})`,
        icon: <MenuIcons.Move />,
        onClick: startMoveMode,
      });
      items.push({ separator: true });
    }

    items.push({
      label: "Open",
      icon: <MenuIcons.Folder />,
      onClick: () => setCurrentFolderId(folder.id),
    });
    items.push({
      label: "Rename",
      icon: <MenuIcons.Rename />,
      onClick: () => {
        showDialog(
          "Rename Folder",
          "Enter new name:",
          "prompt",
          undefined,
          (name: string) => {
            if (!name || !name.trim() || name === folder.name) return;
            fetch(`/api/drives/${driveId}/folders/${folder.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: name.trim() }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.id) {
                  showToast("Folder renamed!");
                  loadContents();
                } else {
                  showToast(data.error || "Failed to rename folder", "error");
                }
              });
          },
          "Folder name",
        );
      },
      disabled: !drive?.canEdit,
    });

    if (drive?.canEdit) {
      items.push({ separator: true });
      items.push(
        {
          label: "Copy",
          icon: <MenuIcons.Copy />,
          onClick: () => {
            setClipboard({
              type: "copy",
              items: [{ id: folder.id, type: "folder", name: folder.name }],
            });
            showToast("Folder copied to clipboard");
          },
        },
        {
          label: "Cut",
          icon: <MenuIcons.Cut />,
          onClick: () => {
            setClipboard({
              type: "cut",
              items: [{ id: folder.id, type: "folder", name: folder.name }],
            });
            showToast("Folder cut to clipboard");
          },
        },
      );
    }

    if (drive?.canEdit) {
      items.push({ separator: true });
      items.push({
        label: folder.isPinned ? "Unpin" : "Pin",
        icon: <MenuIcons.Pin />,
        onClick: () => {
          handleFolderCustomization(folder, { isPinned: !folder.isPinned });
        },
      });
      
      items.push({
        label: "Change color",
        icon: <MenuIcons.Palette />,
        onClick: () => {
          setColorPickerFolder(folder);
          setPickedColor(folder.color || "#3b82f6");
          setShowColorPicker(true);
        },
      });
    }

    if (drive?.canEdit) {
      items.push(
        { separator: true },
        {
          label: "Delete",
          icon: <MenuIcons.Delete />,
          onClick: () => handleDelete("folder", folder.id),
          danger: true,
        },
      );
    }

    showContextMenu(items, { x: e.clientX, y: e.clientY });
  };

  const handleFileContextMenu = (e: React.MouseEvent, file: File) => {
    e.preventDefault();
    e.stopPropagation();

    closeContextMenu();

    const fileUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/${file.id}`
        : `/${file.id}`;

    const items: ContextMenuItem[] = [];

    // If items are selected, show move option first
    if (selectedItems.size > 0) {
      items.push({
        label: `Move Selected Items (${selectedItems.size})`,
        icon: <MenuIcons.Move />,
        onClick: startMoveMode,
      });
      items.push({ separator: true });
    }

    items.push({
      label: "Open",
      icon: <MenuIcons.Open />,
      onClick: () => window.open(`/${file.id}`, "_blank"),
    });
    items.push({
      label: "Copy link",
      icon: <MenuIcons.CopyLink />,
      onClick: async () => {
        await navigator.clipboard.writeText(fileUrl);
        showToast("Link copied!");
      },
    });

    if (drive?.canEdit) {
      items.push({ separator: true });
      items.push(
        {
          label: "Copy",
          icon: <MenuIcons.Copy />,
          onClick: () => {
            setClipboard({
              type: "copy",
              items: [{ id: file.id, type: "file", name: file.originalName }],
            });
            showToast("File copied to clipboard");
          },
        },
        {
          label: "Cut",
          icon: <MenuIcons.Cut />,
          onClick: () => {
            setClipboard({
              type: "cut",
              items: [{ id: file.id, type: "file", name: file.originalName }],
            });
            showToast("File cut to clipboard");
          },
        },
      );
    }

    if (drive?.canEdit) {
      items.push({ separator: true });
      items.push({
        label: file.isPinned ? "Unpin" : "Pin",
        icon: <MenuIcons.Pin />,
        onClick: () => {
          handleFileCustomization(file, { isPinned: !file.isPinned });
        },
      });
    }

    if (drive?.canEdit) {
      items.push(
        { separator: true },
        {
          label: "Delete",
          icon: <MenuIcons.Delete />,
          onClick: () => handleDelete("file", file.id),
          danger: true,
        },
      );
    }

    showContextMenu(items, { x: e.clientX, y: e.clientY });
  };

  const handlePaste = async () => {
    if (!clipboard || !drive?.canEdit) return;

    const { type, items } = clipboard;
    let successCount = 0;

    for (const item of items) {
      try {
        if (item.type === "file") {
          const res = await fetch(`/api/drives/${driveId}/files/${item.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: type === "cut" ? "move" : "copy",
              targetFolderId: currentFolderId,
            }),
          });
          if (res.ok) successCount++;
        } else if (item.type === "folder") {
          const res = await fetch(`/api/drives/${driveId}/folders/${item.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: type === "cut" ? "move" : "copy",
              targetFolderId: currentFolderId,
            }),
          });
          if (res.ok) successCount++;
        }
      } catch (err) {
        console.error("Paste error:", err);
      }
    }

    if (successCount === items.length) {
      showToast(
        `${type === "cut" ? "Moved" : "Copied"} ${successCount} item${successCount !== 1 ? "s" : ""}!`,
      );
      if (type === "cut") setClipboard(null);
      loadContents();
    } else {
      showToast(
        `${type === "cut" ? "Move" : "Copy"} partially failed`,
        "error",
      );
    }
  };

  const getFileIcon = (mimeType: string): React.ReactNode => {
    if (mimeType.startsWith("image/")) return <FileTypeIcons.Image />;
    if (mimeType.startsWith("video/")) return <FileTypeIcons.Video />;
    if (mimeType.startsWith("audio/")) return <FileTypeIcons.Audio />;
    if (mimeType.includes("pdf")) return <FileTypeIcons.Pdf />;
    if (mimeType.includes("word") || mimeType.includes("document"))
      return <FileTypeIcons.Document />;
    if (mimeType.includes("sheet") || mimeType.includes("excel"))
      return <FileTypeIcons.Spreadsheet />;
    return <FileTypeIcons.File />;
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#fff",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!drive) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <Dialog state={dialog} onClose={closeDialog} />
      <Toast message={toast.message} show={toast.show} type={toast.type} />

      {/* Invite User Dialog */}
      {showInviteDialog && (
        <div
          className="invite-overlay"
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="app-card"
            style={{
              maxWidth: "360px",
              width: "90%",
              padding: "24px",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <h3
              style={{
                margin: "0 0 20px 0",
                fontSize: "1.125rem",
                fontWeight: 600,
              }}
            >
              Invite user
            </h3>
            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "0.8125rem",
                  color: "var(--muted-foreground)",
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={inviteUsername}
                onChange={(e) => setInviteUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleInviteSubmit();
                  if (e.key === "Escape") {
                    setShowInviteDialog(false);
                    setInviteUsername("");
                  }
                }}
                placeholder="e.g. jane"
                autoFocus
                className="app-input"
              />
            </div>
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontSize: "0.8125rem",
                  color: "var(--muted-foreground)",
                }}
              >
                Role
              </label>
              <select
                value={inviteRole}
                onChange={(e) =>
                  setInviteRole(e.target.value as "VIEWER" | "EDITOR")
                }
                className="app-input"
                style={{ cursor: "pointer" }}
              >
                <option value="VIEWER">Viewer — can only view</option>
                <option value="EDITOR">Editor — can upload & delete</option>
              </select>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  setShowInviteDialog(false);
                  setInviteUsername("");
                }}
                className="app-btn app-btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInviteSubmit}
                className="app-btn app-btn-primary"
              >
                Invite
              </button>
            </div>
          </div>
        </div>
      )}

      <header
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <button
          type="button"
          onClick={() => {
            if (currentFolderId) {
              setCurrentFolderId(currentFolderParentId);
            } else {
              router.push("/");
            }
          }}
          className="app-btn app-btn-ghost"
          style={{ padding: "8px 10px" }}
          aria-label="Back"
        >
          <Icons.Back />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 600 }}>
            {drive.name}
          </h1>
          {drive.description && (
            <p
              style={{
                margin: "2px 0 0 0",
                fontSize: "0.8125rem",
                color: "var(--muted-foreground)",
              }}
            >
              {drive.description}
            </p>
          )}
        </div>
        {drive.canEdit && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleCreateFolder}
              className="app-btn app-btn-primary"
              aria-label="New folder"
              style={{ padding: "8px 12px" }}
            >
              <Icons.FolderPlus />
            </button>
            <label
              className="app-btn app-btn-success"
              style={{ cursor: "pointer", padding: "8px 12px" }}
              aria-label={uploading ? "Uploading" : "Upload"}
            >
              <Icons.Upload />
              <input
                type="file"
                onChange={handleUpload}
                disabled={uploading}
                style={{ display: "none" }}
              />
            </label>
            {drive.isOwner && (
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                className={
                  showSettings
                    ? "app-btn app-btn-primary"
                    : "app-btn app-btn-secondary"
                }
                aria-label="Settings"
                style={{ padding: "8px 12px" }}
              >
                <Icons.Settings />
              </button>
            )}
          </div>
        )}
      </header>

      {/* Settings Panel */}
      {showSettings && drive.isOwner && (
        <div
          style={{
            padding: "28px 24px 32px",
            borderBottom: "1px solid var(--border)",
            background:
              "linear-gradient(180deg, var(--surface) 0%, var(--background) 100%)",
          }}
        >
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            {/* Access — link sharing */}
            <section
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "16px 18px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius)",
                    background: "var(--background)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted-foreground)",
                  }}
                >
                  <Icons.Link />
                </div>
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                    }}
                  >
                    Link sharing
                  </h3>
                  <p
                    style={{
                      margin: "2px 0 0 0",
                      fontSize: "0.8125rem",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    Let anyone with the link access this drive
                  </p>
                </div>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "0.9375rem" }}>
                    Anyone with the link can view
                  </span>
                  <div
                    style={{
                      position: "relative",
                      flexShrink: 0,
                      width: 44,
                      height: 24,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={drive.isPublic}
                      onChange={(e) =>
                        handleUpdateSettings({ isPublic: e.target.checked })
                      }
                      style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0,
                        cursor: "pointer",
                        margin: 0,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 12,
                        background: drive.isPublic
                          ? "var(--accent)"
                          : "var(--border)",
                        transition: "background 0.2s ease",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 2,
                          left: drive.isPublic ? 22 : 2,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "#fff",
                          transition: "left 0.2s ease",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                        }}
                      />
                    </div>
                  </div>
                </label>
                {drive.isPublic && (
                  <div
                    style={{
                      marginTop: 16,
                      paddingTop: 16,
                      borderTop: "1px solid var(--border)",
                    }}
                  >
                    <label
                      style={{
                        display: "block",
                        marginBottom: 8,
                        fontSize: "0.8125rem",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      Permission for link
                    </label>
                    <select
                      value={drive.publicRole || "VIEWER"}
                      onChange={(e) =>
                        handleUpdateSettings({ publicRole: e.target.value })
                      }
                      className="app-input"
                      style={{ maxWidth: 200, cursor: "pointer" }}
                    >
                      <option value="VIEWER">View only</option>
                      <option value="EDITOR">Can edit</option>
                    </select>
                  </div>
                )}
              </div>
            </section>

            {/* Shared with */}
            <section
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 18px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--radius)",
                      background: "var(--background)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    <Icons.Users />
                  </div>
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                      }}
                    >
                      People with access
                    </h3>
                    <p
                      style={{
                        margin: "2px 0 0 0",
                        fontSize: "0.8125rem",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      {drive.access?.length
                        ? `${drive.access.length} ${drive.access.length === 1 ? "person" : "people"} invited`
                        : "Only you"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleInviteUser}
                  className="app-btn app-btn-success"
                  aria-label="Add person"
                  style={{ padding: "8px 12px" }}
                >
                  <Icons.UserPlus />
                </button>
              </div>
              <div style={{ padding: "12px 18px 18px" }}>
                {drive.access && drive.access.length > 0 ? (
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    {drive.access.map((access) => (
                      <li
                        key={access.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 14px",
                          background: "var(--background)",
                          borderRadius: "var(--radius)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: "var(--surface-hover)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.875rem",
                              fontWeight: 600,
                              color: "var(--muted-foreground)",
                            }}
                          >
                            {access.user.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div
                              style={{ fontSize: "0.9375rem", fontWeight: 500 }}
                            >
                              {access.user.username}
                            </div>
                            <div
                              style={{
                                fontSize: "0.75rem",
                                color: "var(--muted-foreground)",
                              }}
                            >
                              {access.role === "EDITOR" ? "Editor" : "Viewer"}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveAccess(access.id, access.user.username)
                          }
                          className="app-btn app-btn-ghost app-btn-danger"
                          aria-label={`Remove ${access.user.username}`}
                          style={{ padding: "6px 10px" }}
                        >
                          <Icons.X />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div
                    style={{
                      padding: "24px 16px",
                      textAlign: "center",
                      background: "var(--background)",
                      borderRadius: "var(--radius)",
                      border: "1px dashed var(--border)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--muted-foreground)",
                        margin: 0,
                      }}
                    >
                      Only you have access. Add people to share this drive.
                    </p>
                    <button
                      type="button"
                      onClick={handleInviteUser}
                      className="app-btn app-btn-secondary"
                      style={{ marginTop: 12 }}
                    >
                      Add people
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Danger Zone */}
            <section
              style={{
                background: "var(--surface)",
                border: "1px solid #ef4444",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                marginTop: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 18px",
                  backgroundColor: "rgba(239, 68, 68, 0.05)",
                  borderBottom: "1px solid #ef4444",
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "#ef4444",
                    }}
                  >
                    Danger Zone
                  </h3>
                  <p
                    style={{
                      margin: "2px 0 0 0",
                      fontSize: "0.8125rem",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    Permanently delete this drive and all its contents
                  </p>
                </div>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <button
                  type="button"
                  onClick={handleDeleteDrive}
                  className="app-btn app-btn-danger"
                  style={{ width: "100%" }}
                >
                  Delete Drive
                </button>
              </div>
            </section>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      {currentFolderId && breadcrumbPath.length > 0 && (
        <div
          style={{
            padding: "10px 20px",
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.875rem",
            overflowX: "auto",
          }}
        >
          {breadcrumbPath.map((item, index) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {item.id === null ? (
                <button
                  type="button"
                  onClick={() => setCurrentFolderId(null)}
                  className="app-btn app-btn-ghost"
                  style={{ padding: "4px 8px" }}
                >
                  {item.name}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentFolderId(item.id)}
                  className="app-btn app-btn-ghost"
                  style={{ padding: "4px 8px" }}
                >
                  {item.name}
                </button>
              )}
              {index < breadcrumbPath.length - 1 && (
                <span style={{ color: "var(--muted)" }}>/</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <main
        style={{
          padding: "24px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Selection/Move Mode Toolbar */}
        {(selectedItems.size > 0 || moveMode) && (
          <div
            style={{
              background: moveMode
                ? "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              color: "white",
              padding: "14px 20px",
              borderRadius: "var(--radius-lg)",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: "0.9375rem",
              fontWeight: 500,
              boxShadow: moveMode ? "0 10px 30px rgba(245, 158, 11, 0.3)" : "0 10px 25px rgba(0, 0, 0, 0.1)",
              border: moveMode ? "1px solid rgba(255, 193, 7, 0.4)" : "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                }}
              >
                {moveMode ? moveMode.items.length : selectedItems.size}
              </div>
              <span style={{ fontWeight: 600, fontSize: "1rem" }}>
                {moveMode
                  ? `Moving ${moveMode.items.length} item${moveMode.items.length !== 1 ? "s" : ""}`
                  : `${selectedItems.size} item${selectedItems.size !== 1 ? "s" : ""} selected`}
              </span>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {!moveMode && selectedItems.size > 0 && (
                <>
                  <button
                    onClick={startMoveMode}
                    className="app-btn app-btn-secondary"
                    title="Move selected items"
                    style={{
                      padding: "8px 12px",
                      fontSize: "0.875rem",
                      background: "rgba(255, 255, 255, 0.15)",
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      color: "white",
                      cursor: "pointer",
                      borderRadius: "var(--radius)",
                      fontWeight: 500,
                      transition: "all 0.2s ease",
                      backdropFilter: "blur(5px)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, flexShrink: 0 }}>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                  <button
                    onClick={deleteSelected}
                    className="app-btn app-btn-danger"
                    title="Delete selected items"
                    style={{
                      padding: "8px 12px",
                      fontSize: "0.875rem",
                      background: "rgba(239, 68, 68, 0.25)",
                      border: "1px solid rgba(239, 68, 68, 0.4)",
                      color: "white",
                      cursor: "pointer",
                      borderRadius: "var(--radius)",
                      fontWeight: 500,
                      transition: "all 0.2s ease",
                      backdropFilter: "blur(5px)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(239, 68, 68, 0.4)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(239, 68, 68, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(239, 68, 68, 0.25)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, flexShrink: 0 }}>
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </button>
                  <div style={{ width: "1px", height: "20px", background: "rgba(255, 255, 255, 0.15)" }} />
                  <button
                    onClick={clearSelection}
                    className="app-btn app-btn-secondary"
                    title="Clear selection"
                    style={{
                      padding: "8px 12px",
                      fontSize: "0.875rem",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "rgba(255, 255, 255, 0.8)",
                      cursor: "pointer",
                      borderRadius: "var(--radius)",
                      fontWeight: 500,
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                    }}
                  >
                    <Icons.X />
                  </button>
                </>
              )}
              {moveMode && (
                <>
                  <button
                    onClick={confirmMove}
                    className="app-btn app-btn-success"
                    title="Confirm move"
                    style={{
                      padding: "8px 12px",
                      fontSize: "0.875rem",
                      background: "rgba(34, 197, 94, 0.35)",
                      border: "1px solid rgba(34, 197, 94, 0.5)",
                      color: "white",
                      cursor: "pointer",
                      borderRadius: "var(--radius)",
                      fontWeight: 600,
                      transition: "all 0.2s ease",
                      backdropFilter: "blur(5px)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(34, 197, 94, 0.5)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(34, 197, 94, 0.35)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18, flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>
                  <button
                    onClick={() => setMoveMode(null)}
                    className="app-btn app-btn-secondary"
                    title="Cancel"
                    style={{
                      padding: "8px 12px",
                      fontSize: "0.875rem",
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "rgba(255, 255, 255, 0.8)",
                      cursor: "pointer",
                      borderRadius: "var(--radius)",
                      fontWeight: 500,
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                    }}
                  >
                    <Icons.X />
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {folders.length === 0 && files.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "64px 20px",
              color: "var(--muted-foreground)",
            }}
          >
            <div
              style={{ fontSize: "2rem", marginBottom: "12px", opacity: 0.7 }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  margin: "0 auto",
                  opacity: 0.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MenuIcons.Folder />
              </div>
            </div>
            <p
              style={{
                fontSize: "1rem",
                marginBottom: "4px",
                color: "var(--foreground)",
              }}
            >
              This folder is empty
            </p>
            {drive.canEdit && (
              <p style={{ fontSize: "0.875rem" }}>
                Upload a file or create a folder to get started.
              </p>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "12px",
            }}
            onContextMenu={(e) => {
              if (!drive?.canEdit) return;
              e.preventDefault();
              e.stopPropagation();
              closeContextMenu();

              const contextMenuItems: ContextMenuItem[] = [];
              
              if (clipboard) {
                contextMenuItems.push({
                  label: `Paste (${clipboard.items.length})`,
                  icon: <MenuIcons.Paste />,
                  onClick: handlePaste,
                });
              }
              
              showContextMenu(contextMenuItems, { x: e.clientX, y: e.clientY });
            }}
          >
            {items.map((item) => {
              const isFolder = 'name' in item;
              
              if (isFolder) {
                const folder = item as Folder;
                const folderPreview = (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      minWidth: "240px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--muted-foreground)",
                          marginBottom: "4px",
                        }}
                      >
                        Folder name
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          wordBreak: "break-word",
                        }}
                      >
                        {folder.name}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--muted-foreground)",
                          marginBottom: "4px",
                        }}
                      >
                        Created
                      </div>
                      <div style={{ fontSize: "0.875rem" }}>
                        {formatDate(folder.createdAt)}
                      </div>
                    </div>
                  </div>
                );

                return (
                  <PreviewCard
                    key={folder.id}
                    content={folderPreview}
                    position="top"
                    delay={600}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        const isBeingMoved = moveMode?.items.some((item) => item.id === folder.id);
                        if (isBeingMoved) return;
                        
                        setCurrentFolderId(folder.id);
                      }}
                      onKeyDown={(e) => {
                        const isBeingMoved = moveMode?.items.some((item) => item.id === folder.id);
                        if (!isBeingMoved && e.key === "Enter") {
                          setCurrentFolderId(folder.id);
                        }
                      }}
                      onContextMenu={(e) => handleFolderContextMenu(e, folder)}
                      draggable
                      onDragStart={() => setDraggedFolder(folder.id)}
                      onDragEnd={() => setDraggedFolder(null)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                        const rect = e.currentTarget.getBoundingClientRect();
                        const offsetX = e.clientX - rect.left;
                        const edgeThreshold = rect.width * 0.3;
                        
                        if (offsetX < edgeThreshold) {
                          setDropIndicator({ itemId: folder.id, position: "before" });
                          setDropTarget(null);
                        } else if (offsetX > rect.width - edgeThreshold) {
                          setDropIndicator({ itemId: folder.id, position: "after" });
                          setDropTarget(null);
                        } else {
                          // Center area - drop into folder
                          setDropTarget(folder.id);
                          setDropIndicator(null);
                        }
                      }}
                      onDragLeave={() => {
                        setDropIndicator(null);
                        setDropTarget(null);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const rect = e.currentTarget.getBoundingClientRect();
                        const offsetX = e.clientX - rect.left;
                        const edgeThreshold = rect.width * 0.3;
                        
                        let position: "before" | "after" | "into" = "into";
                        if (offsetX < edgeThreshold) {
                          position = "before";
                        } else if (offsetX > rect.width - edgeThreshold) {
                          position = "after";
                        }
                        
                        setDropIndicator(null);
                        setDropTarget(null);
                        
                        if (draggedFolder && draggedFolder !== folder.id) {
                          handleReorder(draggedFolder, "folder", folder.id, "folder", position);
                        } else if (draggedFile) {
                          handleReorder(draggedFile, "file", folder.id, "folder", position);
                        }
                      }}
                      className="app-card"
                      style={{
                        cursor: moveMode?.items.some((item) => item.id === folder.id)
                          ? "not-allowed"
                          : draggedFolder === folder.id ? "grabbing" : "grab",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                        padding: "24px 20px",
                        transition:
                          "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.15s ease, opacity 0.15s ease",
                        borderTop: selectedItems.has(folder.id)
                          ? "2px solid var(--accent)"
                          : dropTarget === folder.id ? "2px dashed var(--accent)" : "none",
                        borderRight: selectedItems.has(folder.id)
                          ? "2px solid var(--accent)"
                          : dropTarget === folder.id ? "2px dashed var(--accent)" : "none",
                        borderBottom: selectedItems.has(folder.id)
                          ? "2px solid var(--accent)"
                          : dropTarget === folder.id ? "2px dashed var(--accent)" : "none",
                        borderLeft: folder.color ? `4px solid ${folder.color}` : selectedItems.has(folder.id)
                          ? "2px solid var(--accent)"
                          : dropTarget === folder.id ? "2px dashed var(--accent)" : "none",
                        position: "relative",
                        opacity: moveMode?.items.some((item) => item.id === folder.id)
                          ? 0.5
                          : draggedFolder === folder.id ? 0.7 : 1,
                        background: folder.color
                          ? `linear-gradient(135deg, ${folder.color}15 0%, ${folder.color}08 100%)`
                          : "var(--surface)",
                      }}
                      onMouseEnter={(e) => {
                        const isBeingMoved = moveMode?.items.some((item) => item.id === folder.id);
                        if (!isBeingMoved) {
                          e.currentTarget.style.background = folder.color
                            ? `linear-gradient(135deg, ${folder.color}25 0%, ${folder.color}12 100%)`
                            : "var(--surface-hover)";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = folder.color
                          ? `linear-gradient(135deg, ${folder.color}15 0%, ${folder.color}08 100%)`
                          : "var(--surface)";
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "12px",
                          left: "12px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "4px",
                          border: "2px solid var(--border)",
                          background: selectedItems.has(folder.id)
                            ? "var(--accent)"
                            : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          fontSize: "12px",
                          color: "white",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItemSelection(folder.id);
                        }}
                      >
                        {selectedItems.has(folder.id) && "✓"}
                      </div>
                      {folder.isPinned && (
                        <div style={{ position: "absolute", top: "12px", right: "12px" }}>
                          <Pin size={18} color="var(--muted-foreground)" strokeWidth={2} />
                        </div>
                      )}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Folder style={{ width: 48, height: 48, color: folder.color || "#3b82f6" }} />
                      </div>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          textAlign: "center",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          width: "100%",
                        }}
                      >
                        {folder.name}
                      </span>
                      {dropIndicator?.itemId === folder.id && (
                        <div
                          style={{
                            position: "absolute",
                            top: "0",
                            bottom: "0",
                            width: "4px",
                            background: "var(--accent)",
                            [dropIndicator.position === "before" ? "left" : "right"]: "-4px",
                            pointerEvents: "none",
                            borderRadius: "2px",
                            boxShadow: "0 0 8px var(--accent)",
                            zIndex: 10,
                          }}
                        />
                      )}
                    </div>
                  </PreviewCard>
                );
              } else {
                const file = item as File;
                const filePreview = (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      minWidth: "240px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--muted-foreground)",
                          marginBottom: "4px",
                        }}
                      >
                        File name
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          wordBreak: "break-word",
                        }}
                      >
                        {file.originalName}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--muted-foreground)",
                            marginBottom: "4px",
                          }}
                        >
                          Size
                        </div>
                        <div style={{ fontSize: "0.875rem" }}>
                          {formatFileSize(file.size)}
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--muted-foreground)",
                            marginBottom: "4px",
                          }}
                        >
                          Type
                        </div>
                        <div style={{ fontSize: "0.875rem" }}>
                          {file.mimeType}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--muted-foreground)",
                          marginBottom: "4px",
                        }}
                      >
                        Uploaded
                      </div>
                      <div style={{ fontSize: "0.875rem" }}>
                        {formatDate(file.createdAt)}
                      </div>
                    </div>
                  </div>
                );

                return (
                  <PreviewCard
                    key={file.id}
                    content={filePreview}
                    position="top"
                    delay={600}
                  >
                    <div
                      className="app-card"
                      draggable
                      onDragStart={(e) => {
                        setDraggedFile(file.id);
                        e.dataTransfer.effectAllowed = "move";
                      }}
                      onDragEnd={() => setDraggedFile(null)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                        const rect = e.currentTarget.getBoundingClientRect();
                        const midpoint = rect.width / 2;
                        const offsetX = e.clientX - rect.left;
                        const position = offsetX < midpoint ? "before" : "after";
                        setDropIndicator({ itemId: file.id, position });
                      }}
                      onDragLeave={() => setDropIndicator(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDropIndicator(null);
                        const rect = e.currentTarget.getBoundingClientRect();
                        const midpoint = rect.width / 2;
                        const offsetX = e.clientX - rect.left;
                        const position = offsetX < midpoint ? "before" : "after";
                        if (draggedFolder) {
                          handleReorder(draggedFolder, "folder", file.id, "file", position);
                        } else if (draggedFile && draggedFile !== file.id) {
                          handleReorder(draggedFile, "file", file.id, "file", position);
                        }
                      }}
                      onContextMenu={(e) => handleFileContextMenu(e, file)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "10px",
                        padding: "20px 16px",
                        transition:
                          "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.15s ease",
                        borderTop: selectedItems.has(file.id)
                          ? "2px solid var(--accent)"
                          : "none",
                        borderRight: selectedItems.has(file.id)
                          ? "2px solid var(--accent)"
                          : "none",
                        borderBottom: selectedItems.has(file.id)
                          ? "2px solid var(--accent)"
                          : "none",
                        borderLeft: selectedItems.has(file.id)
                          ? "2px solid var(--accent)"
                          : "none",
                        position: "relative",
                        cursor: draggedFile === file.id ? "grabbing" : "grab",
                        opacity: draggedFile === file.id ? 0.5 : ((draggedFile || draggedFolder) && !dropIndicator ? 0.6 : 1),
                        filter: (draggedFile || draggedFolder) && draggedFile !== file.id && !dropIndicator ? "grayscale(100%)" : "none",
                      }}
                      onClick={(e) => {
                        // Files can only be selected via checkbox
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--surface-hover)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--surface)";
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "8px",
                          left: "8px",
                          width: "20px",
                          height: "20px",
                          borderRadius: "4px",
                          border: "2px solid var(--border)",
                          background: selectedItems.has(file.id)
                            ? "var(--accent)"
                            : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          fontSize: "12px",
                          color: "white",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItemSelection(file.id);
                        }}
                      >
                        {selectedItems.has(file.id) && "✓"}
                      </div>
                      {file.isPinned && (
                        <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                          <Pin size={16} color="var(--muted-foreground)" strokeWidth={2} />
                        </div>
                      )}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(file);
                          setShowFileOverview(true);
                        }}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "8px",
                          flex: 1,
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "40px",
                            height: "40px",
                          }}
                        >
                          {getFileIcon(file.mimeType)}
                        </div>
                        <span
                          style={{
                            fontSize: "0.8125rem",
                            textAlign: "center",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                        >
                          {file.originalName}
                        </span>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--muted-foreground)",
                          }}
                        >
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                      {dropIndicator?.itemId === file.id && (
                        <div
                          style={{
                            position: "absolute",
                            top: "0",
                            bottom: "0",
                            width: "4px",
                            background: "var(--accent)",
                            [dropIndicator.position === "before" ? "left" : "right"]: "-4px",
                            pointerEvents: "none",
                            borderRadius: "2px",
                            boxShadow: "0 0 8px var(--accent)",
                            zIndex: 10,
                          }}
                        />
                      )}
                    </div>
                  </PreviewCard>
                );
              }
            })}
          </div>
        )}
      </main>
      <ContextMenu
        items={contextMenu.items}
        position={contextMenu.position}
        onClose={closeContextMenu}
      />
      {selectedFile && (
        <MediaOverview
          media={{
            id: selectedFile.id,
            originalName: selectedFile.originalName,
            mimeType: selectedFile.mimeType,
            size: selectedFile.size,
            transcodeStatus: "not_required",
            createdAt: selectedFile.createdAt,
          }}
          isOpen={showFileOverview}
          onClose={() => {
            setShowFileOverview(false);
            setSelectedFile(null);
          }}
          onDelete={
            drive.canEdit ? (id) => handleDelete("file", id) : undefined
          }
          onCopyLink={async (url) => {
            await navigator.clipboard.writeText(url);
            showToast("Link copied!");
          }}
        />
      )}
      {showColorPicker && colorPickerFolder && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
          }}
          onClick={() => setShowColorPicker(false)}
        >
          <div
            className="app-card"
            style={{
              padding: "24px",
              maxWidth: "300px",
              boxShadow: "var(--shadow-lg)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: "0 0 16px 0", fontSize: "1.125rem", fontWeight: 600 }}>Pick a color</h3>
            <div style={{ marginBottom: "20px" }}>
              <HexColorPicker
                color={pickedColor}
                onChange={setPickedColor}
              />
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button
                onClick={() => setShowColorPicker(false)}
                className="app-btn app-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleFolderCustomization(colorPickerFolder, { color: pickedColor });
                  setShowColorPicker(false);
                }}
                className="app-btn app-btn-primary"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
