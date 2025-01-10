"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { createEventAction } from "../actions";
import { createEventSchema } from "~/validations";
import { Button } from "~/components/ui/button";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { cn } from "~/lib/utils";
import { useToast } from "~/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import ProgressBar from "~/app/_components/ProgressBar";

const CreateEventForm = () => {
  const { toast } = useToast();
  const { form, action, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(createEventAction, zodResolver(createEventSchema), {
      actionProps: {
        onSuccess: ({ data }) => {
          toast({
            title: "Success",
            description: `Event ${data?.name} has been created.`,
          });
          resetFormAndAction();
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: `Something went wrong.`,
          });
        },
      },
      formProps: {
        mode: "onChange",
      },
    });

  if (action.isPending) return <ProgressBar />;

  return (
    <div className="w-full">
      <Card className="m-auto drop-shadow-xl">
        <CardHeader>
          <CardTitle>Create New Event</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={handleSubmitWithAction}
              className="grid grid-cols-2 gap-4"
            >
              <FormField
                defaultValue=""
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                defaultValue=""
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date: Date | undefined) => {
                            if (date instanceof Date) {
                              const formattedDate = format(date, "yyyy-MM-dd");
                              field.onChange(formattedDate);
                            }
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                defaultValue=""
                name="time"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Time <span className="font-light">(HH:MM:SS)</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                defaultValue=""
                name="venue"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                defaultValue=""
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                defaultValue=""
                name="country"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                defaultValue=""
                name="image"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="place-self-end" size={"sm"}>
                Submit
              </Button>
            </form>
          </Form>
          <div className="mt-4 flex flex-col justify-center">
            {form.formState.errors ? (
              <div className="text-sm text-destructive">
                {Object.entries(form.formState.errors).map(([name, value]) => {
                  return (
                    <p className="font-bold" key={name}>
                      {`${name[0]?.toUpperCase() + name.slice(1)}: ${value.message}`}
                    </p>
                  );
                })}
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEventForm;
