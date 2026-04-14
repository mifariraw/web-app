"use client"

import EventCard from "@src/components/EventCard";
import EventCardSkeleton from "@src/components/skeletons/EventCardSkeleton";
import { Button } from "@src/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@src/components/ui/input-group"
import { useEvents } from "@src/hooks/useEvents";
import { cn } from "@src/lib/utils";
import { IconReload, IconSearch, IconXMark } from "@tabler/icons-react";

interface EventCategorySectionProps {
  title: string;
  type: string;
}

export const EventCategorySection = ({ title, type }: EventCategorySectionProps) => {
  const { 
    events, 
    search, 
    setSearch, 
    loading, 
    reload 
  } = useEvents(type);

  const showNoResults = !loading && events.length === 0;

  return (
    <section className="space-y-4">
      <div className="flex-center-between gap-8">
        <h2 className="text-xl font-bold whitespace-nowrap">{title}</h2>

        <div className="flex-center gap-1">
          <InputGroup className="max-w-40">
            <InputGroupInput 
              placeholder="Cauta..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <IconSearch />
            </InputGroupAddon>
          </InputGroup>
          <Button
            variant="outline"
            onClick={reload}
          >
            <IconReload />
          </Button>
        </div>
      </div>

      <div className={cn("flex items-start gap-4 overflow-auto", loading && "overflow-hidden!")}>
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))
        ) : events.length > 0 ? (
          events.map((event, i) => (
            <EventCard key={i} event={event} />
          ))
        ) : showNoResults ? (
          <div className="flex flex-col w-full items-center justify-center py-10 gap-4">
            <IconXMark size={86} className="opacity-40" />
            <span className="text-base text-muted-foreground">Nu exista rezultate</span>
          </div>
        ) : null}
      </div>
    </section>
  )
}