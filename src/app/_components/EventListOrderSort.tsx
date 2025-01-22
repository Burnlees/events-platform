"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const EventListOrderSort = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [orderBy, setOrderBy] = React.useState<string | null>(null);
  const [sortBy, setSortBy] = React.useState<string | null>(null);

  const createPageURL = (order: string | null, sort: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (order) {
      params.set("order", order);
    }
    if (sort) {
      params.set("sort", sort);
    }
    return `${pathname}?${params.toString()}`;
  };

  const handleClick = () => {
    router.push(createPageURL(orderBy, sortBy));
  };

  return (
    <div className="ml-auto flex items-center gap-4">
      <Select onValueChange={(value) => setSortBy(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="id">Default</SelectItem>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="venue">Venue</SelectItem>
          <SelectItem value="city">City</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setOrderBy(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Order By" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Asc</SelectItem>
          <SelectItem value="desc">Desc</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleClick} size={"sm"} variant={"outline"}>
        Go
      </Button>
    </div>
  );
};

export default EventListOrderSort;
