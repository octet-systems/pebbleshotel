import { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  value?: string;
  onChange: (date: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
}

export function DatePicker({ 
  value, 
  onChange, 
  className, 
  placeholder = "Select date",
  disabled = false,
  minDate,
  maxDate
}: DatePickerProps) {
  const today = new Date().toISOString().split('T')[0];
  const minimumDate = minDate || today;
  const inputRef = useRef<HTMLInputElement>(null);

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputRef.current) {
      inputRef.current.showPicker?.();
    }
  };

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="date"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 touch-target mobile-optimized focus:ring-2 focus:ring-primary focus:ring-offset-2"
          placeholder={placeholder}
          disabled={disabled}
          min={minimumDate}
          max={maxDate}
        />
        <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        {value && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground truncate max-w-[40%] hidden md:block">
            {formatDate(value)}
          </div>
        )}
      </div>
    </div>
  );
}