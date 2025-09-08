import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  existingImages?: string[];
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesChange,
  maxFiles = 5,
  maxSize = 5,
  existingImages = [],
  className = ''
}) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setError('');

    if (rejectedFiles.length > 0) {
      const reasons = rejectedFiles.map(file => file.errors[0]?.message).join(', ');
      setError(`Some files were rejected: ${reasons}`);
    }

    if (acceptedFiles.length > 0) {
      const totalFiles = uploadedImages.length + existingImages.length + acceptedFiles.length;
      
      if (totalFiles > maxFiles) {
        setError(`Maximum ${maxFiles} images allowed`);
        return;
      }

      const newImages = [...uploadedImages, ...acceptedFiles];
      setUploadedImages(newImages);
      onImagesChange(newImages);
    }
  }, [uploadedImages, existingImages, maxFiles, onImagesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: maxFiles - existingImages.length - uploadedImages.length,
    maxSize: maxSize * 1024 * 1024,
    disabled: uploadedImages.length + existingImages.length >= maxFiles
  });

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    onImagesChange(newImages);
  };

  const removeExistingImage = (index: number) => {
    // This would typically call a callback to remove from existing images
    console.log('Remove existing image at index:', index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      {uploadedImages.length + existingImages.length < maxFiles && (
        <Card>
          <CardContent className="p-6">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-300 hover:border-primary hover:bg-primary/5'
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className={`p-4 rounded-full ${isDragActive ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                  <Upload className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-lg font-medium mb-2">
                    {isDragActive ? 'Drop images here' : 'Upload Images'}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag & drop images here, or click to select files
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maximum {maxFiles} files, up to {maxSize}MB each. Supports JPEG, PNG, WebP
                  </p>
                </div>
                <Button type="button" variant="outline" size="sm">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Choose Files
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div>
          <h4 className="font-medium mb-3 text-sm text-muted-foreground">Current Images</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {existingImages.map((image, index) => (
              <div key={index} className="relative group">
                <Card className="overflow-hidden">
                  <div className="aspect-square">
                    <img
                      src={image}
                      alt={`Existing ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeExistingImage(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Images Preview */}
      {uploadedImages.length > 0 && (
        <div>
          <h4 className="font-medium mb-3 text-sm text-muted-foreground">
            New Images ({uploadedImages.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uploadedImages.map((file, index) => (
              <div key={index} className="relative group">
                <Card className="overflow-hidden">
                  <div className="aspect-square">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </Card>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress Info */}
      <div className="text-sm text-muted-foreground">
        {uploadedImages.length + existingImages.length} of {maxFiles} images
      </div>
    </div>
  );
};