import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/admindashboard.module.css";
const AdminDashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin Dashboard | Happy Utsaw Palace</title>
      </Head>

      <div className="container mt-5">
        <h1 className="text-center mb-4">Admin Dashboard</h1>

        <div className="row justify-content-center g-4">
          <div className="col-md-4">
            <DashboardCard
              title="Check Hall Availability"
              link="/check-availability"
            />
          </div>
          <div className="col-md-4">
            <DashboardCard title="New Bookings" link="/new-bookings" />
          </div>
          <div className="col-md-4">
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
