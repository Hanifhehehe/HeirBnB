"use client";

import qs from "query-string";
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

function SearchModal() {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    []
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step == STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryLabel = useMemo(() => {
    if (step == STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent;

  switch (step) {
    case STEPS.LOCATION:
      bodyContent = (
        <>
          <Heading
            title="Where would you like to go"
            subtitle="Find  the perfect location!"
          />
          <CountrySelect
            value={location}
            onChange={(value) => {
              setLocation(value as CountrySelectValue);
            }}
          />
          <hr />
          <Map center={location?.latlng} />
        </>
      );
      break;
    case STEPS.DATE:
      bodyContent = (
        <>
          <Heading
            title="When are you planning to go?"
            subtitle="Make sure everyone is free!"
          />
          <Calendar
            value={dateRange}
            onChange={value => setDateRange(value.selection)}
           />
        </>
      );
      break;

    case STEPS.INFO:
        bodyContent = (
            <>
                <Heading
                    title="More information"
                    subtitle="Find your perfect place!"
                />
                <Counter 
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestCount}
                    onChange={value => setGuestCount(value)}
                />
                <Counter 
                    title="Rooms"
                    subtitle="How many rooms do you require?"
                    value={roomCount}
                    onChange={value => setRoomCount(value)}
                />
                <Counter 
                    title="Bathrooms"
                    subtitle="How many bathrooms do you require?"
                    value={bathroomCount}
                    onChange={value => setBathroomCount(value)}
                />
            </>
        )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={step == STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryLabel}
      body={<div className="flex flex-col gap-8">{bodyContent}</div>}
    />
  );
}

export default SearchModal;
