import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/admindashboard.module.css";
import CustomBreadcrumb from "@/components/common/Breadcrumb/Index";
const AdminDashboardPage: NextPage = () => {
  return (
    <>
      <CustomBreadcrumb />

      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4 d-flex justify-content-center">
            <DashboardCard
              title="Check Hall Availability"
              link="/check-availability"
            />
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <DashboardCard title="New Booking" link="/admin/booking" />
          </div>
          <div className="col-md-4 d-flex justify-content-center">
            <DashboardCard title="All Bookings" link="/all-bookings" />
          </div>
        </div>
      </div>
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
