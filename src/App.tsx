import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputNumber } from "antd";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import "./App.css";

const fullSchema = z.object({
  fullName: z
    .string({
      invalid_type_error: "Invalid name",
      required_error: "Обязательное поле",
    })
    .min(3),
  phoneNumber: z
    .string({
      invalid_type_error: "Invalid name",
      required_error: "Обязательное поле",
    })
    .min(10, "Номер телефона должен содержать 10 цифр"),
  city: z
    .string({
      invalid_type_error: "Invalid name",
      required_error: "Обязательное поле",
    })
    .min(1, "Введите корректное название города"),
  street: z
    .string({
      invalid_type_error: "Invalid name",
      required_error: "Обязательное поле",
    })
    .min(1, "Введите корректное название улицы"),
  apartmentNumber: z
    .number({
      invalid_type_error: "Invalid name11",
      required_error: "Обязательное поле",
    })
    .min(1),
});

const courierSchema = z.object({
  phoneNumber2: z
    .string({
      invalid_type_error: "Invalid name",
      required_error: "Обязательное поле",
    })
    .min(10, "Номер телефона должен содержать 10 цифр"),
  city2: z
    .string({
      invalid_type_error: "Invalid name",
      required_error: "Обязательное поле",
    })
    .min(1, "Введите корректное название города"),
});

type TFullSchema = z.infer<typeof fullSchema>;
type TCourierSchema = z.infer<typeof courierSchema>;

type TFormData = TCourierSchema | TFullSchema;

function App() {
  const [isCourierDelivery, setIsCourierDelivery] = useState(false);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<TFullSchema>({
    resolver: zodResolver(fullSchema),
  });

  const {
    handleSubmit: handleSubmit2,
    reset: reset2,
    formState: { errors: errors2 },
    control: control2,
  } = useForm<TCourierSchema>({
    resolver: zodResolver(courierSchema),
  });

  const onSubmitFull = async (data: TFullSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);

    reset();
  };

  const onSubmitCourier = async (data: TCourierSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);

    reset2();
  };

  return (
    <>
      <div>
        <button
          className="header-button"
          onClick={() => setIsCourierDelivery(false)}
        >
          Личные данные
        </button>
        <button
          className="header-button"
          onClick={() => setIsCourierDelivery(true)}
        >
          Курьерская доставка
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmitFull)} action="#">
        {!isCourierDelivery && (
          <div className="controllers-container">
            <Controller
              control={control}
              name="fullName"
              render={({ field }) => <Input placeholder="ФИО" {...field} />}
            />
            {errors.fullName && <p>{`${errors?.fullName.message}`}</p>}
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <PhoneInput
                  defaultCountry="RU"
                  placeholder="Номер телефона"
                  {...field}
                />
              )}
            />
            {errors.phoneNumber && <p>{`${errors?.phoneNumber.message}`}</p>}
            <Controller
              control={control}
              name="city"
              render={({ field }) => <Input placeholder="Город" {...field} />}
            />
            {errors.city && <p>{`${errors?.city.message}`}</p>}
            <Controller
              control={control}
              name="street"
              render={({ field }) => <Input placeholder="Улица" {...field} />}
            />
            {errors.street && <p>{`${errors?.street.message}`}</p>}
            <Controller
              control={control}
              name="apartmentNumber"
              render={({ field }) => (
                <InputNumber
                  placeholder="Номер дома"
                  className="apartmentNumber-input"
                  {...field}
                />
              )}
            />

            {errors.apartmentNumber && (
              <p>{`${errors?.apartmentNumber.message}`}</p>
            )}
            <button type="submit">Отправить</button>
          </div>
        )}
      </form>

      <form onSubmit={handleSubmit2(onSubmitCourier)} action="#">
        {isCourierDelivery && (
          <div className="controllers-container">
            <Controller
              control={control2}
              name="phoneNumber2"
              render={({ field }) => (
                <PhoneInput
                  defaultCountry="RU"
                  placeholder="Номер телефона"
                  {...field}
                />
              )}
            />
            {errors2.phoneNumber2 && (
              <p>{`${errors2?.phoneNumber2.message}`}</p>
            )}
            <Controller
              control={control2}
              name="city2"
              render={({ field }) => <Input placeholder="Город" {...field} />}
            />
            {errors2.city2 && <p>{`${errors2?.city2.message}`}</p>}
            <button type="submit">Отправить</button>
          </div>
        )}
      </form>
    </>
  );
}

export default App;
