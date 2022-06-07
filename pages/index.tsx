import type { NextPage, GetServerSideProps } from "next";
import requestIp from "request-ip";

interface Props {
  ip: string;
}

const Home = (props: Props) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Your IP Address is: {props.ip}</h1>
    </div>
  );
};

// server side rendering
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const forwarded = req.headers["x-forwarded-for"] as string;
  const ip = forwarded ? forwarded.split(/, /)[0] : req.socket.remoteAddress;

  return {
    props: {
      ip: ip,
    },
  };
};

export default Home;
