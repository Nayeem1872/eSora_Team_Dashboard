"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";

import Loader from "@/components/loader";
import Breadcrumb from "@/components/breadcumb/breadcrumb";
import PageHeading from "@/components/pageheading/pageheading";
import Spacer from "@/components/spacer/spacer";
import Pagination from "@/components/pagination/pagination";

import ApiCaller from "@/config/apicaller";

import styles from "./styles";

const breadcumbData = [{ title: "Activity", link: "/activity", active: true }];

const Activity = () => {
  const [data, setData] = useState([]);
  const [activityCount, setActivityCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(9);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        setLoading(true);

        const response = await ApiCaller.Get(
          `/admin/activity?limit=${limit}&offset=${offset}`
        );
        console.log(response);
        if (response?.status === 200) {
          setData(response?.data?.activity);
          setActivityCount(response?.data?.activityCount);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching activity data:", error);
      }
    };
    fetchActivityData();
  }, []);

  const handlePagination = async (pageNumber) => {
    const offset = (pageNumber - 1) * limit;

    try {
      setLoading(true);
      const response = await ApiCaller.Get(
        `/admin/activity?limit=${limit}&offset=${offset}`
      );
      if (response?.status === 200) {
        setData(response?.data?.activity);
        setActivityCount(response?.data?.activityCount);
      }
      setLoading(false);
      setOffset(offset);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching activity data:", error);
    }
  };

  return (
    <div>
      <Breadcrumb data={breadcumbData} />
      <Spacer height="32px" />
      <PageHeading
        heading="Activity"
        subHeading="Track, manage and forecast your all messages."
      />
      <Spacer height="32px" />
      <div
        className={
          data?.length === 0
            ? ""
            : "shadow-clientCard border border-grayBorderDashboard rounded-2xl"
        }
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            {data?.length === 0 ? (
              <>No Data</>
            ) : (
              <div style={styles.activityContainer}>
                {data?.map((item, index) => (
                  <div
                    style={{
                      padding: "16px",
                      background: index % 2 === 0 ? "#F9FAFB" : "white",
                    }}
                    key={index}
                    className="flex flex-col gap-2"
                  >
                    <div className={styles.justifyBetween}>
                      <div className={styles.activityUpperText}>
                        {item.description}
                      </div>
                      <div className={styles.activityDate}>
                        {moment(item.createdAt).format("DD MMM YYYY")}
                      </div>
                    </div>
                    <div className={styles.activityBottomText}>
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {data?.length > 0 && (
          <div className="pt-[11px] pb-4 px-6 flex items-center justify-between border-t border-t-grayBorder">
            <Pagination
              totalPages={activityCount}
              currentPage={currentPage}
              limit={limit}
              setCurrentPage={setCurrentPage}
              onChange={handlePagination}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;
