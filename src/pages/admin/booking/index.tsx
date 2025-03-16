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

const AdminDashboardPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState<BookingDto[]>([]);
  const unitOfService = container.get<IUnitOfService>(TYPES.IUnitOfService);
  const getBookings = async () => {
    const response = await unitOfService.BookingService.get();

    try {
      if (response.status === 200 && response.data?.data && response.data) {
        const bookingsDetails = response.data.data;
        setBookings(bookingsDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchBookings = async () => {
      await getBookings();
    };
    fetchBookings();
  }, []);

  return (
    <>
      <Head>
        <title>Booking</title>
      </Head>
      <CustomBreadcrumb />

      <div className="table-responsive">
        <table className="table table-bordered text-center w-100">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Booking Date</th>
              <th>Check Out Date</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Add New</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.name}</td>
                <td>{format(new Date(booking.stayDate), "dd-MM-yyyy")}</td>
                <td>{format(new Date(booking.checkOutDate), "dd-MM-yyyy")}</td>
                <td>{booking.mobileNo}</td>
                <td>{booking.address}</td>
                <td>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-primary"
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))}
            {/* Add more rows dynamically here */}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Booking"
      >
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Booking Date</label>
            <input type="date" className="w-full p-2 border rounded" />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};

interface CardProps {
  title: string;
  link: string;
}

const DashboardCard: React.FC<CardProps> = ({ title, link }) => {
  return (
    <Link href={link} className="text-decoration-none">
      <div className={`card shadow-sm ${styles.squareCard}`}>
        <div className="card-body d-flex align-items-center justify-content-center">
          <h5 className="card-title text-center">{title}</h5>
        </div>
      </div>
    </Link>
  );
};

export default AdminDashboardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
