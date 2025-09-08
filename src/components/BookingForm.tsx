import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, addDays, differenceInDays } from "date-fns";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarCheck, CreditCard, Users, MapPin } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useBookingStore, type Room } from '@/lib/booking-store';
import { formatCurrency as formatPrice } from "@/lib/admin-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// Guest schema
const guestSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

// Booking schema
const bookingSchema = z.object({
  checkIn: z.date().min(new Date(), 'Check-in date cannot be in the past'),
  checkOut: z.date(),
  adultCount: z.number().min(1, 'At least 1 adult required').max(10, 'Maximum 10 adults allowed'),
  childrenCount: z.number().min(0).max(10, 'Maximum 10 children allowed'),
  specialRequests: z.string().optional(),
  guests: z.array(guestSchema).min(1, 'At least one guest is required'),
})
.refine((data) => data.checkOut > data.checkIn, {
  message: 'Check-out date must be after check-in date',
  path: ['checkOut'],
})
.refine((data) => differenceInDays(data.checkOut, data.checkIn) <= 30, {
  message: 'Maximum stay is 30 days',
  path: ['checkOut'],
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  selectedRoom?: Room | null;
  onBookingComplete?: (confirmationCode: string) => void;
  className?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  selectedRoom,
  onBookingComplete,
  className = ''
}) => {
  const { toast } = useToast();
  const {
    selectedRoom: storeRoom,
    currentBooking,
    loading,
    error,
    setSelectedRoom,
    updateCurrentBooking,
    setBookingStep,
    createBooking,
    calculateTotalPrice,
    getAvailableRooms,
    resetBookingFlow,
    setError
  } = useBookingStore();

  const activeRoom = React.useMemo(() => {
    const room = selectedRoom || storeRoom;
    if (!room) return null;
    return {
      ...room,
      id: typeof room.id === 'number' ? room.id : parseInt(room.id, 10)
    };
  }, [selectedRoom, storeRoom]);

  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState<'checkIn' | 'checkOut' | null>(null);

  const { control, register, handleSubmit, watch, setValue, formState: { errors } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { // Use values from the store if available
      checkIn: currentBooking?.checkIn || addDays(new Date(), 1),
      checkOut: currentBooking?.checkOut || addDays(new Date(), 2),
      adultCount: currentBooking?.adultCount || 1,
      childrenCount: currentBooking?.childrenCount || 0,
      specialRequests: currentBooking?.specialRequests || '',
      guests: currentBooking?.guests || [],
    },
  });

  const { fields: guestFields, append, remove } = useFieldArray({
    control,
    name: "guests",
  });

  const watchedValues = watch();

  useEffect(() => {
    if (watchedValues.checkIn && watchedValues.checkOut) {
      const totalGuests = watchedValues.adultCount + watchedValues.childrenCount;
      const available = getAvailableRooms(watchedValues.checkIn, watchedValues.checkOut, totalGuests);
      setAvailableRooms(available);

      if (activeRoom) {
        const price = calculateTotalPrice(activeRoom.id, watchedValues.checkIn, watchedValues.checkOut);
        setTotalPrice(price);
      }
    }
  }, [watchedValues.checkIn, watchedValues.checkOut, watchedValues.adultCount, watchedValues.childrenCount, activeRoom, getAvailableRooms, calculateTotalPrice]);

  useEffect(() => {
    if (activeRoom) {
      updateCurrentBooking({
        ...watchedValues,
        roomId: activeRoom.id,
        totalPrice,
      });
    }
  }, [watchedValues, activeRoom, totalPrice, updateCurrentBooking]);

  const onSubmitBooking = async (data: BookingFormData) => {
    if (!activeRoom) {
      setError('Please select a room first');
      return;
    }

    try {
      const confirmationCode = await createBooking({
        roomId: activeRoom.id,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
        guests: data.guests as any, // Cast to bypass the type mismatch
        adultCount: data.adultCount,
        childrenCount: data.childrenCount,
        specialRequests: data.specialRequests,
        totalPrice,
        status: 'pending',
        paymentStatus: 'pending',
      });

      setBookingStep('confirmation');
      onBookingComplete?.(confirmationCode);

      toast({
        title: 'Booking Created Successfully!',
        description: `Your confirmation code is: ${confirmationCode}`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Booking Failed',
        description: 'There was an error creating your booking. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDateSelect = (date: Date | undefined, type: 'checkIn' | 'checkOut') => {
    if (date) {
      setValue(type, date);
      setShowDatePicker(null);
    }
  };

  const numberOfNights = watchedValues.checkIn && watchedValues.checkOut
    ? differenceInDays(watchedValues.checkOut, watchedValues.checkIn)
    : 0;

  return (
    <div className={`space-y-8 ${className}`}>
      {!activeRoom && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Select Room
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableRooms.length > 0 ? (
                availableRooms.map((room) => (
                  <Card
                    key={room.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedRoom(room)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{room.name}</h3>
                        <Badge variant="secondary">{formatPrice(room.price)}/night</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{room.size} • {room.guests} guests</p>
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.slice(0, 3).map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground col-span-2">
                  No rooms available for the selected dates and guest count.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {activeRoom ? (<Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <img
                src={activeRoom.image}
                alt={activeRoom.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{activeRoom.name}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedRoom(null);
                      resetBookingFlow();
                    }}
                  >
                    Change Room
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {activeRoom.size} • Up to {activeRoom.guests} guests
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-semibold text-primary">
                    {formatPrice(activeRoom.price)}/night
                  </span>
                  {numberOfNights > 0 && (
                    <span className="text-muted-foreground">
                      × {numberOfNights} nights = {formatPrice(totalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <form onSubmit={handleSubmit(onSubmitBooking)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Select Dates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Check-in Date</Label>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    onClick={() => setShowDatePicker(showDatePicker === 'checkIn' ? null : 'checkIn')}
                  >
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    {format(watchedValues.checkIn, 'PPP')}
                  </Button>
                  {showDatePicker === 'checkIn' && (
                    <div className="absolute z-10 mt-1 bg-white border rounded-lg shadow-lg p-4">
                      <DayPicker
                        mode="single"
                        selected={watchedValues.checkIn}
                        onSelect={(date) => handleDateSelect(date, 'checkIn')}
                        disabled={{ before: new Date() }}
                        className="rdp"
                      />
                    </div>
                  )}
                </div>
                {errors.checkIn && (
                  <p className="text-sm text-red-600">{errors.checkIn.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Check-out Date</Label>
                <div className="relative">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    onClick={() => setShowDatePicker(showDatePicker === 'checkOut' ? null : 'checkOut')}
                  >
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    {format(watchedValues.checkOut, 'PPP')}
                  </Button>
                  {showDatePicker === 'checkOut' && (
                    <div className="absolute z-10 mt-1 bg-white border rounded-lg shadow-lg p-4">
                      <DayPicker
                        mode="single"
                        selected={watchedValues.checkOut}
                        onSelect={(date) => handleDateSelect(date, 'checkOut')}
                        disabled={{ before: addDays(watchedValues.checkIn, 1) }}
                        className="rdp"
                      />
                    </div>
                  )}
                </div>
                {errors.checkOut && (
                  <p className="text-sm text-red-600">{errors.checkOut.message}</p>
                )}
              </div>
            </div>

            {numberOfNights > 0 && (
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Total stay: <span className="font-semibold">{numberOfNights} nights</span>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Guest Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {guestFields.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No guests added yet. Click "Add Guest" to start.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {guestFields.map((guest, index) => (
                  <div key={guest.id} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Guest {index + 1}</h4>
                      {guestFields.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
                          Remove
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>First Name</Label>
                        <Input {...register(`guests.${index}.firstName`)} placeholder="Enter first name" />
                        {errors.guests?.[index]?.firstName && (
                          <p className="text-sm text-red-600">{errors.guests[index]?.firstName?.message}</p>
                        )}
                      </div>

                      <div>
                        <Label>Last Name</Label>
                        <Input {...register(`guests.${index}.lastName`)} placeholder="Enter last name" />
                        {errors.guests?.[index]?.lastName && (
                          <p className="text-sm text-red-600">{errors.guests[index]?.lastName?.message}</p>
                        )}
                      </div>

                      <div>
                        <Label>Email</Label>
                        <Input type="email" {...register(`guests.${index}.email`)} placeholder="Enter email" />
                        {errors.guests?.[index]?.email && (
                          <p className="text-sm text-red-600">{errors.guests[index]?.email?.message}</p>
                        )}
                      </div>

                      <div>
                        <Label>Phone</Label>
                        <Input {...register(`guests.${index}.phone`)} placeholder="Enter phone number" />
                        {errors.guests?.[index]?.phone && (
                          <p className="text-sm text-red-600">{errors.guests[index]?.phone?.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              onClick={() => append({ firstName: "", lastName: "", email: "", phone: "", isMainGuest: guestFields.length === 0 })}
              className="w-full mt-4"
            >
              Add Guest
            </Button>
          </CardContent>
        </Card>
        {activeRoom && guestFields.length > 0 && numberOfNights > 0 && (
          <Collapsible>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Booking Summary
                </CardTitle>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    Toggle
                  </Button>
                </CollapsibleTrigger>
              </CardHeader>

              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Room</span>
                    <span className="font-medium">{activeRoom.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Dates</span>
                    <span className="font-medium">
                      {format(watchedValues.checkIn, "PPP")} →{" "}
                      {`${format(watchedValues.checkOut, "PPP")} (${numberOfNights} nights)`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Guests</span>
                    <span className="font-medium">
                      {guestFields.length}{" "}
                      {guestFields.length === 1 ? "Guest" : "Guests"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {watchedValues.guests.map((g, i) => (
                      <div
                        key={i}
                        className="text-sm text-muted-foreground flex justify-between"
                      >
                        <span>
                          {g.firstName} {g.lastName}
                        </span>
                        <span>{g.email}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between pt-2 border-t font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}
        <Button type="submit" className="w-full" disabled={loading || !activeRoom || guestFields.length === 0 || numberOfNights <= 0}>
          {loading ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </form>
    </div>
  );
};