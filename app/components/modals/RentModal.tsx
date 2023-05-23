"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

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
  const router = useRouter()

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false)

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
      price: 500,
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
        return onNext()
    }
  
    setIsLoading(true)
  
    axios.post('/api/listings', data)
        .then(() => {
            toast.success('Listing created successfully!')
            router.refresh()
            reset()
            setStep(STEPS.CATEGORY)
            rentModal.onClose()
        })
        .catch(() => {
            toast.error('Something went wrong, please try again later.')
        })
        .finally( () => {
            setIsLoading(false)
        })
  }

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
            title="Baths"
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

    case STEPS.DESCRIPTION:
        bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading title="How would you describe your property?" subtitle="Short and sweet works best!" />
            <Input
                id="title" 
                label="Title"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
             />
             <hr/>
            <Input
                id="description" 
                label="Description"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
             />
        </div>
        );
        break;
    
    case STEPS.PRICE:
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading title="Set your price" subtitle="How much do you charge per night?" />
                <Input
                    id="price" 
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
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
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step == STEPS.CATEGORY ? undefined : onBack}
      title={`HeirBnB Your Property`}
      body={bodyContent}
    />
  );
}

export default RentModal;
