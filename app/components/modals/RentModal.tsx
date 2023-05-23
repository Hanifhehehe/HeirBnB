"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

function RentModal() {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("@/app/components/Map"), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step == STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step == STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent;

  switch (step) {
    case STEPS.CATEGORY:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which of the following best describes your property?"
            subtitle="Pick a category."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((i) => (
              <div className="col-span-1" key={i.label}>
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category == i.label}
                  label={i.label}
                  icon={i.icon}
                />
              </div>
            ))}
          </div>
        </div>
      );
      break;

    case STEPS.LOCATION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where is your property located?"
            subtitle="Help guests to find you!"
          />
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />
          <Map center={location?.latlng} />
        </div>
      );
      break;

    case STEPS.INFO:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading 
            title="Tell us about your property" 
          />
          <Counter
            title="Guests"
            subtitle="Please enter the appropriate number of guests."
            value={guestCount}
            onChange={value => setCustomValue("guestCount", value)}
          />
          <hr/>
          <Counter
            title="Rooms"
            subtitle="Please enter the number of bedrooms."
            value={roomCount}
            onChange={value => setCustomValue("roomCount", value)}
          />
          <hr/>
          <Counter
            title="Guests"
            subtitle="Please enter the number of bathrooms"
            value={bathroomCount}
            onChange={value => setCustomValue("bathroomCount", value)}
          />
          <hr/>
        </div>
      );
      break;
      
    case STEPS.IMAGES:
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Show off your property!" subtitle="Show guests what your place looks like" />
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)}  />
            </div>
        );
        break;
        
        default:
            bodyContent = (
                <div className="flex flex-col gap-8">
                    <Heading title="Oh no!" subtitle="Something went wrong" />
                </div>
      );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
      title={`HeirBnB Your Property`}
      body={bodyContent}
    />
  );
}

export default RentModal;
