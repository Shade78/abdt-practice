import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, "Пожалуйста, введите ваше ФИО")
    .max(50)
    .regex(/\s/, "Вы не указали полное ФИО"),

  phoneNumber: z
    .string()
    .regex(/^\d+$/)
    .min(10, "Номер телефона должен содержать 10 цифр"),
  city: z
    .string()
    .regex(/[a-zA-Z]+$/)
    .min(1, "Введите корректное название города"),
  street: z
    .string()
    .regex(/[a-zA-Z]+$/)
    .min(1, "Введите корректное название улицы"),
  apartmentNumber: z
    .string()
    .regex(/^[^a-z]*$/, "Введите только номер квартиры")
    .min(1),
});

type TFormSchema = z.infer<typeof formSchema>;

function App() {
  const [isCourierDelivery, setIsCourierDelivery] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<TFormSchema>({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      city: "",
      street: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: TFormSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);

    reset();
  };

  return (
    <div className="container">
      <div>
        <button onClick={() => setIsCourierDelivery(false)}>
          Личные данные
        </button>
        <button onClick={() => setIsCourierDelivery(true)}>
          Курьерская доставка
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} action="#">
        {!isCourierDelivery && (
          <div className="form-container">
            <input
              className={errors.fullName ? "input-error" : ""}
              type="text"
              placeholder="ФИО"
              {...register("fullName", {
                required: "Обязательное поле",
                // validate: (value) => {
                //   console.log("errors fullname", errors.fullName);
                //   return /\s/.test(value) || "error message";
                // },
              })}
            />
            {errors.fullName && <p>{`${errors?.fullName.message}`}</p>}
            <input
              type="tel"
              placeholder="Номер телефона"
              {...register("phoneNumber", {
                required: "Обязательное поле",
              })}
            />
            {errors.phoneNumber && <p>{`${errors?.phoneNumber.message}`}</p>}
            <input
              type="text"
              placeholder="Город проживания"
              {...register("city", {
                required: "Обязательное поле",
              })}
            />
            {errors.city && <p>{`${errors?.city.message}`}</p>}
            <input
              // type="text"
              placeholder="Улица"
              {...register("street", {
                required: "Обязательное поле",
              })}
            />
            {errors.street && <p>{`${errors.street?.message}`}</p>}
            <input
              // type="number"
              placeholder="Номер квартиры"
              {...register("apartmentNumber", {
                required: "Обязательное поле",
              })}
            />
            {errors.apartmentNumber && (
              <p>{`${errors.apartmentNumber?.message}`}</p>
            )}
          </div>
        )}
        {isCourierDelivery && (
          <div className="delivery">
            <input
              type="tel"
              placeholder="Номер телефона"
              {...register("phoneNumber", {
                required: "Обязательное поле",
              })}
            />
            {errors.phoneNumber && <p>{`${errors.phoneNumber?.message}`}</p>}
            <input
              type="text"
              placeholder="Город проживания"
              {...register("city", {
                required: "Обязательное поле",
              })}
            />
            {errors.city && <p>{`${errors.city?.message}`}</p>}
          </div>
        )}
        <button disabled={isSubmitting} type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
}

export default App;
