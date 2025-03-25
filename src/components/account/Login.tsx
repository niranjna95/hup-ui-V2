import { GetServerSideProps, NextPage } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { container } from "@/config/ioc";
import { TYPES } from "@/config/types";
import IUnitOfService from "@/services/interfaces/IUnitOfService";
import LoginModel from "@/models/LoginModel";
import LoginValidationSchema from "@/validation/LoginValidationSchema";
import { useEffect, useState } from "react";
import useCustomError from "../common/CustomError/useCustomError";
import CustomError from "../common/CustomError";
import ErrorLabel from "../common/CustomError/ErrorLabel";
import CommonProps from "@/models/CommonProps";
import Loader from "../common/Loader";
import RoleDto from "@/dtos/RoleDto";
import { Role } from "@/helpers/Roles";

interface LoginProps extends CommonProps {}

const Login: NextPage<LoginProps> = (props) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && session.user) {
      let redirectUrl = "/admin/dashboard";
      const rolesObject = (session.user?.roles || []) as RoleDto[];
      const roles = rolesObject.map((el) => el.name);

      if (roles.indexOf(Role.SuperAdmin) >= 0) {
        redirectUrl = "/admin/dashboard";
      } else if (roles.indexOf(Role.User) >= 0) {
        redirectUrl = "/user/user-list";
      }

      localStorage.setItem("at", session.user.token);
      localStorage.setItem("utz", session.user.timezoneId || "");

      router.push(`${redirectUrl}`);
    }
  }, [status]);

  const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
  const [showLoader, setShowLoader] = useState(false);
  const { errorMessage, setErrorMessage } = useCustomError();

  const { formState, handleSubmit, register } = useForm<LoginModel>({
    resolver: yupResolver(LoginValidationSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const { errors } = formState;

  const submitData = async (formData: LoginModel) => {
    setShowLoader(true);
    const loginStatus = await signIn("credentials", {
      redirect: false,
      username: formData.username,
      password: formData.password,
      rememberMe: formData.rememberMe,
      callbackUrl: "/",
    });

    if (loginStatus && loginStatus.ok && loginStatus.status) {
      console.log(loginStatus.error);
      setErrorMessage({
        message: "Login successfull. Redirecting...",
        show: true,
        type: "success",
      });
    } else {
      setShowLoader(false);
      setErrorMessage({
        message: loginStatus?.error || "",
        show: true,
        type: "danger",
      });
    }
  };

  return (
    <>
      <Form
        method="post"
        autoComplete="off"
        className="login_form"
        onSubmit={handleSubmit(submitData)}
      >
        <Form.Group className="mb-3">
          <FloatingLabel label="Username*">
            <Form.Control
              type="text"
              placeholder="Username*"
              {...register("username")}
            />
          </FloatingLabel>
          {errors.username && <ErrorLabel message={errors.username.message} />}
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel label="Password*">
            <Form.Control
              type="password"
              placeholder="Password*"
              {...register("password")}
            />
          </FloatingLabel>
          {errors.password && <ErrorLabel message={errors.password.message} />}
        </Form.Group>
        <Form.Group className="mb-3 text-center">
          <Link href={"/account/forgot-password"} className="text-muted">
            Forgot Password?
          </Link>
        </Form.Group>
        <Form.Group className="mb-3 text-center">
          <Button variant="primary" type="submit" className="btn_main">
            Submit
          </Button>
        </Form.Group>

        {errorMessage && errorMessage.show && (
          <CustomError
            errorType={errorMessage.type}
            message={errorMessage.message}
            show={errorMessage.show}
            hideShowAlert={() =>
              setErrorMessage({
                message: "Login",
                show: false,
                type: "success",
              })
            }
          />
        )}
      </Form>

      {showLoader && <Loader />}
    </>
  );
};

export default Login;
