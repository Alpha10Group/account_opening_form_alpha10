import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, Camera, FileText, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  form: any;
  fieldName: string;
  testId: string;
  label?: string;
  description?: string;
  accept?: string;
  variant?: "signature" | "photo" | "document";
  category?: string;
}

export default function FileUpload({
  form,
  fieldName,
  testId,
  label,
  description,
  accept,
  variant = "document",
  category,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [isPdf, setIsPdf] = useState(false);
  const { toast } = useToast();
  const currentUrl = form.watch(fieldName);

  const isDocumentType = variant === "document";
  const maxSize = isDocumentType ? 5 : 2;
  const defaultAccept = isDocumentType
    ? "image/png,image/jpeg,image/jpg,image/webp,application/pdf"
    : "image/png,image/jpeg,image/jpg,image/webp";
  const defaultLabel = variant === "photo"
    ? "Click to upload passport photograph"
    : variant === "signature"
    ? "Click to upload signature"
    : "Click to upload document";
  const defaultDescription = isDocumentType
    ? `PNG, JPG, WEBP or PDF (max ${maxSize}MB)`
    : `PNG, JPG or WEBP (max ${maxSize}MB)`;

  const finalAccept = accept || defaultAccept;
  const finalLabel = label || defaultLabel;
  const finalDescription = description || defaultDescription;

  const endpoint = isDocumentType ? "/api/upload-document" : "/api/upload-signature";
  const fileCategory = category || (variant === "photo" ? "passport" : variant === "signature" ? "signature" : "document");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSize * 1024 * 1024) {
      toast({ title: "File too large", description: `Maximum file size is ${maxSize}MB`, variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${endpoint}?category=${fileCategory}`, { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Upload failed");
      }
      const data = await res.json();
      form.setValue(fieldName, data.url, { shouldValidate: true });
      if (data.isPdf) setIsPdf(true);
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    form.setValue(fieldName, "", { shouldValidate: true });
    setIsPdf(false);
  };

  const IconComponent = variant === "photo" ? Camera : variant === "signature" ? Upload : FileText;
  const urlIsPdf = currentUrl?.endsWith(".pdf");

  return (
    <div>
      {currentUrl ? (
        <div className="relative border rounded-md p-2 bg-muted/30 inline-block">
          {urlIsPdf || isPdf ? (
            <div className="flex items-center gap-2 px-2 py-1" data-testid={`file-${testId}`}>
              <File className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-xs font-medium">PDF Document</p>
                <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline" data-testid={`link-${testId}`}>View file</a>
              </div>
            </div>
          ) : (
            <img
              src={currentUrl}
              alt="Uploaded file"
              className={variant === "photo" ? "w-24 h-28 object-cover rounded-md" : "max-h-20 max-w-[200px] object-contain"}
              data-testid={`img-${testId}`}
            />
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground"
            onClick={handleRemove}
            data-testid={`button-remove-${testId}`}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        <label className="cursor-pointer" data-testid={`label-upload-${testId}`}>
          <input
            type="file"
            accept={finalAccept}
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
            data-testid={`input-upload-${testId}`}
          />
          <div className={`border-2 border-dashed rounded-md p-4 flex flex-col items-center gap-2 text-muted-foreground hover-elevate transition-colors ${variant === "photo" ? "w-28 h-32" : ""}`}>
            {uploading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-xs">Uploading...</span>
              </>
            ) : (
              <>
                <IconComponent className="w-6 h-6" />
                <span className="text-xs text-center">{finalLabel}</span>
                <span className="text-[10px] text-center">{finalDescription}</span>
              </>
            )}
          </div>
        </label>
      )}
    </div>
  );
}
