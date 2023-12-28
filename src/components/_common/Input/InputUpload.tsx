import styled from '@emotion/styled';
import React, { useRef, useState, ChangeEvent, DragEvent } from 'react';

interface UploadProps {
  children: React.ReactNode | ((file: File | null, isDragging: boolean) => React.ReactNode);
  droppable?: boolean;
  name?: string;
  accept?: string;
  value?: File | null;
  onChange?: (file: File) => void;
}

const InputUpload = ({
  children,
  droppable,
  name,
  accept,
  value,
  onChange,
  ...props
}: UploadProps) => {
  const [file, setFile] = useState<File | null>(value || null); 
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const changedFile = e.target.files[0];
      setFile(changedFile);
      onChange?.(changedFile);
    }
  };

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  const handleDragEvent = (e: DragEvent<HTMLDivElement>) => {
    if (!droppable) return;

    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    handleDragEvent(e);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    handleDragEvent(e);
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    handleDragEvent(e);
  };

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    handleDragEvent(e);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const changedFile = e.dataTransfer.files[0];
      setFile(changedFile);
      onChange?.(changedFile);
      setIsDragging(false);
    }
  };

  return (
    <UploadContainer
      onClick={handleChooseFile}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      {...props}>
      <Input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
      />
      {typeof children === 'function' ? children(file, isDragging) : children}
    </UploadContainer>
  );
};

export default InputUpload;

const UploadContainer = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;