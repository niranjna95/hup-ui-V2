import "reflect-metadata";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/style.scss";
import "@/styles/global.css";
import React from "react";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import AdminLayout from "@/components/layout/AdminLayout";

type ComponenetWithLayout = AppProps & {
  Component: AppProps["Component"] & {
    Layout?: React.ComponentType;
    NoLayout?: boolean;
  };
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: ComponenetWithLayout) {
  if (Component.NoLayout && Component.NoLayout === true) {
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      <ErrorBoundary>
        {Component.Layout ? (
          <Component.Layout>
            <Component {...pageProps} />
          </Component.Layout>
        ) : (
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        )}
      </ErrorBoundary>
    </SessionProvider>
  );
}
