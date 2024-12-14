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
import ResetPasswordModel from "@/models/ResetPasswordModel";
import ResetPasswordValidationSchema from "@/validation/ResetPasswordValidationSchema";
import { useEffect, useState } from "react";
import useCustomError from "../common/CustomError/useCustomError";
import CustomError from "../common/CustomError";
import ErrorLabel from "../common/CustomError/ErrorLabel";
import CommonProps from "@/models/CommonProps";
import Loader from "../common/Loader";
import RoleDto from "@/dtos/RoleDto";
import { Role } from "@/helpers/Roles";

interface ResetPasswordProps extends CommonProps {
  userId: string;
  token: string;
}

const ResetPassword: NextPage<ResetPasswordProps> = (props) => {
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

  const { formState, handleSubmit, register } = useForm<ResetPasswordModel>({
    resolver: yupResolver(ResetPasswordValidationSchema),
    defaultValues: {
      userId: props.userId,
      token: props.token,
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { errors } = formState;

  const submitData = async (formData: ResetPasswordModel) => {
    setShowLoader(true);

    unitOfService.AccountService.resetPassword(formData)
      .then((res) => {
        setShowLoader(false);

        if (res.status == 200) {
          setErrorMessage({
            message:
              "Password updated successfully. Redirecting on login page...",
            show: true,
            type: "success",
          });

          setTimeout(function () {
            router.push(`/account/login`);
          }, 2000);
        } else {
          setErrorMessage({
            message:
              "Some error occured while resetting your password. Please contact system administrator",
            show: true,
            type: "danger",
          });
        }
      })
      .catch((err) => {
        setShowLoader(false);
        setErrorMessage({
          message:
            "Some error occured while resetting your password. Please contact system administrator",
          show: true,
          type: "danger",
        });
      });
  };

  return (
    <>
      <h1>Reset Password</h1>
      <Form
        method="post"
        autoComplete="off"
        className="login_form"
        onSubmit={handleSubmit(submitData)}
      >
        <Form.Control type="hidden" {...register("userId")} />
        <Form.Control type="hidden" {...register("token")} />

        <Form.Group className="mb-3">
          <FloatingLabel label="Password*">
            <Form.Control
              type="password"
              placeholder="Password*"
              {...register("newPassword")}
            />
          </FloatingLabel>
          {errors.newPassword && (
            <ErrorLabel message={errors.newPassword.message} />
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <FloatingLabel label="Confirm Password*">
            <Form.Control
              type="password"
              placeholder="Confirm Password*"
              {...register("confirmNewPassword")}
            />
          </FloatingLabel>
          {errors.confirmNewPassword && (
            <ErrorLabel message={errors.confirmNewPassword.message} />
          )}
        </Form.Group>

        <Form.Group className="mb-3 text-center">
          <Button variant="primary" type="submit" className="btn_main">
            Reset Password
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

export default ResetPassword;
