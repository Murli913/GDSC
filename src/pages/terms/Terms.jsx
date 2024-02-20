import React from "react";
import { useNavigate } from "react-router-dom";
import "./terms.css";
import Layout from "../../components/layout/Layout";

const Terms = () => {
  let navigate = useNavigate();
  const signwithoutuser = () => {
    navigate("/createblog");
  };
  return (
    <Layout>
      <div class="flex justify-center">
        <div class="w-full max-w-prose p-6 bg-gray-200 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Filing a Complaint on National Cyber Crime Reporting Portal
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological
          </p>
          <div class="flex justify-center">
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={signwithoutuser}
            >
              I Accept
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
