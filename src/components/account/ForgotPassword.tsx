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
import ForgetPasswordModel from "@/models/ForgetPasswordModel";
import ForgetPasswordValidationSchema from "@/validation/ForgetPasswordValidationSchema";
import { useEffect, useState } from "react";
import useCustomError from "../common/CustomError/useCustomError";
import CustomError from "../common/CustomError";
import ErrorLabel from "../common/CustomError/ErrorLabel";
import CommonProps from "@/models/CommonProps";
import Loader from "../common/Loader";
import RoleDto from "@/dtos/RoleDto";
import { Role } from "@/helpers/Roles";

interface ForgotPasswordProps extends CommonProps {}

const ForgotPassword: NextPage<ForgotPasswordProps> = (props) => {
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

      router.push(`${redirectUrl}`);
    }
  }, [status]);

  const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
  const [showLoader, setShowLoader] = useState(false);
  const { errorMessage, setErrorMessage } = useCustomError();

  const { formState, handleSubmit, register } = useForm<ForgetPasswordModel>({
    resolver: yupResolver(ForgetPasswordValidationSchema),
    defaultValues: {
      username: "",
    },
  });

  const { errors } = formState;

  const submitData = async (formData: ForgetPasswordModel) => {
    setShowLoader(true);

    unitOfService.AccountService.forgotPassword(formData)
      .then((res) => {
        setShowLoader(false);
        setErrorMessage({
          message:
            "We have sent an email with the link to reset your password. Please check your email.",
          show: true,
          type: "success",
        });
      })
      .catch((err) => {
        setShowLoader(false);
        setErrorMessage({
          message:
            "We have sent an email with the link to reset your password. Please check your email.",
          show: true,
          type: "success",
        });
      });
  };

  return (
    <>
      <h1>Recover Password</h1>
      <p>
        Please enter your username, a link will be shared to recover your
        password.
      </p>
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
        <Form.Group className="mb-3 text-center">
          <Link href={"/account/login"} className="text-muted">
            Go back to Login!
          </Link>
        </Form.Group>
        <Form.Group className="mb-3 text-center">
          <Button variant="primary" type="submit" className="btn_main">
            Send Email
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

export default ForgotPassword;
