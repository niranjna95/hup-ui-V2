import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/booking.module.css";
import CustomBreadcrumb from "@/components/common/Breadcrumb/Index";
import { useEffect, useState } from "react";
import Modal from "@/components/common/Model";
import { container } from "@/config/ioc";
import IUnitOfService from "@/services/interfaces/IUnitOfService";
import { TYPES } from "@/config/types";
import { BookingDto } from "@/dtos/BookingDto";
import { format } from "date-fns";
import axios from "axios";

const NewBookingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>New Booking</title>
      </Head>
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="div col-md-4">
            <div className="card shadow-sm">
              <div className="card-body d-flex align-items-center justify-content-center">
                <h5 className="card-title text-center">New Booking</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewBookingPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
