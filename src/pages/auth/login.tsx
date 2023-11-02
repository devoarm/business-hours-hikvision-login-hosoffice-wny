import AButton from "@/@core/components/AButton";
import AFormVertical from "@/@core/components/AFormVertical";
import AInput from "@/@core/components/AInput";
import { colors } from "@/config/theme/color";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Divider, Input } from "antd";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

type FormType = {
  username: string;
  password: string;
};
const schema: any = yup.object().shape({
  username: yup.string().required("กรุณากรอกบัญชีผู้ใช้"),
  password: yup.string().required("กรุณากรอกรหัสผ่าน"),
});

function login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();
  const {
    control,
    setError,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const onSubmit = async (data: FormType) => {
    const res = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
      callbackUrl,
    });
    if (!res?.error) {
      router.push(callbackUrl);
    } else {
      setError("username", { message: "บัญชีผู้ใช้หรือรหัสผ่านผิดพลาด" });
    }
  };
  return (
    <section className=" bg-blue-300 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-2xl font-bold text-center">
              ระบบสแกนนิ้วเข้าทำงาน
            </p>
            <Divider />
            <h1 className="text-xl  leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              เข้าสู่ระบบ
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <AFormVertical
                      error={errors?.[`${field.name}`]}
                      title="บัญชีผู้ใช้"
                    >
                      <AInput
                        size="large"
                        {...field}
                        error={errors?.[`${field.name}`]}
                      />
                    </AFormVertical>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <AFormVertical
                      error={errors?.[`${field.name}`]}
                      title="รหัสผ่าน"
                    >
                      <Input.Password
                        size="large"
                        {...field}
                        status={errors?.[`${field.name}`] ? "error" : ""}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />

                      {/* <AInput
                        size="large"
                        {...field}
                        error={errors?.[`${field.name}`]}
                      /> */}
                    </AFormVertical>
                  )}
                />
              </div>

              <div className="flex justify-center">
                <AButton type="primary" htmlType="submit">
                  เข้าสู่ระบบ
                </AButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default login;
