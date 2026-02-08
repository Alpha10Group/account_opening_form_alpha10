import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2, Camera, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  form: any;
  fieldName: string;
  testId: string;
  label?: string;
  description?: string;
  accept?: string;
  variant?: "signature" | "photo" | "document";
}

export default function FileUpload({
  form,
  fieldName,
  testId,
  label = "Click to upload file",
  description = "PNG, JPG or WEBP (max 2MB)",
  accept = "image/png,image/jpeg,image/jpg,image/webp",
  variant = "document",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const currentUrl = form.watch(fieldName);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum file size is 2MB", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("signature", file);
      const res = await fetch("/api/upload-signature", { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Upload failed");
      }
      const data = await res.json();
      form.setValue(fieldName, data.url, { shouldValidate: true });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    form.setValue(fieldName, "", { shouldValidate: true });
  };

  const IconComponent = variant === "photo" ? Camera : variant === "signature" ? Upload : FileText;

  return (
    <div>
      {currentUrl ? (
        <div className="relative border rounded-md p-2 bg-muted/30 inline-block">
          <img
            src={currentUrl}
            alt="Uploaded file"
            className={variant === "photo" ? "w-24 h-28 object-cover rounded-md" : "max-h-20 max-w-[200px] object-contain"}
            data-testid={`img-${testId}`}
          />
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
            accept={accept}
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
                <span className="text-xs text-center">{label}</span>
                <span className="text-[10px] text-center">{description}</span>
              </>
            )}
          </div>
        </label>
      )}
    </div>
  );
}
